var $ele;
var $status;
var data;

$(document).ready(function() {
	bkLib.onDomLoaded(nicEditors.allTextAreas);
	
	$ele = $('#clipBoard').find('.nicEdit-main');
	$status = $('#status');
	data = "";
    
	$('.button').click(function() {		
		if($ele.text().trim() == "") data = null;
		else data = {clip: escape($ele.html())};
		
		$status.text('Processing...');
		
		processData(data);		
	});
	$('#clipBoard').keydown(function() {
		$status.text('NavClip | Public clipboard on cloud...');
	});
	$(window).unload(function() {
		processData(data);
	});
	setTimeout(processData,3000);
});
function processData(data){
	if(!$ele[0]) $ele = $('#clipBoard').find('.nicEdit-main');
	$.ajax({
		cache: false,
		type: 'POST',
		url: './clipcript.php',
		data: data
	}).done(function(response){
		if(response && response == "suscess"){
			$status.text('Data uploaded to navclip...');
		}else{
			$ele.html(unescape(response));
			$status.text('Data downloaded from navclip...');
		}
	}).error(function(){
		$status.text('Error connecting to navhive...');
	});
}