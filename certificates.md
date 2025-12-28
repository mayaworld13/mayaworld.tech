# 🌐 mayaworld.tech

Welcome to **mayaworld.tech** — a live website hosted on a cloud server with HTTPS enabled using a free SSL certificate from **Let's Encrypt**.

---

## 🚀 Project Overview

This project demonstrates how to host a website on a cloud VM instance (like AWS, GCP, or Azure) and make it accessible through a custom domain using **Nginx** and **Let's Encrypt SSL**.

---

## 🧱 Prerequisites

Before starting, make sure you have:

- A registered domain name (e.g., `gfbanao.shop`)
- A running cloud VM (AWS EC2 / GCP Compute Engine / Azure VM)
- `sudo` access to the server
- DNS records pointing your domain to your server's public IP

Example DNS Records:

| Type | Name | Value | TTL |
|------|------|--------|-----|
| A | @ | `<your-server-public-ip>` | Auto |
| A | www | `<your-server-public-ip>` | Auto |

---

## ⚙️ Installation & Setup

### 1️⃣ Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```
### 2️⃣ Deploy Your Website Files

Replace the default Nginx web root with your project files:

```bash
sudo rm -rf /var/www/html/*
sudo cp -r <path-to-your-project-files>/* /var/www/html/
```
### 3️⃣ Enable HTTPS (Free SSL with Let's Encrypt)

Install Certbot:

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```
Get and install SSL certificate:
```bash
sudo certbot --nginx -d mayaworld.tech -d www.mayaworld.tech
```

Once complete, visit:
🌐 mayaworld.tech

### 4️⃣ Automatic SSL Renewal

Let's Encrypt certificates renew automatically, but you can test manually:
```bash
sudo certbot renew --dry-run
```

### ✅ Final Result

Your website is live and secure at:
🌐 https://mayaworld.tech


