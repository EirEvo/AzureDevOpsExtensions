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
            var $displayMode = document.getElementById("displayMode");
            var $title = document.getElementById("title");
            var $width = document.getElementById("width");
            var $height = document.getElementById("height");

            function validateField(field) {
                if (field) {
                    var error = field.nextElementSibling;
                    if (field.value.trim() === "") {
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
                        displayMode: $displayMode ? $displayMode.value : "",
                        title: $title ? $title.value.trim() : "",
                        width: $width ? $width.value : "",
                        height: $height ? $height.value : ""
                    })
                };

                // Переконайтеся, що context не undefined і має метод notify
                if (context && typeof context.notify === 'function') {
                    context.notify(WidgetHelpers.WidgetEvent.ConfigurationChange, WidgetHelpers.WidgetEvent.Args(customSettings));
                } else {
                    console.error("Configuration context does not support notify.");
                }
            }

            function bindEvents(context) {
                var fields = [$harvestAccountId, $authToken, $displayMode, $title, $width, $height];
                fields.forEach(function(field) {
                    if (field) {
                        field.addEventListener("input", function() {
                            validateField(field);
                            notifyConfigurationChange(context);
                        });
                    }
                });

                if ($displayMode) {
                    $displayMode.addEventListener("change", function() {
                        notifyConfigurationChange(context);
                    });
                }
            }

            return {
                load: function (widgetSettings, widgetConfigurationContext) {
                    var settings = JSON.parse(widgetSettings.customSettings.data || "{}");
                    if ($harvestAccountId) $harvestAccountId.value = settings.harvestAccountId || "";
                    if ($authToken) $authToken.value = settings.authToken || "";
                    if ($displayMode) $displayMode.value = settings.displayMode || "hours";
                    if ($title) $title.value = settings.title || "";
                    if ($width) $width.value = settings.width || "";
                    if ($height) $height.value = settings.height || "";

                    validateField($harvestAccountId);
                    validateField($authToken);
                    validateField($title);
                    validateField($width);
                    validateField($height);

                    VSS.resize(); // Adjust the size of the configuration pane

                    bindEvents(widgetConfigurationContext);
                    notifyConfigurationChange(widgetConfigurationContext); // Notify initial state

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
                            displayMode: $displayMode ? $displayMode.value : "",
                            title: $title ? $title.value.trim() : "",
                            width: $width ? $width.value : "",
                            height: $height ? $height.value : ""
                        })
                    };

                    return WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
                }
            };
        });

        VSS.notifyLoadSucceeded();
    });
});
