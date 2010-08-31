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
$category_0_scan = scan_dir($directory);
$category = 0;
$number = 0; #pre
$category_0_number = 0;
for ($i = 2; $i < count($category_0_scan); $i++) {
  $src = $directory . "/" . $category_0_scan[$i];
  if (is_dir($src)) {
    $category++;
    $category_number_name = "category_" . $category . "_number";
    $category_name = "category_" . $category . "_name";
    $category_array = "category_" . $category . "_images";
    $name = str_replace("_", " ", $category_0_scan[$i]);
    echo "\nvar $category_name = \"$name\", $category_array = new Array(); ";
    $category_scan = scan_dir($src);
    $category_number = 0;
    for ($k = 2; $k < count($category_scan); $k++) {
      $src .=  "/" . $category_scan[$k];
      $category_array_image = $category_array . "[" . $category_number . "]";
      echo "$category_array_image = \"$src\"; ";
      $number++;
      $category_number++;
    }
    echo "\nvar $category_number_name = $category_number; ";
  } else {
    echo "\ncategory_0_images[$category_0_number] = \"$src\"; ";
    $number++; #pre
    $category_0_number++;
  }
}
echo "\nvar number = $number; "; #pre
echo "\nvar category_0_number = $category_0_number; ";

?>

