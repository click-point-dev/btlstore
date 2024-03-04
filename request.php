<?php

$domain = 'click-point.ru';
$username = 'roman';
$password = 'JaKtmOM!ui#T';
$curl = curl_init("https://api-ext.d.r-o.ru/327/request");

function sanitizeString($text)
{
    return filter_var($text, FILTER_SANITIZE_STRING);
}

function getIPAddress()
{
    $ip = '';
    if ($_SERVER['HTTP_CLIENT_IP'] ?? null) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } else if ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? null) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    }
    return $ip;
}

if (trim($_POST['fn'] ?? '') !== '') {
    sleep(0.15);
    return;
}

$page =    sanitizeString($_POST["page"] ?? '');
$pageUrl = sanitizeString($_POST["page_url"] ?? ($_SERVER['HTTP_REFERER'] ?? '')) ?: $_SERVER['REQUEST_URI'];
$region =  sanitizeString($_POST["region"] ?? '');
$ad_type = sanitizeString($_POST["ad_type"] ?? '');

$data = [
    'type' => 'request',
    'ip' => getIPAddress(),
    'title' => $page ?: 'Заявка с сайта ' . $domain,
    'url' => $pageUrl,
    'name' =>    sanitizeString($_POST["name"]),
    'email' =>   sanitizeString($_POST["email"] ?? ''),
    'phone' =>   sanitizeString($_POST["phone"] ?? ''),
    'comment' => sanitizeString($_POST["comment"] ?? ''),
];

$data = array_filter($data, function ($v) {
    return !empty(trim($v));
}) ?: [];

if(isset($_FILES['file'])){
foreach($_FILES['file']['tmp_name'] as $i => $tmpPath) {
    $fname = $_FILES['file']['name'][$i];
    $fsize = $_FILES['file']['size'][$i];
    if($fsize > 15 * 1024 * 1024) {
        continue;
    }
    $data["file[{$i}]"] = new CurlFile(
        realpath($tmpPath),
        mime_content_type($tmpPath),
        $fname
    );
}
}

curl_setopt($curl, CURLOPT_USERPWD, $username . ":" . $password);
curl_setopt($curl, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_SAFE_UPLOAD, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

http_response_code($code);
header('Content-type: application/json');
echo $response;
