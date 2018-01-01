use std::io::{self, Read};

fn get_input() -> String {
    let mut stdin = String::new();
    io::stdin().read_to_string(&mut stdin).expect("fail");

    let mut stdin_chars = stdin.chars();
    let mut trimmed_stdin = String::from(stdin.trim());
    trimmed_stdin.push(stdin_chars.next().unwrap());
    trimmed_stdin
}

fn solve_captcha(digits: &str) -> u32 {
    let mut acc = 0;
    let mut current = '0';
    for c in digits.chars() {
        if current == c {
            acc += current.to_digit(10).unwrap();
        } else {
            current = c;
        }
    }

    acc
}

fn main() {
    let input = get_input();
    println!("Input: {}", input);
    let solution = solve_captcha(&input);
    println!("Solution: {}", solution);
}
