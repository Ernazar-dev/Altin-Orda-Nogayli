$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$workspace = Split-Path -Parent $PSScriptRoot
$docPath = (Get-ChildItem -LiteralPath (Join-Path $workspace 'disertaciya') -Filter '*.docx' | Select-Object -First 1).FullName
if (-not $docPath) { throw 'Dissertation .docx file not found' }
$archive = [IO.Compression.ZipFile]::OpenRead($docPath)
try {
    $reader = [IO.StreamReader]::new($archive.GetEntry('word/document.xml').Open())
    try { [xml]$document = $reader.ReadToEnd() } finally { $reader.Dispose() }
    $manager = [Xml.XmlNamespaceManager]::new($document.NameTable)
    $manager.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
    $paragraphs = $document.SelectNodes('//w:p', $manager) | ForEach-Object {
        ($_.SelectNodes('.//w:t', $manager) | ForEach-Object { $_.'#text' }) -join ''
    }
    $paragraphs | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'dissertation-extracted.txt') -Encoding UTF8
    Write-Output 'Extracted dissertation text to docs/dissertation-extracted.txt'
} finally { $archive.Dispose() }
