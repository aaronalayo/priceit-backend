# PriceIt

PriceIt is a school project. 
The purpose of this project is upcycling. Specifically, to help reduce the vast amount of waste generated as the result of the ever growing online consumer market. 

PriceIt is a PoC that aims to give the user an opportunity to search various online markets (e.g. Ebay, FB Marketplace, Amazon, Google Shop, etc.) for both used and new items.

## System Overview Diagrams
 
<details><summary> System Overview</summary>

![Diagram](./docs/System_and_users.png)
</details>


<details><summary>System Architecture Overview</summary>

![Diagram](./docs/priceit_layered_architecture.png)

</details>

### Built With

This project is built with the following tools

* [![NodeJs][NodeJs-logo]][NodeJs-url]
* [![Express][Express-logo]][Express-url]
* [![Typescript][Typescript-logo]][Typescript-url]
* [![MongoDB][MongoDB-logo]][MongoDB-url]
* [![RedisDB][Redis-logo]][Redis-url]


## Getting Started

This Guide will get you a copy of the project up and running on your local machine for development and testing purposes.
Remember to have the following projects configured as well:
* [![PriceIt-frontend][PriceIt-frontend-logo]][PriceIt-frontend-url]
* [![PriceIt-search][PriceIt-search-logo]][PriceIt-search-url]

### Prerequisites

What things you need to install the software and how to install them in a list form.

* Docker
* Frontend + AUTH API configured
* API keys to:
    * SerpApi
    * eBay Api
    * Facebook Marketplace API

### Installation
<details><summary> Installation Guide</summary>

1. Clone the repo
    ``` sh
    $ git clone https://github.com/aaronalayo/priceit-backend.git
    ```
2. CD into project & create an '.env' file as following:
    ``` 
    NODE_ENV=
    LOCAL_SERVER_PORT=
    DOCKER_SERVER_PORT=

    APP_ID=
    CLIENT_SECRET=
    DEV_ID=

    BASE_URL=
    GSECRET=

    REDIS_PASSWORD=
    REDIS_HOST=
    REDIS_PORT=
    REDIS_URL=

    DOCKER_MONGO_HOST=
    DOCKER_MONGO_PORT=
    DOCKER_MONGO_USERNAME=
    DOCKER_MONGO_PASSWORD=
    MONGO_DATABASE_NAME=

4. Spin up a docker container 

    ```
    $ docker-compose up -d
    ```
</details>

<p align="right">[<a href="#readme-top">back to top</a>]</p>

## Running the tests

Guide on running tests here

## Usage
<details><summary> Usage Examples</summary>
[Coming soon]
</details>

<p align="right">[<a href="#readme-top">back to top</a>]</p>


## Project Services / Repositories

Project Links:
- [![PriceIt-frontend][PriceIt-frontend-logo]][PriceIt-frontend-url]
- [![PriceIt-search][PriceIt-search-logo]][PriceIt-search-url]
- [![PriceIt-auth][PriceIt-auth-logo]][PriceIt-auth-url]

<p align="right">[<a href="#readme-top">back to top</a>]</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">[<a href="#readme-top">back to top</a>]</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt

[NodeJS-logo]: https://img.shields.io/badge/NodeJS-Runtime%20Environment-brightgreen
[NodeJS-url]: https://nodejs.org/en/

[Express-logo]: https://img.shields.io/badge/JS%20FrameworkExpress-Web%20Framework-blue
[Express-url]: http://expressjs.com/

[Typescript-logo]: https://img.shields.io/badge/Typescript-JS%20with%20Types-blue
[Typescript-url]: https://www.typescriptlang.org/

[MongoDB-logo]: https://img.shields.io/badge/MongoDB-NoSQL%20DB-Green
[MongoDB-url]: https://www.mongodb.com/

[Redis-logo]: https://img.shields.io/badge/Redis-Database-orange
[Redis-url]: https://redis.io/

[PriceIt-auth-logo]: https://img.shields.io/badge/PriceIt-Auth%20API-green
[PriceIt-auth-url]: https://github.com/aaronalayo/priceit_auth

[PriceIt-search-logo]: https://img.shields.io/badge/PriceIt-Search%20API-orange
[PriceIt-search-url]: https://github.com/aaronalayo/priceit-backend

[PriceIt-frontend-logo]: https://img.shields.io/badge/PriceIt-Frontend-blue
[PriceIt-frontend-url]: https://github.com/aaronalayo/priceit_frontend