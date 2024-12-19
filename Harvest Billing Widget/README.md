# Harvest Billing Widget Developer Guide

This guide provides developers with detailed instructions on how to integrate, customize, and publicly deploy the **Harvest Billing Widget** for Azure DevOps dashboards. The widget utilizes the Azure DevOps SDK and Harvest API to visually represent billable, non-billable, and R&D hours in a customizable chart. All source code and project details can be found in the [EirEvo/AzureDevOpsExtensions GitHub repository](https://github.com/EirEvo/AzureDevOpsExtensions).

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setting Up Your Development Environment](#setting-up-your-development-environment)
- [Modifying the vss-extension.json File](#modifying-the-vss-extensionjson-file)
- [Building and Packaging the Widget](#building-and-packaging-the-widget)
- [Deploying to Azure DevOps](#deploying-to-azure-devops)
- [Making the Widget Public](#making-the-widget-public)
- [Creating a Publisher](#creating-a-publisher)
- [Contributing](#contributing)

## Overview

The Harvest Billing Widget is a versatile tool designed to be integrated into Azure DevOps dashboards to display time tracking data such as billable, non-billable, and R&D hours using the Harvest API. This guide will help you set up, customize, and deploy the widget, making it available on the Azure DevOps Marketplace.

## Prerequisites

Ensure you have the following installed and configured before starting:

- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **Azure DevOps Account** with necessary permissions
- **Harvest Account** with API access
- **Visual Studio Code** or your preferred IDE
- **Azure DevOps Extension Tools (tfx-cli)**

  Install the Azure DevOps Extension Tools globally via npm:

  ```bash
  npm install -g tfx-cli

## Project Structure

The widget project is structured as follows:

```bash
harvest-billing-widget/
│
├── docs/                         # Documentation and images
│   └── overview.md               # Overview documentation
├── img/                          # Widget images (e.g., logo, preview)
├── scripts/                      # Custom JavaScript files for the widget
│   └── widget-configuration.js   # Handles widget configuration logic
├── sdk/                          # Azure DevOps SDK scripts
│   └── scripts/
│       ├── VSS.SDK.js            # Azure DevOps SDK
│       └── VSS.SDK.min.js        # Minified Azure DevOps SDK
├── widget.html                   # Main widget HTML file
├── widget-configuration.html     # Configuration HTML file
├── package.json                  # Node.js project file with dependencies
├── README.md                     # Project readme
└── vss-extension.json            # Azure DevOps extension manifest
```
## Setting Up Your Development Environment

### 1. Clone the Repository
Start by cloning the repository to your local machine:

```bash
git clone https://github.com/EirEvo/AzureDevOpsExtensions.git
cd AzureDevOpsExtensions
```
### 2. Install Dependencies
Install the necessary Node.js dependencies:

```bash
npm install
```
### 3. Launch the Local Development Server
Use tools like http-server to serve the HTML files locally for testing:

```bash
npx http-server
```
Visit http://localhost:8080 to view the widget in your browser.

## Modifying the vss-extension.json File
The vss-extension.json file is the core configuration file for your Azure DevOps extension. It defines the widget's metadata, including its ID, version, categories, and the resources it uses.

### Key Modifications Required:
**1. Publisher ID:**

Replace the "publisher": "EirEvo-EvoLabs" with your own publisher ID.
Example:

```bash
"publisher": "YourPublisherID",
```
**2. Version:**

Set the version to reflect your extension's versioning strategy.
Example:

```bash
"version": "1.0.1",
```
**3. Categories:**

Ensure the "categories" field includes "Azure Boards" to make your widget compatible with Azure DevOps dashboards.
Example:

```bash
"categories": ["Azure Boards"],
```
**4. Gallery Flags:**

To make the widget public, add the following "galleryFlags" field:

```bash
"galleryFlags": [
  "Preview",
  "Public"
],
```
**5. Resource Paths:**

Ensure all paths to resources (e.g., images, scripts) are correctly defined. This includes the logo, preview image, and the SDK script.
Example for icons:

```bash
"icons": {
  "default": "img/logo.png"
}
```
**6. Widget Sizes:**

Define the supported sizes for the widget in the "supportedSizes" field to ensure proper display on the dashboard.
Example:

```bash
"supportedSizes": [
  { "rowSpan": 2, "columnSpan": 2 },
  { "rowSpan": 2, "columnSpan": 3 },
  { "rowSpan": 3, "columnSpan": 2 },
  { "rowSpan": 3, "columnSpan": 3 }
],
```
**7. SDK Reference:**

Ensure the Azure DevOps SDK script is correctly referenced in the vss-extension.json file:

```bash
{
  "path": "sdk/scripts/VSS.SDK.min.js",
  "addressable": true
}
```
### Final Example of vss-extension.json:

```bash
{
  "manifestVersion": 1,
  "id": "HarvestWidgets",
  "version": "1.0.1",
  "name": "Harvest Billing Widget",
  "description": "Displays hours from Harvest, providing detailed insights into time allocation for projects. The hours are categorized into billable hours, 'R&D' (Research & Development), and Internal hours.",
  "publisher": "YourPublisherID",
  "categories": ["Azure Boards"],
  "galleryFlags": [
    "Preview",
    "Public"
  ],
  "tags": [
    "hours",
    "billable",
    "non-billable",
    "harvest",
    "time tracking",
    "dashboard",
    "widget",
    "Internal",
    "extension"
  ],
  "repository": {
    "type": "git",
    "uri": "https://github.com/EirEvo/AzureDevOpsExtensions"
  },
  "content": {
        "details": {
            "path": "docs/overview.md"
        }
    },
  "targets": [
    {
      "id": "Microsoft.VisualStudio.Services"
    }
  ],
  "icons": {
    "default": "img/logo.png"
  },
  "demands": ["contribution/ms.vss-dashboards-web.widget-sdk-version-2"],
  "contributions": [
    {
      "id": "HarvestHoursWidget",
      "type": "ms.vss-dashboards-web.widget",
      "targets": [
        "ms.vss-dashboards-web.widget-catalog",
        ".HarvestHoursWidget.Configuration"
      ],
      "properties": {
        "name": "Harvest Hours Widget",
        "isNameConfigurable": true,
        "description": "A widget to display billable and non-billable hours from Harvest",
        "catalogIconUrl": "img/preview.png",
        "uri": "widget.html",
        "supportedSizes": [
          { "rowSpan": 2, "columnSpan": 2 },
          { "rowSpan": 2, "columnSpan": 3 },
          { "rowSpan": 3, "columnSpan": 2 },
          { "rowSpan": 3, "columnSpan": 3 }
        ],
        "supportedScopes": ["project_team"]
      }
    },
    {
      "id": "HarvestHoursWidget.Configuration",
      "type": "ms.vss-dashboards-web.widget-configuration",
      "targets": ["ms.vss-dashboards-web.widget-configuration"],
      "properties": {
        "name": "Harvest Hours Widget Configuration",
        "description": "Configures the Harvest Hours widget",
        "uri": "widget-configuration.html"
      }
    }
  ],
  "files": [
    {
      "path": "widget.html",
      "addressable": true
    },
    {
      "path": "widget-configuration.html",
      "addressable": true
    },
    {
      "path": "sdk/scripts/VSS.SDK.min.js",
      "addressable": true
    },
    {
      "path": "img",
      "addressable": true
    },
    {
      "path": "scripts",
      "addressable": true
    }
  ],
  "scopes": [
    "vso.build",
    "vso.code",
    "vso.identity",
    "vso.test"
  ]
}
```

## Building and Packaging the Widget
### 1. Build the Project
Before packaging your widget for distribution, make sure it’s ready for production:

```bash
npm run build
```
### 2. Create the Extension Package
To package the widget into a .vsix file, which can be uploaded to the Azure DevOps Marketplace, use the following command:

```bash
tfx extension create --manifest-globs vss-extension.json
```
This command will generate a .vsix file in your project directory, ready for distribution.

## Deploying to Azure DevOps

### 1. Create a Publisher
To publish your extension, you first need to create a publisher on the Azure DevOps Marketplace:

1. Navigate to the [Azure DevOps Publisher Management page](https://marketplace.visualstudio.com/manage/publishers).
2. Click on New Publisher.
3. Fill in the details like Publisher Name and Display Name.
4. Complete the creation process by following the on-screen instructions.

### 2. Upload the Extension to the Marketplace
Once your publisher is set up, you can upload your .vsix package:

1. Go to the Azure DevOps Marketplace Publishing page.
2. Select your publisher.
3. Click New Extension and select the Azure DevOps extension type.
4. Upload the .vsix file created earlier.
5. Fill out the extension details, such as name, version, and description.
6. Click Publish to make the extension available.

### 3. Add the Widget to a Dashboard
After publishing the widget, you can add it to any Azure DevOps dashboard:

1. Open your Azure DevOps project.
2. Navigate to your dashboard.
3. Click on "Add Widget" and search for "Harvest Billing Widget".
4. Drag and drop the widget onto your dashboard.
5. Configure the widget by providing the necessary settings (see Configuration).

## Making the Widget Public
To make your widget available to everyone on the Azure DevOps Marketplace:

1. Go to your extension's page in the Azure DevOps Marketplace.
2. Click on Publish.
3. Once approved, your widget will be automatically made public and available to all Azure DevOps users via the Marketplace.

**Important:** If you intend to keep the extension private, do **not** add the snippet code:

```bash
"galleryFlags": [
    "Preview",
    "Public"
  ]
```
Instead, you can share the extension with your organization directly within the Marketplace by selecting the **Share/Unshare** option and choosing your organization.
