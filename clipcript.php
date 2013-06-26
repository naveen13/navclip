<?php
	$my_file = "clip.html";
	if(isset($_REQUEST['clip'])){
		$content = $_REQUEST['clip'];
		//writing
		$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
		fwrite($handle, $content);
		fclose($handle);
		echo "suscess";
	}else{
		//reading
		$handle = fopen($my_file, 'r');
		$data = fread($handle,filesize($my_file));
		echo $data;
	}
?>