$(document).ready(function(){
$(".Button").click(function(e){

  var elementId = $(this).closest('div').attr('id');
  ElementName = elementId;

  var text = $(this).closest('div').find('.text').text();
   updatedText = text;

   var Title = $(this).closest('div').find('.Title').text();
    heading=Title;
  //
   var PageURL = this.PageURL;
   var url = window.location.href;
  //
  PageURL = url;



   var data ={
     Title: Title,
     Text: updatedText,
     PageURL : PageURL,
     ElementId : ElementName
   }

   console.log(data);


   });
 });
