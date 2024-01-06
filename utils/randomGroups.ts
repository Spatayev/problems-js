import students from "../students.json";
import randomizeArray from "./randomizeArray";

function group(numOfGroups: number, students: { name: string }[]) {
  const randomStudents = randomizeArray(students);
  const groups = new Array(numOfGroups).fill(null).map(() => []);

  const sorted = sortToGroups(groups, randomStudents);

  return sorted;
}

function sortToGroups(groups: string[][], students: { name: string }[]) {
  const sorted: string[][] = [...groups];

  for (let i = 0; i < students.length; i++) {
    const ind = i % groups.length;
    sorted[ind].push(students[i].name);
  }

  return sorted;
}

console.log(
  group(6, students)
    .map((students, i) => `Team ${i + 1}: ${students.join(", ")}`)
    .join("\n")
);
