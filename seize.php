<?php
echo "var images = new Array(); ";
$jsdir = "images/";
$dir = "/images";
$dh  = opendir($dir);
while (false !== ($filename = readdir($dh))) {
  $files[] = $filename;
}
sort($files);
$number = count($files) - 2;
echo "var number = $number; ";
$k = 0; 
for ($i = 2; $i < count($files); $i++) {
  $src = $jsdir . $files[$i];
  echo "images[$k] = $src; ";
  $k++;
}
?>
