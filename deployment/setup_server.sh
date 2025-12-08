#!/bin/bash

# Server Setup Script for Agrivision
# Run this on your fresh Ubuntu server

set -e

echo "Starting server setup..."

# 1. SSH Hardening
echo "Configuring SSH..."
# Backup config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

# Disable root login (ensure you have a sudo user created first!)
# sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
# Disable password authentication (force key-based)
# sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Restart SSH
systemctl restart sshd

# 2. Firewall Setup (UFW)
echo "Configuring Firewall (UFW)..."
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (Port 22) - Change this if you use a custom port
ufw allow 22/tcp

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable Firewall
echo "y" | ufw enable

echo "Firewall status:"
ufw status

# 3. Docker Setup (if not installed)
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    apt-get update
    apt-get install -y ca-certificates curl gnupg
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg

    echo \
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

echo "Server setup complete!"
