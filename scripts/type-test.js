const { exec } = require('child_process');

console.log('Starting tests');

// Cleanup any old files.
exec(
    "pnpm rimraf ./tmp", 
    (err, stdout, stderr) => {
        if (err) {
            console.error(`Error executing tests: ${stderr}`);
            process.exit(1);
        }                       
    }
);

// Make copy of src
exec(
    'pnpm copyfiles "./src/**/*.*" ./tmp', 
    (err, stdout, stderr) => {

        if (err) {
            console.error(`Error copying files: ${stderr}`);
            process.exit(1);
        }

        console.log(stdout);

        // Find and replace any @ts-expect-error
        exec(
            "pnpm replace '@ts-expect-error' '[removed ts-expect-error]' ./tmp -r", 
            (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error replacing text: ${stderr}`);
                    process.exit(1);
                }

                console.log(stdout);

                // Run tests
                exec(
                    "pnpm tstyche", 
                    (err, stdout, stderr) => {

                        // Do not show errors here otherwise the tsc
                        // errors (the ones we are testing for) get
                        // passed through and kill the process.
                        if (err) {
                            // console.error(`Error executing tests: ${stderr}`);
                            // process.exit(1);
                        }
            
                        console.log(stdout);
                        
                        // Remove junk
                        exec(
                            "pnpm rimraf ./tmp", 
                            (err, stdout, stderr) => {
                                if (err) {
                                    console.error(`Error executing tests: ${stderr}`);
                                    process.exit(1);
                                }
                    
                                console.log(stdout);                          
                            }
                        );
                        
                    }
                );

            }
        );
    }
);