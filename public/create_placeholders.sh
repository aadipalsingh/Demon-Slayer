#!/bin/bash
# Create SVG placeholder images for the project

# Helper function to create a dark placeholder SVG
create_svg() {
  local filename="$1"
  local width="$2"
  local height="$3"
  local label="$4"
  local bg_color="${5:-#0B0B0F}"
  local accent="${6:-#B11226}"
  
  cat > "$filename" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${bg_color}" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${bg_color}"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#F2F2F2" font-family="sans-serif" font-size="24" opacity="0.5">${label}</text>
</svg>
EOF
}

# World background
create_svg "world-bg.jpg" 1920 1080 "World Background" "#0B0B0F" "#B11226"

# Character placeholders
for i in 1 2 3 4; do
  create_svg "character${i}.png" 400 600 "Character ${i}" "#0B0B0F" "#FF6A00"
done

# Timeline posters
for i in 1 2 3 4; do
  create_svg "timeline${i}.jpg" 400 600 "Timeline ${i}" "#0B0B0F" "#B11226"
done

# Manga covers 
for i in 1 2 3; do
  create_svg "manga-cover${i}.jpg" 300 450 "Manga ${i}" "#0B0B0F" "#FF6A00"
done

# Create a minimal video placeholder (1x1 black pixel mp4-like file)
# We'll create a simple HTML video-compatible file
echo "" > trailer.mp4

echo "All placeholders created!"
