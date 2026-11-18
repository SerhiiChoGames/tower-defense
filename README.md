# Tower Defense Game

![Tower Defense Game](./public/assets/logo.png)

Open source game written with Phaser JS where you need to build towers to kill the monsters they will try to destroy your castle.

> [!WARNING]
> The game is not finished yet, but you can play it [here](https://serhiichogames.github.io/tower-defense/)

## Installation

The project is written with Phaser JS and Vite. To run the project locally, follow the steps below:

1. Clone the repository
1. Navigate to the project directory
1. Run `npm install` to install the dependencies
1. Run `npm run dev` to start the development server

## License

The project is licensed under the [MIT License](https://github.com/serhiichogames/tower-defense/blob/master/LICENSE)

## Contribute

### NPM Commands

If you a container engine, do these commands inside of a container.

#### Install Dependencies

```bash
npm i
```

#### Watch File Changes

```bash
npm run dev
```

Navigate to `http://localhost:5173/tower-defense/` to see your documentation if you run project locally. For containers, visit `http://localhost:3000/tower-defense/`.

### With Container Engine

#### Build an Image

To build an image, navigate to the root of the project and run this command:

```bash
podman-compose build
```

#### Run the Container

To run a container, navigate to the root of the project and run this command:

```bash
podman-compose up -d
```

You can visit `http://localhost:3000/tower-defense/` to see the game running in container.

#### Copy `node_modules` Locally

To copy `node_modules` directory from the container to your local machine, run this command:

```bash
podman cp tower-defense-game:/app/node_modules .
```

> [!NOTE]
> `node_modules` is excluded from using volume in [compose.yml](compose.yml) file, that's why you need to copy it manually. It's done to prevent your local modules to be copied to Linux container, since it can create incompatibility issues between operating systems if you don't use Linux.

#### Remove the Container

Run this to stop and remove the container:

```bash
podman-compose down
```
