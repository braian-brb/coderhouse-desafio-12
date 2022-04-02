// ****************************** DESAFIO ENTREGABLE ANTERIOR
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const Container = require("./container.js");

const container = new Container();
// ****************************** DESAFIO ENTREGABLE 12

// ****************************** LISTA DE PRODUCTOS ****************************
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(8080, function () {
    console.log("Servidor corriendo en http://localhost:8080");
});

io.on("connection", function (socket) {
    console.log("Un cliente se ha conectado");
    socket.emit("container", container.getAll());

    socket.on("new-product", (product) => {
        container.save(product);
        io.sockets.emit("container", container.getAll());
    });
});

// ****************************** CENTRO DE MENSAJES ****************************

const fs = require("fs");

io.on("connection", function (socket) {
    console.log("Un cliente se ha conectado");

    if (!fs.existsSync("messages.txt")) fs.writeFileSync("messages.txt", "[ ]");

    const fileMessages = JSON.parse(fs.readFileSync("messages.txt", "utf-8"));
    socket.emit("tender", fileMessages);

    socket.on("new-message", (messages) => {
        saveMessage(messages);
    });
});

async function saveMessage(messages) {
    try {
        if (!fs.existsSync("messages.txt")) await fs.promises.writeFile("messages.txt", " ");

        const fileMessages = JSON.parse(await fs.promises.readFile("messages.txt", "utf-8"));
        fileMessages.push(messages);
        console.log(fileMessages);
        const fileMessagesSerialized = JSON.stringify(fileMessages, null, 2);
        await fs.promises.writeFile("messages.txt", fileMessagesSerialized);
        io.sockets.emit("tender", fileMessages);
    } catch (error) {
        console.log(error);
    }
}
