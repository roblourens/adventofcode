import { promisify } from 'util';
import * as fs from 'fs';

async function main() {
	const input = (await promisify(fs.readFile)('input/input.txt')).toString();
	const program = input.split(',').map(v => parseInt(v));

	// part1([...program]);
	part2([...program]);
}

function part1(program: number[]) {
	program[1] = 12;
	program[2] = 2;
	execute(program);
	console.log(program[0]);
}

function part2(program: number[]): void {
	const [a, b] = findOutput(program, 19690720);
	console.log(a * 100 + b);
}

function findOutput(program: number[], output: number): [number, number] {
	for (let i = 0; i < 100; i++) {
		console.log(i);
		for (let j = 0; j < 100; j++) {
			const copy = [...program];
			copy[1] = i;
			copy[2] = j;

			execute(copy);
			console.log(`${i},${j}: ${copy[0]}`)
			if (copy[0] === output) {
				return [i, j];
			}
		}
	}

	throw new Error(`${output} not found`);
}

enum Opcode {
	Add = 1,
	Mult = 2,
	Stop = 99
}

function execute(program: number[], offset = 0): void {
	const [opcode, a, b, dest] = program.slice(offset);
	let result: number;
	if (opcode === Opcode.Add) {
		result = program[a] + program[b];
	} else if (opcode === Opcode.Mult) {
		result = program[a] * program[b];
	} else if (opcode === Opcode.Stop) {
		return;
	}

	program[dest] = result;

	if (offset + 4 < program.length) {
		return execute(program, offset + 4);
	}
}

main();