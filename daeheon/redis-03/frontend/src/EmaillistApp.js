import React, { useEffect, useState } from 'react';

export default function App() {

    return (
        <form>
            <label>
                Name:
                <input type="text" name="name"  value={name}/>
            </label>
            <input type="submit" value="Submit"  />
        </form>
    );
}

