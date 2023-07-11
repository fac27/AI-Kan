'use client'

import { useState } from "react";

export default function StreamingText() {
    const [input, setInput] = useState("");
    return (
        <form onSubmit={() => {}}>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea>
        </form>
    )
}