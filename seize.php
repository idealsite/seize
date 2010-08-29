<?php
function scan_dir($dir) {
  $dh  = opendir($dir);
  while (false !== ($filename = readdir($dh))) {
    $files[] = $filename;
  }
  sort($files);
  return $files;
}
echo "var category_0_images = new Array(); ";
$directory = "images";
$category_0_images = scan_dir($directory);
$category = 0;
$number = 0;
$category_0_number = 0;
for ($i = 2; $i < count($category_0_images); $i++) {
  if (is_dir($category_0_images[$i])) {
    $category++;
    $category_name = "category_" . $category . "_name";
    $category_array = "category". $category . "_images";
    echo "var $category_name = $category_0_images[$i]; var $category_array = new Array(); ";
    $category_images = scan_dir($category_0_images[$i]);
    $category_number = 0;
    for ($k = 2; $k < count($category_images); $k++) {
      $src = $directory . "/" . $category_0_images[$i] . "/" . $category_images[$k]
      echo "$category_array[$category_number] = \"$src\"; ";
      $number++;
      $category_number++;
    }
    echo "$";
  } else {
    $src = $directory . "/" . $category_0_images[$i];
    echo "category_0_images[$k] = \"$src\"; ";
    $number++;
    $category_0_number++;
  }
}
echo "var number = $number; ";
?>
