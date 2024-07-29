VSS.init({
    explicitNotifyLoaded: true,
    usePlatformStyles: true
});

VSS.require(["TFS/Dashboards/WidgetHelpers"], function (WidgetHelpers) {
    WidgetHelpers.IncludeWidgetConfigurationStyles();
    VSS.register("HarvestHoursWidget.Configuration", function () {
        var $harvestAccountId = document.getElementById("harvestAccountId");
        var $authToken = document.getElementById("authToken");
        var $displayMode = document.getElementById("displayMode");

        function validateField(field) {
            var error = field.nextElementSibling;
            if (field.value.trim() === "") {
                error.style.visibility = "visible";
            } else {
                error.style.visibility = "hidden";
            }
        }

        function notifyConfigurationChange() {
            var customSettings = {
                data: JSON.stringify({
                    harvestAccountId: $harvestAccountId.value.trim(),
                    authToken: $authToken.value.trim(),
                    displayMode: $displayMode.value
                })
            };
            VSS.getConfiguration().notify(WidgetHelpers.WidgetEvent.ConfigurationChange, WidgetHelpers.WidgetEvent.Args(customSettings));
        }

        $harvestAccountId.addEventListener("input", function() {
            validateField($harvestAccountId);
            notifyConfigurationChange();
        });

        $authToken.addEventListener("input", function() {
            validateField($authToken);
            notifyConfigurationChange();
        });

        $displayMode.addEventListener("change", notifyConfigurationChange);

        return {
            load: function (widgetSettings, widgetConfigurationContext) {
                var settings = JSON.parse(widgetSettings.customSettings.data || "{}");
                $harvestAccountId.value = settings.harvestAccountId || "";
                $authToken.value = settings.authToken || "";
                $displayMode.value = settings.displayMode || "hours";

                validateField($harvestAccountId);
                validateField($authToken);

                VSS.resize(); // Adjust the size of the configuration pane

                return WidgetHelpers.WidgetStatusHelper.Success();
            },
            onSave: function () {
                validateField($harvestAccountId);
                validateField($authToken);

                if ($harvestAccountId.value.trim() === "" || $authToken.value.trim() === "") {
                    return WidgetHelpers.WidgetStatusHelper.Failure("Validation error: fields cannot be empty.");
                }

                var customSettings = {
                    data: JSON.stringify({
                        harvestAccountId: $harvestAccountId.value.trim(),
                        authToken: $authToken.value.trim(),
                        displayMode: $displayMode.value
                    })
                };

                return WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
            }
        };
    });

    VSS.notifyLoadSucceeded();
});
