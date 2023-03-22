from flask import  Flask, Blueprint, jsonify, request, json
import os 
from PIL import Image
import base64
import io
from ...api import db, socketio, mail
from werkzeug.utils import secure_filename
from ..models.models import  Display, display_serializer
import cloudinary.uploader



display_route = Blueprint("display_route", __name__ , url_prefix="/")






@display_route.route("/displayInfo", methods=['GET'])
def displayInfo():
    return jsonify(*map(display_serializer, Display.query.all()))





@display_route.route("/display", methods=["POST"])
def display():
    newDisplay = Display(
        logo =  request.form["logo"],
        header = json.loads(request.form["header"]),
        main_category = json.loads(request.form["main_category"]),
        category = json.loads(request.form["category"]),
        banners = json.loads(request.form["banners"]),
        slider = request.files.getlist("slider"),
        pop_up = json.loads(request.form["pop_up"]),
        count_Down = bool(request.form["count_Down"]) 
        
    
        )
    db.session.add(newDisplay)
    db.session.commit()
    return jsonify(*map(display_serializer, newDisplay.query.all()))

@display_route.route('/update-display-setting/<id>',methods=['PUT'])
def editDisplay(id):
    display  = Display.query.filter_by(id = id)
    if display is not None:
        logo =  request.form["logo"] 
        header = json.loads(request.form["header"])
        main_category = json.loads(request.form["main_category"])
        category = json.loads(request.form["category"])
        banners = json.loads(request.form["banners"])
        slider = request.form.getlist("slider")
        pop_up = json.loads(request.form["pop_up"])
        count_Down = bool(request.form["count_Down"]) 
        
        #check and update header
        
        if header:
            image_url = header.get("banner")
            if image_url and not image_url.startswith("https"):
                # If it doesn't, upload the image to Cloudinary
                uploaded_image = cloudinary.uploader.upload(image_url)

                # Get the URL of the uploaded image from the Cloudinary response
                image_url = uploaded_image.get('url')

                # Update the header object with the new image URL
                header['banner'] = image_url
            else:
                print("Image already uploaded to Cloudinary.")
             
        #check and update logo 
        logo_url = ""
        if logo:
            if  logo.startswith("http://") or  logo.startswith("https://"):
                logo_url = logo
                
            else:
                upload_result = cloudinary.uploader.upload(logo)
                logo_url = upload_result['secure_url']
                
        #check and update slider
        slider_urls = []
        if slider:
            for image in slider:
           
                if image.startswith("http://") or image.startswith("https://"):
                    slider_urls.append(image)
                else:
                    upload_result = cloudinary.uploader.upload(image)
                    slider_urls.append(upload_result['secure_url'])
                    
        #check and update banners
        banners_urls = []
        if banners:
            for image in banners:
           
                if image.startswith("http://") or image.startswith("https://"):
                    banners_urls.append(image)
                else:
                    upload_result = cloudinary.uploader.upload(image)
                    banners_urls.append(upload_result['secure_url'])  
    
        #category update 
        category_array = []
        if category:
            for item in category:
                for key, value in item.items():
                    if key.startswith("img"):
                        if not value.startswith("https"):
                            result = cloudinary.uploader.upload(value)
                            item[key] = result['secure_url']
                    else:
                        print("Image already uploaded to Cloudinary.")

                category_array.append(item)
            
        #loop through each category in the main category array
        if main_category:
            for category in main_category:
                for i, img_file in enumerate(category['img']):
                    if not img_file.startswith('https'):
                        print("Uploading image to Cloudinary...")
                        # upload the image to Cloudinary
                        result = cloudinary.uploader.upload(img_file)
                        img_url = result['secure_url']
                        # update the main_category list with the secure URL
                        category['img'][i] = img_url
                    else:
                        print("Image already uploaded to Cloudinary.")
      
        #header 
        display.update(dict(
            logo =  logo_url,
            header = header,
            main_category = main_category,
            category = category_array,
            banners = banners_urls,
            slider = slider_urls,
            pop_up = pop_up,
            count_Down = bool(count_Down)
            
        ) 
    ) 
    
            
        
        db.session.commit()
        return jsonify(*map(display_serializer, display))
    else:
        return {"error" : "the product isn't exist any more ..."} ,401 