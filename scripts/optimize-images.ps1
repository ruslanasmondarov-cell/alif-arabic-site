$assets = Join-Path $PSScriptRoot '..\src\assets'
$names = @(
  'hero-auth',
  'hero-courses',
  'hero-city',
  'hero-faq',
  'hero-payment',
  'hero-pricing',
  'hero-profile',
  'hero-program',
  'study-city'
)

Add-Type -AssemblyName System.Drawing

foreach ($name in $names) {
  $source = Join-Path $assets "$name.png"
  $target = Join-Path $assets "$name.optimized.png"
  $image = [System.Drawing.Image]::FromFile((Resolve-Path $source))

  $scale = [Math]::Min(1, 1280 / $image.Width)
  $width = [int][Math]::Round($image.Width * $scale)
  $height = [int][Math]::Round($image.Height * $scale)

  $bitmap = New-Object System.Drawing.Bitmap($width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear([System.Drawing.Color]::FromArgb(255, 250, 241))
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.DrawImage($image, 0, 0, $width, $height)
  $bitmap.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
  $image.Dispose()

  Move-Item -LiteralPath $target -Destination $source -Force
}
