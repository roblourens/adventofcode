use std::io::{self, Read, Write};

type Result<T> = ::std::result::Result<T, Box<dyn(::std::error::Error)>>;

fn main() -> Result<()> {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input)?;

    sum_masses(&input)?;
    Ok(())
}

fn sum_masses(input: &str) -> Result<()> {
    let mut freq = 0;
    for line in input.lines() {
        let mass: i32 = line.parse()?;
        freq += fuel_for_mass(mass);
    }
    writeln!(io::stdout(), "{}", freq)?;
    Ok(())
}

fn fuel_for_mass(mass: i32) -> i32 {
    let fuel_amount = ::std::cmp::max(mass / 3 - 2, 0);
    return if fuel_amount > 0 { fuel_amount + fuel_for_mass(fuel_amount) }
        else { return fuel_amount }
}
