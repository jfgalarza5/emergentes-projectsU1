#!/bin/bash

# ===== CONFIG =====
CERT_DIR="./certs"
CONTAINER_NAME="project-emergente"

# ===== OBTENER IP PUBLICA =====
PUBLIC_IP=$(curl -s ifconfig.me)

if [ -z "$PUBLIC_IP" ]; then
    echo "❌ No se pudo obtener la IP pública"
    exit 1
fi

echo "🌐 IP pública detectada: $PUBLIC_IP"

# ===== CREAR DIRECTORIO =====
mkdir -p "$CERT_DIR"

# ===== ELIMINAR CERTIFICADOS ANTERIORES =====
rm -f "$CERT_DIR/ip.crt"
rm -f "$CERT_DIR/ip.key"

# ===== GENERAR NUEVOS CERTIFICADOS =====
openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout "$CERT_DIR/ip.key" \
  -out "$CERT_DIR/ip.crt" \
  -subj "/CN=$PUBLIC_IP"

if [ $? -ne 0 ]; then
    echo "❌ Error generando certificados"
    exit 1
fi

echo "✅ Certificados generados"

# ===== REINICIAR NGINX =====
docker restart "$CONTAINER_NAME"

echo "🚀 Contenedor reiniciado"
echo "🔒 HTTPS disponible en:"
echo "https://$PUBLIC_IP"