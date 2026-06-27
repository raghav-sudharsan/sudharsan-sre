# Zero-Dependency PowerShell HTTP Web Server for SRE Portfolio
# Hosts the portfolio application locally on http://localhost:8000/

$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "=================================================="
Write-Host " SRE PORTFOLIO POWERSHELL WEB SERVER"
Write-Host " Running at: http://localhost:$port/"
Write-Host " Press Ctrl+C to terminate the host process"
Write-Host "=================================================="

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8";
    ".css"  = "text/css; charset=utf-8";
    ".js"   = "text/javascript; charset=utf-8";
    ".jpeg" = "image/jpeg";
    ".jpg"  = "image/jpeg";
    ".png"  = "image/png";
    ".svg"  = "image/svg+xml";
    ".json" = "application/json";
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Decode and clean path
        $urlPath = [System.Web.HttpUtility]::UrlDecode($request.Url.LocalPath)
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        # Build local file path securely
        $relativePath = $urlPath.TrimStart('/')
        $localFilePath = Join-Path (Get-Location) $relativePath
        
        if (Test-Path $localFilePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
            $contentType = $mimeTypes[$ext]
            if ($null -eq $contentType) { $contentType = "application/octet-stream" }
            
            $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 200 OK - $urlPath"
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/plain"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            
            Write-Warning "[$(Get-Date -Format 'HH:mm:ss')] 404 Not Found - $urlPath"
        }
        $response.Close()
    }
}
catch {
    Write-Error $_.Exception.Message
}
finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "Server stopped."
}
