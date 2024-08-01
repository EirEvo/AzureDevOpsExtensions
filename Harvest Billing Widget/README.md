# Harvest Billing Widget

The **Harvest Billing Widget** is an Azure DevOps dashboard tool designed to visualize and track billable, internal (non-billable), and R&D hours logged through the Harvest app. This widget is invaluable for teams looking to efficiently manage and understand the allocation of time across different project categories.

![Pie Chart](https://raw.githubusercontent.com/BogdanBrat/DevOpsWidgetHarvestHours/main/docs/pie-chart.png)

## Features

- **Billable Hours**: Displays hours that are chargeable to clients or projects, providing insights into revenue-generating activities.
- **Internal Hours**: Tracks hours spent on internal tasks such as meetings, training, and administration, aiding in resource allocation analysis.
- **R&D Hours**: Captures hours dedicated to research and development projects, identified by a project code containing "R&D".

## Technologies Used

- **HTML & CSS**: For creating the structure and styling of the widget and configuration interfaces.
- **JavaScript**: Core scripting language for interactive features and data processing.
- **jQuery**: A fast, small, and feature-rich JavaScript library used to simplify HTML DOM manipulation and AJAX interactions.
- **Chart.js**: A flexible JavaScript charting library used to create the visual representation of data.
- **Chartjs-plugin-datalabels**: Plugin for Chart.js to display labels on data points.
- **VSS SDK (Visual Studio Services SDK)**: Enables integration with Azure DevOps services, providing a framework for developing and deploying widgets.

## Configuration

To configure the widget, click on the gear icon in the widget's header. Configuration options include:

- **Harvest Account ID**: Unique identifier for your Harvest account, necessary for fetching time entries.
- **Authorization Token**: Personal access token required for authenticating requests to the Harvest API.
- **Display Mode**: Choose to display data either as a percentage or in absolute hours.
- **Widget Title**: Customize the title displayed on the widget.
- **Widget Size**: Adjust the widget size to fit your dashboard layout.

![Widget Configuration](https://raw.githubusercontent.com/BogdanBrat/DevOpsWidgetHarvestHours/main/docs/widget-configuration.png)

### Obtaining Harvest Account ID and Authorization Token

1. **Log in to Harvest**: Access your Harvest account.
2. **Navigate to Profile**: Click your name in the upper right corner and select "My Profile".
3. **Access Security Settings**: Go to "Settings" -> "Security" -> "Go to Harvest ID security settings" -> "Developers".
4. **Create or Use Token**: Create a new personal access token or use an existing one. Copy the token and account ID and store them securely.

![Security Settings](https://raw.githubusercontent.com/BogdanBrat/DevOpsWidgetHarvestHours/main/docs/security-settings.png)

## Installation and Setup

1. **Install the Widget**: Download and install from the Azure DevOps Marketplace.
2. **Add to Dashboard**: Drag and drop the widget onto your dashboard.
3. **Configure**: Enter your Harvest Account ID and Authorization Token.
4. **Customize Display**: Set your display preferences and widget dimensions.
5. **Customize Display**: Set your display preferences, widget dimensions, and optionally customize the R&D filter term.

## License

A valid license for the Harvest service is required for the widget to function properly. The widget relies on Harvest's API to fetch time entry data, which requires authentication via an Authorization Token. Ensure you have the necessary permissions and access rights to use the Harvest API.

## Contact

Project Link: [https://github.com/BogdanBrat/DevOpsWidgetHarvestHours]