<?php
function scan_dir($dir) {
  $dh  = opendir($dir);
  while (false !== ($filename = readdir($dh))) {
    $files[] = $filename;
  }
  sort($files);
  return $files;
}
echo "var categories = new Array(); ";
echo "categories[0] = new Object(); ";
echo "categories[0].images = new Array(); ";
$directory = "images"; #pre
$cat0_scan = scan_dir($directory);
$cat_index = 0;
$cat0_number = 0;
for ($i = 2; $i < count($cat0_scan); $i++) {
  $src = $directory . "/" . $cat0_scan[$i];
  if (is_dir($src)) {
    $cat_index++;
    $cat_name = "categories[" . $cat_index . "]";
    $cat_number_name = "categories[" . $cat_index . "].number";
    $cat_name_string = "categories[" . $cat_index . "].name";
    $cat_array = "categories[" . $cat_index . "].images";
    $name = str_replace("_", " ", $cat0_scan[$i]);
    echo "$cat_name = new Object(); ";
    echo "$cat_name_string = \"$name\"; ";
    echo "$cat_array = new Array(); ";
    $cat_scan = scan_dir($src);
    $cat_number = 0;
    for ($k = 2; $k < count($cat_scan); $k++) {
      $cat_src =  $src . "/" . $cat_scan[$k];
      $cat_array_string = $cat_array . "[" . $cat_number . "]";
      $size = getimagesize($cat_src);
      $width = $size[0];
      $height = $size[1];
      echo "$cat_array_string = \"$cat_src\"; ";
      echo "$cat_array_string.w = $width; ";
      echo "$cat_array_string.h = $height; ";
      $cat_number++;
    }
    echo "$cat_number_name = $cat_number; ";
  } else {
    $size = getimagesize($src);
    $width = $size[0];
    $height = $size[1];
    echo "categories[0].images[$cat0_number] = \"$src\"; ";
    echo "categories[0].images[$cat0_number].w = $width; ";
    echo "categories[0].images[$cat0_number].h = $height; ";
    $cat0_number++;
  }
}
echo "categories[0].number = $cat0_number; ";
echo "categories[0].name = \"Altro\"; "; #pre
?>
