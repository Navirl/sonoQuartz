---
date: 2024-10-30
tags:
  - Info
---

up:: [Rust](<../Bar/Program/Rust.md>)
up:: [py](<../Bar/Program/Python.md>)

py
```python
import requests
from urllib.parse import urlparse, parse_qs
import os
import sys
import argparse

def get_license_info(url):
    """
    APIエンドポイントから画像のライセンス情報を取得する
    """
    api_url = f"http://localhost:3000/license?url={url}"
    
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching license info: {e}")
        return None

def format_license_text(url):
    """
    ライセンス情報を指定された形式でフォーマットする
    """
    # ライセンス情報を取得
    license_info = get_license_info(url)
    if not license_info:
        return None
    
    # URLから画像名を抽出
    parsed_url = urlparse(url)
    image_path = parsed_url.path
    image_name = os.path.basename(image_path).replace('File:', '').replace('.jpg', '')
    
    # 必要な情報を取得
    author = license_info['author']['label']
    license_label = license_info['license']['label']
    
    # 指定された形式で出力
    return f"{image_name} by {author}, {license_label}"

def main():
    # コマンドライン引数の設定
    parser = argparse.ArgumentParser(description='Get license information for Wikimedia Commons images')
    parser.add_argument('url', help='URL of the Wikimedia Commons image')
    
    # 引数をパース
    args = parser.parse_args()
    
    # ライセンス情報を取得して表示
    formatted_text = format_license_text(args.url)
    if formatted_text:
        print(formatted_text)
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
```

```rust
use serde::{Deserialize, Serialize};
use std::error::Error;
use structopt::StructOpt;
use url::Url;

#[derive(Debug, Serialize, Deserialize)]
struct Source {
    href: Option<String>,
    label: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Author {
    label: String,
    href: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct License {
    href: String,
    label: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct LicenseInfo {
    source: Source,
    author: Author,
    date: String,
    license: License,
}

#[derive(StructOpt, Debug)]
#[structopt(name = "license-formatter", about = "Get license information for Wikimedia Commons images")]
struct Opt {
    /// URL of the Wikimedia Commons image
    #[structopt(parse(try_from_str))]
    url: Url,
}

async fn get_license_info(url: &Url) -> Result<LicenseInfo, Box<dyn Error>> {
    let api_url = format!("http://localhost:3000/license?url={}", url.as_str());
    let response = reqwest::get(&api_url).await?;
    let license_info = response.json::<LicenseInfo>().await?;
    Ok(license_info)
}

fn extract_image_name(url: &Url) -> String {
    url.path_segments()
        .and_then(|segments| segments.last())
        .unwrap_or("unknown")
        .replace("File:", "")
        .replace(".jpg", "")
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    // コマンドライン引数をパース
    let opt = Opt::from_args();

    // ライセンス情報を取得
    let license_info = get_license_info(&opt.url).await?;

    // 画像名を抽出
    let image_name = extract_image_name(&opt.url);

    // フォーマットされた文字列を出力
    println!(
        "{} by {}, {}",
        image_name, license_info.author.label, license_info.license.label
    );

    Ok(())
}
```

pythonに比べ、細かくstructを作っている。

```toml
[package]
name = "license-formatter"
version = "0.1.0"
edition = "2021"

[dependencies]
reqwest = { version = "0.11", features = ["json"] }
tokio = { version = "1.0", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
structopt = "0.3"
url = "2.4"
```