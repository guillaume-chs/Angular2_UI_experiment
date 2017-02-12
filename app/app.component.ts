import { Component } from '@angular/core';

@Component({
    selector: 'resa-voyage',
    template: `
        <navbar></navbar>
        
        <search-form></search-form>
        
        <div class="container">
            <div class="row">
                <flight-card></flight-card>
                <hotel-card></hotel-card>
            </div>
        </div>

        <flight-list></flight-list>
        <hotel-list></hotel-list>

        <!--checkout></checkout-->
    `
})
export class AppComponent { }
