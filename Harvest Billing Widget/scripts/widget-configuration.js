document.addEventListener("DOMContentLoaded", function() {
    VSS.init({
        explicitNotifyLoaded: true,
        usePlatformStyles: true
    });

    VSS.require(["TFS/Dashboards/WidgetHelpers"], function (WidgetHelpers) {
        WidgetHelpers.IncludeWidgetConfigurationStyles();

        VSS.register("HarvestHoursWidget.Configuration", function () {
            var $harvestAccountId = document.getElementById("harvestAccountId");
            var $authToken = document.getElementById("authToken");
            var $rndFilter = document.getElementById("rndFilter"); // R&D Filter Field
            var $displayMode = document.getElementById("displayMode");
            var $billableLabel = document.getElementById("billableLabel");
            var $internalLabel = document.getElementById("internalLabel");
            var $rndLabel = document.getElementById("rndLabel"); // R&D Label Field
            var $billableColor = document.getElementById("billableColor");
            var $internalColor = document.getElementById("internalColor");
            var $rndColor = document.getElementById("rndColor");
            var $timePeriod = document.getElementById("timePeriod"); // Time Period Field

            function validateField(field) {
                if (field) {
                    var error = field.nextElementSibling;
                    if (field.value.trim() === "" && (field === $harvestAccountId || field === $authToken)) {
                        if (error) error.style.visibility = "visible";
                    } else {
                        if (error) error.style.visibility = "hidden";
                    }
                }
            }

            function notifyConfigurationChange(context) {
                var customSettings = {
                    data: JSON.stringify({
                        harvestAccountId: $harvestAccountId ? $harvestAccountId.value.trim() : "",
                        authToken: $authToken ? $authToken.value.trim() : "",
                        rndFilter: $rndFilter ? $rndFilter.value.trim() : "R&D", // R&D Filter
                        displayMode: $displayMode ? $displayMode.value : "",
                        billableLabel: $billableLabel ? $billableLabel.value.trim() : "Billable",
                        internalLabel: $internalLabel ? $internalLabel.value.trim() : "Internal",
                        rndLabel: $rndLabel ? $rndLabel.value.trim() : "R&D", // R&D Label
                        billableColor: $billableColor ? $billableColor.value : "#852d9d",
                        internalColor: $internalColor ? $internalColor.value : "#ec0bb7",
                        rndColor: $rndColor ? $rndColor.value : "#76f5ff",
                        timePeriod: $timePeriod ? $timePeriod.value : "7" // Time Period
                    })
                };

                console.log('Custom Settings:', customSettings); // Debugging output

                if (context && typeof context.notify === 'function') {
                    context.notify(WidgetHelpers.WidgetEvent.ConfigurationChange, WidgetHelpers.WidgetEvent.Args(customSettings));
                } else {
                    console.error("Configuration context does not support notify.");
                }
            }

            function bindEvents(context) {
                var fields = [
                    $harvestAccountId, 
                    $authToken, 
                    $rndFilter,  // R&D Filter
                    $displayMode, 
                    $billableLabel, 
                    $internalLabel, 
                    $rndLabel,  // R&D Label
                    $billableColor, 
                    $internalColor, 
                    $rndColor,
                    $timePeriod // Time Period
                ];

                fields.forEach(function(field) {
                    if (field) {
                        field.addEventListener("input", function() {
                            validateField(field);
                            notifyConfigurationChange(context);
                        });
                    }
                });

                if ($displayMode || $timePeriod) {
                    [$displayMode, $timePeriod].forEach(function(field) {
                        field.addEventListener("change", function() {
                            notifyConfigurationChange(context);
                        });
                    });
                }
            }

            return {
                load: function (widgetSettings, widgetConfigurationContext) {
                    var settings = JSON.parse(widgetSettings.customSettings.data || "{}");
                    if ($harvestAccountId) $harvestAccountId.value = settings.harvestAccountId || "";
                    if ($authToken) $authToken.value = settings.authToken || "";
                    if ($rndFilter) $rndFilter.value = settings.rndFilter || "R&D"; // R&D Filter
                    if ($displayMode) $displayMode.value = settings.displayMode || "hours";
                    if ($billableLabel) $billableLabel.value = settings.billableLabel || "Billable";
                    if ($internalLabel) $internalLabel.value = settings.internalLabel || "Internal";
                    if ($rndLabel) $rndLabel.value = settings.rndLabel || "R&D"; // R&D Label
                    if ($billableColor) $billableColor.value = settings.billableColor || "#852d9d";
                    if ($internalColor) $internalColor.value = settings.internalColor || "#ec0bb7";
                    if ($rndColor) $rndColor.value = settings.rndColor || "#76f5ff";
                    if ($timePeriod) $timePeriod.value = settings.timePeriod || "7"; // Time Period

                    validateField($harvestAccountId);
                    validateField($authToken);
                    validateField($rndFilter);  // R&D Filter
                    validateField($billableLabel);
                    validateField($internalLabel);
                    validateField($rndLabel);  // R&D Label
                    validateField($billableColor);
                    validateField($internalColor);
                    validateField($rndColor);
                    validateField($timePeriod); // Time Period

                    VSS.resize();

                    bindEvents(widgetConfigurationContext);
                    notifyConfigurationChange(widgetConfigurationContext);

                    return WidgetHelpers.WidgetStatusHelper.Success();
                },
                onSave: function () {
                    validateField($harvestAccountId);
                    validateField($authToken);

                    if (($harvestAccountId && $harvestAccountId.value.trim() === "") || ($authToken && $authToken.value.trim() === "")) {
                        return WidgetHelpers.WidgetStatusHelper.Failure("Validation error: fields cannot be empty.");
                    }

                    var customSettings = {
                        data: JSON.stringify({
                            harvestAccountId: $harvestAccountId ? $harvestAccountId.value.trim() : "",
                            authToken: $authToken ? $authToken.value.trim() : "",
                            rndFilter: $rndFilter ? $rndFilter.value.trim() : "R&D", // R&D Filter
                            displayMode: $displayMode ? $displayMode.value : "",
                            billableLabel: $billableLabel ? $billableLabel.value.trim() : "Billable",
                            internalLabel: $internalLabel ? $internalLabel.value.trim() : "Internal",
                            rndLabel: $rndLabel ? $rndLabel.value.trim() : "R&D", // R&D Label
                            billableColor: $billableColor ? $billableColor.value : "#852d9d",
                            internalColor: $internalColor ? $internalColor.value : "#ec0bb7",
                            rndColor: $rndColor ? $rndColor.value : "#76f5ff",
                            timePeriod: $timePeriod ? $timePeriod.value : "7" // Time Period
                        })
                    };

                    console.log('Saving Settings:', customSettings); // Debugging output

                    return WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
                }
            };
        });

        VSS.notifyLoadSucceeded();
    });
});
