# Daily Social Network Graph of Entities in Vietnamese Online News

This repository contains the source code for a web frontend that displays daily social network graphs of entities in Vietnamese online news. The frontend is built using React and TypeScript.

This app is currently deployed at https://phamson02.github.io/vnnews-graph.

## Overview

The web application scrapes Vietnamese news websites daily and analyzes the articles to extract entities (such as people, organizations, and locations) mentioned in the news. It then constructs a social network graph based on the co-occurrence of these entities in the same article. The frontend displays this graph, allowing users to explore the relationships between entities and the news articles they appear in.

## Installation

To install and run the frontend, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the repository directory and run `npm install` to install the dependencies.
3. Create an environment variable named `REACT_APP_API_URL` with the value `https://lionfish-app-pnbyg.ondigitalocean.app/api`.
4. Run `npm start` to start the development server.
5. Open `http://localhost:3000` in your web browser to view the application.

## Usage

The application consists of a single page that displays the social network graph for the current day's news.

## Contributing

Contributions to this project are welcome. If you find a bug or would like to suggest a new feature, please open an issue on this repository. If you would like to contribute code, please fork the repository and submit a pull request with your changes.
