var templateData = `<div class="col-12">
    <div class="card {{priority}} ticketDetails cursor-pointer"  data-id="{{id}}">
        <div class="card-header">
            <h4 class="ticket-subject">{{subject}} </h4>
            <small class="float-right">{{unread}} Ticket ID: #<span>{{ticketId}}</span></small>
        </div>
        <div class="card-body">
            <p>{{message}}</p>
            <small title="Priority - {{priority}}"><span class="badge {{priority}}">{{priority}}</span></small>
            <small title="Department - {{department}}"><span class="badge badge-info">{{department}}</span></small>
            <small title="Ticket Status - {{status}}"><span class="badge {{status}}">{{status}}</span></small>
            <div class="ticket-user float-right"><small><i class="far fa-user text-danger"></i> <span id="ticket-time" class="text-danger">{{username}}</span></small> <small><i class="far fa-calendar-alt"></i> <span id="ticket-time">{{created_at}}</span></small></div>
        </div>
    </div>
</div>`;
let replyleft = `<li class="chat-left">
    <div class="user_info">{{user}} <small class="float-right"><i class="far fa-calendar-alt"></i> <span class="date pull-right" id="ticket-created_at">{{created_at}}</span></small></div>

    <div class="chat-text">{{message}}</div>
    <div class="row thumbnials">{{image}}</div>
</li>`;
let replyright = `<li class="chat-right">
    <div class="user_info">{{user}} <small class="float-right"><i class="far fa-calendar-alt"></i> <span class="date pull-right" id="ticket-created_at">{{created_at}}</span></small></div>
    <div class="chat-text">{{message}}</div>
    <div class="row thumbnials">{{image}}</div>
</li>`;
let ticketDetail = `
<div class="mail-sender">
    <div class="media">
        <div class="media-body">
            <small> Ticket ID: #<span id="ticket-id">{{ticketId}}</span></small>
            <small class="float-right"><i class="far fa-calendar-alt"></i> <span class="date pull-right" id="ticket-created_at">4:15AM 04 April 2017</span></small>
            <h5 class="text-danger" id="ticket-user">Sarah Smith</h5>
            <small><span id="ticket-order"></span></small>
        </div>
    </div>
    <p>
        <span class="badge {{priority}}" id="ticket-priority" title="Priority - {{priority}}">{{priority}}</span>
        <span class="badge badge-info" id="ticket-department" title="Department - {{department}}">{{department}}</span>
        <span class="badge {{status}}" id="ticket-status" title="Ticket Status - {{status}}">{{status}}</span>
    </p>
</div>
<div class="view-mail p-t-20" id="ticket-message">{{message}}</div>
<div class="attachment-mail mt-2">
    <div class="row" id="aniimated-thumbnials">{{thumbnails}}</div>
</div>
<div class="chat-container" id="chatSection">
    <ul class="chat-box chatContainerScroll mt-2" id="chat-section">
        
    </ul>
    <button type="button" class="btn btn-sm btn-danger" id="loadMoreReply" data-url="" style="display:none">Load More</button>
</div>`
let imageSection = `
<div class="col-md-2">
    <a href="{{href}}">
    <img class="img-thumbnail img-responsive" alt="{{name}}" src="{{source}}">
    </a>
</div>`;

let keyword = jQuery('#searchKeyword').val();
let daterange = jQuery('#daterangeFilter').val();
let company = jQuery('#searchCompany').val() ? jQuery('#searchCompany').val() : '';
let filters = 'keyword='+keyword+'&status='+currentStatus+'&company='+company+'&daterange='+daterange;

const fetchurl = baseurl + '/tickets?'+filters;
function preview_image() 
{
    var total_file=document.getElementById("ticketreplyscreenshots").files.length;
    jQuery('#preview-image').empty();
    for(var i=0;i<total_file;i++)
    {
        jQuery('#preview-image').append("<img src='"+URL.createObjectURL(event.target.files[i])+"'>");
    }
}
function preview_screenshot_image() 
{
    jQuery('#screenshots-error').html('');
    var total_file=document.getElementById("screenshots").files.length;
    jQuery('#screenshot-preview-image').empty(); 
    if (total_file > 5) {
        jQuery('#screenshots-error').html('You are only allowed to upload a maximum of 5 files');
    }
    for(var i=0;i<total_file;i++) {
        jQuery('#screenshot-preview-image').append("<img src='"+URL.createObjectURL(event.target.files[i])+"'>");
    }
}
function fetchListing(url){
    jQuery.get(url, function(data) {
        showListing(data.data)
    });
}
function showListing(data, loadMore = false){
    if(!loadMore){
        jQuery("#serverList").empty();
    }
    if(data.data.length){
        for(let value of data.data){
            let replaced_body = templateData
            .replace('{{ticketId}}', value.ticketId)
            .replace('{{subject}}', value.subject)
            .replaceAll('{{department}}', value.department)
            .replace('{{id}}', value.id)
            .replace('{{message}}', value.message)
            .replace('{{username}}', value.user)
            .replaceAll('{{priority}}', value.priority)
            .replaceAll('{{status}}', value.status)
            .replace('{{created_at}}', value.created_at)
            if(value.unread != 0){
                replaced_body = replaced_body
                .replace('{{unread}}', '<span class="badge badge-primary" id="unread-'+value.ticketId+'">'+value.unread+'</span>')
            } else{
                replaced_body = replaced_body
                .replace('{{unread}}', '<span class="" id="unread-'+value.ticketId+'"></span>')
            }
            jQuery("#serverList").append(replaced_body);
        }
        if(data.hasMorePages){
            jQuery('#loadMore').show().attr('data-url', data.nextPageUrl)
        } else{
            jQuery('#loadMore').hide().attr('data-url','')
        }
        jQuery('#totalCount').html('('+data.total+')')
        
    }
    else{
        jQuery('#loadMore').hide().data('data-url','')
        if(!loadMore){
            var trTag = `
            <div class="col-12 no-records-found text-center">
                <img width="264" height="150"  src="`+baseurl+`/fline/assets/img/no-record-found.png" alt="No records found" class="img-fluid lazyload">
                <p class="mt-4 text-danger">No Tickets Found!</p>
            </div>`
            jQuery("#serverList").append(trTag);
            jQuery('#totalCount').html('(0)')
        }
    }
}
function showReplies(data, loadMore = false){
    if(!loadMore){
        jQuery("#chat-section").empty();
    }
    if(data.data.length){
        for(let value of data.data){
            let replaced_body;
            if(value.type){
                replaced_body = replyright
                .replace('{{user}}', value.user)
                .replace('{{message}}', value.message)
                .replace('{{created_at}}', value.created_at)
            } else{
                replaced_body = replyleft
                .replace('{{user}}', value.user)
                .replace('{{message}}', value.message)
                .replace('{{created_at}}', value.created_at)
            }
            
            let images= '';
            if(value.image.length){
                for(let ima of value.image){
                    images += imageSection
                    .replace('{{name}}', ima.name)
                    .replace('{{href}}', ima.display)
                    .replace('{{source}}', ima.display)
                }
            }
            replaced_body = replaced_body.replace('{{image}}', images)
            jQuery("#chat-section").prepend(replaced_body);
        }
        jQuery('.thumbnials').lightGallery({
            thumbnail: true,
            selector: 'a',
            download: false,
            share: false,
            actualSize: false,
            autoplay: false
        });
        if(data.hasMorePages){
            jQuery('#loadMoreReply').attr('data-url', data.nextPageUrl)
        } else{
            jQuery('#loadMoreReply').attr('data-url','')
        }        
    }
    else{
        jQuery('#loadMoreReply').data('data-url','')
    }
}
jQuery("form[id='createTicketForm']").submit(function(e) {
    e.preventDefault();
}).validate({
    // Specify validation rules
    ignore: '',
    rules: {
        department: {
            required: true,
        },
        priority: {
            required: true,
        },
        subject: {
            required: true,
            maxlength: 150,
        },
        ticketmessage: {
            required: true,
            maxlength: 550,
        },
        "screenshots[]": {
            extension: "png|jpg|jpeg"
        },
    },
    // Specify validation error messages
    messages: {
        department: {
            required: "Select department to create  ticket",
        },        services: {
            required: "Select service to create  ticket",
        },
        priority: {
            required: "Select priority to create  ticket",
        },
        subject: {
            required: "Subject is required to create  ticket",
            maxlength: 'Subject has maximum 150 character',
        },
        ticketmessage: {
            required: "Message is required to create  ticket",
            maxlength: 'Message has maximum 550 character',
        },
        "screenshots[]": {
            extension: "Select valid input file format (only png, jpg and jpeg allowed)"
        },
    },
    errorPlacement: function(error, element) {
        error.appendTo( element.closest(".form-group") );
    },
    submitHandler: function(form) {
        var formData = new FormData(form);
        var formdata = jQuery(form);
        jQuery("form[id='createTicketForm'] #defaultCurrencySaveBtn").html('Submitting '+'<i class="fa fa-spinner" aria-hidden="true"></i>').prop('disabled', true);
        jQuery.ajax({ 
            data: formData, 
            type: formdata.prop('method'), 
            url: formdata.prop('action'),
            dataType: 'json',
            cache:false,
            contentType: false,
            processData: false,
            success: function (data) { 
                if(data.api_response == 'error'){
                    iziToast.error({
                        title: "Error!",
                        text: data.message,
                        position: 'topRight'
                    });
                    jQuery("form[id='createTicketForm'] #defaultCurrencySaveBtn").html('Submit').prop('disabled', false);
                } else{
                    jQuery("form[id='createTicketForm'] #defaultCurrencySaveBtn").html('Submit').prop('disabled', false);
                    jQuery(".error").html();
                    jQuery("form[id='createTicketForm']").trigger("reset");
                    fetchListing(fetchurl)
                    jQuery("#createNewTicket").modal('hide');
                    
                    iziToast.success({
                        title: 'Success!',
                        message: data.message,
                        position: 'topRight'
                    });
                }
            },
            error: function(xhr, status, error) 
            {
                jQuery("form[id='createTicketForm'] #defaultCurrencySaveBtn").html('Submit').prop('disabled', false);
                jQuery.each(xhr.responseJSON.errors, function (key, item) 
                {
                    jQuery("span#" + key + "-error").html(item);
                });
            }
        });
    }
});
jQuery("form[id='replyTicketForm']").submit(function(e) {
    e.preventDefault();
}).validate({
    // Specify validation rules
    ignore: '',
    rules: {
        ticketreplymessage: {
            required: true,
            maxlength: 550,
        },
        "ticketreplyscreenshots[]": {
            extension: "png|jpg|jpeg"
        },
    },
    // Specify validation error messages
    messages: {
        ticketreplymessage: {
            required: "Message is required for ticket reply",
            maxlength: 'Message has maximum 550 character',
        },
        "ticketreplyscreenshots[]": {
            extension: "Select valid input file format (only png, jpg and jpeg allowed)"
        },
    },
    errorPlacement: function(error, element) {
        error.appendTo( element.closest(".chat-rep-row") );
    },
    submitHandler: function(form) {
        var formData = new FormData(form);
        var formdata = jQuery(form);
        jQuery("form[id='replyTicketForm'] #defaultCurrencySaveBtn").html('Submitting '+'<i class="fa fa-spinner" aria-hidden="true"></i>').prop('disabled', true);
        jQuery.ajax({ 
            data: formData, 
            type: formdata.prop('method'), 
            url: formdata.prop('action'),
            dataType: 'json',
            cache:false,
            contentType: false,
            processData: false,
            success: function (data) { 
                if(data.api_response == 'error'){
                    iziToast.error({
                        title: "Error!",
                        text: data.message,
                        position: 'topRight'
                    });
                    jQuery("form[id='replyTicketForm'] #defaultCurrencySaveBtn").html('Submit').prop('disabled', false);
                } else{
                    jQuery("form[id='replyTicketForm'] #defaultCurrencySaveBtn").html('Submit').prop('disabled', false);
                    jQuery(".error").html();
                    jQuery("form[id='replyTicketForm']").trigger("reset");
                    
                    let replaced_body = replyleft
                    .replace('{{user}}', data.data.user)
                    .replace('{{message}}', data.data.message)
                    .replace('{{created_at}}', data.data.created_at)
                    let images= '';
                    if(data.data.image.length){
                        for(let ima of data.data.image){
                            images += imageSection
                            .replace('{{name}}', ima.name)
                            .replace('{{href}}', ima.display)
                            .replace('{{source}}', ima.display)
                        }
                    }
                    replaced_body = replaced_body.replace('{{image}}', images)
                    jQuery("#chat-section").append(replaced_body);
                    jQuery('.thumbnials').lightGallery({
                        thumbnail: true,
                        selector: 'a',
                        download: false,
                        share: false,
                        actualSize: false,
                        autoplay: false
                    });
                    
                    jQuery('#chatSection').animate({scrollTop: jQuery('#chatSection').prop("scrollHeight")}, 500);
                    iziToast.success({
                        title: 'Success!',
                        message: data.message,
                        position: 'topRight'
                    });
                }
            },
            error: function(xhr, status, error) 
            {
                jQuery("form[id='replyTicketForm'] #defaultCurrencySaveBtn").html('Submit').prop('disabled', false);
                jQuery.each(xhr.responseJSON.errors, function (key, item) 
                {
                    jQuery("span#" + key + "-error").html(item);
                });
            }
        });
    }
});

jQuery(document).on('change', '#department', function() {
    var parentDiv = jQuery(this).find(':selected').data('role');
    var department = jQuery(this).find(':selected').data('value');
    if(parentDiv == 'User' && department == 'tech-support'){
        jQuery('#services').prop('required', true)
    }
    else{
        jQuery('#services').val("")
        jQuery('#services').prop('required', false)
    }
});
jQuery("form[id='search-form']").submit(function(e) {
    e.preventDefault();
    jQuery('#resetBtn').show();
    sortdata();
});
 
jQuery(document).on('change', '#latest', function (event) {
    event.preventDefault();
    sortdata();
});

jQuery(document).on('click', '#closed-tab', function (event) {
    event.preventDefault();
    jQuery('#search-form').trigger("reset");
    jQuery('#sort-form').trigger("reset");
    jQuery('#resetBtn').hide();
    filters = 'status=closed';
    var url = baseurl + '/tickets?'+filters;
    jQuery('#searchStatus').val('closed');
    fetchListing(url);
});

jQuery(document).on('click', '#active-tab', function (event) {
    event.preventDefault();
    jQuery('#search-form').trigger("reset");
    jQuery('#sort-form').trigger("reset"); 
    jQuery('#searchStatus').val('');
    jQuery('#resetBtn').hide(); 
    var url = baseurl + '/tickets';
    fetchListing(url);
});

function sortdata(){
    priority = jQuery('#priority').val();
    latest = jQuery('#latest').val();
    searchStatus = jQuery('#searchStatus').val();
    keyword = jQuery('#searchKeyword').val();
    company = jQuery('#searchCompany').val() ? jQuery('#searchCompany').val() : '';
    daterange = jQuery('#daterangeFilter').val();
    filters = 'keyword='+keyword+'&status='+searchStatus+'&company='+company+'&daterange='+daterange+'&priority='+priority+'&latest='+latest;
    var url = baseurl + '/tickets?'+filters;
    fetchListing(url)
}

jQuery(document).on('click', '.ticketDetails', function (event) {
    event.preventDefault();
    var userId = $(this).data('id');
    var baseurl = $('meta[name="baseurl"]').prop('content');
    var url = baseurl+"/ticket/"+userId;
    var cancelUrl = baseurl+"/ticketcancel/"+userId;
    jQuery("#ticketId").val(userId);

    jQuery.get(url, function(data) {
        if(data.api_response == 'error'){
            iziToast.error({
                title: "Error!",
                text: data.message,
                position: 'topRight'
            });
        } else {

            jQuery("#unread-"+data.data.ticketId).remove();
            jQuery("#ticket-id").html(data.data.ticketId);
            jQuery("#ticket-department").prop('title', 'Department - '+data.data.department).html(data.data.department);
            jQuery("#ticket-user").html(data.data.companyName);
            jQuery("#ticket-subject").html(data.data.subject);
            jQuery("#ticket-order").html(data.data.service);
            jQuery("#ticket-created_at").html(data.data.created_at );
            jQuery("#ticket-message").html(data.data.message); 
            jQuery("#close-ticket").prop('href', cancelUrl); 
            if(data.data.status == 'closed'){
                jQuery("#viewTicket .modal-content").addClass('closed-ticket')
                jQuery("#close-ticket").hide()  
            } else{
                jQuery("#viewTicket .modal-content").removeClass('closed-ticket')
                jQuery("#close-ticket").show()  
            }

            
            if(data.data.image.length){
                let images;
                jQuery("#aniimated-thumbnials").empty();
                for(let ima of data.data.image){
                    images = imageSection
                    .replace('{{name}}', ima.name)
                    .replace('{{href}}', ima.display)
                    .replace('{{source}}', ima.display)
                    jQuery("#aniimated-thumbnials").append(images);
                }
                jQuery('#aniimated-thumbnials').lightGallery({
                    thumbnail: true,
                    selector: 'a',
                    download: false,
                    share: false,
                    actualSize: false,
                    autoplay: false
                });
            } else{
                jQuery("#aniimated-thumbnials").empty();
            }
            showReplies(data.data.replies);
            jQuery("#ticket-status").attr('class', '').addClass('badge mr-1').addClass(data.data.status).prop('title', 'Ticket Status - '+data.data.status).html(data.data.status);
            jQuery("#ticket-priority").attr('class', '').addClass('badge').addClass(data.data.priority).prop('title', 'Priority - '+data.data.priority).html(data.data.priority);
            
            jQuery("#viewTicket").modal('show');
            setTimeout(function(){
                jQuery('#chatSection').scrollTop(jQuery('#chatSection').prop("scrollHeight"));
            }, 500)
        }
    });
});
jQuery(document).on('click', '#close-ticket', function (event) {
    event.preventDefault();
    var url = jQuery('#close-ticket').attr('href');
    console.log(url)
    if(url){
        jQuery.get(url, function(data) {
            if(data.api_response == 'error'){
                iziToast.error({
                    title: "Error!",
                    text: data.message,
                    position: 'topRight'
                });
            } else {
                showListing(data.data)
                
                jQuery("#viewTicket").modal('hide');
                iziToast.success({
                    title: 'Success!',
                    message: data.message,
                    position: 'topRight'
                });
            }
        });
    }
});
jQuery(document).on('click', '#reopen-ticket', function (event) {
    event.preventDefault();
    jQuery("#viewTicket .modal-content").removeClass('closed-ticket')
});
jQuery(document).on('click', '#loadMore', function (event) {
    event.preventDefault();
    var url = jQuery('#loadMore').attr('data-url')+'&'+filters;
    if(url){
        jQuery.get(url, function(data) {
            showListing(data.data, true)
        });
    }
});
// jQuery(document).on('scroll', '.chat-container', function (event) {
jQuery('#chatSection').scroll(function (event) {
    if (jQuery('#chatSection').scrollTop() == 0) {
        console.log(jQuery('#chatSection').scrollTop());
        var url = jQuery('#loadMoreReply').attr('data-url')
        if(url){
            jQuery.get(url, function(data) {
                showReplies(data.data.replies, true)
            });
        }
    }
});
jQuery(document).on('click', '#loadMoreReply', function (event) {
    event.preventDefault();
    var url = jQuery('#loadMoreReply').attr('data-url')
    if(url){
        jQuery.get(url, function(data) {
            showReplies(data.data.replies, true)
        });
    }
});
jQuery(document).on('click', '#resetBtn', function (event) {
    event.preventDefault();
    jQuery("form[id='search-form']").trigger("reset");
    jQuery('#resetBtn').hide();
    fetchListing(fetchurl)
});

fetchListing(fetchurl)