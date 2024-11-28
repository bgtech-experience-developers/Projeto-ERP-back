<?php
$secretKey = '$2b$10$5SSRVdotger0qAIrDxy1jOblB8wDCSRHQuXqr6NRE1FCn7FYnuFJW'; // BGTech-ERP-assets

// Obter o cabeçalho Authorization
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(403);
    echo json_encode(['message' => 'Acesso não autorizado']);
    exit;
}

$authHeader = $headers['Authorization'];
list($type, $token) = explode(' ', $authHeader);

if ($type !== 'Bearer') {
    http_response_code(403);
    echo json_encode(['message' => 'Tipo de token inválido']);
    exit;
}

// Verificar o token
try {
    $payload = json_decode(base64_decode(explode('.', $token)[1]), true);
    if ($payload['app'] !== 'node-api') {
        throw new Exception('Token inválido');
    }
} catch (Exception $e) {
    http_response_code(403);
    echo json_encode(['message' => 'Token inválido']);
    exit;
}

// ===== Recebe a imagem e salva no diretório de acordo com o tipo =====
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os parâmetros da API em Node.js
    $typeFolder = $_POST['typeFolder'] ?? null; // Tipo de diretório: img_product | img_profile

    // Definir o diretório com base no tipo
    $uploadDir = __DIR__ . '/' . $typeFolder . '/';

    // Log de dados recebidos
    file_put_contents('upload_debug.log', "POST:\n" . print_r($_POST, true) . "\n", FILE_APPEND);
    file_put_contents('upload_debug.log', "FILES:\n" . print_r($_FILES, true) . "\n", FILE_APPEND);

    // Se o diretório não existir, cria com as permissões de leitura e escrita
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Processa os arquivos
    if (!empty($_FILES)) {
        $response = [];

        foreach ($_FILES as $key => $file) {
            $fileName = str_replace('.', '', microtime(true)) . '.png';

            if (move_uploaded_file($file['tmp_name'], $uploadDir . $fileName)) {
                $response[] = [
                    'url' => 'https://bgtech.com.br/erp/assets/' . $typeFolder . '/' . $fileName,
                ];
            } else {
                $response[] = [
                    'message' => 'Erro no upload.',
                    'file' => $fileName,
                ];
            }
        }

        echo json_encode($response);
    } else {
        echo json_encode(['message' => 'Nenhum arquivo enviado']);
    }
    exit;
}

// Caso outro método seja utilizado ou acesso não autorizado
http_response_code(403);
echo json_encode(['message' => 'Acesso não autorizado']);
