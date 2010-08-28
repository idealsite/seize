<?php
echo "var images = new Array(); ";
$jsdir = "seize/images/";
$dir = "/seize/images";
$files = scandir($dir);
$number = count($files) - 2;
echo "var number = $number; "
$k = 0; 
for ($i = 2; $i < count($files); $i++) {
  $src = $jsdir . $files[$i];
  echo "images[$k] = $src; ";
  $k++;
}
?>
