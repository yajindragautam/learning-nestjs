import {Controller, Get} from '@nestjs/common';

// Creating Controllers using decurator
@Controller('/app') // Decurator
export class AppController{
    @Get('/send') // Get decurator get request
    getRootRout(){
        return 'hi there';
    }

    @Get('/bye')
    getByRout(){
        return 'By Yajindra'
    }
}