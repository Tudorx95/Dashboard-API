import { DeleteForeverSharp } from '@mui/icons-material';
import React, { useState } from 'react';

const Rezervation = () => {

    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        num_of_persons: '',
        reservation_date: '',
        reservation_time: '',
        message: '',
      });

      const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://188.25.10.129:11252/rezervare.html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Reservation data sent:', data);
            // Handle successful submission (optional: clear form, show confirmation)
          })
          .catch((error) => {
            console.error('Error submitting reservation:', error);
            // Handle submission errors (optional: display error message)
          });
      };


    return (

        <form action="#" method="POST" className="form-left" onSubmit={handleSubmit}>
                    <h2 class="headline-1 text-center">Rezervare Online</h2>
                    <p>
                        Rezervari la <a href="tel:074123321" class="link">0740 123 321</a> sau completati formularul:
                    </p>

                    <div class="input-wrapper">
                    <input
                        type="text"
                        name="name"
                        placeholder="Numele"
                        autoComplete="off"
                        className="input-field"
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />

                    <input
                        type="tel"
                        name="phone_number"
                        placeholder="Numarul de telefon"
                        autoComplete="off"
                        className="input-field"
                        required
                        onChange={handleChange}
                        value={formData.phone_number}
                    />
                    </div>

                    <div class="input-wrapper">
                        <div class="icon-wrapper">
                            <ion-icon name="person-outline" aria-hidden="true"></ion-icon>

                            <select
                                name="num_of_persons"
                                className="input-field"
                                onChange={handleChange}
                                value={formData.num_of_persons}
                            >
                                <option value="1">1 persoana</option>
                                <option value="2">2 persoane</option>
                                <option value="3">3 persoane</option>
                                <option value="4">4 persoane</option>
                                <option value="5">5 persoane</option>
                                <option value="6">6 persoane</option>
                                <option value="7">7 persoane</option>
                            </select>
                            <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                        </div>

                        <div class="icon-wrapper">
                            <ion-icon name="calendar-clear-outline" aria-hidden="true"></ion-icon>

                            <input
                                type="date"
                                name="reservation_date"
                                className="input-field"
                                required
                                onChange={handleChange}
                                value={formData.reservation_date}
                            />

                            <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                        </div>

                        <div class="icon-wrapper">
                            <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
                            <select
                                name="reservation_time"
                                className="input-field"
                                onChange={handleChange}
                                value={formData.reservation_time}
                            >
                                <option value="10:00:00">10:00</option>
                                <option value="11:00:00">11:00</option>
                                <option value="12:00:00">12:00</option>
                                <option value="13:00:00">13:00</option>
                                <option value="14:00:00">14:00</option>
                                <option value="15:00:00">15:00</option>
                                <option value="16:00:00">16:00</option>
                                <option value="17:00:00">17:00</option>
                                <option value="18:00:00">18:00</option>
                                <option value="19:00:00">19:00</option>
                                <option value="20:00:00">20:00</option>
                                <option value="21:00:00">21:00</option>
                                <option value="22:00:00">22:00</option>
                            </select>

                            <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                        </div>

                    </div>

                    <textarea
                        name="message"
                        placeholder="Mesaj"
                        value={formData.message}
                        onChange={handleChange}
                        className="input-field"
                    ></textarea>                    
                    <button type="submit" class="btn btn-secondary">
                        <span class="text text-1">Rezerva o masa</span>
                        <span class="text text-2" aria-hidden="true">Rezerva o masa</span>
                    </button>

                </form>
    );
};

const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }  

    fetch('http://188.25.10.129:11252/rezervare.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Reservation data sent:', data);
        // Handle successful submission (optional: clear form, show confirmation)
      })
      .catch((error) => {
        console.error('Error submitting reservation:', error);
        // Handle submission errors (optional: display error message)
      });
  };


export default handleSubmit;
//export default Rezervation; 