# Harvest Work Hours Monitor

The Harvest Work Hours Monitor is an Azure DevOps dashboard widget that visualizes billable, internal (non-billable), and R&D hours logged through the Harvest app. This widget helps teams efficiently track and manage time spent on various project categories.

![image](![alt text](image-1.png))


## Features

- **Billable Hours**: Displays hours that are chargeable to clients or projects, providing insight into revenue-generating activities.
- **Internal Hours**: Tracks hours dedicated to internal tasks such as meetings, training, and administration, crucial for understanding resource allocation.
- **R&D Hours**: Captures hours for research and development projects, identified by a project code containing "R&D", regardless of whether these hours are billable or internal.

## Configuration

To configure the widget, click on the gear icon in the widget's header. You'll need to provide:

- **Harvest Account ID**: This is your unique account identifier for the Harvest app, which is required to fetch time entries.
- **Authorization Token**: A personal access token necessary for authenticating requests to the Harvest API.
- **Display Mode**: Choose between displaying data as a percentage or in absolute hours.

![image](![alt text](image-2.png))


## Installation and Setup

1. **Install the Widget**: Download and install the Harvest Work Hours Monitor from the Azure DevOps Marketplace.
2. **Add to Dashboard**: Drag and drop the widget onto your desired dashboard.
3. **Enter Configuration Details**: Provide your Harvest Account ID and Authorization Token to enable data fetching.
4. **Customize Display Options**: Select your preferred display mode to visualize the data effectively.

## Usage

After configuration, the widget provides a real-time breakdown of hours spent on different types of work. This allows teams and managers to monitor resource utilization and focus, ensuring that project hours are appropriately categorized and tracked.

## Privacy and Access

This widget is a private tool intended for use only by organizations with which it has been explicitly shared. It is not available publicly and should not be redistributed without proper authorization. Ensure that your organization complies with any sharing restrictions associated with this widget.

For further assistance or detailed documentation, please visit https://github.com/BogdanBrat/DevOpsWidgetHarvestHours.

---