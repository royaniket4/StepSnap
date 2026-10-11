import React from "react";
import ReactPDF from "@react-pdf/renderer";
import fs from "fs";
import path from "path";

// Dynamically import compiled or load JSX
// We can test using node and babel/tsx or esbuild/tsx!
console.log("Checking ReactPDF render capabilities...");
