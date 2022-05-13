use lazy_regex::regex;
use std::{
    fs::{self, DirEntry, File},
    io::{self, prelude::*},
    path::Path,
};

pub fn go_crazy() -> Result<(), String> {
    Err(String::from("AHHHH!"))
}

pub fn spit_out_file_name(file: &DirEntry) -> String {
    let re = regex!("^./[^/]*/");
    re.replace(&file.path().to_str().unwrap(), "").to_string()
}

pub fn read_file(path: &str, contents: &mut String) -> std::io::Result<()> {
    let mut file = File::open(path)?;
    file.read_to_string(contents)?;
    Ok(())
}

pub fn visit_dirs(dir: &Path, agg: &mut Vec<String>) -> io::Result<()> {
    if dir.is_dir() {
        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_dir() {
                visit_dirs(&path, agg)?;
            } else {
                agg.push(spit_out_file_name(&entry));
            }
        }
    }
    Ok(())
}
