Ignist ønsker en brukervennlig webapplikasjon som kan fungere som et bibliotek av informasjon for deres kunder. Webapplikasjonen, kalt “Brannhjelp”, skal bestå av en administrator- og en kunde-del. I dag har Ignist ingen eksisterende løsning for publisering av info med krav om betaling fra deres kunder. Ignist ønsker at systemet er bygget med tanke på fremtidig integrasjon av betalingsløsning. De ønsker også at informasjonen fra Brannhjelp skal kunne integreres inn i eksisterende programvare de har utviklet, kalt STRGI, via API. 


File structure

.-------src
    |--------App.js
    |
    |+--------pages
    |
    |+--------Components
        |
        |+------Authentication
        |    |
        |    |+----------ForgetPassword
        |    |
        |    |+----------Loging and Register
        |+------Layout
        |   
        |+-----Publications.
        |    |
        |    |+--------Create
        |    |
        |    |+--------List-Delete
        |    |
        |    |+---------Read
        |    |
        |    |+---------Sidbar
        |    |
        |    |+---------Update
        |
        |+------Users
        |    |
        |    |+---------AllUsers
        |    |
        |    |+---------Update
 
