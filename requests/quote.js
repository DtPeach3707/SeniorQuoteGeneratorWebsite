var express = require('express');
var tf = require('@tensorflow/tfjs');
var tfn = require('@tensorflow/tfjs-node');
const app = express();
const router = express.Router();


function chooseIndex(weights){

    let weightSum = 0;
    weights.forEach(weight => {
        weightSum += weight;
    });
  
    let choice = Math.random()*weightSum; // [0 ~ weightSum[
    let retIndex;
    weights.some((weight, index) => {
        choice -= weight;
        if(choice < 0){
            retIndex = index;
            return true;
        }
        return false;
    });
    return retIndex;
  }

const quote = async (req, res, next) => {
    var handler = tfn.io.fileSystem('./models/actual/model.json');
    console.log(handler);
    var actual_model = await tf.loadLayersModel(handler);
    const max_char = 200;
    var char_lis = ['A', 'ï', '»', '¿', '"', 'W', 'o', 'u', 'l', 'd', ' ', 'y', 'i', 'k', 'e', 'f', 'm', 't', '?', '\n', 'I', 'h', 'a', 'v', 'n', 'w', 'g', ',', 'b', "'", 'r', '.', '-', 'D', 'Y', 's', 'p', 'T', 'c', 'q', 'J', 'L', 'R', 'O', 'z', 'B', 'E', 'C', 'S', 'F', 'M', 'X', 'Z', 'G', 'H', 'j', 'P', 'N', 'K', 'V', 'x', ';', '!', 'U', ':', 'Q', '3', '/', '|'];
    var q_start = Array(char_lis.length).fill().map((_, idx) => 0.0);
    q_start[char_lis.length - 1] = 1.0;
    var quote = [q_start]
    var finished = false;
    var quote_text = "";
    var char_count = 0;
    while(!finished)
    {
      var char = actual_model.predict(tf.tensor([quote]));
      var char_vals = char.dataSync();
      var char_arr = Array.from(char_vals);
      var next_char_ind = chooseIndex(char_arr);
      var next_char = Array(char_lis.length).fill().map((_, idx) => 0.0);
      quote_text = quote_text + char_lis[next_char_ind];
      next_char[next_char_ind] = 1.0;
      quote.push(next_char);
      if (next_char_ind === char_lis.length - 1)
      {
        finished = true;
      }
      char_count++;
      if (char_count === max_char)
      {
        finished = true;
        quote_text = quote_text + '|';

      }
    }
    console.log(quote_text);
    res.send(quote_text.split('|')[0]);
};

module.exports = quote;