# EventFright

[Live link to Event Fright](https://event-fright.herokuapp.com/)

Welcome to EventFright! A clone of the site eventbrite, but catering to all things related to horror themed movies and media, halloween events, and paranormal themed events. 

## Technologies Used:
* Javascript
* Python
* Flask 
* SQLAlchemy
* SQLite3
* React
* Redux
* HTML
* CSS
* PostgreSQL

## Event Fright Features:
* Explore the site as a demo user or sign up with ease: 
![image](https://user-images.githubusercontent.com/89858837/194353881-beb267f4-f856-4c4d-83cc-b6acd9695f20.png)
![image](https://user-images.githubusercontent.com/89858837/194353965-e8f38014-4466-4249-ad9c-942979eb04ac.png)

* Create Events: 
  * Create a new event after clicking "create an event":
  ![image](https://user-images.githubusercontent.com/89858837/194354608-f035424f-eaed-4bf8-a567-1ab11d862867.png)
  * Or navigate to `/create-event` by assessing the drop-down menu by clicking the profile icon:
  ![image](https://user-images.githubusercontent.com/89858837/194355346-c0645f01-c68f-47af-aefe-b1503435a5c0.png)
  * Create your new event. If the category or venue you want is not available, click "create a new category" or "create a new venue" respectively. You can also see all of your previously created events by clicking "see your events":
  ![image](https://user-images.githubusercontent.com/89858837/194367813-263a25ae-6244-4cd1-8d0e-712ff99663c5.png)
  ![image](https://user-images.githubusercontent.com/89858837/194371978-b8d438ac-3af0-462c-b6fc-8c4f02f082b0.png)

* Edit or Delete Events:
  * Edit your events by clicking "edit". This action will navigate to the `/edit-event/:eventId` page:
  ![image](https://user-images.githubusercontent.com/89858837/194372357-99ff67a0-8c16-48d3-bc3e-75382855c846.png)
  * You can also preview a new image when you're editing:
  ![image](https://user-images.githubusercontent.com/89858837/194372807-1e3a137d-eda6-48e4-abe4-b7ce37ec5811.png)


* Create Venues: 
  * The three default venues are Eastern State Penitentiary, Haunted Woods of Smyer, and the Hart House Hotel 
  * Create a new venue by clicking "new venue" on the `/create-event' page or clicking "Add a venue" in the user profile drop-down menu
    * Create a venue on the `/create-venue/:userId` page. You will also be able to see your previously created venues:
    ![image](https://user-images.githubusercontent.com/89858837/194369900-bc50e098-69bf-4fe5-a8b5-4377b2a7e109.png)
    
* Edit or delete a venue:

![image](https://user-images.githubusercontent.com/89858837/194370545-6bfe7a50-87dd-447f-a201-f4ed1a5460f2.png)
![image](https://user-images.githubusercontent.com/89858837/194370622-3ff076ed-0b0a-492c-80f2-6fbcf6803f6f.png)

    
* Create Categories: 
  * The three default categories are Film, Media, and Entertainment(this is a single category), Outdoors, and Dining
  * Create a new category by clicking "new category" on the `/create-event' page or clicking "Add a category" in the user profile drop-down menu
    * Create a venue on the `/create-category/:userId` page. You will also be able to see your previously created categories:
    ![image](https://user-images.githubusercontent.com/89858837/194371333-5d8fbc36-8af8-48c0-a3e4-6992f0509e1d.png)
  
  * Delete a category:
  ![image](https://user-images.githubusercontent.com/89858837/194371444-50fed3fd-a483-4531-8789-8f76c88e2ebd.png)
  
* Feature(s) to come:
  * Registration
  * Likes


  
 

