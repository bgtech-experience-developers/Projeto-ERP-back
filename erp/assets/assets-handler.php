<?php
$secretKey = '$2b$10$5SSRVdotger0qAIrDxy1jOblB8wDCSRHQuXqr6NRE1FCn7FYnuFJW'; // BGTech-ERP-assets
/*
// ===== Validação do Cabeçalho Authorization =====
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
*/

// Upload de Imagens
function handleUpload($typeFolder)
{
    $uploadDir = __DIR__ . '/' . $typeFolder . '/';

    // Se o diretório não existir, cria com as permissões de leitura e escrita
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $response = [];

    if (!empty($_FILES)) {
        foreach ($_FILES as $key => $file) {
            $fileName = str_replace('.', '', microtime(true)) . '.png';
            $finalPath = $uploadDir . $fileName;

            if (move_uploaded_file($file['tmp_name'], $finalPath)) {
                $response[] = [
                    'status' => '201',
                    'url' => 'https://bgtech.com.br/erp/assets/' . $typeFolder . '/' . $fileName,
                ];

                // Log de upload bem-sucedido
                $logMessage = sprintf(
                    "[%s] (SUCCESS) Upload: assets/%s/%s\n",
                    date('Y-m-d H:i:s'),
                    $typeFolder,
                    $fileName
                );
                file_put_contents('uploads.log', $logMessage, FILE_APPEND);

            } else {
                $response[] = [
                    'status' => '400',
                    'message' => 'Erro no upload.',
                    'file' => $fileName,
                ];

                $logMessage = sprintf(
                    "[%s] (ERROR) Upload: assets/%s/%s\n",
                    date('Y-m-d H:i:s'),
                    $typeFolder,
                    $fileName
                );
                file_put_contents('uploads.log', $logMessage, FILE_APPEND);
            }
        }
    } else {
        $response[] = [
            'status' => '400',
            'message' => 'Nenhum arquivo enviado.',
        ];
    }

    return $response;
}

// Função para deletar arquivos
function handleDelete($filePath)
{
    $file = __DIR__ . '/' . $filePath;

    if (file_exists($file)) {
        // Exclui o arquivo
        if (unlink($file)) {
            $logMessage = sprintf(
                "[%s] (SUCCESS) Delete: assets/%s\n",
                date('Y-m-d H:i:s'),
                $filePath
            );
            file_put_contents('uploads.log', $logMessage, FILE_APPEND);

            return [
                'status' => '200',
                'message' => 'Arquivo excluído com sucesso.',
            ];

        } else {
            $logMessage = sprintf(
                "[%s] (ERROR) Delete: assets/%s\n",
                date('Y-m-d H:i:s'),
                $filePath
            );
            file_put_contents('delete_error.log', $logMessage, FILE_APPEND);

            return [
                'status' => '400',
                'message' => 'Erro ao deletar o arquivo.',
            ];
        }
    } else {
        $logMessage = sprintf(
            "[%s] (ERROR) File Not Found: assets/%s\n",
            date('Y-m-d H:i:s'),
            $filePath
        );
        file_put_contents('delete_error.log', $logMessage, FILE_APPEND);

        return [
            'status' => '404',
            'message' => 'Arquivo não encontrado.',
        ];
    }
}

// Recebe a Requisição vinda da API do Node.js
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? null; // upload | delete

    if (!$action) {
        $response[] = [
            'status' => '400',
            'message' => 'Parâmetro "action" é obrigatório.',
        ];
        echo json_encode(['message' => $response]);
        exit;
    }

    if ($action === 'upload') {
        $typeFolder = $_POST['typeFolder'] ?? null; // img_product | img_profile

        if (!$typeFolder) {
            $response[] = [
                'status' => '400',
                'message' => 'Parâmetro "typeFolder" é obrigatório.',
            ];
            echo json_encode(['message' => $response]);
            exit;
        }

        $response = handleUpload($typeFolder);

    } else if ($action === 'delete') {
        $filePath = $_POST['path'] ?? null; // img_product/12345.png

        if (!$filePath) {
            $response[] = [
                'status' => '400',
                'message' => 'Parâmetro "path" é obrigatório.',
            ];
            echo json_encode(['message' => $response]);
            exit;
        }

        $response = handleDelete($filePath);

    } else {
        $response[] = [
            'status' => '400',
            'message' => 'Ação inválida.',
        ];
    }

    echo json_encode($response);
    exit;
}

// Caso outro método seja utilizado ou acesso não autorizado
http_response_code(403);
$response[] = [
    'status' => '403',
    'message' => 'Acesso não autorizado.',
];
echo json_encode(['message' => $response]);
