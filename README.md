# CXN Frontend

## Overview

CXN Frontend is a web application built with **React** and **TypeScript**. The project is designed to provide an interactive platform for users to access and engage with CXN's services.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Requirements
### Mandatory: 
   - **Node.js** (Recommended version: 18+)
   - **npm** or **yarn**
### Optional:
   - Docker

## Installation

Follow these steps to set up the project locally:


1. Clone the repository:
   ```sh
   git clone https://github.com/kunder93/cxn-front.git
   cd cxn-front

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
3. Create an .env file based on .env.Example and configure environment variables.
4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
5. Open the application in your browser at http://localhost:3000.



## Usage

### Running the Project  

To run the project in development mode, use:  

```sh
npm start
# or
yarn start
```
This will start the application in development mode. You can access it in your browser by opening http://localhost:3000.



### Avaliable scripts

In addition to the start command, there are other useful scripts defined in the  `package.json` file:

 **`npm run`** +

-   **`build`**: Builds the production-ready version of the app with  `react-app-rewired`, optimizing the code for deployment.

-   **`test`**: Runs the tests in the project using `react-app-rewired`, which customizes Jest's configuration without ejecting.

-   **`eject`**: Ejects the app from `create-react-app`, giving full control over the configuration files.

-   **`lint`**: Runs ESLint on the source files to check for coding errors, using caching to speed up repeated runs.

-   **`format`**: Uses Prettier to check the code formatting, ensuring consistency across the codebase.

-   **`analyze`**: Uses source-map-explorer to analyze and visualize the size of JavaScript files in the build for optimization.

### Docker

To run the application in a Docker container:

1. Construye la imagen:
  ```sh
  docker build -t cxn-web .
  ```

2. Run the container:
   ```sh
   docker run -p 80:80 cxn-web
   ```

## Contributing

If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch:
   `git checkout -b feature/new-feature`

3. Make your changes and commit:
   `git commit -am 'Add new feature'`

4. Sube tus cambios:
   `git push origin feature/new-feature`

5. Open a Pull Request.

## Project Structure

-   **.github/workflows/**: Contains configuration files for GitHub Actions for continuous integration and deployment (CI/CD). In this case, the `docker-build-and-push.yml` file configures the action to build and push a Docker image of the project.

-   **docs/**: Folder dedicated to the project's documentation. It may include additional markdown files, diagrams, or any relevant documents.

-   **nginx/**: Includes configuration files for NGINX, typically used for serving the application in production.

-   **node_modules/**: Automatically generated folder that contains all the npm dependencies installed for the project.

-   **public/**: Static files and public resources for the application. It includes the index.html file, which is the main template where the React app is loaded.

-   **src/**: Main source code folder for the application.

    -   **components/**: Contains reusable React components.
    -   **images/**: Folder to store images used within the application.
    -   **pages/**: Contains complete page components that represent different routes in the application.
    -   **resources/**: Stores additional files like data, texts, or configurations needed for the application.
    -   **store/**: Configuration and logic for the global state of the application, usually using Redux.
    -   **styles/**: CSS or SCSS files used to define the app's styles.
    -   **tests/**: Folder for unit or integration tests.
    -   **utility/**: Functions and utility files that can be used in different parts of the application.

-   **App.tsx**: The main file of the React application. This component is mounted to the DOM and represents the entry point of the app.

-   **index.tsx**: The starting point of the application that mounts the `App` component to the DOM.

-   **.dockerignore**: A file that specifies which files and folders should be ignored when building a Docker image to optimize the image size.

-   **.env.Example**: An example file defining the environment variables needed for the application, without exposing sensitive information.

-   **.eslintc.js**: ESLint configuration to ensure consistent code style and detect errors.

-   **config-overrides.js**: A configuration file used with `react-app-rewired` to modify Webpack settings without ejecting the project.

-   **Dockerfile**: A configuration file for building the Docker image of the application.

-   **package.json**: Defines the project’s dependencies, scripts, and metadata.

-   **package-lock.json**: A dependency lock file automatically generated to ensure the same versions are installed across all environments.

-   **README.md**: An introductory document and guide for the project, explaining how to install, run, and contribute to the project.

This structure is organized to facilitate scalability and maintenance, keeping the source code, configurations, and additional resources well-structured and separated.



## License

This project is licensed under the MIT License - see the LICENSE.md file for more details.
