import chalk from "chalk";
import prompts from "prompts";
import fs from "fs";

const FILE_PATH = "tasks.json";

function loadTasks() {
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  } catch (error) {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow("No hay tareas pendientes."));
    return;
  }
  console.log(chalk.blue("\nTareas pendientes:"));
  tasks.forEach((task, index) => {
    const status = task.completed ? chalk.green("[✓]") : chalk.red("[ ]");
    console.log(`${index + 1}. ${status} ${task.text}`);
  });
}

async function addTask() {
  const response = await prompts({
    type: "text",
    name: "task",
    message: "Ingrese la nueva tarea:",
  });

  if (!response.task) return;

  const tasks = loadTasks();
  tasks.push({ text: response.task, completed: false });
  saveTasks(tasks);
  console.log(chalk.green("Tarea agregada con éxito!"));
}

async function completeTask() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow("No hay tareas para completar."));
    return;
  }

  const response = await prompts({
    type: "number",
    name: "index",
    message: "Ingrese el número de la tarea a completar:",
    validate: (value) =>
      value > 0 && value <= tasks.length ? true : "Número inválido",
  });

  if (!response.index) return;

  tasks[response.index - 1].completed = true;
  saveTasks(tasks);
  console.log(chalk.green("Tarea marcada como completada!"));
}

async function deleteTask() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow("No hay tareas para eliminar."));
    return;
  }

  const response = await prompts({
    type: "number",
    name: "index",
    message: "Ingrese el número de la tarea a eliminar:",
    validate: (value) =>
      value > 0 && value <= tasks.length ? true : "Número inválido",
  });

  if (!response.index) return;

  tasks.splice(response.index - 1, 1);
  saveTasks(tasks);
  console.log(chalk.red("Tarea eliminada!"));
}

async function main() {
  while (true) {
    const response = await prompts({
      type: "select",
      name: "action",
      message: "Seleccione una opción:",
      choices: [
        { title: "Listar tareas", value: "list" },
        { title: "Agregar tarea", value: "add" },
        { title: "Completar tarea", value: "complete" },
        { title: "Eliminar tarea", value: "delete" },
        { title: "Salir", value: "exit" },
      ],
    });

    if (response.action === "list") listTasks();
    else if (response.action === "add") await addTask();
    else if (response.action === "complete") await completeTask();
    else if (response.action === "delete") await deleteTask();
    else break;
  }
}

main();
