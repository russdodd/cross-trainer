(function() {
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    (window["webpackJsonp"] = window["webpackJsonp"] || []).push([
        ["main"], {
            /***/
            0:
            /*!***************************!*\
              !*** multi ./src/main.ts ***!
              \***************************/

            /*! no static exports found */

            /***/
                function _(module, exports, __webpack_require__) {
                module.exports = __webpack_require__(
                    /*! /Users/rdodd/coding/cube-trainer/src/main.ts */
                    "zUnb");
                /***/
            },

            /***/
            "2xHg":
            /*!********************************************!*\
              !*** ./src/app/cstimer/mersenneTwister.js ***!
              \********************************************/

            /*! exports provided: MersenneTwisterObject */

            /***/
                function xHg(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "MersenneTwisterObject", function() {
                    return MersenneTwisterObject;
                }); //
                //  Version     File name           Description
                //  -------     ---------           -----------
                //  2004-12-03  hr$mersennetwister.js       original version will stay available,
                //                          but is no longer maintained by Henk Reints
                //
                //  2005-11-02  hr$mersennetwister2.js      o  renamed constructor from "MersenneTwister"
                //                             to "MersenneTwisterObject"
                //                          o  exposure of methods now in separate section near the end
                //                          o  removed "this." from internal references
                //
                // ====================================================================================================================
                // Mersenne Twister mt19937ar, a pseudorandom generator by Takuji Nishimura and Makoto Matsumoto.
                // Object Oriented JavaScript version by Henk Reints (http://henk-reints.nl)
                // ====================================================================================================================
                // Original header text from the authors (reformatted a little bit by HR):
                // -----------------------------------------------------------------------
                //
                //  A C-program for MT19937, with initialization improved 2002/1/26.
                //  Coded by Takuji Nishimura and Makoto Matsumoto.
                //
                //  Before using, initialize the state by using init_genrand(seed) or init_by_array(init_key, key_length).
                //
                //  Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura, All rights reserved.
                //
                //  Redistribution and use in source and binary forms, with or without modification,
                //  are permitted provided that the following conditions are met:
                //
                //  1. Redistributions of source code must retain the above copyright notice,
                //     this list of conditions and the following disclaimer.
                //
                //  2. Redistributions in binary form must reproduce the above copyright notice,
                //     this list of conditions and the following disclaimer in the documentation and/or
                //     other materials provided with the distribution.
                //
                //  3. The names of its contributors may not be used to endorse or promote products derived from this software
                //     without specific prior written permission.
                //
                //  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
                //  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
                //  PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
                //  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
                //  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
                //  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
                //  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
                //  POSSIBILITY OF SUCH DAMAGE.
                //
                //  Any feedback is very welcome.
                //  http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
                //  email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
                //
                // ====================================================================================================================
                // Remarks by Henk Reints about this JS version:
                //
                // Legal stuff:
                //  THE ABOVE LEGAL NOTICES AND DISCLAIMER BY THE ORIGINAL AUTHORS
                //  ALSO APPLY TO THIS JAVASCRIPT TRANSLATION BY HENK REINTS.
                //
                // Contact:
                //  For feedback or questions you can find me on the internet: http://henk-reints.nl
                //
                // Description:
                //  This is an Object Oriented JavaScript version of the Mersenne Twister.
                //
                // Constructor:
                //  MersenneTwisterObject([seed[,seedArray]])
                //      if called with 0 args then a default seed   is used for initialisation by the 'init' method;
                //      if called with 1 arg  then 'seed'           is used for initialisation by the 'init' method;
                //      if called with 2 args then 'seedArray,seed' is used for initialisation by the 'initByArray' method;
                //      if a supplied seed is NaN or not given then a default is used.
                //
                // Properties:
                //  none exposed
                //
                // Methods:
                //  init0(seed)     initialises the state array using the original algorithm
                //                if seed is NaN or not given then a default is used
                //  init(seed)      initialises the state array using the improved algorithm
                //                if seed is NaN or not given then a default is used
                //  initByArray(seedArray[,seed])
                //              initialises the state array based on an array of seeds,
                //                the 2nd argument is optional, if given and not NaN then it overrides
                //                the default seed which is used for the very first initialisation
                //  skip(n)         lets the random number generator skip a given count of randoms
                //                if n <= 0 then it advances to the next scrambling round
                //                in order to produce an unpredictable well-distributed sequence, you could let n be
                //                generated by some other random generator which preferrably uses external events to
                //                create an entropy pool from which to take the numbers.
                //                this method has been added by Henk Reints, 2004-11-16.
                //  randomInt32()       returns a random 32-bit integer
                //  randomInt53()       returns a random 53-bit integer
                //                this is done in the same way as was introduced 2002/01/09 by Isaku Wada
                //                in his genrand_res53() function
                //  randomReal32()      returns a random floating point number in [0,1) with 32-bit precision
                //                please note that - at least on Microsoft Platforms - JavaScript ALWAYS stores
                //                Numbers with a 53 bit mantissa, so randomReal32() is not the best choice in JS.
                //                it is provided to be able to produce output that can be compared to the demo
                //                output given by the original authors. For JavaScript implementations I suggest
                //                you always use the randomReal53 method.
                //  randomReal53()      returns a random floating point number in [0,1) with 53-bit precision
                //                this is done in the same way as was introduced 2002/01/09 by Isaku Wada
                //                in the genrand_res53() function
                //  randomString(len)   returns a random string of given length, existing of chars from the charset:
                //                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", which is identical
                //                to the character set used for base64 encoding, so effectively it generates a random
                //                base64-encoded number of arbitrary precision.
                //                If you intend to use a random string in a URL string, then the "+" and "/" should
                //                be converted to URL syntax using the JavaScript built-in 'escape' method.
                //                this method has been added by Henk Reints, 2004-11-16.
                //  random()        a synonym for randomReal53  [HR/2004-12-03]
                //  randomInt()     a synonym for randomInt32   [HR/2004-12-03]
                //                these two synonyms are intended to be generic names for normal use.
                //
                // Examples of object creation:
                //  mt = new MersenneTwisterObject()            // create object with default initialisation
                //  mt = new MersenneTwisterObject(19571118)        // create object using a specific seed
                //  mt = new MersenneTwisterObject(Nan,[1957,11,18,03,06])  // create object using a seed array only
                //  mt = new MersenneTwisterObject(1957,[11,18,03,06])  // create object using a seed array AND a specific seed
                //
                // Examples of (re)initialisation (to be done after the object has been created):
                //  mt.init0()              // re-init using the old-style algorithm with its default seed
                //  mt.init0(181157)            // re-init using the old-style algorithm with a given seed
                //  mt.init()               // re-init using the new-style algorithm with its default seed
                //  mt.init(181157)             // re-init using the new-style algorithm with a given seed
                //  mt.initByArray([18,11,57])      // re-init using a seed array
                //  mt.initByArray([18,11,57],0306)     // re-init using a seed array AND a specific seed
                //
                // Example of generating random numbers (after creation of the object and optional re-initialisation of its state):
                //  while (condition)
                //  {   i = mt.randomInt32()            // get a random 32 bit integer
                //      a = mt.randomReal53()           // and a random floating point number of maximum precision
                //      x = myVerySophisticatedAlgorithm(i,a)   // do something with it
                //  }
                //
                // Functions for internal use only:
                //  dmul0(m,n)  performs double precision multiplication of two 32-bit integers and returns only the low order
                //          32 bits of the product; this function is necessary because JS always stores Numbers with a
                //          53-bit mantissa, leading to loss of 11 lowest order bits. In fact it is the pencil & paper
                //          method for multiplying 2 numbers of 2 digits each, but it uses digits of 16-bits each. Since
                //          only the low order result is needed, the steps that only affect the high order part of the
                //          result are left out.
                //
                // Renamed original functions:          to:
                //  init_genrand(s)             init(seed)
                //  init_by_array(init_key,key_length)  initByArray(seedArray[,seed])
                //  genrand_int32()             randomInt32()
                //  genrand_real2()             randomReal32()
                //  genrand_res53()             randomReal53()
                //
                // Other modifications w.r.t. the original:
                //  - did not include the other variants returning real values - I think [0,1) is the only appropriate interval;
                //  - included randomInt53() using the same method as was introduced 2002/01/09 by Isaku Wada in his genrand_res53;
                //  - included randomString(len);
                //  - included skip(n);
                //  - in the randomInt32 method I have changed the check "if (mti >= N)" to a 'while' loop decrementing mti by N
                //    in each iteration, which allows skipping a range of randoms by simply adding a value to the mti property.
                //    By setting mti to a negative value you can force an advance to the next scrambling round.
                //    Since in this library the uninitialised state is not marked by mti==N+1 that's is a safe algorithm.
                //    When using the constructor, a default initialisation is always performed.
                //
                // Notes:
                //  - Whenever I say 'random' in this file, I mean of course 'pseudorandom';
                //  - I have tested this only with Windows Script Host V5.6 on 32-bit Microsoft Windows platforms.
                //    If it does not produce correct results on other platforms, then please don't blame me!
                //  - As mentioned by the authors and on many other internet sites,
                //    the Mersenne Twister does _NOT_ produce secure sequences for cryptographic purposes!
                //    It was primarily designed for producing good pseudorandom numbers to perform statistics.
                // ====================================================================================================================


                function MersenneTwisterObject(seed, seedArray) {
                    var N = 624,
                        mask = 0xffffffff,
                        mt = [],
                        mti = NaN,
                        m01 = [0, 0x9908b0df];
                    var M = 397,
                        N1 = N - 1,
                        NM = N - M,
                        MN = M - N,
                        U = 0x80000000,
                        L = 0x7fffffff,
                        R = 0x100000000;

                    function dmul0(m, n) {
                        var H = 0xffff0000,
                            L = 0x0000ffff,
                            R = 0x100000000,
                            m0 = m & L,
                            m1 = (m & H) >>> 16,
                            n0 = n & L,
                            n1 = (n & H) >>> 16,
                            p0,
                            p1,
                            x;
                        p0 = m0 * n0, p1 = p0 >>> 16, p0 &= L, p1 += m0 * n1, p1 &= L, p1 += m1 * n0, p1 &= L, x = p1 << 16 | p0;
                        return x < 0 ? x + R : x;
                    }

                    function init0(seed) {
                        var x = arguments.length > 0 && isFinite(seed) ? seed & mask : 4357,
                            i;

                        for (mt = [x], mti = N, i = 1; i < N; mt[i++] = x = 69069 * x & mask) {}
                    }

                    function init(seed) {
                        var x = arguments.length > 0 && isFinite(seed) ? seed & mask : 5489,
                            i;

                        for (mt = [x], mti = N, i = 1; i < N; mt[i] = x = dmul0(x ^ x >>> 30, 1812433253) + i++) {}
                    }

                    function initByArray(seedArray, seed) {
                        var N1 = N - 1,
                            L = seedArray.length,
                            x,
                            i,
                            j,
                            k;
                        init(arguments.length > 1 && isFinite(seed) ? seed : 19650218);
                        x = mt[0], i = 1, j = 0, k = Math.max(N, L);

                        for (; k; j %= L, k--) {
                            mt[i] = x = (mt[i++] ^ dmul0(x ^ x >>> 30, 1664525)) + seedArray[j] + j++ & mask;

                            if (i > N1) {
                                mt[0] = x = mt[N1];
                                i = 1;
                            }
                        }

                        for (k = N - 1; k; k--) {
                            mt[i] = x = (mt[i] ^ dmul0(x ^ x >>> 30, 1566083941)) - i++ & mask;

                            if (i > N1) {
                                mt[0] = x = mt[N1];
                                i = 1;
                            }
                        }

                        mt[0] = 0x80000000;
                    }

                    function skip(n) {
                        mti = n <= 0 ? -1 : mti + n;
                    }

                    function randomInt32() {
                        var y, k;

                        while (mti >= N || mti < 0) {
                            mti = Math.max(0, mti - N);

                            for (k = 0; k < NM; y = mt[k] & U | mt[k + 1] & L, mt[k] = mt[k + M] ^ y >>> 1 ^ m01[y & 1], k++) {}

                            for (; k < N1; y = mt[k] & U | mt[k + 1] & L, mt[k] = mt[k + MN] ^ y >>> 1 ^ m01[y & 1], k++) {}

                            y = mt[N1] & U | mt[0] & L, mt[N1] = mt[M - 1] ^ y >>> 1 ^ m01[y & 1];
                        }

                        y = mt[mti++], y ^= y >>> 11, y ^= y << 7 & 0x9d2c5680, y ^= y << 15 & 0xefc60000, y ^= y >>> 18;
                        return y < 0 ? y + R : y;
                    }

                    function randomInt53() {
                        var two26 = 0x4000000;
                        return (randomInt32() >>> 5) * two26 + (randomInt32() >>> 6);
                    }

                    function randomReal32() {
                        var two32 = 0x100000000;
                        return randomInt32() / two32;
                    }

                    function randomReal53() {
                        var two53 = 0x20000000000000;
                        return randomInt53() / two53;
                    }

                    function randomString(len) {
                        var i,
                            r,
                            x = "",
                            C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

                        for (i = 0; i < len; x += C.charAt((i++ % 5 > 0 ? r : r = randomInt32()) & 63), r >>>= 6) {}

                        ;
                        return x;
                    }

                    if (arguments.length > 1) initByArray(seedArray, seed);
                    else if (arguments.length > 0) init(seed);
                    else init();
                    return randomReal53;
                } // ====================================================================================================================
                // End of file hr$mersennetwister2.js - Copyright (c) 2004,2005 Henk Reints, http://henk-reints.nl


                Math.random = new MersenneTwisterObject(new Date().getTime());
                /***/
            },

            /***/
            "AytR":
            /*!*****************************************!*\
              !*** ./src/environments/environment.ts ***!
              \*****************************************/

            /*! exports provided: environment */

            /***/
                function AytR(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "environment", function() {
                    return environment;
                }); // This file can be replaced during build by using the `fileReplacements` array.
                // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
                // The list of file replacements can be found in `angular.json`.


                var environment = {
                    production: false
                };
                /*
                 * For easier debugging in development mode, you can import the following file
                 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
                 *
                 * This import should be commented out in production mode because it will have a negative impact
                 * on performance if an error is thrown.
                 */
                // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

                /***/
            },

            /***/
            "QsgX":
            /*!******************************!*\
              !*** ./src/app/Scrambles.ts ***!
              \******************************/

            /*! exports provided: scrambles */

            /***/
                function QsgX(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "scrambles", function() {
                    return scrambles;
                });

                var scrambles = [
                    [ // 1
                        "ERENIOBFBRLBNJNLHQJNL", "RHEMKHQHBKHLBPENFOHFN", "BKBDHJQJQDHCRFPMEAKNL", "NDHFNDNBDHECFQMLQAOD", "AMCNHDPDBHMKHKNRBEQ", "MFGDBOCEIMEOPHOHEOKB", "KQGQIEAKGANJBJMDGNBQN", "KPEMEOKQBEBFRODGEQMHA", "JDBNLBLNBDNCPIPKIRHO", "BDNHNENFBEOINEIOHCQJ", "DBLBLHNLQKQGQBMDRGOG", "KHKNBOKMEMKIQNKHFHPAJ", "GQIKCNKEAMECDHJRDHF", "DPAPBKCOAJHKRHRBRBHRB", "HKRBNBQEBKMFAPGFALIMF", "KBRKROKBEHMFHRKIFIMLF", "ECKQGQCQAKRCRARJHQE", "JBRGPEIPGQEBEHNLHFB", "KANPLPDNDBEQCHEGNENK", "BRKMEMENBMHLPCQEOGKQI", "OBPMHKMKOADHJNDOGP", "BMHQMBQHKHMIRCOCJEPNB", "IECQEGANGNKPIMDIMDOI", "JHQNJHQDNKHRFQOCKPKFO", "ENHFQNBDBJDGNFCKDAE", "LPHPDBECOQKIEBQIEGKB", "LQHFNLBDNEHOFAQEGQOC", "QHJQBQFNEQBROCOHPBFBF", "QHENDBKBQLQOIPKFROH", "QCQKNKAQNHEPILHPIJPI", "CDOBGMEBGFBEHJBJQDHQ", "KHOERBKBMKRIRGLRCMCRN", "NERKPKHNBPBJGRARILNKE", "OCJMIOIJNHKQHKANGKI", "OAOQANDHOHQHKHKNLBHK", "PHQEHPHKHMLRKAQKQBRDN", "EHBEREPHKEOAOANFIRCKC", "HEQHOHOKHBQILEAREBJQN", "QNAKEAENEQBRBJRBLREQE", "NHQAKQLHMBFQFHLHKNHQ", "LQBDQKNHBDHRDPADQHFMA", "HQKRBKRKGQOBLMAJPJ", "BEPEQOKMEBOLFMJQCPLIK", "EBNHPKNBKBOLHMDAFPLGL", "NKQGNIKHEGBRCMLHMKGEG", "MQJAILAMLMDNFNDKBHNBJ", "OCLQFPLAJHNKMEMBPEHR", "BEHQKERKRNGBFGFGQJCM", "QLFHBEQBLHFCMEAOBEBQF", "KGKHKQAQHENDIPERDNKG", "KBQGKEQCEGNFQGKIFM", "KPBODPCQDHENBPHORBKN", "BQHCEGNKENARGNFPCKCQ", "NHMBMEPEHEHDRJNGPNLID", "BKOKEOBPMHQFGRMJQEBOA", "QBQNDNLHJBNGMHDICPKPI", "QKEPEPHBEBRLGRBKRIDGA", "INRBGJCRADMRKBQHMBMKH", "KPKHENBOBKPCDAEPGKMAO", "HLHMLCMQCLNJBKNQFQBF", "AFHEPKCEPJREMQEHEKPB", "DHFBLBDNEHQMGCMJGJGNE", "HMCMIJIFPFNDBQBLHNBD", "GNCEQEAECNILPBMGMJHR", "QHEOEOBEQHALQHMHDQL", "KNKBNBFBJHJRAJRLRHNK", "OENEBENBMBOAEBOBRNFPM", "CEAIFBDNQINEKBQEGQ", "AOGNIDOFAHEAEAEIENH", "LMQFAKOJANJBEBMPHKOQB", "IMDALAMAOHQJHFQLBKNH", "LCFHODBHJIEQHKPHMBKHP", "KQEQFNBFBNECMFNCLBFN", "KNHBJNBKHNFCLAPKPLIMD", "BHPLOCRCIKPBPEHQKBOH", "BQJNKNJQLNJIOHBMECEM", "ENBFBQLBFQEOKMIMLRCJB", "KOBRKMBEHQJDAJOEPJRBO", "JPBGMRIDQDKINIKCNCKIN", "JMGDMKMPCPHDHNBHKQLNQ", "NLBDHENLHQDIFNEHMJNB", "CLAJCMPJRCHEKMERBKHEN", "CQIQNHECEQHOHAOJHLRE", "HKPEBOKPEOHAERBPMJQFH", "HNBEPKBOEBKDPNIDBODIE", "GFNGEMDQGEKBRKBKOBKP", "NJQIKBPLGFNBDHNBFHDL", "BPMKRNENLFGPFBQIDMA", "DNHLBKNBJDQIMKBJQAJHB", "KBRHKHEPNKRGKFAOFHRO", "PKBMBPEQOEMCJIREIMLCO", "HQKQKHDQNFQMHJHMF", "BEBDHQFHBQJCEGEPEHKI", "EQHJQHEGOKQEKAECGNEB", "LQJQDNBLEBOFNLGAOICK", "KQBMHNEBKNBDPDADAM", "EIQGNENKNHAFICNFOFBOC", "DBFNDHFQDHMKQGBDIBQ", "CNGODPKHMAKCQKCQIQHQ", "QBQBKBRBREPDQDMGNHKR", "RCEJGPBNDGENENEAGQGE", "HQCKINCNBQOEOAKFAQAF", "EMKEMKNHBNLBLAPCNJGQE", "ENHNFNEHDQNINGERGMHP", "COCLAIDQCFHLNHJQLHFN", "HJNJBFNBNJDAPEPAJH", "AFCENGFOAJBNLNJQDLNQ", "NAQIKBEQKINFRFOIMIFR", "HOIFIOFJGFQHQFLQHKQL", "QBNJDBNJQFGBFBLOGOIF", "HQEIEIKQCKBRDPJCQCDNJ", "KBDBFQDHNHADODQNBOG", "AJMBDJNDAHQKBOKHMEHO", "EHPBQNBKMKOLCMCJHRBQ", "HNHMHOBKNKMANJRLEBPM", "FGFPEHOAEGREBHMHEPHEK", "ADCGMCGLHFREHOHMENBPB", "EHNHBRKNKOFNDGEIPME", "DCKNQAHPLAQKCIEQIQIQ", "DBDHBKHFQNHRALPEQENB", "NFHDHJHQLEHMFQNGPE", "LOBFAHJQCDHQHFQHLBHK", "NGQGKNKHQCKRKECFNDM", "QHDBENBDQBKOHPBLIMHE", "LHLNJQNJBDQAERLOERNB", "NGJCDAMIJNECNIQIEAN", "KMHPNHKHKCMDIAOIDIR", "HMEPHBREREOJOBLALCQLE", "DHQJQLBQHKBODALEOECLN", "DBQJBNEHBLFINAQMGMLBE", "BPMBMEBNHOHDMKBOFNLC", "IOQFCFMKAERHPHMBHEKR", "MENKPKHPHPCFMIPDBKME", "EBNKHNJBLHEIALIMJCPDO", "MEBPMEHPHMHLMHAKMICOI", "KHLNJPDRBQBNAEGNQHN", "QGAQNCEBKEQFRHPBQAK", "NBPHKHRHBPKFPIRFRIMCN", "HQBDNFNKQBQGKNGNCOGQ", "ANKAQECQGKIOHCJHJBK", "QLQDBNDQKHKMBOAJPNJRN", "EQJBJHKHNHCMDPHBKIR", "KRKOHEHRKEOJPFODGODIN", "BQHOHEBOHPKDGEINCFNB", "LHJRAQDOEIQEGEIEBEN", "BOKPHRNKPBLOFQKPCJCL", "KPEHKHEPOFGMIPOEARE", "NGKEINCKQNCDHKOCEGCD", "HKQEQNCKHQAMLARCMHKF", "PKPKBEMHQHOGJAROAJFQO", "QGENGQKQKAEROGJGEBPO", "BPKRENKHNEOCMBLMKNL", "LHQDNKHNFNLIBPNARMILF", "KBQEBFQHFQDIKMANHOHCM", "JILOIKGEAOHNKREKRKOE", "EGNKQNEAQAERFHLOJFPNC", "LAOHJGJAIOHKMBHKMBMK", "LNLQBLHENFNCNLGPLFQFB", "APBPDMEBLCEMHMHENHMEM", "DNQAOAMJRCOHKRENEBPHM", "QEHEINIKCKAOLDMJCFQM", "QEAKBKENCKAJHKPNDHPB", "NKBEHRHNHKQGRMAPFIDGM", "ENHANIQCEQNFOFOCNDQ", "CIMKBQIKADHQJBJNQDBF", "PHEMHPEPHMGNCPGJFOFRC", "BRKPEHOHMBKAJQIPGMHPC", "EIQGKGKEGQEROADRIBLRJ", "MKOEBENERHKDPKGCOCRLN", "PEHOHEMHQKOLRDMAQIKPE", "KBKNCKIQIQKMEOHDRNH", "IOKNAJIELHQINIKGQHK", "RBQBKEPKPKIMEHNLMCNL", "DBQKBDQLEBFAEALQGFODO", "OHEBPHROKOAJGMFQLARIJ", "KHERKBMBRKMIPNFMFMGC", "OENHPBOBEHECMCPAFQHKN", "GKEINIKQKNHOAOJGEQB", "ERERHBNHEBODOGQEMDBFP", "MEMHDOGMIKMBHOKPHENB", "RHMHKBKEPEPDIENFMKEOD", "QDHNBDNFNDMIQCMHLBN", "FNRHPILOJBQBEAEKNGQG", "NBDQLBNFHQNGNIDAMCQJ", "EQHEQHOEMKAOCQCDOGPE", "FHDBFQHQFBPGQJQCPCQE", "OKOKQHPEBEOFNCFCPOLP", "HDCOQFBDMHJBHFQKHDBF", "MKMKNBMBOHNDBJERGEMCF", "NENGKICQEAQOKOEAKMA", "PBOKPKOHRKOFIRBLQGREO", "KPHEBOKOBKANJHAPEBLI", "BMEPNKBKEPEILGKHRDBEN", "HFQJNLEBKQCMHDRINIMF", "KBDQHJBEBQBMLIKROLPH", "NHDNEHNKBNFADBRCEHJ", "NCERGMFOPCLNFBNBEHQFQ", "RHKPHKNKMHPIJBOGLGPHD", "KMHEPHMHPEQCDIDOIAP", "DANKARDHRBHNFQEHKHDQ", "QBQLDNHFHBLMAEGNLPMHL", "BJPKBMQAPJRKBEQKRBOHK", "PBEHKQHEQOBFHBOHCOAE", "BOHBOEOKBOBLHKCRAFPBN", "LOIKMLIQCDHEHEQLHLN", "ICEQGEANEGKFMLNFAJOH", "HBKPHPOBKPCLMFREPLQI", "NAEAKICNBRLQANARKGN", "LFHJNDQBDBQIFBODOLQN", "EQKBNIEBKNEPDNCPHEQCE", "QHRHKREBQHRLRHLAPJRHE", "HFQNBDNHKQLANBDMHJHL", "HKBQKEOKRBNGPNLERNLMC", "NLHQJQDQNBFRINCPKPNBP", "KHKINGKNIEQLQEPFRMJM", "BKBEPNEHOBLQAECRFHFO", "NBKEPKBKOBOIQFMERGDQ", "QFBDHFQNBQOEAFRDRNB", "GOKREAKMDBKHKHNHOEPK", "NEPHOBKMHERIFODINCOB", "KRBEOBEPKNHCLMJRCJRHP", "HKRENBEHNBQGPBQEOIMLP", "CEORDPDMHQHNEAKQEQ", "QEBKEBMHNKHLBRIBPECPC", "GKQGEAQGEQBFRHJCQJGMI", "CJINBPGFBQBKHOENHER", "KNBRHKQKBKPAFOJHLRKEO", "KRKHKOKOBEAQIMANFIBRI", "EPKHOHPBEBNLOIQBFOBFB", "RCECKNLPLAQKHEMBPEHEN", "QIFKODLIOGMKMHOERKPEH", "PBKBKREHEBLCKMHNLMHN", "MEAFNIQJINLBJBNHNFBJ", "QBKQMBEBOHECFRNGDPDG", "HJHENLQLQFQIPNINLIPDG", "BKOENKMKHNKAQGLQGDGDN", "FGNJBLINBJNQEPEHPBNEN", "JNHJHFNDBKNCKBPJPHDO", "OEHQKMKMKOEGECPBFPOBK", "NJHJHENFBQOGLIKFPHNF", "ENGKHCEQNHRDGODPIPA", "IKGQAEBQBQKMGMFNBDRMH", "JQDHQNBFQEOLAKHNCJQA", "ENCKIEHQEIFPDAJAJHEM", "QHBDQFQNKFGKAFADIE", "QHEOEMKHKBRALEPGLPOHJ", "RKHPKHMHMHAMIQHJBMGR", "REPKOEBPBRODCNIOCJRGB", "BEBKQKOBPMHCOHBOIDPBF", "BMJGPIMQLQEBNEKOEMBQ", "PKMBKEQEMBNFOECKNARFA", "KHQKMKRHKHLGRBOIQEMFC", "BQFQFNHLQDHOECJAJAKCE", "EPBKNHOBNBEILBKMBRLHE", "HOAHLQCOHEJQJNDBLQ", "NHBOBEQNBKGFHDRFNENJO", "BQKBRMHPBEOLMIFMFILEQ", "PMEOKMHKNBFMAFPFIMKI", "BPKHNEOKENCDHAJGNERI", "NBNHBLNLQNEANBFIOFQNA", "LMCKMHEPLQEGEBNCQGNE", "HQOEQKHRBEOIQHRBLOKGD", "GNGEIKIEIEHLOLFMIJE", "FHMHMCIMCJHNHNKNFHFH", "BQHKBJBLNLHPGJPDPFOBD", "LNDHNEHNBEOGLILRMJD", "CMDRAMEOGKQEHEHPKPKO", "DKCEIMHDOGKAQCENAQKA", "EQHNEBDNBJNAKPCPOEBPE", "NCKNAKQNCRIKFIBODN", "EAKGKHQKCQBLFRADQLPKE", "HNGQCKQANANLDMCKERCDA", "BOKBPHNBQEPGMJHLGPHD", "KNHBMHOKQENFGLPJGQLN", "QCNGNGQEQGQMLGPGJRNF", "QKBNIQKQNICPKDGBOEQL", "EBQNAEHQBNJRHFBMCQF", "QMBEQEPBEMGAPLCRNAR", "CKNIQINEQEARKILFMJBFM", "KEMKNHKNBMFOFOAKPCQE", "BEBOEPEQOKNLQAFRHFMF", "NGEIEHKPFNHKMQKPBPEH", "NBKREOHKOBQAMCLOGLMHO", "JNLNEQBLNEBPIOJBRCPHL", "DGEJBMLIMDHQHFHFBEBH", "KEOHEQERBEMFGQAKAQOGN", "RHOEMKBQKROLGQLDRDGQC", "CQBMEILPJNAQAGKINGN", "PKBEBREQNBEIRECJCJQM", "HKOHKOHQBRCEHNLAMJAD", "EQAKCKEGNGCPKGLERLHKA", "BPERHOHMBRLHJOKIMHQE", "JGODBPFHLCNGQEHNQCNK", "NEQAQCKQINHFHKAEOCQ", "NJCRAEPKMHDBNFHKNHDN", "HRKRBRKNENLQFPGCPKRA", "QJNFHLQNBLCLMCJNAMFN", "MKBIERCLCEIEBNEGNEC", "KOLOLIJGLBNQAEGQKQGQ", "DHKDNHBLEHEAPNFGALFGF", "QKERKHPKNKPILPKEMJQKC", "NJQDBFQJBNKRJMBKIQOGP", "HBEPEHOEMEMAPJHQODPE", "QHQBKREMHOBLMJICDIMFB", "AQEICQGQNECJRBEQAMFNB", "HPKQHPKEOBPFAQBRBMK", "BKQDNHLBQJCENAMAQCM", "EBNHQLBNLNKIFMEHAKPG", "FKBPLRJHRAEHNQEAKCQC", "DGMCGOHMCDNHKBQLNFND", "MBRKRHEMENBDPHARHNFRN", "IEJIJMEKMKBLHQFQFQBH", "KHLBMKGEPDJBDQKNDHQD", "KPEMEMENEOEILIBJINKFH", "HKQLNLNHFNFPKRBJGMHL", "KHKBOBEMEQOIBNDPDRKEO", "KFHQLBFHNFQIEPFREQBKE", "EPEOLNELAEKMEKHMBKOE", "NECOGFMAENBNIKCHKH", "QOKBEBPHOBOIPJGOFMIE", "EQGKQGNGQKQMFOHOECFP", "KBQHNDQLBOIJNGCNKCO", "HNHEMKMKOCMAFCMEQOA", "NDCMRDIPCPKOHRBHOEPH", "HQEQJBFHBLEOGKMIMEGK", "EIKGEAQCKENDOJGLDIOJ", "MKQMBKEBEQBFGAMCQCRCN", "KQHJQBNFNDHPCJCPHJEM", "PBOBJCHMRCEHDNQFHNQJH", "KIOJHQKRCQERKMBHMBEQ", "QHKQIQCKQIBLDMAFHOHJB", "BPKQOEBKEOBFBOIEICQO", "LIFODLOLINDHFHNBFBKH", "QFBQBLENDQNGPNICDQIKD", "KNHNCQIQANGJMAMGKDNF", "KQHENGENKALGLCPIOGE", "DJNHLBJRLCEKNKGENCQE", "BLMANIFMDKCNKCHKNKNI", "NFCKCPGNLREQKMEKBRB", "LHBQNKQLQNERBMIMLNHN", "NLHBFBJBKFOGQERFMFBK", "BPEMBQOKBEOIJBRDCOBOA", "BPEBMEBQHPEGBPMFRHROG", "NEKGQGRJAHDHEBQFHDBF", "FGJBDHLCMEBEKGNKQCE", "EQLQFBQEQDBOEOLMDNDI", "NDHPCKPHMLQKHNBNJBLH", "HLNBJNKBNKBOJDOCRCFBK", "CERIOCHOCDLNEHLNBFBN", "DNBJHBNJEBERLRILBLN", "MDAHPERCDHFKNLQHNQK", "LIEPHPDQGNDHNFHDKHJH", "KGEANBQNIEBLDMBFINCKH", "NDMHQKCJQKQGEBINAEQ", "EQJNEQBEHNDRDNKDAFIA", "KEGNENGNBPBFRBRCKC", "HKHDNLHQKQIMIDRIRLQM", "AQHOQILRLCKBEHMKNEMQB", "QGPGREOILPHMBHENKOBQ", "KBNGEICNENFGNINJFO", "OEBOEOBMBEOFQHRCRGOIO", "HQLHLQNKFBJMAJGMHNB", "ECNCQKEHNKADPBEBRDGNE", "HRKEQEOKEQHCNAFGPCMB", "OFMLCFMJCNDQLQDBFN", "KRHKPHPBOBOAQMFBNBPDA", "KBPHQBMKEOKAKPCOLMK", "PKBMKRHNKHBDPMBLIOLGJ", "NFNEGFCMQAHENENGNKN", "HFQBJQLHBQFAJOCPGEGMD", "BNGNGEGQNEPGPJBEHAQ", "EBPBEPEBQOEIEAOIDAOFI", "MEBOEMBOKBDMLGNEHRBMG", "APHJNBLMJBMPBENBRHMK", "RKQBQEOKEHOFCKPHMKGBN", "KIKECENIECRFGLBOLIF", "QBLHLBKQNBMAQOKHMJQN", "HFNFNBNKBFHCQLNDNIDML", "ALHLAFPJPBLBHQBLQBF", "IKIBECQNCNERLPOJGKFM", "MHLNPGDIRLBHFQBQLBDB", "PIJMGMAHJAHKBKBNBJQHN", "EBRMHBOEOEBDOARGFQHJH", "LARJHQJOAJHDBHFKHNFN", "FBKQHDBJQEHCERENIBJIJ", "BKGQKIKICKNDHFICOIDM", "BFOJNJIRGKMPEKMHMKOB", "QDNJHFBJQDBRNAKPFIQ", "BFNENDNBLHREOBRGMGLGO", "KPHQOBKQEOKDNGKPBQMLN", "DOHPJBHFAHRBMEHRKNEM", "OBNKHKHBPKPGNIQBJOLO", "QGQNHEANHQNDRKARFALQG", "BNERBKEMHRNLHJAKOBNFN", "EBREQEMEOKCJPIMCQAJHD", "JCEHKNRGRBDQHFBHNFBF", "GNAQCNCQANIJMGPFMHRG", "ECKQCENIEGKOFPOIFNAK", "ENKIBKEQIEGRGOFNEQHB", "PBEPGNFMGQBQLBENBND", "AHNBODKPKAEOENKBQKBOE", "PHFPFAMRDPHRBHKOHQHK", "NKPNBPBKMHKCMDIEAROIK", "QFQKPIRDRAHNHOQEKBMBH", "PEPBRNHNHKOLFMEGRMLAN", "QDNDGKPARBMBRHMBHMB", "BKMEHKQHMKQINDPIODPJM", "OHMKEOKHNEHJBRCLMKBDM", "QKAQANANHNLDMFPKPL", "QEAKHNKHQKCPHDIQJRDO", "OERBNBMHNHMCMFMDBQERM", "NKHEOHPOBKFMGCOGCNLH", "QKEHBOKRNHNLHPIPILRGO", "EOHPBNKMKNLAMCKQMJ", "CDIKMDIDOQKBQGQIKIKB", "KMHBPHKPMEBDGBDBQLDRF", "LQHFHBENHFIPJMJCKPGB", "RKERBPHKPBJNLPLGAMINA", "BEQLNJBKQNHPLERBMDH", "FKIQJNJOIQFBELQJQBHD", "REQKPHREBKNCFQBKBFHF", "PKMKNHBOEOBLMKBQFOGOH", "MCPBIPJOIKRHREPKREB", "NBKBKAENBQCOLAOALQECO", "CKQIKHEGQKGMIJQLEQC", "QEPBPKRKPENGBNKDRFGQE", "AEAJRGFHPJBNHJHDBDNK", "MQADOPDJAMKBNBHLHQKND", "EGDGFJAKAPEHLNJBQEHQJ", "HBLDHFBNDHFIRLOJMJAPM", "OBEHKPHKEPBJBNDAMCFRM", "BPEMHRBKOKPIRINLBNKB", "OBOKRBKREMBFOEGMIMEPF", "HKNLHBJCOHOIKCFI", "MHPEOEQHEROIFQBKMBJB", "CNIFHDOCJGKINHENAKAQ", "AMCFGFOIMCKHKNCKNGEQ", "FHLHMDBNAHENEKPKOKPK", "KMKQMKBPHRBDPNGBRNKQO", "BDHJNFBNBDBRNGKIPHDO", "GKIMQDMCLNEGECKAGNEG", "APBILOLGPLOHEPBEPEBEO", "LBNKBNKHLBJOJPDIMDHMG", "QKEOEOHBQBKIBJEIJIAK", "BLHQFQEHQBDIDNBLGCLOC", "ECEIKCNKIKCOGJMEREHMB", "DQJQHQNJQBKRGNHEAQMHF", "ARCDOEIECKBOEMKMHMHP", "ERHMHOKNKEMCLGPMGQEOE", "HKBEMHKMKPNCOLMCLIMHM", "EHRBPBMHKPIOJOGMKCJN", "BNEHKRBMEPMJNKBFIEOGC", "LBDHJQHEBEOCDHRHMALF", "PKNBEOHPHMHCPAJPHEBO", "EHKBQEBQERBFIOHRENEO", "BKHLHBKNFQCEGMJRJRIF", "PKEOHKROKRBDCOJHEQOGJ", "BRHOBNEBNKNJMDAFBPDHF", "JBPARDPCLQBPHOBHEBHR", "BRBKNHMEBOFMJFCJRBMA", "LIJNCQGOADQLBQEHNLHJ", "EMCREPCDPLBERHENKOHQH", "HBPMBPHRBRODMHOFHFGB", "AKCQCQNEAKCDRKHPNJHDH", "QJNBJQBNJQNAEOCLMIOBO", "RCMCMPBILMKQBPHOKRBE", "HKHRBRNBQBEIQGLQJEHBM", "OHMHKBRBENEARLRJQLHN", "RKNEBOKEPMHAMIKGBDNF", "QKMHEBKOKNBDOEIKIQGAO", "MCDJQLNQCKQBHOHEOHEO", "HBPNHKERKQBJQNLMHEGQB", "QHRKBEHOEHNJRJRAEGAO", "HPERKHKPOLMJALNCJM", "NDBOPAKNPEQHDKHNLNBL", "GKBNKBEGKQKDCFHAPKDOA", "JNJQJNFQDQJODOIBENGOC", "QHBKOBKMEBPDGKRIPHDAM", "RBNKRKBMBMJFPGLRJMEO", "HRMEHEMKFBROLILOJR", "JMELMALOANQFLNEJNHQ", "INAQKQINEIQLHJMLQFPF", "QNDBLHFQFNLAFPHJBLFA", "RHBEMBPKHKNIBPDIADPKC", "QHQHOERKENLOGBOKQARM", "MCRBLNAHDHEHRKHPBKHP", "HFQJBQKBKBODRNLPGPMD", "GOBKILGJNCKQIQGNHKC", "NENKPHQKHKMDHCEQJOGRD", "KQMKMKHQOHBLGOLPGPOKA", "EILAGOKIMIECNAECEKNH", "JHDNLFNHFNFAPOECEAQGP", "FQBJDQFQHNECRLMFIKMGF", "NGKHQKNENGQLCFBPHLAN", "BNAQIQHQCNCOKGLBKQNI", "FMAHLQARJIMBQBMKHKPHP", "OENKBKMEOBECFOBERHNDM", "MBQHOBNBMHNDOFOCNCQLO", "PJOBNRFMECEGNIKCEKN", "BKEBPHBPHOKILRHKOLIRB", "KHQENBLNJQGQODPCQFRG", "JQHDQBQBDHKIRKOGFMBM", "HKNHPBNEQEBFRJMLFGRLQ", "MBMKBNERBNCOJQHOLQL", "KBQBPBMBMKPAJRLMLPLHB", "BPBPMHQHKHECKRHCFAFH", "PKNHMBPKEPLHRDAMARHL", "JQBDNJHDHQJPBRIQKNAO", "NJQBLNJHFBFMCJQLFRKO", "NHQKFQFQHNJIBEGMJEGD", "KNJNBQGERJBNRBEOBRBPE", "HEBRBEPHREOFAKRIOLPIC", "NHKQBEPKRENJHOBPIOHDB", "RHMKHERBRBOLDPIQIBNL", "REPMHEMERKOJIEIEPILPJ", "BJNLHEHFHBEGKDCPFQGKF", "ERBKEQEREHMFPGBMGQBJI", "MHQHKHRERHNFMBRFBOGKO", "DMBPBHLQANPBRHENBKRK", "KBNBLNFNHNFADQKGDHAO", "LOIDIFGDNKBNEHDQBH", "BMKOEBPEMAEODMIDRKE", "EPOHNBKRHNLCEPNKMJG", "BKPKQBRNEPHFBFHQHMGRN", "NCEGDMGFCDHDBHQLNLBK", "MBELANBJCMEKNQHLQLQEH", "QBFHQHDNDBKCQMDRHKOBO", "IMHOIPADOFIENENBEQCQB", "QEANIQGAEGNFBPKALHJ", "KMPIFMDIPDBNQEHQLQFN", "BEREHNBPHEOLOANAMDQM", "HMEHOEHPKEPGPDIQJDCJC", "QKHEHEMEMEOJIEQCFNAOC", "KQOBKPKQEHCNAEOCFQKH", "NDBQHBDBFHKRLAROBNCFB", "HMBKNBRHNEILGOKQNAOC", "EHNKEOHKPKOGNGQGFODGC", "HQKBNGNIQGKMFHOHKFND", "EPHPHBMEBKRLENGFBRIB", "KRKEOEHBEOECFHCDADIMI", "ENLNHJHLHQDCOKEIPGOJE", "PKBEBRHQBEOJCPERKNGRF", "KHRERBNBERDAEADRMFGB", "NLHDNLHQLQKAPNKPICOJO", "KQKEIQCNHKADGMGECOFA", "EQHPNBKMBEHARLDMJDRIA", "REOHKHQBEOLRNGKRBJDQ", "HRHBKBOHRBPCRARLQHDOD", "BLBFBQJBQBEIKPAENERGE", "BEIKEHCEQECPJMLIRJAJ", "NHOEBREBNHOAECPIJGLQE", "NGRDKPADJMBQEBDKBJBHE", "IQHKCKIKGECJPIEIQBFG", "PBPHERHBRNCQJBNKPDHO", "MKBMKHKEREMINGQMLHOLF", "KBQKHERERJRKEPIQBN", "NBENEMHPEHNAODIDRAFPG", "BDHNLNBJDQDCKMFCOAQDI", "LQFQNEBNLQLGQFOJFAKE", "HEBQEBNKPHRCOJCNDCKMF", "EAMFCRFMKIMHEHOEHPKMB", "EMHOHKBOBPMJRJADOHEAK", "PKMKOKBEBEMJARBFCMEH", "MKQHQBMBEMBFMEMFPIBRM", "BLHNJHKHNLQINIMGPOEP", "ERBMHEBQKPNGADGOHDQMH", "FHEQLBDHNDPCLRFCKDC", "HMBPNKRHOKOIMAQGDOEA", "QBNBJNJQKQDADQHJBPJEB", "DNDBODAQAMKHQHOEBMBM", "NLOGPECGFANBEHEBERKNK", "QBREOEMBMBEAPMLRFRFGE", "EOHOBKQEQBEINKIFOHJE", "KCKINEAKQKHLCPEOANJO", "QHRENBEBKRHAMDGOGDHFA", "QBKNBPHEQKMJFCKREOIOE", "IKCEQAQGNECFRJAQHLBFC", "QOEHKHMEMHEGNLGEQFOD", "EQBEQMHOBKRIPJHQBMKEO", "AMLIOCOFGEQKQBDJQFBF", "HDHJBNHFBEHMBQCKIKOBN", "BREPEMHPBNFPDGNGJHOB", "CQGKEINGQKDIANHOIFCO", "RHREHBOEOEQFQCDBECLPL", "EJRBKPKNIPEBOKBRHNEP", "HOKNEOHRERJRJBLOGRJB", "KPKOBPBKPHOCLMKOLBMB", "HKQCKNBNAKADBQJMBJBD", "RHFBHPJOBLNLQHDNEHD", "BMKPNKOEBOHDIEIBKMEQ", "HKEQKRHBOHKDMEIBPMDPB", "KIEQNIBKGNHPOJAJEPML", "EQEPBKBREBPIPFOHANHCF", "ILIKIKNGMIECQBNAKCQC", "GLHOQBGFGKPEOPKOHEBN", "QJBQHFBDHFIFBPGMAEIR", "ERBFNDKCKMEBEPKPBNB", "CDGNDIEMFANBQCKHQGKC", "QNGNCECQGNCLHNLPKRBO", "EBMHBRKPEBPLRIPEBRID", "NHKGMBIQFPBQKOEHKMKO", "EBKPHPBNKBMFPNJFOCQFR", "EAMBLMLQIQJNEQHQDNFB", "OKBOKEOEHNKAOHOAQFPA", "DQBQDQJHJBNANEAKOGKO", "FNHQFQENLNDPARGDIFNKO", "LMDOKBFQIDQJBJNDBKBF", "CEPJBOPDODGKHEGQANCNH", "PHDRDLAMRCQCNEGNIQIE", "QKHNLBNJQFHMBDIPKARIE", "LFQBDQFNJHQIJOKNLNGP", "QKHRBQKMKHNFBMHQKIOBP", "HQHOHKRKHKPIKCRLROBKO", "QCQNAKQBEBJOCJNGDIF", "FIELOKHJQBGQEKINAEH", "OGOFNFIDMENBEHNDNBHF", "BQEBNIENBQGJBFHKMDMJ", "KMEHOLOAHNAEBNIEIE", "HFNHFNFQJQEICFCFIOFBM", "PBKHBREOKROFOEHCPBJA", "PHEHPBMHEOJIBMKPANGF", "FQHQKBFHQHJOIMGQMKFQM", "KQKBMKHRKQLHOBPFNIDP", "NEQIQECNKEHFBMKAOAPF", "EHOKRNHRKMCNEPJGBPIE", "KCKQCKGEIPKDOGDHA", "HKOENBMEHMKGKPNGNEOL", "PKHBPBMKOHEIMLCRJMCDI", "BQHMEQMHOBECLNFCJPJAM", "ENHMBEIDREPERHPKHPB", "EOEPENBMKMHLRCREHKRFC", "HKOBKHERENCNDBFMLOAJ", "KNHRBOKRERHFMIFPMFCOC", "MCQDGOCIENFQHNFQDHK", "KEHMEQOHBEBDAFAJANBO", "QJHBQJQNHLHAPNINDHOAF", "LILIDCRFQBGNECEQKNC", "LNLBFRHFMQEHEAEKQEI", "BEHMBMHKHNDCJGQLQJOCL", "GNKQNIEHEAEMGQJNCKAOL", "EBJQKHQNDBLGMHRIBDHBN", "NHEQEPHEMHDRAQHJNEOB", "KDBQKNBNFBMIOGRJPH", "PKHNKHPEBNLPIJOILDI", "FRFNIQBMHJNKQFQFBLH", "MEHKOKMAEQDQBNLBEQE", "OBPHNBPBEQNCFHRFOBPEO", "LQHJNLHENFNCEAJMILHF", "QNLBQHBDBKQGKEIOAFODI", "HNIQCENINHCMKDMIDBRKC", "BEOKPEHOKHPICLIOCLQC", "NKFQDHLBLEQCPKHLCDQD", "BPJAOAHLPDMREBQBKNERK", "BFBNJNKQLNFPBJIMLIAPO", "EHJQHQBFQLHCKCJEOLRA", "QGEQENBENENDMFAKOAROA", "OBEBRKBEBQOFOKAERNEMJ", "BDQBLFHNLHOJQCNAODRM", "HQIQGNIBKNBLINEHPGRBK", "EGFHOALGNCFBENBNJHKQB", "QEAEGEQNHNERKBJRBENDC", "BQKMEBPKOKMCNGMKOKHFA", "AGMIFKQGDCQAEBNEAQ", "EBKMKPBRKNHJHDOADNEAL", "JPBGNEODMHMHMKPKREO", "JPGPINECFHNGKIQCKBQI", "NCQNBQIKEBQJMBRCPEOCE", "LHFHNHLBEHEAMEGANIJND", "QOHQBOKEHEQAFROIEIMJ", "KHQBRENERBOJNIQCLGRGF", "HEINGNIKQGKMAFPFQHO", "BQHAQKGQKIMIMIDGDC", "HFQDBDNFNKGDRDHJGQEM", "KNLNJQHQFBDRHOLQMLIOH", "OHPHBQHPHKMJNHRCPENE", "OCKGOKQAPBNDQKHQJBQD", "EHNEMKOKEBNGOKIJNJFQB", "BNJMQAKAIDBKRBPHKOKRK", "KMBGEOPIOQEHNDHLHQDK", "NBDRHRJIOPGECKQEKAEIN", "GKAKHNIQEAERJMJRGCO", "NHOKNBMBRKHJQBPAREHA", "BLHNJEQNBFQOAJPHPGJM", "QKMKMKENEBRIERDAPKIN", "BKOBNEBPNEOJQMARMGBRG", "HRERKRBPHKODNHCPBKPLG", "NBQMBEPKBEQARGEOGODP", "INHDOLAEKGFBDBHLHJNLQ", "OERBKPDBGEMEHOKMHPEM", "DBJQHFQKNFHMBOHNJDAM", "ALHMFGDAPEPKHMENBHP", "EQFHLNBNDHLOAENHAFHE", "PBRHNEHMEHMJGPNCRAQLC", "CNKHKIKNKEGPIPFAEID", "KRBEPKOKEHCRLRHLCERN", "QAQGEHNENEAFRLHRKQDGB", "OBKPNEMKEBEIOHMBDPCFQ", "BOKOKHKEOBODRNIOIDOD", "GAKQANCQEQNFBMKBFRKI", "JMIEOBNDRAHQBKQKQBMKB", "EBEMGKCLBMBLNFHJNQHQL", "FNBDBFBNLBLRLQOLGDRKD", "QNBLFBQFNFIMLNGQAOJC", "FQFNKBDQDBFGDGJDGJHQ", "PHPKAEHPGDNENHQHDHNQ", "FANDIFBMFAHEHFHJNDHNE", "EPKBNHRMBKMFGLERJNICO", "MKRBKPBMEOHAMIPDARKI", "OIMAJOEPLIKBKQCQECNB", "PEPEPKERKNHDOAQCNFRBE", "NKBKBMHNBOHDQOALFNLB", "OBKQBKEOKBNJBOKIKODRB", "HNHKHBDNKNFMHALGEPKGE", "RGJIOKALCKNQLHJBHNJB", "BOHPKEMHOGOHLRLOIKA", "CHFBMKADRDQHDNKBDHND", "PBRHKMBEHOHCQIFPEANEN", "QGBEAQHAECERALCPNHKN", "EBMPAPJOIEPEORBMERB", "RECECOCRDQBKNGNINCN", "BDQKDNJHKBLOFNIREPHCK", "KBQBOKBEBPHCMHQBDHOJR", "BNJNBLHKQHJIMIQDQHNB", "FHJBQKHJBJFPGBEHRKMIE", "FBDQBLENHFQMDHJOAEPGK", "HFBJNKHQDNBPGKBMEQCJ", "EQHEQBFQDBLANGKDMINFM", "EIKHQGQAQKNDOBOICEOG", "REMKPHBRKBOFOADQHQDR", "KCNAKNEAQIQOJMAFBKN", "BNKHDHJNEQFROLGLMIRLE", "RAMCPHQCHNDQENBNBEH", "BQIRJNCMKCQHQAKNQGE", "QEPBOHPNEMKFNDADMFBE", "HFHBEHLHFBKPOFNIRFMEH", "ENJBLBQFHNJALEGLOBQIR", "QKBJNHQFNHNGMINHBMIM", "HKMBPKOKNHEGERJMFHJM", "LNHNHLHLEBLRIRJCKCKE", "DBLNJQDNJQFOCMHFGLGLB", "KHBNHOKEMKODOGERBFCK", "LHQDHDBJEBEAJROLEIPDG", "CKQIKCNEINHFNGKDIJMJN", "QKOBKHKQEPLPLHQNDID", "HQLNJEQLQAOBJNGROILC", "NAOJPGKRJANEHRKNEHOKH", "QKREMHEHBRKAENLGLEBQI", "EAENHKQCNHNDGQKHMAMHM", "BQIEPLNDCOBNHJNJHDBQJ", "AHMKAEMFJRKQBJNFNHDNF", "QENKDHNEQLQAJQGERLGAF", "BKHQMKHQEBQCMBPDQHOK", "LQEHJNKBFNJCQHDNLMJA", "HBNEBRKRHQBJGNLOHOIB", "KOEBMBQOBOEGPDBEOIRI", "HQFHLNFQDQHRLQJEHDCJM", "HENBQHLHBEBRDAFQJRLFA", "OBRHMBRBRBRALQJDHOLHD", "QBQKFQDBJNAFHRFRLRGEM", "NCNGKECEINIPJPGDPBJP", "HQHDHBQFHDMJQCDOAQJN", "GBNIKIANLCNAKPEPC", "EQKQGAQEIQGJMDCKDCMDI", "LBNKMAODCLQKNQLBNFBJ", "EIEGEHNCRHDQFRGNA", "BEQEAQBNAEIPAQHJRKOJA", "OBOENKMEOBODHJHAFADMJ", "BEOKMBKPKMECNGADOARK", "MHKHMEQOHNIFOFOHPOGO", "ADRIODPAMEHQEBDBNLNH", "BENINIAEGNCJGQOGDNGQ", "HKREMKRKQKMFIMECOEGF", "MFCPAJMPCNPEBMHNREBK", "KPEHOBOKPMCPODOCOFC", "MPCEMCDCMAKRKNEPEHOEQ", "GNIEJAKADOEBEPEPEKRK", "HJQKBDBNFQNCKRGDNJIKB", "BNKNGQGCNBEMDHPCJMLCE", "KQKHKRBENBOJGEHQOAFBQ", "HEHNEMKBEBMGEGJRAPHRA", "KHRHBROKMHEGLMEPJCKI", "BDNRCEMDKGKPBHOHKREHN", "OENFRCMKGEBELBNLBHL", "MECEHOQAMJHQHFQLHQHE", "NJHNJHQKHQDGQCPNEMLNC", "EOKEPNHKEROIMDIRMIDR", "QNGBKIKNIKALNARFAFBR", "KNDNHBFBFQEOLIEPHEGQN", "LQEQBENFHEIROBOEOILA", "KPHQHMEREBMJNINGRMCKQ", "BQDQNBNJBNEAEROLAJOEP", "KBKOKRHRMBNLIPENJMGLN", "EHBEREOBEBPDPCKFCEREO", "HDQDNBNEBFRALCLMDIBQ", "RBKRBPKQBKMLGRAENIAL", "BRBRHREQBEMLPIMIQIQNH", "EGLNLGFGNHNDKQLBKQH", "HEAQKCNAEAQDPMKIJMBRE", "HMEOEBOKMERGJNLPHDRN", "QFHDOAIPLBPHOEQEHKBN", "KHJBENFNDHFGJRLADRMD", "BNHLHJBFHQODIAMCFG", "QKQGNEIEQHRLBOBQOEP", "KGNJBPGJIMENDBHDNFHNF", "EHPBPBQEOHOJQHBDNIQCO", "MBPBEBMEQHBJNFPLMGRE", "GEAIJPIKRDQJNDLQHFQH", "NKMBQHBPEHDCKAJNBJR", "OHKOBOKBEHBFBROKARCJ", "BNKBECQCENERCODBOFRH", "BRMBKPEQIPINJQMHKA", "KCQGEQCENFOHPJGAOG", "NKOJIQGDOQBEHKQBKGQK", "JHKBKQBENBRGLQMCEPJ", "IDPEHFQEMBKHEQKQIECN", "CHFIFKQDPKBINEBNQKGQ", "QDJCKBMKAHKHNHQFHQHE", "NBOBOHOBKNIPOJGQBPBM", "HMBPEHBEPEILGBKODRKC", "CLCJRERDOHNQDBQKHJQK", "HPKQOKMHKHDMKPAQDMFQ", "JHFBQLBNFNKMLIJOJHND", "HOEMKEHRKEMCLCMKRNKO", "DAGMJIOJCDQHDKHQBQFB", "IQCNGKCNEQHOHODIPMFBE", "BKNHQCENKOCOKIQDID", "GFMGRBJBQAQBEKMEBHPKN", "EQHNINEHKEIJOKPMDPDCD", "HPKRNHMBKBQDHRDRMIOG", "KBKRNBMEQMHJPHPDRFIQL", "JNGOQEQILBKAIECKQEBN", "DQKHLBQNDQFRECQHCKNL", "QENDQJHFBQEIAMIMDNAO", "FMQFAIPJCHDBLHFBFQL", "HKEPBQKEOHNJGLIOCRJE", "HKQBLBLENHRGNIARNILB", "JHBNDNLNEBFILPCRIQLA", "AEBKIKCQAQCOJBROGLB", "QIJNKPHDGNEPEBPEMBER", "AIDHPAQHFMKNEPEHEBE", "CHMGMEOFHDKMKHNRKMQKH", "NDQFBFHFBKOIMHKEMFQ", "ENEHOBRHPBQLBMCQADHFN", "CQEQININKANDARLRLEMD", "EBEHMBQHMBRDPNJAQIOFA", "ENDBJBFHBKQAPFQLQHMFC", "RKBEHPBOHMHJRJBPIEPF", "EHKOKPKHRBMGBMIPCDRH", "INIEBQKNEINFRKFHMANK", "BIDJRKHDRJGNKGQCNGQEQ", "HQKRBPKHBEHLBECJRDQJP", "QEBKOKNKBMGDIQAPKMIN", "BLCPDMDKGLRBPBQEBRBK", "HLQNEQFQHLQOBOEGRGBJD", "NENINIEQECQLALFHDOCO", "EHPHMBQEHRKIECDOERHJD", "AEJHRFKCNDLNQFNFHJB", "NLHRCJCRAFNLNFHNBF", "HMBQHREOKBOGKBMCPJPLC", "BEMKOHKOEMECKOFRDNC", "MELBJAEGMQANCQBKGKNI", "REQEOBMHKRBJQIAPKCJEO", "BEBQMHKMKMKFOCNCOKBPA", "HBOBQKOEHPJNCKAEHCEN", "PHRBMHKRKRBLQHOAFBLC", "KNBQBDBNLBFOHOLRCRJCF", "HBEQDBNHBENCDCJGCEBOG", "HECKQCNECNDGQHOFCLICE", "QIQKNEINCNIJCKBRBRHE", "INEADRIOFRBQHOHOEQKM", "BJPJQANPCMKPKQEOBOBN", "AENAQCQEHNBFRIFPOGDAM", "JNBLQHFBJQKCJCEGOIQD", "MHMPGRFBMIMQKHEHOENKP", "EQKNDHBNLQDRBKIMIME", "OHNKBOERHBMLAOBPLQC", "BNKEIKANGNKPFODHBRD", "JNJBEBDNHBQOGKMAFRHMF", "HNKGEBENKGNLIQKOCOEB", "BOHBOHPERNDCNFMDOBO", "DAMKMEOQIFBDHLNLHENB", "CQINIKAKCECPKNAFMBEP", "EBPEOBKBKNHLMFCKANDA", "KBOHKEQHMHPCNCDHDHFB", "MKOBMEQKEBMDRMDIODQFB", "ILCKPIOJRBERHEQENEB", "HEHEQNFHBNERIREHPLGE", "NLQKNJDQBFRGQBKOGDPF", "FREQLCDOFCEBNENQCEKI", "QBNEQEHEBMHJAOHCMCKHQ", "LFHJHQJNBQBPIDPBQJQM", "AMAFRKIDGEBHNBHEOKQH", "ELMBFNJMAOKBNPENHMB", "RHQBKMHBQKQIRAJDAJOFA", "RHBPEOBENBNCJMDCNCJOF", "IDIFGFMLMHJHQBQFNJHE", "AEMFIQGLMENBQEAQCIQ", "BEQIQNEGKNIJHCEALNA", "NFQHDHNHLBKRKNDPIQEQI", "QJBQDNLNHKNGEGJEMHM", "JBQKBFNLEQBMAPFHKODP", "RBKBOHEREBFPKHCPJGAM", "EBPHEOBERHQFARMKBFHNG", "KHAQAEBQEBRBFQARNEBL", "ININAQNKQNBPGRIFRMAF", "RBKPEMKMBPHJHDHRIEBPF", "DNHQDNDBJQEAKIJPKPGC", "LOHQKMDQGEBEOKOEOH", "BKREOBNBQIOGRAFNDBN", "EMKMHERHBKHAROLILEGRO", "BJQHEBKQFHNAFAKHOHFGN", "NBLQEBLQHBKMDQAEMCKCM", "QBFHJHKBQHNGMLPDQGQD", "LBOAQFKBPBFNLHQHQEHK", "HBKMKEMEOEMLMKOGJHOLB", "MARLBJIJILBEBOQEBKBPE", "DBJNJQHLHFHAMADCQMDMD", "HERHRBPKPHRGDPNDOIC", "QKHMHBKOHEOAOEQAFIDGM", "OKNBMHMHBRHFRMGPDRNH", "KOHNERBOHMKFCPJNFNAJM", "BPBMHPKEOHOJOJDQANJOC", "OBMHKEPKEHCEAFCOAME", "FNDBEHJBDBEGDRFQECLQC", "EHKBOHBRMCDMBOFBEHA", "OHEHPBREMEODOGJFHOFOL", "QDHLQBQHKHNGJQJBKGOFO", "EGKEQGQKGKBRKCNLNDPJB", "EHKOERKPHKMJHEOKGNKHJ", "BQKDBLBQHDBRAMKAPJRNA", "HPEBMKNHNHNCEPMJMFNFO", "NGFMQKGFRBNEKNAKGQKQ", "JBQDQHLHBQFGPFMDPCKBK", "HLPJOIRLPEKBRKMEBH", "RAMAMKMRFKMKOEQBKRKR", "GKAKEBNINBKDMBJRKQBKI", "EMHEPMBERBDBDIEMIQBQ", "JBNFNJBJBQKROFBRGBKDR", "MBPHEQKEOEOLHNLRADAR", "NJEQDNBEQBFGQFALAOJA", "RKHERKNEOHMAFHFHKFPIK", "BQDBQLHNBNJOGPFPDBMFB", "NHEBKBQLQEBOKAEAQGPLF", "HFPFBPJMCMHEKRBEHMKQ", "BKIKGNGEIQCPFRNENIKD", "HBQNDHQNEMAOJDIFCE", "HQDQLQNEHBQMEBDHQGMGD", "HPLCMIKOIFNPKRBEKPHOH", "ENIQGENANICRADIFRNGE", "EIKNGNKENBRCOFOCDB", "BQHKQBJEBKIPAFADNLMGK", "OQLHPDMQJBFHFQEHQ", "NBDNLNBKQFQMCEGEQICJB", "JHNDBEHQHALHFCEMJAM", "QDBLBFNBEHJIKMLGPGAJE", "RHBEMHEMHKNCPILPMFCDC", "AQNKHCNKQNADNEMCQBQB", "BLQJHQJNKHJPHJFGDHPG", "ANLBGFIDMANQANBQKIN", "QHKFBNBQLQBOHMIKBJDHD", "PKBEPBQHKHOAFARECOBEG", "EQFQHKBDHNKAOEMHLPHOK", "KOKRENEOBEGPJFMJFCM", "MKCEJRBDPFBLQHEBKNHN", "QEBENERERBPLQHOCEPMJR", "HPKRKHKPOKOLREAEREPIO", "EBQHMHMEBEOCQIQOHFBLO", "PGMEGKMEPHNQEQFQKHJN", "KDBNHNFHDHJMLDNERAFA", "OEQHERHOEPBDNFNIJNJHO", "QBOEMBROKQOFPOCJMJNGB", "LQNJQFQNBLDIPLOERIOIC", "QHBKBFBFHBLMFMLCMAQ", "QKOEBRHPHNKARNFRKILBQ", "QEBOEHOKBRDPDMGKPKM", "KBPEHBREBOHAQODOIPEMA", "OHREREBPEQKGRAEBKIDND", "RHPEBRBKRKOIBFCPJOFAN", "GENEANKNEALMHNINLQJ", "AODANFAKAMRHOKHKPBEK", "JANBDRCODGNEMHQBMHPEP", "OCGFMHNJGNEJNLBFHJBH", "QKQKMBQOKNEAQJPEMGOCO", "KQHKBKRBQKMDCMARDGEPA", "HKBKMHKMKHQIOJDALCKHM", "RCFORJNFIMJQHLBDHQENQ", "KEPKEBMEOERFGRGARAKOE", "QCNANHCKERJCLNKBE", "DQLBQBKBKFIPDQJRBQH", "OKMHNBPEOEOFPOIOCQGC", "PGEGMQAMJBKNQFBNDQH", "NBLNBDBNDQDRDNAFRDNJ", "PKEQKHEBOENIPKHRJNCKI", "NJBKNBDNJBJOKNEGFGLE", "DCEIMKPBGLBLBKBQKHQL", "KBKPKHBQOBKIKGNDHPKND", "ANCKAQKEICEMHDPKPOKA", "HEAKNGQEICNFPBEILIMD", "HBKMKENBEPHCJBROAMFHF", "CMARFHPFOHNLNDKQHJBK"
                    ],
                    [ // 2
                        "BNHBLQBQBLDAKOCLMJFC", "BJNFQHJNDHQCJEOJNCEM", "BOKHRBOKHEMJPOJEGFMEQ", "FNFHLBQNKBFINDRIOHKR", "QLNFQKHQFHAQFPDOBEQ", "GLOKBJRBDHORKHREHKNB", "HMBMBOEHRBQDMENCPNILP", "HPFGOEAEIRDJBQKBFNLN", "PNKOBPBKHKBLIMGNALMLO", "EHNCNGNGKQCJODQNBOCJ", "HPKEPKPOEHOLMCQDMHAQK", "KREBRBKQKBOCNDAFIDOFO", "BJHLQBDQNDNCFBPDRFPGK", "IKCKCQHNKGQFIEBNEOGA", "FQFBLBDNJQEAMCOLFGNFN", "ARAQAGRCLNKOHOBKMHER", "CJOGOCRCODQHEHERHOBRB", "HNBQFQNJDNGMCJGJQIPO", "NFNQAEMGDAOEBRBMHPKME", "QENDHBFQDNDPIRBEOIQFN", "DQJEBDHQDHQAQBJAJBMIO", "GPIMLIORGLNBNQFHFQB", "HBKOHMBPEPKAKQHMJMKRF", "IECOBJQJPHNEBQJNDNHL", "HDNJEQDHJNHPJGOLHNLI", "OIFHJOFILIENBGENAQH", "HQHKPKMKHKPINJGMHOFQO", "CQCQECNHCRFOILDGJI", "MCMFBELMECDHQFKBNJBQD", "KNKRNHKEQKMCFPCKHADC", "NIQCENBQBNERLCJMKCQH", "MHBOKMEREOHCFNDGMAJIN", "QHRBMBOKBEHDMLGDPDIRG", "HBLHBKHJNBQGMHEALEBJM", "LQLHKQJQFQHOLBJBQIQOA", "DQDNLHJHDQDCMEPCLMCNK", "PBPBPHEBKMEGFNDMANECN", "QKQAKAEGKNCMDIKNFMAPF", "QAKQIENBQEHJIKBQEODA", "EQKEINKNCECRFHJFBQOGB", "EBEOHMEHMEILHLRMCMFQ", "HQBQBKQAQAPMIMJMDHMLM", "QJHBKHNLNBERIRDMBLDAD", "EREBRKMBRKNLRIEIKCKMJ", "PBNKHKMBOHMADNHEHNFM", "HQAQCEQEAKAJAOCPEGJNK", "LBJEHJNDHQHAPHPNGAQJ", "BFLCLQJOJGNBREHOEKRKQ", "NDQHKFQLHLEAFRFPJCQIE", "IMHKOQDCHKPKMBOBPEP", "HBFHEBDHQNLMEOLRGQCMC", "MLCRFHOIKIENHMBKOEOBM", "QKMDMFQDAKQCENAQIEC", "FNGDIJHOCMBHPKHRBOBM", "QEOHPBRBEPILRAEALHRBN", "EBKFHLHQEQBOIOGKEOEQ", "JGMIQHDBDBGNEGKAEKQC", "OKAMJIPLMHOBNHPBMBH", "ENHBNJHLBNLAQIJOFINHK", "KBOKNHKPEPHDQMAQNDQAL", "HMHBMBMHKQDAJMEAJNDA", "LEHJHNDHNHEMIDCFAPDM", "GOJOBMAJCOQKOBHPBM", "KINIKEINKNBPLFRAQAF", "OBQKHPKMHNBJHFMGOBPDC", "ECKHAQCKNEBFHDGKMDIO", "KQBEQAKCENAOCFOICENK", "KAHRBEJRJQINBNIEQEGK", "HKEOEHPHKRMJPNINKQNA", "BNDQLNEBJNFPFCOEINICR", "NEAMAQJRANEHEHRENBRH", "PERBMKQKNHOFQIOIAQNER", "EOEMEBQEBRDBFPOLQLAM", "HJMGNCENPIQEAIENEGNE", "ARBDOHQCPFBLHQENQHNL", "QMHBKQBNHOKIKPANAQLEN", "BLNBFQENLHQGFBRLPJGK", "JORKPIFOLAHEANBNENC", "KICKQNINENHDRMKGQBKOL", "FHJIMJNLAPEBKNAKGQBEC", "MKPHBOBEBPKAQLILIOGN", "NFNBFNEQLQDGOBFCODICN", "BKQHNHBMBKOLPCFQFMAKH", "KMBPEMBEHBPDRJFRAMDCM", "NFBLBQEQFBDPOLGLBPDB", "JNBJHEHFBQHMCQOFCQNFH", "NAQAKGEBQKAFCQCOBLHCN", "NBJIPLGMLRBOHPKRBHKO", "KPBMHBOBRBNJOEIMKHQOD", "OKNKEBKMKBOLECNCOEMKR", "KPKEBQKOBKMJGJGNLPDRH", "BQEBQEPEHERGDPBEILDPA", "BEANKQHMLBHMQKNKBPEN", "HLAKOEJQCOEOKMEOEPKM", "HKQHEREHRHKICOCRLPOGO", "JCEPJGLAQGNHOPHEPEHE", "EBKQKPNKPEOIRMAEHLRCM", "BDNJBFQNHNDIOHODIQDIC", "HOBPNKMHEBMFIJQMJGOH", "MKGRDNANFPBHENRBQEHK", "QHPERKREBENALCJPLOLIO", "EHRKEREHKHBFMAOHJREHR", "JBNDNFBKBKNARFCDRDHR", "ADJIEPBIQFKINEBNIQEC", "EREHRKERHPKDPJRLNARIQ", "HQKRKBMHRKFIBEPEICNC", "QKMENBEBPKNINERJOJFPE", "HOBEMKBEBQOIREPIFRIO", "CECNEQNENBRAMFCOKCR", "ERHMEBMKNEHJBJGDGRNL", "EBEOKBRBPHFHFPGRBEPH", "KQKRKRBKERNFCDMLANAJP", "KRKOHBRERNFIKOHRHPD", "QKICEIKGKCQMFOKRCOEAQ", "PLOJBQFODCNHNCNQEIEI", "FMIPAEPADQENQDBQJHJ", "FQGFIMJOAHEKQINQKAK", "EPHOKEPBEBQIFOEOEHARF", "POBKQBKOKOKFHRGMDRJFI", "IBKECKCEQBMBJFRKOJDA", "GQAKGKENKANDMDIOJDQE", "NHRBRHPHKEOCDGLPLDAPN", "KEHREHPHOBKIEMLIECNIO", "EPHMHPENKENCMEMDAEQO", "EHEPBKRHOBMDPANLOLCKA", "BDNFRBGOGNHOPBPBENKP", "BRFGOGKBEHNDBEHQL", "RKPHNKPHEPIBKIFNEGAO", "HQCKQAQNEGMCLMHKRFPA", "KQJQNEHFHJHPEGRGANCE", "GKQKECQGKIBLEHRLMAOEQ", "EBERHPBERNHLMEBOBRAJR", "RHRHBPKPKQNFGRMDNDIJA", "AEOJOKOHDGECNKQENCE", "BMEPEHPEHRALDBJNLMJM", "NIQNKIQHNENDCOKAFRBM", "OHQOHERBOHBDHLGDQFBRE", "KQIQNBNIEQKOKCNJRCNJ", "LHLNDNFNLBLIJOHDOHJPO", "NAKANAKCNGNJRLREIOIAP", "LBNJNBEQDBFIQNDBLRDAJ", "OHRNBNHEHBMIBMGLBPNGM", "HQHEMHRHBKOAOHFRNLHFN", "NKNEHOKHOEPANJPFRJMFC", "HDQHECDMBDNEBMKBEMHQH", "QHKHEBJHQFHMARLDMKBD", "KORKRFMEGKMBMHEQHMKP", "KBKGEINHQCKFIBQAJCO", "NAGMKMLOCEQENHDNFJBN", "MHPKEPKBOKNIFPIOLDBQD", "FNGEOEAEGDCNKQCEAGKQ", "NHNKPBOKBPGMGBMHJDOLN", "BFBNLNDBQKBPGREAMKHPC", "PERKRHREHKRJIPINLBEOE", "BQKHOKOEBMHFCQGPDOEGE", "BRKMKMHMHBMGOCKAEHMFO", "MBQKHRERHRBDBLIPDBJN", "AEAEHKQAKAQDAMHJMDRJR", "NKBMBNHKBMKGBOBRFHMJD", "IDBDPLNQGENHKNKQHMKH", "ILNGNLAMBHDQHNLNE", "EMELBPDAOANFNEJNHFHD", "NBKDNJBLQHDCRDAJRMGO", "LAOIMIKCEQHQDNFNHFK", "LNEHLNJHQBDAKMCKFPHCR", "JOJBQGRBJOKNBREOHKR", "NEPHBEMBPKDMEALFBRDC", "INHEAKNKEHKOGDALHKGLM", "KNLBNFQHBLBRGKMHLRCJB", "BKEAQAEHQNKDQGMDOAQC", "KOHPBRKQMEHDPIOHOFHFH", "JHJNDQDBJQEGOKFHLNIND", "HBRKERHPBEAPNCMLNIOIP", "ENBQFBKHDQKIPHPFREPID", "NGDQDMFRGQEAEBIEQE", "KOKQERHQHBOAPEAOCLQFR", "KAKBNEQIKOINKNAJMC", "EHMBPEHQEROJHOBMFIPH", "BNKQBNFNFBFRKGRILBNG", "ODNBFAGOEINJNQDBNJQBL", "REHOHPHBEHMLNFBJAOFA", "NLANJGQHOHELNHFKQBQH", "HEBRNKPHBQKAKPBDIEIBJ", "NCQCNEBKAQGMEHPLRJRM", "NBDBQNDNKENAJFRCFRNLG", "NEOBQKOBMBNJQJIPKMJMB", "QJHEHQBDQLEMHQCOAJENE", "MBPHQLNCPJOEMBKHKBPKR", "NJHJNFHNHQDARFHCFNBR", "JBLQBJHQHECMKADNCRH", "HFNDHBNDNKFMIMKDNDIQC", "CECEQCKECKRJALIAEHM", "EMHEBKBRNEMGQAOBNJGEQ", "LNARCGMENFCKQBKGNQCQA", "HEOKRKEHQBRALPMKHCPIQ", "HNERBOBEMEOAKINCJOJQ", "OBKOBPKOEPCQOLINHPMG", "IBKECKHKNKGLHEOKGQFQ", "BMKPEREHQKNJNLRGOLPAO", "LHQDHFNHNHDPJHEMKHCQ", "HMHOEREPHRBLIDMDARALI", "HOKMKOBRNLIMDBDCRM", "GNCKQCNHKAOLOEQIRLR", "KAKHNGQKBKCJRIJRNIFMK", "HNBIDCDMDPHRKMBERHKN", "PKRBOHPERBMFHOFAPMKHQ", "QHKHBMKOEQEIJNDHJENIN", "QLHKHBLQNJIJGDRLPL", "DQNFNFHBJHECNCPMHOFOF", "GKIQGEHENCNDMEGQMBE", "QKBKENBPNBNJPMIQCQLRK", "EGDOADNGFHNCQCNBNKCN", "NQHFBJRBINHNDQKQLNL", "FBLBFBNDQBNAMKNGOEPLR", "DCMLAMBNLPHKREOHPBHM", "PKOEBPNKBMBDOGPIKNBRI", "KPEHBPKHEQBJMCRCFBKHE", "KBKEQMEQKBRJPCJPKEAPL", "IEAECQIQNBMGLAMLNHNG", "KPKRHPBNHKMGJERAODRAP", "BJNJBDHQHLGFINFPGO", "KPEBKOKHPHOLBRHODIBOL", "KBMHQEOHKBQJBOJIPDP", "HDBDKCPKNKBQCNKCKN", "NHKOHBEMHBMGDGLPMILMB", "HQBEGKBQIECJNJBJMGQB", "HBDBJEHJHBLRNDIPGEBD", "KNLEQHQHJQJRDQFIPOIFM", "BERHKRNKRHMIPEPADMEB", "DNRHEJGRLNHRENKBMHRE", "GKEAQBKNBNFGMIFGAMBF", "QHPKBEMBMBMAKECJEPGMH", "ILNCPHDPAHFHQFQKNHDJ", "RBEBNHQOEBMINECPNIOF", "BOKNKHOBQHMLMHEQGOLEC", "KNHBJNLNBJNILQBFQMKG", "HEHPKHBMKNHDQLMAFRFQE", "ENQCPLIOLNRBPHMHPEKH", "BQKBPNEMHBFRMECJCLQ", "FBNDBNDBJHQOIEMKREANE", "FQEHJHLNJQBOJDAMFBPK", "KPDJRJCFIKREHRBPHEKR", "MKOBQKQEBMLPKALNLIPE", "RDOBJGEGRDBFNBQBKQLH", "PKHRHKNBKMBLRJPNGMGC", "KBPJPHFQAHEHNFN", "HRKQHPKQKOGRERDOFIREC", "FNBQBJQNDQDAPHJBRHRIP", "BFBQHBLNBLQMEIEOHCLAL", "INFMECRKPBFNJQBQKBLN", "BOBERKPHPHPFOJDIBDIOL", "QKRNHNHKOEODPMDCOCLMA", "EBMHKHKBRKQIEIRCEPK", "ENHFQFNBQBKRHPBLDGMLD", "JMIJQJNHRBJQENFBFHJN", "QBKHCNANEBNLQEBLGMDR", "JNPGQFODREJNHENFBND", "HOBMHBEPBNKGDRDCEIOAL", "DBNJNLBQKQDMJBDPLPAOE", "MKOLIFMGMJHJNJHJNDBH", "NFHJBFHKBQEIJGFOJNGD", "BRBMKBQHPCLQOHLPOC", "NKHKHNBMBOGERFPHKBK", "KCEBNCQGEHBLIPCQARLB", "OKOEHBEOBKPLMCJBMCQD", "RHRHRBOHPEQFAOLRJEQGL", "REPHRKBQKHQIQIMJAJDHD", "AFLNKMLQLGPBKBOKRBQHN", "HEQFQFHKQDQGMHCOCLDBE", "QKNDBFNLBLBMAOJFOBOBE", "KQAKEBEINGQDGMDGLMKPO", "EPJRCOEPLHNQEGKAQAKG", "BEPBRHMHBENGPDMDBKA", "ENHLBFNBFHEAJCODOJME", "FIMFCOGDMQCKGQIQKHQE", "QHREMHBRJBFGALEQGOC", "NGDMDPANRLQBKQLBQFBD", "KAQAKAEQKEHPBEOIPFPA", "GEBKQGBEGQEPMLPFGOFG", "OAHEMIFRIKHJHLNQLQFN", "DNLNBFQHFBQCPEOLROAMC", "EMBNRDANAHPBRKPKRHKP", "RKHBQHOBPKBDHDALEAFNB", "KANILQAJPIQHNQJHQDQDK", "KIQEGEIKAKEMBQDAPGMBQ", "FRGEMLRFJNEHMHPBMQEH", "LEQDBENHQDGKMKGJRGCN", "OBPEBRHNBQOGRJBRBEGOE", "KPECEBMEBKNGQCQGEK", "KPHODNQADQKCQAKHEKNI", "BNDNHNLFBDQMCNANFMBN", "IODHEOHFCMECKNHNCQGKC", "EQHBLNLQHJDPLHEGAMEHO", "BNDHLBFHLBDOARDOFIEAP", "EHRHOEPEHEAQJIOIJAQA", "DHLQFQDBKFQOGMHLILBK", "QBNERERBKBKIJPIFIKIKM", "PKMHBKMEMHQLGODNIEPGJ", "CNECKGNKEHQMCDOKDPAK", "EBPKMHBEHMBDAPIQIPBMB", "QMKRKBRHKMEAKQMICLOLQ", "KEMHKOEREBNDQHECEMHLB", "EIECEANEIEMBDOHPKCP", "KHREMHRKBOEGRMFPKBOH", "NDHQDNFNEHNCOJCMKMJO", "KHLHNFHNFQLPCPNHQKCD", "FHQLHFNBFQKRJMIOHNLN", "LQENDNFBDBFPAEBQOLRKN", "BQFBFHQJHDHPDCQCJPFN", "HKBLHMJAGEHEPEOEHMPH", "QEMKMKHNHERCEGQHRJMAP", "EOHMBKPEOBFBDCKGCRIJD", "HNKHENGNGEBDCJCOJOAM", "KRKBKBOHNHNLIOEGLOLH", "MGOPKRADOHFQJBKQLNHL", "LQEHDNHJNHLMAOEQFMDMI", "QBKMHPEBKHJFPIPBJPCOA", "OHMEOEHKNBNCMFOCKDOJO", "FRFJOFOGDHNHMBMEKBRE", "EAQINCEBQCNJCPBEMJMGP", "QKCKQNGNGENFIEINEPLOL", "NBLHFQHDHNKAMKGQFQHRD", "IQBECQIQGEIOLQHPFAOER", "KMHQHKRKHKPLFRDAMARK", "HQKPHOKHMHRGCOLPLGPI", "HREQOKBKHOHDGNJQEHOJC", "ENKCEANIBQGDBLMFNADB", "ROKQBEBEBOBDARFQKMDMF", "CEGQEAQGKNBPDBDNGOLPB", "HBQBRENBMBRJQIDNEOEIR", "JHBDHDBNDNKGQODCKAFHL", "EQIOCGMFBJHPKPEHEOEBQ", "JRCGPBQFOGEKBKOHNKOBO", "HEQCKEAQBQKRBLCRFQBJH", "KNHBRBPHEOFMFAQEGMH", "GEAQAQNIQKIDGNHPNDMDC", "QEBEHBOBPKOGKNDOHEGQ", "KILGLIMEHNECHEAN", "OHEBQLIEQLHFNFBNQB", "PEQEPEHKNKMGRHDMDIBEB", "NHQJHDQBQDNAFHOGQGRHE", "BQBOHKMHRKPGDOEQHPKD", "NBMAEGEOGJBQERBRHMEBK", "RHMHBKBPBPKGCOKAKGPFB", "BQIQGQCNINHJGEMLCOG", "MEMIJNGMFJHPEHEHNHMHE", "BNCQBKANKGCRDNILGKFRC", "FADAHDKARHFHFNLQBLHE", "EQHBFHJQFHKOBEPBDGQOB", "DHQHBENBDQIOGKEQLRNC", "HKRBOBNEOEOIKMBLHRCFN", "EGNKQHCEIQCPHECLHFIK", "EPHOKMKBPEQGNLHJPFNG", "HKHRHBPKMHNGFAKHJIQHO", "OKPHREMEMKRLAMJPCFBMC", "KBFQKFHFQDHRLQHCNCN", "EQFBLBKHBQLMEMIKRJGAE", "KBMBKENKOHRLNJBLILMGK", "QEBRHBRHBKRLAKFGLENFB", "ERHKEPBMENGQJCQNHMIN", "FMFMEMEILNJBJNLQKNQ", "OLNIRAKPIJQBMHEHMBPBM", "QMHMKMKMBERCRLHQAEGBL", "RDMPLHJOARKOERBERHNK", "EPEHBRKQBQBLDCEPGROGA", "BPEMKRBRKNGODPHPGBKB", "NBEQEBMHNFGMHJFGCEGO", "NHKHKRNHBEBFPAKIQGRFH", "OFOBPIPGLMEBNRBHEMEP", "AQHAKIEQEIKOCRJARAPMJ", "OEQIEOLOQCRHEPENBHEPE", "OCHMAHMRLHREOBKHPENH", "QNJBKQFBDNDAMGANHDPBL", "OEMHPBOEHNKFODAJBRDN", "NEBGMQAPBKPEHEBE", "HJQKBJHNDALNLBKRIP", "HLEBNLNKQLQCOADBRGLMG", "OLHJQCQFHMBKHMQHOEB", "PEOHOKMBEBPJOEHRKAERF", "QIMJPJGOLHPKBKOHREKQ", "HPBQEOHBPBOFPCOGEANGC", "KAQNGKNHEMKOGQKMJFMF", "RBRKPKRBMHNDQARFHFN", "NKBEHQDBJNJCRHEBMGLBN", "INCNIQEQAEBFPEIEBFIP", "PNBKMKRERKEILDGBDGCRA", "NEHKBPKBMHEGBRMIOKPD", "NHPHBRHNBMGOLNDHREGD", "NKQFNJIOLBKOBNHEKMBR", "MKBNBOEREHOCNCMBDMBPB", "QKEOBRHMBPOLREHMCEHPJ", "MKEPKHEQOBMIOFPBDRDHR", "BKQBDBFHNFRMKPCKFRDRI", "NJPKCRKGMBMBNHRHMH", "PKERHOHNHEHFCNGJIJAFH", "KAKGNAKQEHERKFBMIPBP", "ANCECQEIQNCJBMDOCOARB", "NKQNHQIQGNARIBPNJCOE", "KHBOHRHMEBQCNLPLQAPKQ", "HBOBKOHPKQJNGLOHNIEPO", "QHFINIEMANJNHEJNHKBK", "EBRBQKBMKBNJRHBMGNEM", "EMBNHPKMHKCMLHPLCPMF", "DGOFKPJQLAKHKNBMBHEBN", "KMKHQBPHBENDGDHEMHEH", "BNHDNEBEBQDOKDCPMKMF", "PBOKHBMEHNKINDPKFQIQB", "KREPKERNHRKIAMKOCJQAO", "QHDBNBLHFQLCQJBJIBOJE", "HEMKRHRBNEPJGEIDNDPMB", "NHMQKGFRDRBERHNKBHPE", "JQEQBQLFNLGCRLQHLAQL", "NBQNCQNCQINLMBRFROAE", "BNKOKPFQDAHENCEAQIKH", "RKEBKMHMKRHDQFPKDCPLD", "COFQLBMGMFBFNBHLNDHL", "DCQDAQAODKHPKMEMEKBN", "KHMEQOBKRHJILIPHFROE", "LHLQKHNLBDNGOGOLIMHF", "KHDBNHLHQJIQAPNLQLDM", "NBFNJHNLQNDRLGLOIAPH", "BPERHKMBRKMILGLCQGOHK", "HNIKAEBEAKQJGFOGMDQIA", "BEQGKGQHEQIRDAPBQIC", "IPLMDOBNJAOEOEQHKMEHE", "EHPEPBPNBKEIRGALPFPFC", "BFHLBDBQBNBPHPFILQGAF", "QEMBMEBENBNIQJFMFBEAJ", "BKPHRHEOHPHFCMCJRIJCM", "KBQEQKBOHKMIDRCKCQMA", "HQKHKRKMHQJNLMKAPNAN", "LRKNLAIJGMKRHEKNHREH", "KMHNKMKOEPOCPFNLREOHA", "CQBQKBNKGEQMFNGMFANFA", "QKMBQKREMKMDPGCPMCRGJ", "MHQHKHMHRNARHMHCRDH", "NBQGEQNBNCQJRENLGBRJD", "MQEJAPAMJBEHNREOBQHP", "AENKNHAQAEIDHPENLAPAK", "BDCJAMQCMKBKGKNGQHNK", "OECHFBLPAJQKQEHNHDHQ", "IOGPEHOGFHPHREQBHKMK", "BQDBFNBNEHEGBFAMCMEI", "BFHQJENBKBLGKGLCKCE", "JNBLNBNHKQDOAQBOHKBF", "COQFNPFCPBKAQIQECNKG", "NHQDBLHJNFQOLMGMHRLB", "HKNHJEQBJQBPEMGOJCJG", "ECKHNCKNGNEOAJQFIBDGP", "ERHMIMGLMKPHRBHKBK", "HBNFHNFHEQFICFGOHAQOA", "NENDBNFHQEOIOKRNLIM", "MKOHBOKMKNJAKFARICOE", "APFHFOIJRHEANQKNIKN", "AGOAJGNCLINEOENHPHMBK", "LCKIPHPGQJHDQDHFQKB", "QGKICQGBKCFIFRBOLHPL", "FHBQHDHDNBLIJNLMHJGME", "PMHMKEBOKHEIKRMLPME", "OBMHBMHPBKHDRGRJAOGAL", "PLNIPDAMJGNBQGKGKHK", "ENHBLEQLQNEGPGQDREOBF", "DNLNHDNBEQECJRKNFNGRL", "QKNKNIKINHNFOIQJPJRO", "QEIEAKAEGEBDMKIKDGMF", "QJDNHNJQHECQJGRGNLML", "EROKMBKPBNEIPEMDCPKOC", "BKCKNIQCKQGDOGMIOCFN", "HEQKPHPHBKGEBPFMFQBLM", "PERBPEHQEOCJMGPINKBD", "IODCEMQEADKBOBHRBOQHQ", "KNBKCKCEGALCRNHNLBP", "KQHEGKNIBKNDMHMHDBK", "KBREHOKQHPEIRJOBKNJPN", "FOHRLQFOECNKQKINCEQ", "JQHQBDHQLNLPIRAKAEMHO", "QJEHFNBNEBNIRIBKGDNIJ", "BKBEBMHMBPNFRFGECERK", "JEHDQNBQFBKPKBRIOJBRK", "KPBOKMEBNEQARDGKQAKOE", "QAKQEHQBQEBMDHOGNFOA", "JNENFQNBDBNILOFHFNIQL", "QKBKHRHEBEMJQBMJCPNK", "LMJHLANILGECQKQIENGK", "RHBKPKPBEBDOECFOEHDR", "EMBQBMHBMBNLNLEIMHPCN", "NHOBKMKOKOGMEOBKRBJ", "OENKOHRHEHQLOGQDBFRIJ", "BKQHKOKOEHCLENJPKBQO", "IFAMBNIDMCNQKGEKQEG", "KREHNEREOKDPCPBRBFO", "RHEMHRHBOKRCKPARCODRG", "BJHNFQNLQNKIKIENCRFB", "IRDPCOPAODHDBDQLNQBJ", "PEPHMBMKHMKGLBODRLEBF", "KBOBKPKHQHLIPEARMIJO", "BKOKQBKBMKODBDCQCKHRO", "CEQEANKEGNCOAPNFRDME", "EQCKGEAQNECPCRLRLEBN", "NEGQIKAQGQAJCEIMIPI", "HQDHNDNJNBLGJOGDRINGC", "NEGEHNEHNICFOJIENFGPH", "HKGEBKQINKQMBMBLAJNC", "EJHODKRJOGEBERKNREMEH", "QHEAEIEBQEBLPJHJEAJBR", "HNBQEPNEOKEICLGQJMILP", "HEOHBQEOKHBDPCJAPHMJC", "CKNAFBFMIENDHNHQDBLH", "BMAGMLBLCKRBKREHOBOQ", "KQEAQANHEGBDOIENLAKF", "HMBKENEPHMHFCKIAPIOKN", "QEAKCECEQIEROCQJBFPHB", "KCNIQECRJHOIPFRKP", "KQEHBPHMHKNDOBDGEOBFA", "BNEHPKPBRBDBDRBNIJDN", "EPBKHOBMHKMFMDCDMAM", "BNBREQEHMKHFQIPGOAEQO", "NBNBMAQGDOQHNHJQKBKHF", "BENBPBREHQCKNFOIDP", "KPHMHBPHMHMAJHPLNAJIN", "LQBEBNDHQENGMAENCPEIJ", "OHKAPEGMJBOBENRBHREQ", "LQHQNBJEBLCQOJHOLGLH", "QENBNBJHNDOIMGBEMJN", "AJGEPLQEAJHNENCEGKGNG", "NECQNIEGNCNJPJFNAFQB", "JPJIQBPBLOHRHQHKHMKO", "NCDBOADNQCQDBLBLQDKN", "OINKBQLPJINHKGKNEQA", "ENCEGBEGQBEMAMCLBPHDC", "NKOHREOHQHJQGPEARAP", "NEOKPHOBOEHFHNIBRHOJ", "KEMBKPKNKOECFIJBMLPKQ", "AEJNRKCOHDBEQBKOHOHMB", "KNCKQCQIENBPKEOGJBDOA", "GLNFOIDGJIEANKQINHKC", "MHDARJHJMENAKQEIKQCN", "QBMBEREPHMKGPNFBOFMHN", "RKOBKRKQOHBFHOHDRIMD", "HEBPEPHKBKPGPBRFRJNDG", "BKNIKEGQIEAOBDRBJEOD", "GQKQEIKEQIERGFBOCDPE", "EMHDRIKCOKNEGEIQBIQE", "IJGFMADCDQCKAQEINAEC", "HNBRHKHMBNEAFQMFRCOJM", "RHKOKBQEBRMFIKNBMGPO", "HNHRHOBKPBOCMFRFAMGOF", "HBDHDQNJHDCNIPCOBDCKD", "IENCNEHKNAQFMFMFNDIO", "KOEQEHBRHKOFCPOJPCRAF", "NBQJQJQNEHPGKDHMJPBN", "EPEPBKBEOKIQJRMIDHDP", "LMAHELRCJQEGEINCEGK", "EBDCMAHFREBQIQIQHENQ", "AKPBQCNCOFHEBNLBDJBH", "QEQLNLNHFQBPIBPDAMIAL", "BKMHMBREPKECMIDMIQOKM", "HBEOKQBPEBOGCRIKIFIME", "BQGEAKBNENCPFAKFBKOAQ", "BEOKHNHBOKBLNBDAKOCQI", "ALOBDHFAHNQLBJHQJB", "HKBMEPBKQJEQAREGO", "FQBJBQFNLFNCOBNJNCOB", "NDQHPCOCJOHMBMHPKMBK", "OHPHKOERHNKARKFCPAPIM", "PBRKOHBOKHPIMHLCJIOEC", "EOHNHEHMHKRGRAFGLPDGK", "QDNLQFNKFBFGCRGJCEGKN", "DOQANAOAOBNEHFBHFQKN", "KHKEMBOEQBOGOJFBJHQKN", "JOIJHOIKPIKQBEQIKNI", "FNLBFBLHFBJGPGLMCOJE", "KCQHEGKAEBEPKGODRNDIF", "DGFQKCPJMQAENHQKINQI", "RHQEHNBQIPCKGPFBNE", "HNKHBRHRKPOAKPCDALMFP", "NEBMEHKQKNBFRAOAROAKR", "HQMBQHEOEHEIRNLQLQHFN", "QBNBDQFNFBQIQGJRFPAF", "DCQFOHDOCDNQBEBFHKQL", "BELILGMEAQBPHERBEHEP", "NBOBOEMKHPKGBOGALCNC", "NAOAEKODRAQEHEINANKI", "IEQAEAQHEAQJAPJGQMADN", "HJNBLNHDNKHOEGRIPJGBE", "PBKNERHMEBKCDHPNBEREO", "HOHEBKMKOEHJCOEAEGKC", "PHNBKMBOHKQJQODGROLIM", "OEMHPHBMEOEIBMIPDBNB", "BQHNBEHFNLDROCJQEGLPL", "BDQHFNBLHQNCRECRJDRLB", "NFQDHLQDHBEOJNFMKANJQ", "NAKNENCEIKIPBNFNFPHC", "HBNBJQNLQFBPJOGRLGEQ", "NHKCQGBKEQKMAJCLENGKB", "HJNLFBNDQFOHDMLIPMKD", "BKGKCKQIQEILPGPGBMDM", "EBQNAEBNCKCDIEGMEID", "NHEOEHPBEMARCNIOKDRK", "DQLBDQHBFQKGFIKMBJOE", "ECQGKQBKIKAJPIPJBFPK", "NKHEREBPNHEIDHARAOHLF", "MENEBOHEHEBDMIBEHCNA", "KBPKOKHNEBPJIBDQBLDRN", "NBMKMHENBEMJIOGKGOI", "AMCDCFMANHKPHMHQBPK", "BEMKRBKHBMKAEGLOJRGAQ", "BILAMEPLAHEJBNBQEBQ", "ECQNKGEGEHBLNGQHOINB", "BLHBKHFBFQECRCMJHNHDI", "BLQBEQDQNBKRDGLGEBJB", "MEPMHKRKMBFPECOBLNJO", "CMQIDOHQCHEJQEJBJQBF", "FHJQHDNHJHNGCOILQHEO", "BRBOHOKMERGMCEAJMGR", "FQBQNJNJHDBPKDMCODGDB", "CEHCNGKENKNFQFPIDNDRB", "LHQNDQJHKNHAPMLQALBJA", "ENKNBDBQJNEAMHAQJDPBD", "KERBOEBMKDNGPEIJGRAO", "AGOGFIFQINQEBJHDBQBK", "CMQARLRILCEHEGNEQBE", "KFQHKQHLHQFRJEPGBMECR", "JHBFHNKHJBEAKCJFCPJPG", "IQFAPEAMHRDHFHKNDQDQB", "HBEOKBPKBPEADMFNBJCQH", "PBRNHRBOKPECOANJDPFBP", "CKPFIOJHFBEMKMKOKBRE", "PJBRDARFKGDQLQLNHEQB", "NKOENBEOBKBFBJBOGDOHP", "KGKQEQEBQANDAFPDOGEC", "QFNDNEQHEHDCLMCQNLHFQ", "BEREPEOHEPHCRIOFNIFRB", "NBLBJQDHQDNGKDIMKPEPD", "FRGORFBFMBRHRBEKREB", "FJOGOCKCNPEQDBDNDBJQD", "IFGFBIDGNQFBHEBNDQD", "DNBDLADGRKNEINBNEGKA", "ECFIEHMAGKBNPBOBER", "KPKMERKOEHPGECOALHBFM", "QHBDBQHQBEOAQKHKOHBF", "QHNEINCEBNKPLARBEMLG", "FAEHDNBIMDHKNHDBNHK", "BROKEHPHNKECQGCPADHRL", "HKHJBQLHFHKAMDGDGMHF", "ENEMKNEHQHQLPJPNBDIEM", "EHBMBKHERBPDOKAEOEOFB", "NFQEBNBQJQERKGBMLQHB", "EQKBEPKHRKHJQCEQNCN", "BPKBQEBRHEPDRGOFRKDOD", "HMBOKQKHNHCDIFNIPAML", "FPEAHPAPLOKRHEPERKBH", "RHPBEHNBRNEIMEPDHJOEI", "MEPMHPKEMBDNJAFOFRDA", "NHQJNBENFHLADIADIJBQO", "CEMAEODRFMFHDQBHDHLBQ", "QJORLCNEJNEAKBKINIEH", "DCNBMHLBPANKIQKBQEC", "NKRKMENBEHRLHEQNLGD", "HDBLQKQHLDBROFRNGPENF", "INCNAQCKNENDPHQOIBEID", "ROKEPBMKENIFPBNDIQE", "MBKOCRDMPCHNERBOEHRBH", "HMBQKPBMEMBLCFAFCLQGN", "OHOEOIRBLNRBKHEOBOEO", "QKPBPNEBKBKFRDOCFOHPO", "KPFCOANBINBHNJNEBDQF", "PBRKHQBRKBMIBDMFNHEND", "BQMEMHBEHBOIRJEGERLBL", "KNHDNJHKQKQAKCDAMAQI", "AQKQKNHCNCERALMILIPCE", "AJGLMBDBOQAIQEBGNEGN", "RNENKEOEHECQFHPNGDA", "EMBKPEQBKHNJCQDRALDO", "IEBQKQGNKIAFCEPAPKBM", "NHFBQNEQDQFPIKAOFRBRC", "BMBKRBPKQKBJMCQNBFOF", "HQLNJHQNLQLPKQJQILBJE", "QHEBKEOHKBEADBFQIPER", "PHMHPBOBKRKFRAJCJHB", "ERBMHEBEOBNCOAODIOGFR", "FQDQHNLQHDBPANIQOLQHB", "MDQLOCEIPBECGEINGKNQ", "RHRKMHKEMERLRMBLQIPD", "HMBREMKBMHOAQAJRCMCQO", "MJAIPGQJCOKMKMEPKMBH", "HCNINCENKEHODRECFHAO", "KNKQIBNEHQKDOBOFIOKC", "KBENKOBPHKEIOKOKHOB", "IOIDALBRAKQKHDBJHEB", "BEQKBPHRNKBDIQLICJHN", "BQBMBEQMEPKFBLPOEGQMH", "OHBKOBRKQOGPDBFPMEPC", "HBEBDHLHLQLMKEIKGODNB", "FAHKIPFCFBNENCQCHNBN", "NEQHQGEIBNLOJOALOLD", "FBJBKHDBFHBOBJGQGLBL", "FQLBLHBQLNKPLGOLQBDB", "AMECPLBPIKNEBNBKMBOB", "KMKPBPKOHBJPNDPGBLG", "QOERBRHEBKPFAPAOIPAEC", "PEOKHBMEQKBFOEQLPHNCO", "HPERKPKHNHMGPHAPKDPM", "NFKMIJNEMIKHNKQEPHPHK", "HBRKRBKHENJGDQGJHNDC", "FADBFCMJNEKNAEQCECN", "QFNDQIOQFKRHPERBHPKQ", "NHNDQJDNBFBMCDMFBRMCM", "FMBIOLNLAMBKBOHRHRKH", "NQDCNAGDNHPHKOEHKNK", "BKNEPGOJGENKMEBEKMB", "BNBMCPBRDBMQKQKBPEBE", "BKNEMHKOEHRGARGOBPIM", "EBEANEQCEIARJRNKCENBF", "QEHEOEMKOBQJIOEGLQLB", "NHOEHOBPHMHDNIRNIJQD", "HOEQHKBNBOJMCQGMIME", "NHKMKOHOEQECPBDHBMJFN", "AMAFHMHMKNHFNQLNFQF", "NHLBLNHQEGRKPIBRLAOC", "NLNDQJHFQBJPJPGLBNLH", "BMCPKODJOFBHQAENQANKH", "EARHPEIOIPKHEBNHNLBQH", "KBPHNKNBOEOLNKQARCDBO", "JQDHDHEQFNEGOGBEPKHB", "CFRKINBLODNHJNFQBJND", "ERKHPNHRBKHJRGQOBDCKC", "EMBRHBOBKRFPIKRFCRKI", "CQCEGKQAKQEOANLRCLRBM", "KCEIQNHQAKAODIEOIFQLO", "ERHMKOKNHEQDMGRDQMIDM", "BMKCQIRAJNQGNEANGKCK", "NHNDNBDQLHDMHAEPJCDI", "RIFQHOBJAEBMHKBENPHQ", "EJRJGNPDLHKOENBRHRBN", "QJBKHLQBLNGPLCJREGN", "EBEPMKOHBEPDRGNGRKBLG", "BOEBEMKMKQBFOIPNAQLEP", "BEBPHEOHQEQARAQLRCEMG", "QLHFQKQEBQDIPBDGNGBLE", "HQEHOEHOHNEAMJNDQHJB", "KBJHDHQKQIPBEMCQFQG", "EBRHEMKPHOJPLRGPHBFN", "KNKBKHPHPHPCPHNLILBN", "OBNKHOKMKBMLAFRNKMLDA", "KPBPKEQBMBJMHRIREIRM", "EQKNHKDHBNBRFRMJOGFGD", "OBQHOEHRKMIFOGFRKM", "QKHPKPHQBOEGLGNJMLA", "JOEKAHLIRENCNINCNQGQ", "QKHLHDHKHQEGPOGDOERF", "PKHMHKHRBKNLOGPMDINI", "BFNDHBQNFHDRJRNGKMGOC", "EHLHEQHBJNHRGBRDODHMJ", "COLCNBHELAHENKQINGEG", "NHKNDBFHNDHMLGOKEAJOJ", "PEADQGMELNHNANCQKQGK", "KGKHKCEQENIRLMANJBQO", "KENIQKBECQBMBOGBJHLE", "KEPHBMERHKHLCFQFGREAN", "EHDQFQNKQFHOAPECEOKAF", "REMHBKOHQKMAPKDMBDNCR", "PFHQLPAOCHNHQDBEQHKQ", "DNKHDHJBNKRCERGQFBFCE", "QKHNKAQEAQCPAJGCOIO", "OHRKBKPHNBFCOLMCJQOEM", "DIRDMQLNAEBHLHJNBNBL", "KQKCEBKNEQCLHCOHMJGQ", "MLQAEARBFBPKMBEQBEPB", "KQNIKGKQNHKMIPMFMEOK", "CNGQGQEQAQCFGQCOILQL", "HKOHENEBOBNAMLFCNLOKA", "ROKRKBMHKQLIJMLBNKQC", "OHEOKERBKRMILEHQCFARO", "QHQKNGENIMENCKFARHC", "NGMANKARFBEPKBOQHPKQ", "HEMBENBOKQIPNHMKCLMCF", "KBPHRKMEHQBDHJPCQMIDP", "EQNAQGKQNEHLGBRJDRIE", "BEQCNEQKGKNDPJPILGND", "KPBNKQEOEBNIDMGBOIDGP", "QBRKRBKEMBOIPADMIQGJB", "LEBNFQEBQHLMBMBLPCRNF", "AJGPLOBOFHKNIQCNCKG", "MBKHKPHEHBLCFHOAQNLPN", "RHKOKMHKRHBLEPCQHJCE", "NGKCQEQKBKARNLRICEP", "PKPENEHMHEPAOFGFAFMI", "FHJAJQCODPEJQFBHJQHDQ", "CGMGRKRFCNHNEAQKBK", "CKRBGKADBEKMBQKOBHR", "QEQBEGENHQLOLGOFMJHF", "MKNJNIFHFGPBMHQBKMHKP", "BMAQDMPDPKNIEGNHKQCE", "QBNEQAKNEAEOLAKBJNKO", "BREOHEBOBMHFAFNCFMCOB", "AENIKCQBNKQDNBJIBKOE", "LBQFQNBJQHQMCNCOC", "BDHKDNBQHNEPCKNEOIDBJ", "KHQMERHKEBPCRODOGEMG", "PEBRBNHERBOFBEGCRGCEA", "ELCKPHJPAKQAQENEBEB", "NIEAQEHNKECLOAOFMAKE", "HKPBEOEHBRGDQKAMLNKN", "IKNGEQNAQARJNHEGQMDM", "BERKNEOKNHRIJCLQFMDB", "KOENKMHKNKNAPJARIBNFN", "QBEPEHPEOHMGPMGLBPCJM", "BEQLNJHBDNFRKFAOFHPJQ", "ENLNHEHEQEQOLOBLCQMJ", "KBOERBKQBEOCDNBNDGQ", "NHLBKFHDHQJGPKBMGFNC", "OILCRFKRGJMEMQERERBEQ", "HOERNEMKBKHDCFCLRAOEA", "LHNLHNLHJHFIMICKGQNI", "NKBQAQKQICQOGMCFMIOF", "KBNEPKBRHKNANDMEQJOLO", "KEMBRHEREHRLQKPKDCPKN", "AQIDMHFBJGEQLQFQBHLQD", "QEQAKQBNHEHRIFRMIKOA", "HBQHFNJFNFHPIPERAQIA", "HREBPBOEMBOCRIJPCLQGE", "BQBKMHKMKRLPHKFMBF", "NIMCECRJMDNHNKHJHDHJ", "RBKBPEOBNHBDRAOAOGFOD", "NLFBFBNBNJBOCPALMJPH", "JHQJHJBJQLQMDPNAROEG", "KNKHOHKOKNECEALQDNBDO", "KPBKQMBREMECNFBNBRBDM", "GEQGQAKAEHCFINIAFHCOD", "HLHFNJENBFQGECQOCRNLB", "FRFIOKPDAKNIKQINGEG", "PBRHBRERNENGJBKIQHNL", "DNEQLQLHFHEIFOGMCMAKD", "DBJNRKRJAJNLHDNQHQF", "QIQNGNAKQEBLRBFQECKBR", "BKQERBPNHQECNCMBEMLO", "BEHMBPENHKOARALEOJCK", "IRBQBMIPADKPBNRKBEKO", "QKEHREPKOBRIRLOHOAMH", "PKEQKHBOHRAFICLIBJDO", "KMEIRBRIELNHDBFKBHN", "GQKNCKIAKNBPGLRFOHEPL", "DANLBOADJQCGNANKQKAK", "KMKRHKHRHBRIPMICDBPOC", "GQBQNIEQCECFQOIKIKOL", "PKMBOEOEHRADADPENDBM", "JQFHLQFBKBEOAOADNADN", "ENRINRILIENHKRKHQHPB", "EQKMEBRHBOEGPOHKIDOH", "BKRHPKQERKNLIBPMDNIPK", "NDNBDQKQLNLAQIMFQIOCQ", "JQGJQFMLOGKBNKAQKCHE", "HEPKBEHBOHNIRJMLQEOH", "NBQLNDHBLOCJHFPHQB", "KEPBNHRBMKPINJPDPIMIF", "OCFBKANPLGERBEPEKHEN", "CKHOIOIFPBQJQHEQFLBD", "OBOERHMEPHNANAODAQNCR", "KAFNKBEMCNCQKNKIEQC", "HBKHMEREBQNJPNKBNJGQO", "MHEHOBKREROFGRGKRODQ", "HBJBJNJQHKPECNEGBQF", "HMBOBOERHEMJRIFBRJIF", "HOKRBRHNKBMFMDGKODOH", "NEQBKNHFBLQGLQCOEOCPM", "QBKQNAEGNKBMIOBPJERCP", "AKCNKEGQAEARMGLNBPHBF", "EHFBJQHDQHQIKCOBRANJG", "HQEAEHKAEAERBDRKHPBR", "LNHNLDNDHNFAQNEOJGMDP", "LOADNRDNGOBKNLHFBQHJH", "NBQBJHENDBKRFHJBPOIB", "BRBNEBRKMENLEILQDAMC", "MBPEHRBPEHMCNLCMCJEAD", "BPHMHQBRKOKGOHQMEIJPC", "NEQLQJNDQFBOAEGKRALIO", "GMGFHNJOQKNHDHNLQHL", "HFBENBFQNDQCFRKDOLPJQ", "HLNDHENFQEBRFIMALRJGA", "OBFLBMEJPIEANEKNAEA", "EQBPEMHKPKRFMDIOGQKN", "HQNIQEIQAKCMCPMFPIBN", "OKOHBNHOHKPDBLEBQMGRK", "BNBJNHFQKHDMIKOGBNLAO", "NHKAKNKGQAKRJBMLIJQJD", "KPHPKHKBERNDOGBOKFHEB", "BQOBRHEPHOKAPANFBOJ", "BEIRHKPJIQBNFNQDQJNJ", "PKBRHBKQHQNFGRMIRJCEO", "KHQOHKPKBEMCKPAKCMBFB", "HMKHPERBMKOGCOLCJFMHD", "LQNBNLQFHFBRGFIBMBPL", "LBEQFHEQHQHMJRBMGLRJP", "BKQNLHLBLQFOGRCPOGJQ", "BNIQCKQKNEGJPEQMKAPJB", "FBFHQJNFBLFRIPIJOJQD", "HBPKMHKEROEIMKOGOLM", "ENHJHLBFHJHOINGKOANAD", "RERIRJGQFQCEHEQCQBQE", "ENRIKMJPGENHDBENQHJB", "KNCNEHKCENIJHALQIFIO", "BMBRERBRKHNDCMHKIOCQ", "MHNHEPBNEBMFILRJGMFRA", "PBNHPHEQMBKFHPLOIKMIN", "MHMHEBKBQKPJHPEGLRBJQ", "EMKNBOHBPBKCDHDAFGRIN", "PBPKRNHKNKOLMEPGMLIME", "QBNIQBKNIQHMEGNIFOAD", "HNBDNDBQFNKAMHOEIMIOF", "BRKOBRBQKHBDPBKHCPHM", "IQAKIQGKEIPDAJDPOAJGQ", "KQHJBFHQNJHPJPAJMLREG", "KNENJBJNEOCJRNCENGE", "ICEANCNEQBQOBRDBPJOA", "KGRDHLNGJRKNHMBEHEOH", "EHBRBQEBENFAKPIMGNCM", "ENKBNDHNBNGLHQOFBMLCO", "QNHFHDNJHJEGKFGRHRMC", "KENBRBOKHOECRFAJALCK", "GMJPFRHLCKHQEGEHNEI", "GMBHNEQELAHQKOEOEKOHK", "BQHJBJBNHQKAQKOGLRKGR", "HFBEBKNJHNJOLGMGLMDQD", "EQBOBEHQOLMCKRINIFN", "BQBEQOKOHKEIFMDGQHCQF", "QNLHLEQLNHBRDPBFIPE", "KNKEOKHRHBKDNIFGDRLOB", "CFBRHRJNGLNDNBQFBQ", "LQIMQKCMLHEHMBKOEPKH", "HNHOEHBRBNCKPHCLERCM", "BLNHBFQDBEHAEALMAMLIK", "DBJHNBFQJBLMHBKOERIM", "OKEREHQBEREGBRKOANFPO", "OBKRHEQHRKQIQJBOJDGCQ", "BMAEBENAOBNBQJQBDHEH", "LHLBKHJBQEQMLCEBEQOG", "HEOKBOKBOENCQMHCLPN", "KIORBJCLQHDNBNDNFB", "LNJNKNHLBLHRCEMADBRFM", "EBFBJQHJHKNIDHKQDOLM", "CGMAIEOEOEBEHLBDNLHK", "EBLQDNLQIPCLFQLIM", "BKHQGNCEALNIDBDOIF", "PKBMBQERENBFOEHCQK", "FNGJOJAPCKBOKOBMHKBM", "QBJBNLNBNJDICRAQINLE", "ELAQDOEKIQLQBHEQLNKH", "PEHQOBMEBKRJAOGEMAJPE", "BKRKMHQOBNKAOKPLPCNE", "BRBEOHMEMENCLDOJPAEQM", "HPBOKMEMBNGDPJQJDOGD", "DJOQLOBEGNJHJBFLHQHN", "EBQECKEQAEHMLCOLGDBF", "GCEIQGQNCNLIKOGMFAKO", "BKNKQDQDNBEMIFPNIAND", "ALNJBJQLMDBNKQENJNHE", "LNLNEBNDHQKICFRLHJRIC", "KPBEHEMEPERCEMKRFHFCM", "FQFQDNLQNHPGFOFCPCFI", "EHRBQEOBEALIJPJQEB", "KBLQDNKBQLQGPKEQIBQFN", "MKOHMKMKOEBDPNBLQCDMF", "COALOQKGFNQKIEHNEHEA", "NERNBPHEOBJBQALNEOK", "KQEOHEHBPEBFCQFPMLILN", "FQLHQFHDHNDIOKAKCMGM", "HBJHBDNEBDBMLMGODGOH", "NIQGNEINBEQLDODMAKOGC", "HMPFNPCODCHKBNCEQGNQ", "MHOHREHBQMBLNLQGBRKBO", "CNEAKNKINIKMGQFARANE", "QINHNAQEQEBMGLRLCOLE", "MQAJOEIRINBHEBDQBHKH", "BPIPFBRIEQBPHENRKP", "BNBNEHEOHOHLGEPAPKIA", "FHKGPIEMBQGKANEHEGN", "KDHBNJBJBFHCQJHEOAOA", "HLNLEHJBQHJIQFQLERIJD", "NLDNFBNBNKCPOHJIMAMCN", "CEQIKQANGAOIKBOLBPHAD", "PHKHNKEOENKDPGQGKBKA", "OEBKPKQEHBPGLBLEARCK", "JQEGPDORDKHOKHPKOHK", "MJALNALRFOCQENBNAKGEB", "KHKAECQANECRLIQEIOLRJ", "NHKHNKQOKBNARKMADHPOA", "QLNKQFNFHJBPLQBLFIFM", "PBRNHEHOBENCJOLAOCQN", "EQOBMHEPHNFMEGQMECEN", "BMKHEMBPHKQGPDQECKFO", "QDGQLAJQDOEHEBPEOBKB", "NDNJQNJNDQFCNDQBPKC", "NANGQNIQIKADPEREAFG", "PAQJGLCOEANCEKCNIE", "KBQNFQEQNFGBRANIRBQK", "EHEQNCQCKNDNDRHLAREC", "HDBFNEQHLQDOIDNIQMCN", "PHQFKOBOLIKBGEIENKIE", "LNHQHDBEQNFPHRJNGJNGQ"
                    ],
                    [ // 3
                        "AHKMCDBDMHMEHPKPEBH", "GQKQKINIQADIDHLOICRC", "OGNJGODCLNENKNHFBEN", "LQDNEBFNDCJQHNGOAQN", "DHQHBFHLHNILRLGQIQB", "NKHKEQGQNKIOHEBLALBNB", "ERBPHOHEHNKIKDGARANLO", "DBEBNJNBJQEOFMIJNIKO", "BIMHDRDOKIKBEHPHNRKHQ", "KOBNHKBKBRNIFPBQCDGMC", "ANEINKQIKHQJFRADADOHQ", "LQNBQKQFHBFGDRGPGDRF", "AKNGBQAEQNFNCMIQLNJ", "NHEHPKRBKHKIJQJCODHCM", "HPDAOCFNDHEKAEHNKQEN", "RGRCORDIRGMERHKMEKBEN", "IKGQNICKQCKMIEPJPLQA", "OELHKCNJPENJNJBFKBJB", "QKOHPBRHRHEAERDBPIQG", "QJQHDHJNHFBMEPNDMGPI", "BEQDBQBEQNAJMKOAJMFR", "IKQCENKCNIBFHBFMIKME", "GFLBERLQGFHDNLQDHF", "MALIOIDBKAKNQBJQJNQLQ", "QCEAEQINKEGLGKRLREH", "QNDNDHBLHKFCPJNLGEGJR", "NHBKRKPHNHNDQAMADGQBO", "FBEQNBFNDBEIPKEBMDQIB", "KQEHKHEPKEHJPJIODHDAP", "QKBOHQHKNENAOJFPJAJNJ", "PHNHEOEBKODRIPKIDIDH", "BEIMCOJOFREQHPBKMERH", "NQLRCFRJIDJHQJHFBHKB", "BKEBMHQMBRKCDMGRBNID", "QGBNHANKNKCJMJQARGQEC", "JQBFQBQBFBFOHQKCDODH", "EBPHEOBKQMIOERBDQBEI", "QHNGNGKANGLNEPIMLQFB", "QNCEIAQEQGNDOLHFHQEB", "QDNLQLEHLHOEGRGCRLAD", "KHQEPEOHQEPAQCRLNDBN", "AGKADMHOADOPHMBEBRBOE", "EBEMHMKBMHEIRDMEGRJGA", "ANKANGQHQAJGBPIQLCOF", "RJMCHEJOIOBOEOEBPEME", "PBRBMBEOERLFRHJAFPKP", "EQMHMHEMKEBJCNANFPAPH", "KPEPOKRHBOECRCFHQBJGM", "DHBJNEBEBFPGRHLOAPG", "MHEBEMEMBEPCKOJRAPCR", "IFMGDLHFOQHQLHQDQKNB", "AKQNGQAQHEIOFRBLMLCRH", "ENAGFGRFOQBHDBLNBDND", "CHFAKBRFMCEQGNQKCQEB", "BENDQJBFNEINHLAKQJR", "HFKMHDCIODNKHFHJNBFH", "NENHBDBNJHLIKFNGQEOAK", "FBJNHBJHFQBOFAMKRDAKE", "CQINBENIECKMEAFQCMJE", "QKEHQKMHOHOFOAMEBOHE", "OERKQKBOEMKAQKFHDPLNI", "IKQBEHEQNBLPNGFHQLR", "BMKNKHERKPNGPJFOHKEPE", "IEINIKIKAMKPLFRBFP", "ERHRNERHOEOFGRAPNLBEQ", "HBPKOBMHKBOIJCQINAKFO", "KOKPEHNKBEMFOJFADNADO", "NHBROBRHBNIKEOLHNJRO", "OKHKMKOENHPDAOIRIMDA", "HDRJOFPIFCNAIQGENEIK", "BHLHPHRBLQEGEIKHNGEI", "OFAENQJGMQAEKCIKGNQH", "REOHBPHNBPHJCLCDQCNAO", "NHQNEHLBLNJRKPHJINKF", "HKHFGFKQGEOHPEHQBEQ", "KNKBOEPBEPBFPGFIMLOBE", "DNHDNKNHLHQANGJNCJIRE", "PBOHPNEBNHKFGPAOILCJN", "PHEQHOEREIQFGFCPLAE", "QAODOJHDIQDQHJHQHND", "QFQLDNBFBDOLEIMCNGQIL", "IQFRFRJGEOKNAQGKHKNEC", "OHEHBOEBQEPAMGFHPJEC", "BKMEHROEHKBLIKNDHMIRM", "ROBKBROHMBFAMKEANFNF", "KFQHBDHBNBOKEHNCMJCF", "ERKRHEBREOBJOHCLOLBN", "EBOIMKIQFREMEKMEBENR", "NEBDQBDBFQDGBKOBFHRBL", "HOKNHRNHKNCOGDCNJPIM", "MHKMKHBMKHKCLOLIFQKIM", "KPHQEHBMBKNLHBOLDIDBD", "KEBPBMEPEBMDCFMGLHQFN", "OBQHEBKOBKPJHCDAPHLAN", "BQBRBKQBENEGOCKPDGMAK", "RHOBKBQBRBEIFIKFGPECP", "OAOKANIKALAQCNKNAKQKH", "PEHNHMBEMBMCPHNFGBRIO", "RENKBPKREQBLCEMERGAPN", "OEHOBPKMBOEARCEIBFOD", "BDMAHJBGOHEGKGEBKNCQ", "NEQKBNHBOHMAKAODCRGF", "NEIEGKCKEQALBPIBJREMK", "PBPBERKQKMEGKCMJCJGJF", "DNBDQLNBDQFPBDIKIOHE", "BDBNJNJQNBLCQHJEIOCRM", "MEOHEBMHRBOLOEHCJIRJC", "QDNBEHJQHFIPDNFHJCNF", "QEBKHERNHMHFMFPKFGEOF", "BNIKGEQGKAOBLNGNLR", "KBLNBQDHEBEIMCMHOIQDG", "BKEPEMHKPERFNCLQMKPFQ", "KHKPENKBEROCLCKPDHQL", "NBNDHKQJENEIDNKFMKPD", "NCQKNKCQHQCPCLEIRLCM", "JEQKBNHJBNLOCRHBQJHKO", "QDNBJNHJHQIFHMHFOKOA", "HQHKAQNHFQMAOKFAQ", "BKANCEQKNCQOKHLQGRIEA", "GEHAKBQAEQCDMBLRDAPDA", "NKEPKEOEBQKFMAQFGCNLO", "FMRLAQCHDKNHEBEQBGEK", "ERBOKMKEMECDAJICDQIPN", "BJBFHKFBNBREBLQMGQMC", "KBDGDREIDNBHQFHKNL", "GMAHNGOCJNFHLQFHLQH", "KGKCECEAKNILHOLIKMEH", "QHOEOHENEOHFHQCPLGPIN", "KINAEBNGQKERHBLPKMAJ", "RHMPAQIKOQFNQBFNBKHD", "GEANKBEAECEOHFBRINJRJ", "OAPLOENGRAERBNHEMERBH", "EMEMKRBKOEMGMJNALBJHK", "EQBNFQLBLHECNILAFBMJD", "RHOKPBEBNKHCPMFOGENHM", "QKBKOEQKRERJNCJCKAQIM", "PHEQOKHBOKGNHRCJEMDQG", "KEGEIKQECENDGADNDQOC", "INIQIEQIQNCLOCFAOLQL", "KAQAKMLHMENJQLQJQBHE", "BGEODODAMFANHKCNANQIE", "KBEQGEQAQECJIOEGRBFM", "QEHOEOBQEHEIOAFIFBOBE", "IEPAHNRDAHNELQLHNQFK", "JQJDBNBJHBMKCDHQLMG", "NIKQNGNKCKHLRGFCJCEG", "OKMKBEHPHNCRNIDOCQKM", "QHRKOKBENKMIEGLPJOADH", "CGKRAEJMLMEMEKPEPHEP", "OHQBOKHPEOHDCDAKDQOA", "OFBRIPDNFKBPBHEOBMQH", "KNHQJBJHNFOIMGQMCKOA", "LHJHQDHQNKBPIMLRCOLMC", "MJMJMAGDIPEANEGNGQCEN", "BJNDBEHLBQEGPDRKQKN", "NBFQNBJNFBFGRLQHAQBLP", "EAQCNCNAQNCFHRMHFGJN", "PFMBQGRJMENEAEBIKCQC", "INGFAPKAEOEHNHKHOER", "MHBMEOBMBEGJHLAPFCJBJ", "EQFBFHNLBFHMHPFAROI", "GPLQJIFMFBNCNHKAKIE", "HKCEQGKBKGKOJRFMGPJD", "DQCOHQDCRJNHNFNFHDQB", "HBEOBKOBEPOJOJRFIEMGN", "OANLMPLBMAHEBQHREMHKN", "HEQDHBQEHLEIOLOJFCOAP", "BERKBRHNBNHCKQAFNHDB", "HBMEHQKBQBECMEIQFQAF", "OKNKPHMBEBNGPKPBOIJNH", "FOBIDIRHPCEBGEKAQGKG", "BQGQKBKCEGNLFAJNHOGDP", "HEOEHNBQKBMCFNGPBJPBE", "BPHEHRNHMBKFMEOAKOBFQ", "QGFGMFBOQLMEREHPHQEQK", "OHNBREHBOBPGMEBNKIPDO", "HNDBNLBQNKNAMFPGKQMAN", "JHFNLHDHBEAEAQFGDOG", "EBKERHOKHQOLIEMGRGEHN", "OLMDKOFAJGENCEBKAQKQ", "PHEPEOKRHBOAFHAEQDOHJ", "ADMPKRBPCOHMEHPKNEOH", "INAQKGBQNKQOBMBMDOLE", "LNDQNBJQEQALGECOIMB", "KEIENBKCQGQMKCRNJBJ", "KBLAEAQDBNDHFQEH", "KEMKEOERNHEGQLGEAJMJM", "QAKQBKGQIEBFBJBEMILI", "IMDOFQCRFNKNHEANGNQA", "LQHQNEHJBFPBFHOAQFP", "LORHJNBFGNKNBQLQFNDH", "EHKNGBQENCNLRECRNGLQK", "ECKGNIKHQBQLHFGCMGDCQ", "KNBNEBDQEBDIQLRLGAPBF", "NEBQAQAKQGFRFQIFNF", "HQNKHFQHBKDMEGKDGKFOA", "QBEOENKMEHOCQMJHFRAEM", "KMKRHQHKHOKFMKARFGLOL", "HRKBKOKHRBPGRECQBDGEI", "QBQBMEREHOKARMLCOEMLA", "KGQCKAQAEQCPJHNDICNL", "AQCQBKAEQAEOICKRNAPL", "CENIQKHQNEILAPEBMAK", "HQEMBERBEOFRHNKBJAER", "QKNHDQHFNLQCJRGRBJIQD", "RKMHQKBEHOKDBLIOBQIAP", "OBPHBEMHREQIAFRMDQD", "IQKRIFRGQJQKPKRBOHRBO", "CENCQGQKAEHLEHOKAFBJ", "PBERKEHQOBMGPIQGKDQIO", "BJHBQBLBLQFMFCPHAOJ", "OHQJRFRGOEHJQHEBHFNQ", "HJHLBJNDBJQMEPDNAEPG", "OKHKHMHENKQANFHBPJGQG", "HPNEMKBERERFHRJHPMDID", "EGRIJNINPAIQIEKINEIE", "OKRHMHKPBNDAPBEGECJIR", "MKBEHEPNHBKFQDGFNEMIF", "DOILNAQIPENLNBQHJNJN", "QCQGQBNHENBLMLMGOA", "FQBQNLNKQJNAFHKEOIRGL", "OEPBEBPEMIDCPFHOGLNA", "CKEAKGAKAPBFREQDBP", "KCQNAEAQCKHDOGPHFCRHP", "KPEHKOEQKOKANCOEHAFHO", "MHEBRKEHREQIRMHJNDRFM", "JNFQDBDHENDPGKGAOCEQ", "MEPKGJMQFBEQENEBOKOE", "NFHQFNKHBLNCEGEQAMIPM", "MDIPANRHFNKIKINCEBNC", "FGLBRLNCLHLNEBQDBFH", "KQHBEQBJBLFALGQBMIFHC", "KNBMEHKBQEAEIRMIDBRIM", "KEBPBOHKNKMAQMEIDMEN", "QOEMHPBRKEBJDCJRMEGM", "HNHRNHMKMBEGOEQGQFIAQ", "LANQKQHPDBKBIQKIQANH", "PMBKMEOHPKEGDMIRJBQCM", "MHERHEPNKMBDMCPFBQOCM", "JHLHQHQDBNKCPIQHPCFP", "EIKQKGQEGEBFOGMGQJHD", "JBLBFQHNJFIEQCEOEOE", "MEBKMERHMEOJAOEQFNIFH", "KQAODQJPDKAQBNIQAQEC", "RKHRKHKMEMHLCOFROCFGR", "KQNJQJHNHLEGMHLAPJQM", "BKHMHQHEMKILPBEQN", "NLQFNKBQFQHRBNGJMCKEH", "CKGNCKGNIBQOCQEQJIRIC", "FMGRLOFMFBJNDHKNLQH", "HNAEHEAEINAFHFCPBNLRA", "BMEPKBNKBENAKEPJAMJOH", "EBMEPKBOBPMLQAMEGMIFO", "HKMKEHPEQBPDMFNDMIQKA", "AEGDKNEMBJBMKMEBRBMHN", "BQEBPBOKRBOJQILEALPOA", "NHDCDKGJPDNJNELHFBQH", "QHMBMEHKENKGJEANKCREN", "OKOBKRHPBEQCOGKDIJNDP", "FGNDGNCMCHEHDQEHJBEQ", "BDQFHLNBKFPGNGLQGDCM", "HEQJNFQLBEQMAFOKHOCLC", "BKFBFHBQBNFAMIAQGPDQE", "HQKPEPKQKHPDNAOBMAFMC", "HEOHRKRBNKNLBFARIAPDA", "HEOEHNKEMEMIOHKMBDBLO", "MERKEMKHQEMIJQBOLRIME", "JNDQBJHKNKFILPCREGJRI", "OFGNFGEHMAHKQCKGEG", "HMCGPLNLPGECEBNQCQEG", "HENKMKPKEPKFNJGQKBJC", "HQDQNJENFHNGEOGKFAKPC", "EBOERNBMBKDODIRMDOEO", "BJNJNFQFNBKMCPHMBJHFG", "AEGQNHKCQNKDREQKGEAM", "PBKPERHKOEOJFCJQGCPI", "HBNEHMKMHMLGBDRIJQOI", "GEHEANEINHEODPDCKCQHR", "EBNJQNBQLEHRNJIFOFHCN", "MBRHMBREHOBJEPKQJBPCE", "LHDQKBQHEHERDRMFRCEN", "KOKRKBRBERNIJHPIMENIB", "BMEQBPKBKEMLMDMDPKCEM", "JQBNJBDNJNFRHRGEOBPFP", "KEQEOKMHPKNIOBMFBQCQ", "BQDGDIOKBGKMKMBRHREQ", "QHAEQGQNCNIJALCPHQLE", "EBFGPFMIMQBNKBQCQINB", "QKHQGKQICKBJINGMINLO", "PBQMBEOHEBDBROKIDIBM", "EBKRKMHROFQJIAFPOCLA", "EGKEINEBNECLRGJQILEG", "LIMAEQGFANBEJHJNHDNH", "OKCPLNRLRGEMPKHMEKBNH", "PERKBNBEHKRARKPJAPLBQ", "RKRNEPEHNEHDIMICRLCLE", "ERHPBEHBNHPCROCJQLE", "OHRHMKBMKHQGMERLDPBMF", "FBFQFQBJHDMJHPDOGRKAN", "OFJMIKHMQJHQBFHQJHN", "QBLBQJBDNHDPJQIFPOAPM", "EROHMBEBKRBJRMJDPLNI", "EBQKHCEGKNAMHCDBLRDGE", "FBQDQBNFQLFMLGCFHKGF", "FMJOIEIDGRKPHEHENHN", "RHNEMKRBENEIPEGMFPOFI", "RJHNILQHOEINIEHQEAQI", "KQNICQCKAEGLHRAEHBP", "HOBKOHPERHRCEBJPNHFGJ", "LDQBJHJBFHDGPDOIALRBQ", "LHDBNJQHJNFMCMIBQFOGD", "BMKBQBOEQKHANADRBOBK", "NPLCOJPAOLHMEKMBKPKHN", "BQHLNLHQFNDGBFCPLRGNC", "EBDHJQHDQENGFHRMGRJHK", "NBKQJHBFHLFGFGLDPBQLE", "HMKOEHREOEMLCRFBODOID", "ROKRHBOBKMCFQAQEIKIP", "OBFNRAECQCOKPHKMHEMEP", "KBMHPKQBRHKIJAQJQGROF", "FNFQHBJNLNFRNICRHLRCM", "RKOHQMKOHMCDRGMIPDMB", "HNKIEHNGQECMFOLBQLO", "NBPKBRKEPEQGMBPDILEAJ", "OEINHDOBPKQBFHQDQEJB", "EOBOKHKPHMAMILOKGAFA", "OBKHOEBNHRNFQIRIKPOAN", "BPNEPEHNCOBEOBQDB", "EBOEHPKEQHEGMIRBFRHJN", "CMBFHFRKIPEHQKHEPEKO", "HERBKQMEBRGKOILNLDPIB", "LHEHNDBNDBLCJBJQOFHR", "CQECQEIEQGFPNHMFAKOB", "KHAKBEQHNEAOLOLMLDPCM", "AKGEGNIQEBRCMLMBQFO", "KHKBPBKQOENFAQALPJOKF", "PHQHKOEOHOLPIKPBEPF", "KMKMBKBPHRHJHBKQGBDIB", "HNJBJHQKNBFCRFCFBPND", "QCQGKIQKHNKMALCMIKIQ", "PHOEHEBPEBPARARLOEREC", "HNLQHDBDNFNIQJIODCFM", "HOKRHBOHMHPCKCNJAROAE", "LQBKNHNHENDIFOLHEGRLN", "GDBFRDANQFNBKMHEQKNEM", "ORDPJNJCOFMKHPBHQERH", "EHJBQDHDBQHMIFAKIKOHE", "HFLAGOHFGEREKOEKHKOR", "GRCEBPAMHENBFNQHLBE", "NDNCMHPBLQKGQKGNKA", "KHOIOQGODNEQEHNEOBHO", "QEHNEBOKMHMJBOIOJDPJI", "HBEQNBOKPKODHCJOINJFA", "QENFHFQJHFIDAPGMIOJI", "GEIEBNKIQKOGKQOIDPKH", "KGQEAQINKHQFCJIRIOJOC", "KGQNKNANCEARDNBFGCOBN", "OHPBNKBKHQNIKECRAQOD", "NECKAQBEBNKPKGQJOADOD", "QHNEHFNBFHNCRHFHOGEML", "FGDNCGPKANQAEBKGEQ", "LMQCFHDIOBNHKBPBNP", "IKOGNKIELQKHOERHNBOB", "EHOHEBPHMKMIFCQIPIQMC", "NDBFNENDHQODRFIRIANK", "NENHBDQBQKHPCMAENKCEM", "GKAKGQAEBECMKDRBOFIPN", "FBQBQBFQFQNIEOEQDIQG", "MJBNECRCKNBRBHEHOHR", "HPKNEBPKBPKIDRFHJFBFN", "AQECKCKEIQBMAEQJBPMB", "QOKQEBREOHBDIQGQKEIEO", "BLQDHNLNEHNGFMKOGBNHE", "LBQLBQHBDBLCJPIENBKNC", "QGNGEGENHQNLREAPFOJE", "CEMRFQLHRCPKMHMBPEKNE", "HKNBENHKNALMJDAMANB", "PJIDMEQHRFBLNBNEHNLB", "KHJNHNKFBNFIRFHCERGCP", "QCKINCKEBEGRLMHRCRDG", "EHOKBKRBNENJMAJQIJNGC", "ENHMHKRHREMDPDHNAPHLH", "RHEHPBKPHEAEPJQIJAOB", "QEOHEOBEPHNAMJMCDRJD", "HNHKDQFBDHFPKQHDOLND", "HFHBNFHFQBEAEIOAQIEAN", "HOBRKRKEBKQIMKMEHLGBD", "QNGEGQHQKGBRFRJPKBOGL", "OEMREIKOFMQERHPHREHQ", "HBPKQOEBMHARHAKDAKPA", "EMKHMBOHPEOLHANJCKFO", "NERHOHKBNBMIJDBMHJPAD", "CDRFPIEKPIKCQGKCNCQK", "IEQKHNAKAEOEGMFMEIAF", "JHBLQEHFNDAKDGKHMFO", "BQDQHNFBFBNGFGBPIDRIF", "HRFGRANGPKBQDJQBJHE", "FHLEHQLHFNJPAPHBQAEM", "EQBMHRHBOHKFAMAFRMAEM", "HKBREPMEQEHCDGCNIDGEM", "EHERBKRHEQBDCLGPLEQMC", "EQEAQNGQEGEMBJQGDRIKO", "NHPBREMBKBKDGDOHLHMHN", "QKEINHANEAKFPBMGFGLCF", "HNLNFQJHQJQMGMIAPHAEM", "OCHJRFJPLCGEAEKGEIEN", "EPBPHOBRNHLQGNIOFRH", "BNKEPEOKOHPDPCODRFOE", "BQOERHREBKNIPJGKGCFBR", "BFHJQLNHDBJAMKHRBPAD", "FQJNKNDHQLFGECPBFRDGD", "BKHEMKBOBPNIDGBFHFAP", "NKBFBQFHNJRALRDCPILC", "FHLBDHJQHQEAJEOFCMECQ", "QGKENCQEIEPFMBQFQCPF", "KBPBQBEREBKDRIRINICPE", "BQDQDHQBNKQCJAPLNIMGL", "EBDHNFNEQBNGFRFOKDANB", "NFNJHLQEQHKGEAPIBERB", "BPHEQBEROHEGQMFQHJAQE", "BQBNLBNKNJNGQEMGCJOFN", "DBNJBJQKDNBPKGFRIEBEM", "ECOHEHDCPFJQHDNQHQLH", "HKNBDHFNDHDPJQBRJDGDQ", "QKNHLQHJHBKPNCKCLHMF", "QNJHDBKQBKFCJHJDAOAFR", "FIDRFAKGPKCNQEHECNBN", "QIKQAQEGEQDADIKPLPOJ", "JQKQJQNHNFGDHLBPGEPB", "PKGFHLPBGQFBDBDNKHF", "BPHOKPHMEHOIPADOCLBPL", "OBQKERKHMHOLCQEIFOEIL", "PHBREHNBPBPJDPILMBOAQ", "BQKBPBMEMKMINBDNIERCQ", "QENHBLEBQFOKOCJGFRDC", "QBKPBKBOHMKGMJMHOJHM", "INIQAQAQNEBMCNBJRL", "QCNKQEGNGENFCOARMLG", "KDQJQHJQDHFPEAJRIKERD", "EPKPOBMENIJQEHCRFOI", "COGRHDOLRAKHKNKOBRENE", "MJGPGRFPLQHQBOBHOHER", "QNFHLNDQJHBMEBOGOANG", "CMCNIENDIKINQEQCQCQ", "NEHEHPHKROEGRGROBEIJC", "DAQJCNPIRANCNAEAEIKQ", "HNKGQKCNANHRFGFBRKIRN", "PBEMEBPHERCOGEBOGPJN", "DQJBQFQBQHKOGARFQILMI", "CLAOCDJMBNIEBEQGQKC", "HKDHNDHNDNBOCPIKCRKBE", "EHOHMKHBRBPCLAJRDPNGO", "BMIJNCQAMQAHNGKBNQIN", "NFQNBKDBENHOGMLHJRIPN", "RKMENBOKRHCQLOIRCQFPE", "EMKPHKOBKMKCLOAJHOIA", "HEANINCENKCFPHFICEHN", "QDBLHKBFNFNGOBQLAEHOA", "EBJQNLBFNLFRCFQHFNGPM", "NFHENBDHNHEPCMBJQEMLP", "QNCKANHEAKALRDARFPANK", "MKMBOHMBEOHFBJRILEBER", "ENGANECKCEGLPEGEBLFAE", "BRKEOHRHMBNLPJOEGPAEA", "EGANEGNCKQKOIRNINILP", "KANGKENAEGCMJCOFPAJMH", "CENLNFBOLAINCNQIEHK", "KOCGDCFOGKBEKQHPEPHE", "FHFHKFNDQNKIOIEHEMGF", "BOKOKEHEMBOGPJGEOLIBR", "GFNKBNPLAKHDLHQHDNJB", "BQKMBMKBNERGECPKGPLB", "HRHEOKBEHQIMEIAFHLH", "OBEPKOKBNEMAERIQBPLH", "MEMENGJMJBHQELBHQBF", "ADBNCKHFRBDKNDHQBHLN", "NRAMREPJIOHREBKBRBEO", "FBECFPHPFHENRBPHRKHK", "PBRHMBEHOENGOFQMGKHB", "BQHFNJHEBQLRAJIPCDAJP", "RCMKAHNDREQFQHLHFBLQ", "CNALIRDCDKOBEBPBHNK", "HQJQEBDHLNLRBENDPALA", "EHECKQGQBECRILHPDQDH", "OAIRKNLAOIQENKPKREOKN", "QICNEGNIKCEMFPAPANKAN", "HMBOKENHERKDPOCKFPODN", "MQLOBFRDCJNEQGEBECNKA", "KNBQBJQNDHFMIEMCLEAL", "GKBQAKANAKAOKEIBFOGLE", "NKOKPHKBKRODCKCKDNFRO", "AODADKHKQGMBOHOHKMBQB", "OLCJHRBPDOKBPEBQHMPE", "LHKHNJNKNBRLCROCRJGC", "MHEQAOJPHLANEKANBQKGK", "HPBRHKEMBRKINALBKOBLN", "PAEJGLCRKCMHPKMEKHMHN", "KFHQFNEBQENCPKALIRALE", "FQDQKQBNHFRLRCJPMF", "BEQKBMHEMBMARFPMCFQDM", "EOBKBKPMKMGLQGRGRILO", "OBNBKPHMHBOGNKRFMJQN", "KGKHFMGKGJNQDHJHNKBH", "KHBQFBFHFNHRLARAEMJPM", "PEHNHBRHOCDGBKPLPNKM", "NFHQDBJHQBJOANFRFNGEM", "DNFIRDRDMBQEBLHDQDHN", "PBQBOHPEMFCNAKQKROA", "EPHMEHEHEPBLQOIDHLPDM", "QKPKERHKRBNAOJCJNDRFO", "EMIEOIPAOBNEBJBJNBLQ", "MLGNECREAJNBQBDBFHQL", "EMBMKREPEMDBJGBOHKOF", "ERHQOKEOKEOAFNEREHJRB", "QGQGNHKBKIEPLARHOGPBF", "HOEHBREHOKBLGOECFBRAJ", "BKQOBPKBOKMIBRILAPAO", "IECKQEHEGAMLAECPEHD", "IQNANANKIKHOFNIQMGKF", "PECMLHJCRFBFHLHFNKNJ", "HBQHOKPHKRDNJOKMEGQB", "GKGKNIKAEAKPAQHDROFI", "KQKBEGKNCEROERCOBDO", "QBQBKOKEHRHLARJAEINC", "KPKEMEOKNKMIKHQDAPM", "CIDOAJPKODOHKRBQBKRHP", "BKQEBFQNDHNIBQFQMLOK", "KEQHROEHRBFHBPDBLCMA", "JNFBNKNLDNIKPNAKQAO", "OCEMBJHRDINHNKCKQCNI", "ENHKNHEBOERCDBJMBEQJN", "BNKMBMEHQKIJOKPHBEOIQ", "PERBRKOBEBMFCOHCLOL", "EMEBQBQMHBOCMAPDOEGK", "EOKBREPBKEMLCRFPFNFAO", "MCKBOGDIMKRBRHRHRBE", "KHEAEGQENEHPFPICDAE", "EQKBNGNCQKAJERKAOJBJ", "MDOFQCDKCQHPBHEMEBP", "KBKNCQIBEIQLOAMEPBPC", "QEPKOBEPBPHLOBQLIEOJN", "KNEPBENENHOLGNLAROLEC", "MDNEOLGDGDNJBNHJBFHN", "PEBNDBHNIFRBHEMEHKRKR", "MEBOHOKPNBKDBPLIANIK", "NBNRKHDAHNBQHPHREN", "MEAIEAGJIKOBEHERBEK", "BKGKNCKCKAKOCQBKFHKOL", "CQNGECQANKQDNCFRKNAKC", "MEOHKQKOENLOHKNCOJAR", "HLQDBFNFQBDMGEGCODAJE", "EQEGKGAKQIBJRGPGRFOLO", "KEOEOBNKHBQCJPLEGOHBO", "BEPMERBEMKBJNBEARFNF", "OANERIPLCLHQFQBHDNBH", "HLQKHJQLBNGRHRBOINAJO", "GPCRKCLIJPEBHQHKHRHP", "HKOBEPHQOKQGPDOCKBRCK", "MKHMEHEOEPKAECJOLGARN", "ERHOKOKEBOEAQFHDGDBKO", "NFNJNFQHNBKAOEMKAFILE", "DNFQHKDHDQHROHLCPLOH", "BJHQDNLHBDQMHMEAKPGMC", "EANBNKANGKQMBJCRHBLBQ", "KPBQMKPEOKHLNGEIRCNHR", "EQKHQHFBDNJRDRGOLNIRL", "RKOKHOBMHRIRNIJMHKQB", "NKQHNLQJEHEGECQKDMFNA", "NECKQBQHCQBPJEMGRALPA", "QBEIEAKNKNHRKCRHOJRHC", "PJHMPKQECJBMPEBOEBKBN", "KPBPHKHREBNJGEHLQOJCR", "JCQJNFOHMDNQBEBKBNLB", "NLFHQHQJBLHOKFAKRMDPO", "BQKBNLHDHNKOLEGFIFNG", "JBDQDHJQDHRFNIBNDRK", "OLBMGRLBRGENBRBRBEQKB", "NBOEMHKOHPOLRAOBKROBO", "KPNBMKEHOHEGFBECOAQLO", "BFHBQJHBDHEGRGOLRHEG", "HKCKNCENBQCMFIJFNCPC", "EREHEOHBNEMCPHLQKDIOE", "MHEPKMHRKBMJOBLDPIDNE", "QHNBKOBNHKOADNCOLMFP", "BDBNEQBDQBJILMJDRILQ", "FLPHPGFKGREPHMHEBPB", "MBOEPHEOBEOJILHKPICEM", "BOBPBOHOKHBLRICEQAMHP", "BMHPHMKNEHOLOINHKDMJG", "QKHNERKOHENFQARLHFBJN", "HJHKQLHQJBEMFMJMCROIE", "BNKQJNHFHQNCREGQKNJP", "JQBQFBNDBEHCKOFHRJDRK", "BNLQDQLQHQFOCKRHRGND", "QKRERKOKHPHFIFRFNCFQC", "HOBERKEPNENGPJPLBMIC", "PEODRBHFGNKOBKHNKOEB", "OGRLAJCJCDBFBQDNQKBL", "KIEQNAQNGNBDIRDHCJNHR", "EBRNBEPHKBOFHPHDCJMKF", "HLQLHLBKBQBMHOAFCPJIB", "KHKQHEPBOBPICOEANDIBN", "KOBREPHBKRNAOIBERDHDG", "KHKQGEIKHKNLNGPLHBQA", "HBPKHMBRHENCPEOBLBFOE", "KHBOBKHPHNBLIRBMJPBQB", "MBRHRKPHBMLROBJHAQMIQ", "KIMQCOEGPKHENBRHKMH", "BOKPENKHOEHAEMDAQCMLM", "QKDNENBQJQFGFRBQBJNB", "NJQHLQDHQFNCPFPAJFQCN", "KPKHEOHBPEQGQLDAFHRAF", "OBEQERKOKMHCMCKDMKBFN", "GRFMCNRAFAGNQCEGENC", "ALRHJMDRGMBNQDBEQFNKN", "HKNKQJBQBNEOJGARIAJMK", "MHPKPEQOEOIPLOLBNHMJC", "EGBEAKCKAQALMAEGLDNBN", "QFNKBDQDHNDPHNGMFQHP", "HBQHOBKPNKHAJMHAKIMIN", "QKEPHNEMBKHLAKPFGQDIC", "EQNHLBJNJQJOGOFMBMKQ", "RKBOHMBRENCLEHLPJBMLF", "CQCNPDBHOKNANEKCNCE", "QKNEBQHNLNLMIKREHBLQ", "BFHKBLQHLHKMILHMGLOB", "PKCOKHNRJQEIEQGKBEQK", "MGFNCEQGDKGKHKQKGKIE", "PNBPKQEQOBOIOIQHLHDMH", "ANKAKCNBENFPEHMDGBRL", "BQFQHDHQNLEMKBFPNIJGL", "ERHPOHKHOBKDMCEPIEPEQ", "KMDJMCHPCKMHKOKNHMBQ", "BQHFQJBQLNDMDQAMJNHA", "QGNCNGEAEQCDOHQHLOIAQ", "EQBQJBJHQBJAKIBMLBKHP", "HQBPKEPKOBKGJECDPAEPC", "HQANCQKNBKHMLQFPMCMF", "BEHPKRBNBEOLPCJNIPECJ", "HDOQKOEGRBHENLNHLNLH", "KNJHJHEBJHRDQHDOCRM", "HKOENBOHMKRJHLIAPKQKD", "LRAEPJILMBDNBNFQLNBE", "MHRKBKHRHOECRDGEAKAO", "AKNCQEAEQBNFIKNDGKR", "PKOQDRBFIQAENEKINGQ", "DBGFPFBIPEBKHNKNCKQK", "NBPKEHPBERBJAOLQNAFOC", "DRELOLGPKPBKBNJQENJQE", "MHNEBKNEOEPJFOGPOGBDA", "KHQDNLHDHFHCLNJEAMKG", "JHBQJNFHKBEGNEPFPHJE", "QKHRHPKRERJAMHBPLNIL", "LARDMJMQLPEMHOBHREKN", "MEOHEOHNEHNIDPLDMLPMI", "HEQDNEHFBFNCQHNKQOIN", "HBJQNFBLBERAJDHQIJGJ", "BKMHBPKRBQOAEPLBJOKAP", "RKHKEPHKMERGAFMCNCMF", "CQGDHPEMCPBFBNENQDHL", "KBEMEOHRHQGCPHODMBPE", "LNLNBKBEBNLPDIMJPFINE", "BKBEBQHQEMHCNBDCJPJRO", "PHMEMBPKEHQIEQCRCNFPF", "RNBNBEHPBQHJHOHDGNEHD", "ENKNBQBLHQKCFPGOLOHPE", "DNHNFHBNEBFMGJOFHOKA", "MHBMHOEPHOHLRIOBFRCKO", "BQNKCNIEIEOIOJGCJG", "LIQAFMKPJMBENEHKOEPE", "QKRDOAPDCKQBRHERBQEK", "NKRBKPKPHENDAKADMBMID", "KRKQEMKERKMGOLAMHFPLM", "JPGDOGQLCENKQHPKOEHP", "NKNBLNFHJBDOFQBQKIDIL", "NDQJNEHFHQHARNIBNAEP", "GFGNFBRGQDKNKRKHOBMK", "QBEBMBQEBENCQKRIKALPN", "LMCKIJOLMLNHNLNDQHN", "KHRNHKQBEQCOFANFBMCK", "KBDBDBQENBQOCEQCNGB", "BRKPKHOKEHNINCPGJMKNB", "KHKIQEQANIKDMJDILNGEN", "EHNBQFBQNJHPKFNAFHBR", "CEIEHQAKCKCMCJQERDRLN", "AEAEQGNAQEQODNKCOHJ", "ENKHMEBOEMEIFHJQLNHO", "HNLPKRBIOJBDNFBQFNQ", "MGMCMDLCOLNKHKBRERKR", "PHLAGORJOAKPBQKRBPHKH", "QNJDHDHNLQFPFOEAENAMG", "FHKHJNFHBQHRNJQJHMARE", "DQBFQBQHJNKINIEQARIJB", "PEBKEPKQEBPJOBJHAPCD", "BENBOHNHBKEGRGARFHFQB", "BRHMEBKQBMHFBPIKOHFCF", "HMBOEPHMEQHJROAKPGKFM", "EBPKRNBKQNFGKOGEQDCE", "CKPBJGKPGFIERHERBEPHQ", "QKOBOKMEQBOIEMCJGANK", "FIOJHJBDGJHPKMQEBEMBN", "BGOGMBEPKMEQJBNLNHFBE", "RBMHKPHQEOKDHLOBOIKEG", "BERENEBEOENCPNDCDAJAL", "KEMKREMENHMJOKGPEMJER", "FLGDQKQDAPKRENEMKNKH", "BOHOKEBMKBKCKIQJQFCEM", "GQEHAENBEQGOHKIQNFGR", "EHNEGNENKGLPFPGNHLQO", "DNHEHNBDQNJOCPDMFOKDP", "ERLOILBRJORKBOHEOKNE", "EHKPNEPHQOLCKRMDCFHL", "QHAQGKEHNKQJIQGPJBPNB", "KQHOEHEHNHPAPLBRFAPL", "BMEHRBPBEHOIJDQJCJRCO", "NLEHBFHKHQFCQANLOAPO", "JNFQBJNHDQKRJQAPNLCK", "HNJHKFQDQBJMDAQCPOFQN", "CNHAEGKQKQEPIEPCLECJF", "HRADMQFBILNQHJHKBQJQ", "QEOGQJQLOANDJNDBHNBQL", "PERKQKMKEHKCJQHQLFOGC", "NDIJGOPEBGNBPBOHQKHNE", "RHEMKHNERHNLOLMIQLDCN", "QKHEMKNHEHPIRIBDRBMCO", "QNEQDHFBQJHADMDRERHDA", "KBNIKQCQGNCJPMFQNBENJ", "IMFCRCKGFQKBMEKRHNKH", "LALBMBKBGKMBQBOEMEN", "QKHEPKNHBRECJPMJAQGLN", "KBQIENCNCKBLQFMLAQKCK", "HKPEPEHBQAJAMGPKHMG", "EHMEPKOBKERLGDMJIOAJ", "DNHJNBJHDQBPECKPOFNK", "BDBFQLQHLBLAOAFPMEMGN", "NJQJHFQDBEQIECQDRADIL", "OBQKMBKPHBNFHOHRIOALC", "EQBKNEQIEINDOHJINJHJ", "DGDOQCFGRFNBEBQDBNEJ", "HLQHDQFHNKHOLQOGNIMI", "NGQEHKGQNECLQOGNIQJB", "EGENBNCQGKCLFRLIAEAQO", "RBEMKQHBECKPAJHCEGO", "PIDLNAMJHMHKBNAQCEKQI", "KALGOLPJRKQCKANBGNEN", "NHJBNHQFBJDIJMHDGPMI", "MBNHPBMKHMAMJBPODNEO", "EMDJILRIJGECNIQHEGKI", "NDQHEBNDHQEPFRGOCEPHK", "KBKNBQFBLNHRBFINIMHP", "LQLNBLHKHNBOCJIEPGOHE", "AKBNAKCQCKDIBDMFQMK", "QFHQNFQHKARNGCPFB", "NHBLBDQENJDAPEHRKOAN", "BJQLNDHJQEMILGEGNFMK", "KERHRKQEBEHDQOKPKCFRO", "FLALQGPGDCMPEKQBRKBKR", "PKHRBEHQBPEILFGPOJBMB", "QENLNJHQHQFCMANHPALHF", "KAEQCQKQGKBLGQKRGKEAP", "HBKPEOKNBOKDGBOFHQGLB", "QHDHJNLQNJHOGRJBDBDOF", "DQEBQJFNEQECLHRCRFBNA", "NEBNDNBDHKQIKQMLINFAE", "LHKHRDOCFOPEBHPBHME", "OLBGLBHMKGRHKBHNREBQ", "KEOKHPMEHRNFGCMAKDPID", "RNKBNBRHOKIFNALHFICP", "QHEGQGANKNAPIMGNJFMBD", "QNGQNANEBKNFRHPDHDHNB", "NDOEINFMBLMBPBEHEOKBO", "KGQNKNBEGEBRCPODMJGE", "HEBPBPKRNHMJMJAFQCRJD", "HBQOHEMHBNHCOBMHJOJRA", "BRKMKQKOKOHCPGDARMLI", "BENECQHNGNERIMFRBQLA", "MBNBEPBEOKBJCRLMERHFC", "OKRHMHBKPKDCLOCJPIB", "IQELCDPHPJQLNQBJNHJB", "HOEBEQEQOBPFGKPLOANAJ", "NEOERHKEQOHAMBKCJOLF", "EHAEAEQKAECDHEQOFIRAJ", "CECQNBQEIKHODAOAPJRE", "KGJBLOHPIORKHMHMKHRB", "LNBDHDHBQNDIKEROKRCKE", "PKNKBMKPHEOFQGLRHLPND", "BDCDPCNIOQEAHNBENCN", "QKEOBRHROHKCFNHMFHPHL", "ERKHRHENKQEGQLMEOKNL", "KQIEGNGQHQNJOBPLDGJO", "NAMPBHELOFHDBNJNHKH", "KHLBLNHFQNLRIJQOGFRK", "HFHQHENKFHLCRCLRBFPEB", "KHJQNLNJHBDRFAEPOGECN", "JHDNLFBFBNHCLEBJIOCDB", "DHDBKBNDHJHPOIMFPDC", "HDNLHLNDNKQODNJFMCKRN", "PKMBEBEPMHAJRDOKCERHB", "MKOBDMRCDBKOENBEMKR", "MEMKBNHQEOHCDIAEMBJFI", "HRKRBEHKQBQARCPDMCKC", "QIRCQIDIRAMBEQBKPE", "BMBPENBKBRODPAPBFBMCP", "NBJHQFHEBKNILPANIMDRO", "IERAIQCQJQEHOBQBKREK", "HLBDHJNHQHFAQBMBMHFBD", "HEAQINKCNCNJCJOALBRL", "HMEPHNBEHBMDHDGBJGRF", "BEQGBKQBQIKDIDPGQMAN", "HNJHNLNDNHJODGKFQANKD", "GQFHQGRFIMHKOKBRKMKB", "GQNINICQEAQDBDRJGCPKI", "FCMFMFJCLQGQANKCNANQ", "DBLHFNEBNLQARHQIRKQIL", "OHMCKCJILOBREMHNHKOK", "EOBKMBOEOHQDCPAOGJRKE", "NDBJEBQHNLNIOKFBPCN", "EBQBRBEPKCROLODMJDB", "EMBOKNHOHBOIMLROHQFIO", "QHQNDQEHKGEMIPJDOLF", "PBKMKREOBQHALRENLRMEN", "ROKHBRHBOKEAMJAJQKGRO", "MBIOEBPDRCKHREPHRKMHM", "NDOCELBLGNHDHQDBKNDH", "BPHMEBMBKOKIKGJHJHQ", "EQGKAKHEIQBFNGOBMFB", "NFQJNBNJHNKRDAEMFGPLM", "HEHEBPBREOKIEHCERNIJM", "EAQNAKCKQKCMBQLPFIRB", "CNEALQEMQDNKIENEQGEIN", "FIMIMGEMDKMBKBOEQBK", "JPGLHREBLOEOHOENBPEK", "EHJHQDNFHNERJDCRBFHR", "DRJBDRFJMECNAQINKQKB", "BLNEGLCLAEHEQHKOBENP", "KRBNEPEOEPOCMIBJIRBLN", "EQDNBDHDNBKRIEAOFB", "EAKINBNBKALAOBRJGADCF", "KQDHJENLBQBOEQJGFIRGC", "NPAQBLBMKQHELQBJHJN", "ENEBNLQNLQLADMJRMFCND", "EKRGRELMBNBHDQHNEBJ", "DKBGEGLCRBGNAQEINBQG", "AERGFOQCREBGNCENGEC", "ENDANRFPADBJBJQLNDQE", "BENHOKRKEHEIKOHBQILRI", "IENEIECKIOIREIJBDAN", "RNHMEHKBQNLAJMHKBLAM", "NEHDBLBKBJFREIPFGMKOE", "FQFHNHBNFQDPHDNIKOIQD", "MFNEIKBMJNKOHOQEBEHO", "KQEIKQBQAKAFOIBKDOAPN", "NEBKEMEBOKHFNDHCEAE", "NJHJBNJBENHPIPALBMJP", "ROHRBNKHEBNJOHMFPGBOK", "BRDQIRJILNKBHNRKRKBP", "NKOEOHKMBNEGMBLILQDN", "JBLQHBDNBJREBJDPIQAN", "CKANLMCEJCKRHREBHREKO", "LPDOBNAQLOAEBQGECQBNA", "BMKHMHQHBOHCOGLBJOGFP", "JORFCRLAMAHDNHNEBEHEH", "QOHMKMBOBREIOIENDIDC", "IOFCNKAIDNBKBNKHOHOK", "KOEBOHRKQHAOKBPDOFR", "EOEROHKMHMEAKALGPLEQO", "KHBJHLQEQDBOHJGEQBDQF", "QNBDBKHLQNLCECMLEPJEG", "CDNKRKAEIEQEHOHOBRB", "BNJQHBEHDQKGEALQJIQE", "BJBEQLQEHBRLAPOEANAM", "QEININEAKGNLBNAOLOHK", "QHEHRKPEOEMLOJOHQLIR", "PKRKBOHKBQEIRKBLPMHFR", "KIKIQKIEAQCLARIMFHMJO", "GEGMEHDHOKQKQANQGQGK", "OKEHBMKBRBOARFOLQKPAF", "KHLBJBDHEQBMFNGADPDCK", "LNKFBLQHQHNCFAEBMFCRI", "CKEBNGEIEBOKOGDGQH", "JQEBKHNHFQDRAMLCJOGR", "KQKCQHNAENEOKMGJNKNI", "OJANLIKMGPBRHMHERKRE", "INKHQKANKGNDMBRKBLNGN", "FAQCGMCOCNJHKBNBFBNQ", "APJCMCJPGKQBKHMHQBKN", "EPMBOBEBENHCNLOKILBJ", "HNBPEHREHQANDBRMKGNJO", "BLNDBEBNDHAOHAJIJGL", "BKRHKPENEPHLPLMGPFRIJ", "IFQAEOIJHFBMKBHQHOHKM", "BEHDHLNHNBJPKDGPOJBF", "HFHKQJQLQNFOHOGPEGCO", "LHBLHNFHQJEMDIKRBMECQ", "HJQIQGDOPJQKBEKRBHQEK", "HNHOKHPBQEOAOCDIDGPGM", "NEAQNGBNEAKPFRHMKRB", "REHBPKHEBRMJCLBOAQN", "HPBOBKQHMKPGPFNFMCQBO", "MRAOEGKOJNBNRBQKPKO", "JBLBKNDHQBDPCJMBRHFQO", "HQHBFBENLDGFHKGKOBN", "BLNFQDBKQHLGJEGBDQEMJ", "QKHOKRBRKEMAQDGBFMBRG", "OHKEPHBOENHJAEPMCOHOJ", "BQNIQCKINEBMKMLHLAL", "QMBEQBEPEOHARLILQNBOG", "QLANRLRBRDJBLQFBFHFN", "QJOEHFAHMDNBQDNQFQEL", "NBNANIKNBNJNEAKOHOHD", "KNIKHQHQENCRKNJPLNLN", "KEGNKGECNGKOCNIPKGJNI", "FQNEQFBKFQFAOEGDMBF", "HMHREPKQKQOGQLHOLHLO", "DHQHJDBNLQFMCNDGOJNF", "EQAQNKANIQBMIJERHCDPN", "NKRBRBERBNIEIKMLQCMB", "ODPLOFOJIEQHJHENHNEQ", "QKBKNBNBMEOCOGNDMDIA", "BMBPEMEHEHDCLQKFQCEIO", "LBQNKNHLHBEMKAERFMJF", "BLBDQBNBLQERCKAEHOH", "LHJEHDHQFQHRBNIOANCQ", "AOQAJHQAEHLBNKHQLBJ", "BDNHFBNFNKIQOLNGOFCR", "JBNHDBEQDQDRHFQMGQAKP", "KHRMEMHEMBOFGQBFIQLCR", "AKIQKEINGKGJOHFRFIKB", "MERBKMKEPKBLGKMHKRAFH", "MEHREHEPKENIOBQLERDBL", "GKCRJCLPENGNAHKQKAK", "BJNKBENHEQHOADOJEPIQE", "EOBEREMENHNGKMCLIBROA", "EQKHFNFHBNFGMLBQCPHJQ", "HBPBQHROEOCLEOGJARFOB", "KCKQNIKNGAQDOGDRNJQOL", "EQIBEIQKNGCLMBOEOHLEQ", "FHPEOFRARBLBHJHNHNEH", "NKRKBKEBPKRFGPCOECDPK", "KHPKNEHBOKNIRFHNBPBE", "NDNHNHKDHLFICFQMDAEOF", "NPKMHELPAKHMQBNHEPEB", "MKBENBMBMEOCFRFBMIRCR", "HOKHMEBOEHOGQCOEOAFP", "HNFNBKNBNFHPAFMIBNFIQ", "OLNJAOIECDHKNBHJNFQF", "EHFQJHBDHQIPEOJPNILF", "GFIDGLAJNCENGNIQIEN", "FRHKOIRDCNHPBMERBEQK", "HMKQKHKRHAJQJPCRKP", "HENEPHMHEBNFODIMKHLI", "RFKOHJNRGREPHQBPEQKP", "HQBDQDHLHQKIFIKPODHJA", "BPMEMKBMBMHCPGRAJMJBQ", "KQAKAEIQHEBLIPMBDPHOE", "EGKBQHCNKEODMIODIPC", "NFHQBJNKQNJRIMIPCJRF", "BLHNKQDBQJNCKRBOIQAKR", "EBNJHBJEHFQCDPOFAJERD", "OHLBDKMQLAENKNBMHREHN", "KBQHJNLEBFHCPOIEIFCQF", "NAEQJCPIFOKGEBIKBEIEQ", "QKBNHQFQBFNCMCFILHNJ", "ALPFCHLPFHEQKNBIKAGE", "QCEQINEAKEIFQNIQOID", "MEBQKOKNKBMLGKRKPBMK", "EQKHKHBRBMBFHRMAQCL", "MEJMHJNGKOQKNHRBNBH", "ENKMBPKEROEAPMFRNGNEQ", "HMBMKMHBPEMFQNBLECNE", "QKCFHMFRKHNHQDQLNFQ", "JHQJNHENLHQIODANCQBO", "BKHBPNKHBMFMADIRMDGB", "NLNKHDBLHBNIKNEMIQLCM", "NEBQCEQEIBQMIDOAMHQ", "RERHKBRHPHMJMKEARMHEM", "KOKBNHOEQEQAOEPDQHL", "HBQNKHLHFBJIFNHOJMHK", "FQLBLHNLNKMJCRBKGDRD", "KNHNFBLNEQDADGENCPDPN", "RBOHPHOKOKBDGJQBMJEIK", "FMEHNFCDOBFBLQJNFQJ", "NGKQNAQHEHKFGKBEIRLD", "OKNKMHBERHNFPHDRFNIR", "LHNKQLNLHNEGKERCLICMJ", "QMEBKEOEBEMGPDOKGFNDM", "MEMHRHOKEQHCMHDQIOFNE", "NBEBDBNFBLEPNLICOHKR", "BNKBDQDQHNECLDGMIEHLH", "NFQLNJQBFNBPHBJAJHAM", "HEQNHJQDQHBMLHNLAQKI", "KHBDBKHQLHFIQLAMFPHJA", "KQKMHPMHEHNJIBMCOCRE", "QINKAKHKNECPBMLHNINEQ", "KARJRGPLANBOKOHRHPBR", "JNDBENLHLBNGQKCMJQCOB", "BFNJQJHEBENCKEOCOJQ", "HOIPIEILBNQKIKCNHEN", "HBQHDHKFHEHMEGPLHPAOB", "MCDAPCPKOBFHFBNFBJQB"
                    ],
                    [ // 4
                        "QKBLNDHENFIQJOKAREMK", "HNAEGENCNKCJAPBNCPN", "NBQEHEBREIBLILMKBDO", "DQIKAOPJRKNKNAKINANB", "HEQHBEMKOENGKAFCQCMBO", "PEOHKHKRNHJMCJPMIJRMB", "KNBEPOERHOECQLPCQLFCK", "MKHQKEBEQKNCLAJDINAOH", "KBPMHEOKOBRAOBRNHDAPK", "KPKOBQHQEOIDPINCPHEP", "FNBFHNHQJNKMCOINEGND", "INDIDREQCDHJHFNDJQHF", "BKBQMBKERNBLQAFROLBM", "RAFIKPJMBJQAKQEAQGQEH", "CKBNIQINANCRIRDNEOFN", "IFMAODHFPBEPHNBMKQK", "BQFNJQJENEIDQHCROGNH", "BNHREHPHMBMLAQHRBFBND", "KGNAKGQEHEBRKAJERFAKB", "LBQBLQNDBJMDPBMGNK", "AQNENGKHCKQMGJMEPGDGJ", "BEBKOBEOHKPGFMINJCDQI", "NEOEMBPNEOGQGEPHDNK", "QFGMFBNRFMHEBQHPEOBK", "BEQKBECEGECPALIKMKH", "HPBFCIOQKANBQGECKQ", "LHQKBDHBDQKCRKROIOHD", "KQBMBNENEPHDPOBKDIEMC", "PCMRCGOKGJHLBLNBFHLB", "LBNHQJNKQJFPHLGFMGDB", "QDBJHBFNFHJCOAMGPFBOC", "DNJBEHQFQHBPCNFGRDQK", "KENKRBEBNHODPJGOIBQI", "LQNFNJBLHPJGCFBNICF", "OERHKEQBOKQIFRECNEIBM", "EQBNHFHQFHDPFIQLQDQM", "BQKNFBLQDBEIPKGCOGNCL", "JCMDHRHODGKNBQBQDQKQH", "NPAIRIEQJANQLNQBQHKHD", "BQNDHNHLNKBMALHQMALHC", "EGKBGFAOAHKHMKMHPBQB", "PCQLALQIRDMKPBKOEHPKB", "BEHMKRKERBKIPAOGDCMLN", "EREBMKHKQOKAOBQDOGQIB", "HBKRERBMERKILMKHNJIKA", "HKAQNHNINEIPOILGEIQN", "AFQIFLBGPBDHQLHNQLBF", "BLMAPEQCPDQEQBDQHQFK", "MKBKNKRNHRFROAEQMDID", "HBMBQOBKRNKDOKADPEADB", "KQKRKOEBEPHDPBLHAPMH", "QBKQEQNGKEARJHRGEOKQC", "QOBOEMHEHMKAMJDBPIOLR", "MEBOKHQEMKODCOGAQOGOK", "HQOKREHOHBPGDCPOCJRAD", "EBOHRHOKMKPJGJPGPMDBO", "KOKROHKEMEOJBDIECFG", "EBPNBKPKIENDCMKQBN", "EOIJBMRGREHJBEQBHLBK", "FBENFHJBEHEPFOAOHPBJ", "QCECEHNCKEHFOCQLPFHDR", "OBENKPEMBOKIFBPBMKDP", "LNFQENBENFNAQJPMDMAQG", "ERLCQDOCNRJBPHEBOENKO", "EMBOBNKQEMBFBRKNAQHFI", "QEPHKOKHNHMIQFOFQOEO", "LGQILAHDIMKQHOKPKPBO", "MJPGMDCKMDMKRERBREREH", "EAEAEAQCQBNDIKFHCPKH", "MKNLQAHEJBKHPKNKBMHR", "CEAKCNGEHKCRHRBEHLRD", "BODPFRCPFNKPHRKHKQEN", "HDQHDBDHBNDGPOGKNINGB", "KNIKAENAECQDBRDGMFIQM", "NQIMCJHQGERKNKRHKPK", "FBJIPGFMGOBRKREKHPE", "HKEQOHPKNEOGLIQLMDPEO", "KAKEBNGQKBLRBJBOCKCN", "NFCNRDNQGJQJNBQFNKHQ", "JNPGRDQJAFQFQEQJNFHQ", "MJAKQGRCOFBNBDHNJNFB", "LODBGJBIJHKGNBIKNQGE", "DNJNLHDBQFHRFPERKGBL", "KEMHERBRLOAPIOHOAM", "ODLMHFHMEBKIENHKQBE", "GERGLGRFBGMBNBMEOKO", "BQJENKNHJEHPGRDIJAEH", "ILAOKPJRJANBEHEQHNEC", "BKMKNKMBPHKCJGRGDRHLA", "OHPMHKNKBOJILIRANCE", "NJNBQHNFQHAOKMJBFBFA", "IQEGKQKCNILNHLRAQOIC", "NKQLBKQBNBJGOIEHCRCQA", "QGNGBEQNBKRCJIKGDAPF", "NBQNGNHENECFPOGFRKBOE", "BKBKQCKNBNIFAOFCLQKOD", "KOEOBQKBRHPLNGQECPHOH", "AMQKHDPCRLQBOHRBEBEBR", "DILHPHFAJINBNLBHNDJHK", "EIRBNHFHMGOBENHNHMEMB", "EMKMHKHPBENFAKEOHQFHP", "NQLIJGMQIENJQJHENB", "NHEHEBMBNHEAKMKDMFPJH", "HEMBNEBOKBNIDPFMHRCRE", "FCRJMFIFLAHEPKHPBMKBM", "QLNFNDQLHEIPFPJNGQFC", "EMKEMHBMERBJHMKIDQKOC", "BKNBKFQJBNHRHBFGEPHDQ", "NBKFNKNHNLHCNJGCFMFI", "EOGPCJIPLGNFJNDBENQFH", "HMFPKMADBPKOENKBNBO", "HNLHJNLNKBFOINHNDAMC", "KMEBPBKBRBQGOJIAKAOGL", "QGNBNGKGQKGRJHNKFNJO", "HQHENLNBDBNCLCRMCMGBO", "LHDHDBNEQDOGNLCKRGK", "QAECNKINAEIRAOCLQOEQF", "MBMHREBNHRECKBMJADBJ", "QHQGQBEGENHLPJMHCNFPO", "NKNIQAEGBNEOIFPKMBKC", "EHQKQKHCENBJOCNLQNFR", "MDNBOQKMCOKHKQBMKBMH", "BNDBLBLHLHBRECPBNJIPB", "LMHLQFIJPHQBFKHQDHN", "KPBKPKEMHMEAODBFBOGP", "BJEBQKFNKQHRJAPIPEMCE", "QHDHBQJDBLQAMFQNCOEOC", "DALMHENIOFKNEKOHNREMH", "NBRBRBNBKQCLECKMLGBO", "QKGKCNKRFNGEGKCKCQC", "BMKOHEHNEOLCDQJPHQIOJ", "JHJNHKQBFHBMKIDGPKQN", "GKCNEHQCQANLIKQJERGP", "HBDHDQFHBLFOKIBDRNJG", "HEQGBKAKCNAJANKIEPEBF", "KPKNEMHOHBNFHOECKPBM", "PHPKPHOEHNCLROBJMGRLP", "HFHRGNCQGDHRKQEOKHMKM", "KBEBPBRKOKEGFIQCQNARB", "BNBRHREHRFHRJNDAKOKG", "KHRBKOKHPKHJRLMGJBRGB", "MRJGOJQFPAHNGKAKBQEK", "JHKHEBQDQENCDAKMIPK", "IMJBHRLAKOQKHPEBEOH", "NBPHOHPERBKIEGQDGLD", "RNHKNEBEPHPGLRFAJRKPA", "KNHECECENHBLMAMGDNF", "IMRJQGKGRDAHQCKAEAECN", "QGELMJMQDAHNQEMKBRE", "EHLQHFQBFHNGOJBOGEAJ", "AQNIAQKCQAEOGNADGDCOH", "NJMBNAPJAEHOKNEBKBER", "EBPKNEPKOEMGPNHMIFNEB", "RERKBKHOKBMLPFCOCRKRA", "KNHMEPBMEBNCMFRARLPCM", "NBQINGENIEIFNAEBMGJI", "EBERHKPERBOCOCLMCKIOA", "QMHKMHEMHEBJIPKBQAOAN", "LQJQHQKQBNCMGKOIPOE", "NBEREQKRHKIPBDHRIKH", "CQEAENEQHQIOLRJIEPAPI", "NBPNHKOHBKFHNEOCJDGM", "BENKEINICKCMARHCLAOB", "QHFBDBQKHERLMCJREOL", "NBKRKEBEPNAOLMFQJDAD", "KPKHQHEOKBMFBNDIKRGB", "NBDQIMAIEOLQHDQLBNJHK", "NBLBNBNFHEBOAODANLDQM", "BEPNBMHKQNHCFQIJOAOHR", "REBKHPBMBMHFOFOAPHDI", "HBPMKEMBOBMDOGBDOCNCQ", "LGKQGFBOIRKPBKMKBHRE", "KINCJIJCHQCNEHKQCE", "FBQEHQLEBFBRFGCEBEOBF", "BNEOEMKBPBEGRCJPKOLA", "FRFRKGRJNJNBLNKBLH", "JMBHKBKRALBPKOHKMBEK", "EQLHQHDQLNFPNHCKEOEHN", "KMKHOHMEPEBJAJRCKFBF", "MKHKEMHQMBOFPIPEBLA", "MHPHRKHRBJNDCERJNDB", "IQCMFNPECEKOHEKPHENR", "JQDQHKHFNKFRIRDPJCPDA", "DPLCODJMJMKHMHRHOHEB", "EJAPDMDILRBQLHNQFBQEQ", "MEHPKEOKEMLAJNJANBMB", "MLRBDOFPAENBNHDQKQJH", "EPERBERKOHKGPLANKIMGO", "HNHNLNBDHJINEGROHLHO", "HLFQFQHNJNJCRJFHNDRCK", "RBPERKEBRKFIOAFRILGN", "EBPKHMBOKBOCPJRNHMCRM", "HQCEIBNCQNBMIKAJBERDB", "MBMERHNEOEOFHOFRCKBO", "AEGORBFIJNDBHKHND", "RHKBOKEOKBPAQCEPIEBFB", "KEHANEAEBKCLPNLBLMDAO", "HOHOBMEPENKGDIAJAFRBM", "LNDQJHBQKBDRKHREAKD", "RKQOKQBEBKRFQKALHCRDM", "FQJHJQHFQKAMAJCEHJOJE", "ORBNLIFGDPBHPBKREKOK", "KHQGQKGEAEOALHBLGBLB", "HQFPHEPJMANBHJNEBFHJH", "BNEHMENHOBNIPDMANGLMJ", "HJQKAHJPCPEPHKHQEOHM", "ENKNFHNBDCREPFQKEP", "HMKNKQBRBOKCKRCPFCJP", "HBEHRBRENEMGFBFQCLIE", "GNGQAKENHNFCEPGQBKNF", "NHEOKMHNHENIEPJMLCFQF", "QEBQBEOBPBMIPLDPBQCP", "FNHNBFHFHRFNFAJGNCK", "EHQGQIKGKQKMHLGAMCREC", "MIPIQCQIRDMHRKHKHQEPK", "GQGBQENEIQBDOCMENGKPD", "KNJCOBIMKCENBQLBDHLHK", "HPKBKBREHRKIECDNALAE", "EQDBNHDHJHDRAKIFGROLO", "BMERHEQKOBNFCKOAMJMD", "HOBEHMKPHQMDNFAODGRFA", "GLPIEOGQFILHDQDQHNB", "MERBKEPBKQKFPHPNFOIFP", "NEQINCQGENGOBQKCRLRGA", "LOLAGKIFJCDBHQFNFBLQ", "HQEOJQIMLNANEGNKAHNB", "EGNCNCEHANHRLIOJPALM", "NEBKANEQCNAFNARKCMKGO", "MGMFREKAHMBEAEHENKCQI", "HMCLGRCMJPBOEHOEREB", "DQHFHNEQLQCKAPFIADOJ", "RKBRHOHRBOIMERIMJOAPC", "ENGFGOHJRBHQKAKCEQCN", "HOKRKHKEQOAFNKRKOAE", "HPEMHOHBOHDNKCPHFAJ", "NHLNHEHDQLEAEBMLNGKC", "BQBEGNCEGNCPNLNEPLBJA", "BQFBLEBQDBFARMKBLQLPD", "QFQDQJNKBLQOIERHBKGC", "NHQIKQBNAEIODILRNLP", "BOEBEMBMBNKFNGBKFCLNL", "JMPGJRHRJBEBNHOEQBEN", "QJHFQJQFBNFCJOJERKEI", "EHFQJENEHNFMFCQIEGKMD", "EIEBKQHEQGCLRFBRFOGJM", "ENKQOHPKEHOAPMLQCEMDO", "EHBFNEBFHNFOIFBPCLEPK", "JBJHQDQJHNBMGCNFGKHN", "EQFBEHJHBNHOLMLIQANEO", "BPKNEHNEMBMIPCLOLGOLE", "GEAQBQCNINCFAOFOHCP", "CQCRFNFRAQDHDNQFQFKN", "OCERDPIDCQFHDHQBHEJN", "HPHRKBERBNFOHNJIRGQAM", "QKBKMKBENHECDRMJMJNF", "JQJBFQENFBDRLCREBRBR", "DQHLPCMRINHNHKPENHOE", "BMEOBKRBNEMLPBLBKICNE", "QFHNKHDHLNLAPLPODADG", "CGFHMHMEINJHQJQEBQK", "HNAQIEQEQANLHDMLEGMH", "BQKOERBRNKCQBDOJIODC", "BEGBNCEQKQBLGPNLHRCEN", "EOHKPMHBEMBDGPGKGARA", "EBKEBQOHNKHJRNLMICPEP", "JNFAEOGJCPKBEHQDNBJQK", "QNEGQNGQAECLBDPDNGJF", "EQAEGBEQENAOJHOGQAEA", "NBQNFBJNEHKAOFGFHAQJB", "EQHBOERBMENIPFADOHEMI", "HLBNLQNBJHFPJGQNIEPN", "EQFHBFQBDBDRNLNHJFCJD", "JRLOLAOKOQCKAHQEKAEH", "KIENREJGJRHEQHOBRBK", "RJMFNHMIDMKOHPKHMBK", "AKQINENGAKQLPBOBPEM", "PKEHBMHEMHODRJDMKIBNB", "ENDQHQHLQBLIEMCJHAJHO", "MHRKHBRBKMHLNCJIDAOIE", "HMCPGMPFBLPHKQHEOHKQE", "LHFBQJBFBDPECJHMHCEQ", "OBKNBMKRBNKAOFAENBJPB", "JBFHBJBEHNEMARFRNKIME", "BPEOHMHOEHECQBKFOADB", "DNFQHQLBDQBOCJHOIDIR", "NLPCKPJGQDNKOBNKBOKBR", "FMHNDOHDGPBNKHEQEQH", "ERBEBKMKEHLCPERKFNFB", "GKQEGNKEBQBFHOAPNBPKD", "NBEMEPBKHEBJQMJQCKML", "BNGQDPDGMFAEHNQCEIQAN", "NBEHEMKRBMLGNHQGKIM", "CEAEQIQKIKBDNGJDRHPI", "HKNKBEGQAQJRHCJRFNKR", "AJMLAGLIJAENENBNIECE", "QENGCQGEQNHROFALDHOKQ", "HBQEOBQEHPAQJEGOAKGD", "HBPBOBEMEQDAMEOIDMB", "MHEOKNHREOFILQBDBJNB", "NKBNJNBDQFQOLDOHAKPE", "GQGBNGECEGKMJAFNJBOLI", "RKHOHKOHPMHDQHDCPGQHO", "QLNEQBJFHQILQFOAODPE", "BNKQICNIKNGMDOEAFIEPC", "QEBPBMHMKOFCEHLCLHPF", "LHBJBDQHBLDRHOBLECPJO", "FOIECOLNKGFQBHJNFBELN", "BRLQBGQDKRKHQGNKHEQGQ", "HDHFQJQNBNLOFBEGPBFIP", "HQBDQBKNHNJMFIOINGPD", "BORDANQCMEKMHPHEPB", "AFNQFGFQEANCKQAHEH", "BQNGKINIKAKFIOKDCQHO", "RBOEQOKMEBRGEHFBOGQLQ", "OFKNIEJMCPERHEREHNHM", "HJQHKHFNBDHOAQCMHMKGD", "HBERKBQMHRHCJIJFRLHML", "EHDBJNLBJNFRJGOKOCRMB", "KRHOKHEHMHMJPGQMCRFHE", "BMKHMBMEPBOJEADBRJMKI", "OEHQEOBEBEPDCKMINCJCO", "HPEPHPBEQEOIQCOHPHF", "LPHRDCNFLRHQIQGKNKIEK", "HKBNBNLQLBEAJNFQADOAD", "OKHMKNHRHMEIBPNJEBLE", "HBRKMHNBKRKCJGMGNHDAP", "PALAHRKMIOBJBDNJBEBQH", "RKQBEOKPHKQLARLNKQMCQ", "MHNKMHBPEOCMKRDOIJQ", "HDBGOGOCDLMBHMKOPBPKB", "NHPKHMKHMHECOBEHBFRKD", "HNHMKEHKPBQAPGLDRHKPI", "RKBMHQHBRBLPBJPCPJH", "QHFBFHQKEBEMAFNJQFGK", "KMBEQBOKHEHCMCOCDRCE", "NJBJEQBLNHKCOIOCDBJIN", "LQHDNAJRJAECQGNQAN", "NHBDBJBKQFHAQDMCDMAPC", "EJGENHKMLQCQBGKGQENE", "MLPINHFODJBPBKMERBNB", "KMBKHOEOHEMLAFARDMHCM", "KNEHEHPBEIFIKBRILQM", "OHRENBKEBOCPHOBRLHRB", "IENANKGNHKQDMFAKBQLC", "KQENCKIQKQJGNEMFQEM", "EPIQGRLREMBHNKBDNBHEB", "FRHKIODCRAEGKNKCIEC", "NFNHQNDQBKFCFRDHLCJB", "RHOERHQBOBNLOBDGCJEIE", "JBQFNJEHQDNAOGCFMEMB", "KMJNILAOCDANCKANEKGQI", "HOBEREBEOKOALNGLIAODO", "NKENGEBENEIPBDMJAQFRB", "RBKHRENBMKMGBOFNAEPOE", "EHOBRKRKHRJBPKCLQFOE", "NEGNKINENGCPGKFOKIJIF", "DHEHNJHBKNDPENGCPECMD", "NBNLHQJQNJDGQCEOBFMD", "OGDQHLCEIMREPBRHEMHN", "IBNKGKQKQLMGBJQHOLB", "EQEPKMEREBNJPJIOKHFRJ", "PBMHEOEQBKHFNHALAOGBL", "NRGRBJHRANHFBNFBJHJQ", "DBNEBQBNFBDGLODBDBQGN", "KMKEHOHERHPFIRHBQJDBN", "QJNEBDHNDBDREGNDOCQMD", "AJPGFMIQDCKHOHRBHREHR", "FMFCPAEJCPGNGKCNBENEQ", "PIKOIDIMLBERKBEQKMRK", "BOEBNKEREHBDPBJPKGPNK", "KBENBOHPKHQIOLCERJAEQ", "BJHQHNBKFHJPIDCMHNCLN", "KHOKBKNHMBKFILRHKPKIR", "KNKOKBOBNHEIQEPFNJRF", "KQBEQIKBNLIDMILNLF", "FBGPBMHLRENBQKBQGKGN", "CRJBDMEQJHNIENEQECQA", "EQKEBOKHEBOINJRHEBDHN", "KQLNIKMQLQAKNGENCEAK", "QJQKHDHBDNFPLMFCRKOEA", "FHBEHJBQLBDADOAFMJPIC", "RAOCFGDIDKNKMQEOHEB", "ENBOBOBQEHNJRHALMBDOH", "JQBJHKBQDHLGNLRMCDNJP", "PEBPKMHBEBOCJGFBNDOGC", "KRNKOKBKOEPJCRJFCJBPF", "DBQNLBDQLBKCPMGPKRGLE", "PHEMKMKOEQFAKPFNEOA", "HQIQKHKBEQFAQAMFROAD", "INHQNGQNKCOCRHPJGQKR", "QNBNEGNAEAKPAFPGLQBOD", "DMBKNQFIPKNHEAHQEIE", "OJCFBJCERHLHELQDBHLQ", "BJHNLNLQBJHRBLOGQGAMD", "QFBFHKQJHBERIJPFRJMD", "HJQHBJBNJNKOGMLCEHNC", "JAKOAJNJRBLQDNJHLBKH", "MKNKBMKBOBMFMINEGEQKA", "KHFHQFBKQFQOFQKPKAKN", "ALGMDILPKOIENKQBNINHK", "ELOAPKOGNQFHKQDQBN", "KNJIFGJGMCQCKGQENEH", "KQAEIKIEQAERHCKGOFMB", "CMBQBMCQGENCNKGQC", "IDRDCOIKRALQLBQDJNQBL", "EPDMFNRDCEKANKBKGQK", "HKRHOKPBOKNIJPEIRGNK", "NEHRKRHBRKECLCRHKQJPO", "DAOFKMEIMPGQHKQINKGQI", "OKMHRBKPEBDMFHDMAQAK", "RHPEHBPHBKQDQIOCJERE", "QHQJFHEBNJGQOFIARMHA", "QFOIEMGOPBDJBFQJHQBQ", "MKRBKOBKPEMAFQKQIRECN", "BKOKANFODKAECHEQBQCK", "LQJBNBDBQIRBEADRDOK", "LNQGNPHJAOKHMEBMBHPK", "QDBLBQDBJQBRHLGCOGQE", "KQEBNDHBFQNGMEHQHDRFQ", "KRBEPKPKQKMLRHFBRFIRN", "KREHPKBKBPMFNGDODCMFP", "PKEHBNBRHBKCOFGKARCR", "EMEBRNBPKMIDGMBLRMHR", "QDPAORGFKGLQFBQBHKNJN", "QHKBLQDNFHNGOCQGPCDA", "ERERHRNHMEBFIQMFNBMJM", "KHERNBERKQIODIFPOFIN", "KNJNHLNENBEPGCQAOHQK", "BKPKPBQHREPFPLDGDHBF", "EHBMEOHNEHKAMBLFPJBPO", "MEPBPKBKQKNGPLBDGDPEP", "QKNKDNDQNJGREHMCPKPG", "HKRBPHERBNARKFNLPNGB", "QHJHDBLHQFHCMFOJQFGE", "BJBKNBFHBFBPCNCLOCJF", "QHBLQNLBDBLPAERFIOCE", "RLGOCHDCPDBQKQHJBQBK", "HKGFGODPEQCNCNBNAQI", "GFLRBHKMAOKMBMKREHRH", "EOEPHKBKRBPLPMGDQBKBD", "EJPEKAHOEAKQAEQENG", "REPBKHQOEOIQAFARNFO", "OKBOKMEHNHNAQLERHOBQI", "ODKIDGJRJOBMERBREOBQ", "MKHBRNEPBQFCPLIRIOGRC", "RDIMBMRCDNBOQEOEBPKO", "QKBQKHPHRKPDRHOFPLCOJ", "ENBQIEIENKPEMECFMFA", "EHOBRKRBOKPIDIBLHJPF", "HPEBKHQBRKMFQILMJRDAD", "QJQHKFQNHLBPCENFRHENB", "FBJQLBDHLHEAJRJEIJBRN", "KEAKGQINANFHCQJGCOH", "KOKQHKHKNEMCLGKINFRJQ", "HQOBEBOHOEQIQMGPLDOKA", "NENGEAKNGBDOGFCPLMFQI", "DPAMCDGMREHNJNLHLBQB", "EBRKPBNEMKEADIKOKGKPD", "NHKPNEPHPKDAMJCECQNF", "BKQHKNBREQHFCEQMGEQME", "PHKQBPEHENKGJFGFRCOJB", "BNKQAEHENEPLAOICOJQF", "MRANLOKQJMKBNPHEOHEB", "RBPHQKRHERGOBDBPLFMFM", "AQFALMQJILHJHEHQDNHN", "BNJHFBNDNKMJEQKGRKML", "LBKBKBQJQDNCNAREQCEGE", "GQDCGPJGLAMBPENBRKQEH", "BPHBOEPHRKNLBRAFREIAP", "KAEGCKEGKCJNHBOJARAO", "CENECKCQBKGLPIFMGJHMH", "LNJNDBOAPBFBKBHQDBEB", "EIBQCKNKNKERCEIJDHRO", "KPKRBOHQBKQADCEIEQHRK", "HBPMERHBEBQADIFOIOAJD", "QNBJHFHFNFHCJHRBNFARD", "PKHMBREPHBMCMEHRAFIDG", "QJQJBDQJHLDOBFAKODHQ", "HNIEBEQNAQBRLHQOJAKBO", "BRHBQHBEOHNFOLRIRHBEM", "LNBLBNHQDQFRCNCOLBMKI", "DLBPJMIOIRBKOKOBEPKQ", "AQEHNIKCQALQKRKNBDB", "KBERBKPOBQOIJCEGCMGK", "KQDNDBDNKHCQCPNAQFGK", "DNFBQEHNDBDAMEGRMJFRI", "PGODOFNBDQEREBEOERBM", "REBMHEOKRKCJNBQKRLI", "KEHQNGQKAEIFOCMGCJIE", "MKRBEOKRNBOJIMFHJNJML", "OENFNLRLAOHMPBEBRBKQ", "ERHBEBPBREHDQMEHJNDCO", "BKCENGBQIRFNFGMKHP", "RKBKMEMEMBMALPDNAJCQN", "QBNKHNEAENCRBFNKRKBF", "NFAIRKRHLIENECKIQAKH", "QBNKFQDNBNBOIQFAMFIKC", "NKGFNAHJRECEAQKBEBG", "KRERHMBPKNBFMILGJAOHN", "HMKPBKBRHNKGAJHARBJNJ", "BNCQKNBKGJHRKQGOBF", "OHQHEHBRBMBFAQCJRNCPN", "DNHJHFBQNFBRLFGMLMAJ", "DQJNLQNFBJNCLCLOLDHQG", "HEHLRBJOGENGNCEKAQG", "HPHOBRNEHBOJPLGPDNBOA", "NHEQKAQKHENLPNAOFAKCK", "QDMFOLGQCDPEMEOKBEPHR", "BNIQIKCKNGJIPBFHJIODR", "ERBRBKOEMBOAKPEIJFCLD", "KEIKGQNKQHCFODOHFHMGL", "HRKPKHEBEBPFMCQNENGC", "FLAHPENDAEIEAHNKNCQ", "IEARCQECJQCECINENI", "LQJQKQBFHLFARLCJEALH", "HMHNJMJIPFNBLBQBQKN", "ENJHFQHEBERHDGPNANF", "NRFQEMFLPBKBEINQKNGQ", "QBPKHRBQOHKDGOIFPBOD", "KRKMEBNEPEPGPIFOJCNB", "AGOINIERGDNDJBHJNBJH", "DHBNFBNBLECQCRLCRKMD", "DNDBDHEQDHKCQEOJEPKAF", "KEMEQOBOHEMALNFAJCL", "RNBKRHEBNHMFPMHRHCFOL", "RHNBKRKMBROJMLNIEBME", "QJQJHNJQFQBRHDCJFBLRJ", "EHCEHQEQEGLQEGRNKGM", "PHBRHPOHKMAFIPCLMEMCN", "IJGORCMCNJOBENKRBER", "NDBDHBDBDGPNARAFAD", "BNKQEHCKCNDOAJIANDQB", "NHKMEBRHNKPLGRIDBMLQN", "MPFAHKBFCHJHQLHLHQHF", "KRMEPKRKMKBJPIRFOBFGB", "MHOBPKPBOBODQCMJEAREA", "GLHPHRADADQBDNJBFLQ", "GOEHLIEMEBGKNIQANKA", "NBNKBKHCNILMKNLIFOL", "QHNDBLNBFNEPKHODCQJR", "HENKNEGKBQBPHNBJIMLO", "NHFQHQBJHJQOCROAPEGRG", "NIPGMFMBFMPEHOEPHEHQ", "GEIAKQAKGQBLRAJDQOGR", "QEHKOEMEOHOJGRGCFHNK", "HKHEPBPKQHNFAPGNDNDGD", "OBHDIECEPKQEQHJHQKNL", "EOEPBPHKQBQARHAQJINIB", "CNKEIKINKHCLGPDQAJOIA", "CPGPKCODPGNHOHREOKQHP", "ECQGQENGQGQFCDGBFOEG", "QHNBJQKBFBNCFHBLBJME", "OIDCIKNFPHQLHFHNBENK", "BEMKOEOEBQGMFRDBPOCO", "EBKBPEOKQKMGRFNDMBDIQ", "BRERBMEOEHOAQLREQIOKF", "HEBENBPKROEGOFBOHLODB", "BMEBRNHOKQHAROKMDCNC", "BOBEPBQHOKOIRNBKCLBPO", "BFQHNBJHDQJGOCODCKEAF", "PDOALRDADJNQIEBEQBIQ", "EOPDPDGNFOIQECKQIECN", "HBKPEBNHMKMALPNIKMCR", "ENEMKBPKNKOLIRMEPGFHN", "FIOIDHNGMCFQHJHJBNHJH", "LCLCKMLNCPBMHQEBKPER", "EHNHLFNLEBNGEAOAROHJI", "HBEHBJBQDQDCOKEICJRFH", "HNJQDBLBKHNCFPGARECRC", "BQAEGAKIQAOBJIDPAMGPN", "ENKOEOHEHEOGFPBPGBEM", "IQNCNBNKGQGLMKRBOIPOD", "OHEBNBPBKBEIKPCQAJCJD", "BMKOENEQOLMKPOECQFIO", "JNDQDHBDHNDARAKDIEPHC", "INGKQANIQCKPJBDCOHCK", "ENJHDQJBQKHMAOGFMCDCE", "EHKHREREMHRFNFRCEQMLN", "QAQIECQCQHCLPAFPOAF", "HKBOBPKEHMBFMCKMLRDHB", "AKCQGQKNEGQJMGPNLGPN", "OILRLIQCMDNHLBHNDKB", "RHQBMBEHQBPFQCFPKHQLM", "BMHOERNEHKEIDROANBQID", "CIPALBNDLMAEKIKQBIKH", "QKOKOEBEMEHJPAFRECDQ", "DBEHDMEGRCKHQBNLBHND", "QEMEOHRHKEOGLANLHPME", "ALBJNRHJMGEHNLBFBDQJB", "HKMEOKBQBNHCMGMJHLPMH", "PJHMEIDQGKQLBNFBJHJN", "QIQEIEIQHNEMDPANHJDB", "PMERKRBPBKIRDQCMJOAOE", "NJALGRBENJMKOEHOEKHPK", "EMEBNKHBOBQDOGDGCMBOL", "DRCRDOFCOQAEQKNANBNC", "HNKBRHMHNHMFNECREMHJD", "OBQKEHMKEPHLBOLRCNAJN", "BNAKQBENIKGMGLEIQDRMC", "DNIJAJCPINHPHEPBHPBH", "KOHOHPEOEMHDQNJQMKIJI", "OLOGNAGELMEQKNQIQCENK", "HMKHEHMERKQDHOECOGMI", "QERKNEBKOEBLIDPCMEGDA", "EROKOHKNKMECKPDCFIQGO", "HRKREMKBEHPJIOICRAQJI", "KNKCKCNIQEQJAMGDPOFIM", "LQEQNHQNFNDPHMCJHFCMA", "OBKHBQHKPHRAJGDMJIOLC", "MHPHOHOEHMLHCOKAOKFQ", "RKNFCMLOCNJNHKNFHFBE", "QJNFQHNBJNBRFBMFQCKA", "KBNEPBQKRKHDPIJRLMLQL", "NBQJBJHEBQDCQDQEOFBD", "RHROBKQBFRBLOAPCQD", "JNBDBQLNDNDIDNKIFMBJH", "MIOKGFMDLAQAHKNHKNCN", "MFMIQFIQGEMHEHOREHMP", "PKBKMKEPHOJQAEMLMBOD", "NBDBLQNJHQNGNAFIKEMAR", "RKNHBMHQEBKCPDBQEQILB", "GMJRLAOKMQKNDQLQLQHN", "NFBDNBLHJQJRJHEADAPA", "PHPMBMEBKHCPAQNLIBKD", "BPENKOKPHBMGLBOKDCFH", "PKMKERKBERKGMAOIOBFQG", "KQDHNLBFQBFAJEPKBRAJA", "FOIPFLIDIDBHKMKREMBEB", "RCOAHNJRENKQJHDNLHJ", "LOGNQFOBMGDBNBEBNHLNE", "BNERNHOKNEAKFCPKOADM", "BPDAILIPJMKOKQHOKBP", "KPKRBRBNEBNGRBKAFAMJR", "NEQNJBDQFQLCJHLMHFHR", "LHJNLBLQNHKPJAKEGMGJ", "BPBOKBQHMHOIEOHPOFBR", "PNEHNKHEPHOJGBKRGKFRM", "NLBFBNLQEBDRGDHQLBLRD", "JQHJNFHNFQHRCFPMEGKQJ", "EQKOKPEOHMKGMBMCFMIA", "MEHPHBMHBKBFAKCEREIBF", "JHEHFBFQENDGKCDARGCRC", "ERNBOEOENEILINDOHOBE", "BKRKEMHPHQBDIDGPJNHD", "INJRBRLGPCIKQENBKGKI", "HLQKHBLHENFOIPLGOBDMF", "OIJQGDNBPDMEBNKOEPEOB", "BLBLEHQHNGLHJPAKQK", "BMBOKBEBNKNDMCNJBFRMI", "PKPENEHPKBDGLCPJHCRJQ", "QEQNHKCECEHFGOEHKGJNL", "NHJHQNLEBJQINHMLPFAN", "NKMHPHKEPEPFHOIBPKHFC", "KQKPHRKOEHQLGFQIFPCOA", "QNDQBLHKNLADGJBRKGDM", "NBLHBFQFHDNGPECEPBQC", "QGNHQKIKQGNJOANECNFPA", "HEHQEOKNBEPIPJBQFBMJN", "RBKPMKENEOAJOFPEGFQEG", "HLBQIOCOIKMPHMBPHMPB", "KGQKQBEANGARFMFQLPJF", "FIQCOCPBGMJBHLNENBFHF", "JQLHQBENFHJRKIKFBOLCN", "PKEOEBKOEQNCROLMLFPAN", "LBQBQDBENDQGFHOIOCFM", "EGDILGRGDBQAHKBQEQCQ", "CIOFNKCRBRHFBHQHLHNDN", "CLPEIEMEBJAKGKIEQHEQH", "MKRENKHQOKCMCNHPCNFO", "HKBJOLGELQIKQBIQKHKC", "KMBMKREHBRKDAQLEOILAM", "QHMEOBMHPHEANDGOFPJRH", "KMGDPFQGFRKNHEHMEKP", "PKHBRBEBERHAOJQEODGEO", "HQCKIQKQBQARGBRHJOAPF", "CQBLHPJMCKQBOBHEHKR", "EBFQBJQHENFIEIPAMDBFO", "MEMHREBKQBMLEBDGEMJGM", "EAOGEKMRALCNAENANKHNC", "EINGQENCNEBFMFRKIKFH", "OHDARJAEGKRKPBMHRBKN", "KPCEOQARFLHQEMBKPKPEO", "NIBNEAEAEAKPKHLIMEPH", "HOGQAKIDMIKHKMBMPHKO", "IQEBEAQIKMGLDMJANE", "FQDBQFNBDQJOGQBEPLBOD", "BLBJQNLNFNKGMHDADMCLQ", "ENHEBKQIKCKPFHLERNHK", "HOCERLOJNBQEBRHEPKH", "HNHOEHBMHBQIFRLODHOHC", "KAEBKQEGQNBMDPIJPKMEH", "QHEQAQHCKQIFAOAQFPGDG", "BNKQEOAOFGEANAEKQAKG", "QEPBENEMEHQLMLAEQIRL", "CNKOHMDKAFNDHDKNENBH", "LMHKAJORCFRBEPEHQEBQK", "HLNEQDQFNHFARBPNILIPF", "BEQFBLFNHNDRDNKAFQNEO", "QHMKRHPKQENJHOBJQCO", "HKNAKQBNIKEPCRGPMKE", "BKOKNKHNHMBJBEAJEHQM", "PEQKOKRKBEMFRGBKECNH", "BQKGCENGEBOHDNKFGBO", "PHEHOEOKMBPFPILEOIRIN", "IFPGJMEAFHRKNBKBEN", "KPLIFOQCDBKNIENCHNEN", "QNGNCQGQEBNJPIMJCPKPK", "FHQLBDHLDHQALBMJRAOJA", "MEHPHKMBOCQDBQCEMKR", "MERKOKHREHPAKGFQHPOCJ", "HEHNFHQHNLNAKRJQNHOGL", "KDBQHNLFHFNCEMBNLGBJO", "RFKMHJBMLQBECEBQGEGK", "BREQOBKMKEAFHPFOJBRF", "INHEQKQHCNCOEBDREQMD", "HDHKDBLQFQBRDHOKQDCRO", "JHFQHNDNEQJCPJPLRNCN", "KMEHMBQKBPNJMFPMEAJBM", "CRDOCEMDGOBENBEHFQBJN", "HDBKFNBQBNLRHLCPBLROA", "BFPGFHJMBLHECEKGEQHQC", "KRKBNKHEMKMIERDBDGQDB", "LBLBQKNJNEHCPGKFADIL", "FHJNHLQDQDQAJRNDPCQJC", "FOJGQBEIMQLHFNHQBHKB", "EOGMCGOQDAIKGENBIKQE", "OHPERKBMHPOLCQLPLDADG", "NHPBNEMHQEPFMHMDQNFAP", "QHEHNHJQHDHPBLQAEBLH", "CORINGJOGDHFNQLQFLHJ", "FBKNHQFHLQMJIRHFQGNEB", "QGEQINKEHAFBRAMGDIDG", "HQOEHOBQHRBFPEGOKQBJE", "LNHKBJQENBLCEPKDPNICF", "HJEBJHFQBFBRLMCRGEGKR", "LNKBJNFQKHQCQDHOGFIE", "HNBJOGQIPHDBFQDNENKH", "MEBOKOEMHKIEMDBMAFH", "EHLCGRDHDNKQAKNBQHN", "ECNEINKHQEHMAJGPJFOHM", "BMBROBOEHKMDQBNCQGPFO", "JGKOQHQDAHQBEOKQBEQB", "MDBNIEKPCHNHNDNBQFNH", "BNKOKBQBPKOFCQALREAFP", "HKEPEHMKBEMCJDRDBFHP", "NEQKFHDHQBKOBDRCOGPKN", "JQBJNJHDBNAKALGLARJ", "EPNEPNEBROLFOGRIARDR", "RHKEOHNKBKMAMHEADREQ", "BQKCNANAEAKMAKDRNJFN", "BKOKHPENEHKAKBODIKRAQ", "IQLNCLBLOEAKNANIKIQE", "AEKCQDPHFKMBPHNKHKOB", "FANKINPANLQBJHDHKBL", "QKOHBPHEHKMAKEPLRLAO", "CJIFLAKNGQBPENHMKBNB", "HFBJHBQHFNKANAOLRIMIJ", "HNBJNJEHNJHCRNHDCPNJN", "MAFIQLPGFKGQEAEQHEAK", "NLQKHKNHDHBMCKGEOCEM", "KBMKEPBNBEPIEMLRLDQDN", "NENKBPBPHQKAFNDMLNIOI", "QKHQFHNDHKFRECJHMANFA", "MBPKRNEMKHNJQOJNFHPCO", "EHAEQIQNHEOEGPCKFI", "LFBKBNLBLCEMLCOALEI", "CJAJRFCNFHEIENEKHNAK", "KEPKRHBRBKQGQOGEHLRFP", "AHPHORGQLAKMPKREBHEBQ", "AEIQCQCEAKQDRHERGRNCP", "KHLHBNLQDBNGRMIQJFMCJ", "NKEHMKPKBKFAMCQEICKIM", "HFHBJEHDBNFAPBKCDCKAL", "HFBQBKNBFHJOFCDANGPEO", "HEPKRNBPKBODAPNGKBJPE", "DNDAGFKCRLMBMKOBPENR", "NBQEHPBPHOHJBRIRCERFR", "OKBQBQKMHEHAQIFHDQJQ", "HNBQFQLEBFILGRCJPLO", "EHMHKRHNBRBDPJHAQBDI", "PEREQHKQHKHCJHLBOCDIR", "KBEHQBRKEMFHCEMFHQHC", "BNBOHRKHNKOLQOLRGRFNE", "FQKHNKNJNFNAKDQJIEPLE", "QJHBNFHJQDGQDOFIOHN", "REHMHKBNHNKIRDANEMIJB", "GDOQAJRFQHKGNGEGEH", "LEHQDNHBFQFCJDRCQGRID", "REHEOEOHMBPFBMCMIARGD", "IQCQEBKAKNKRANFQBKMF", "NHDHBDNJHFNIMGFRAPLR", "HNEMKRHPBKQLHDANHDCPL", "DNLNLCQCPIKGKHENAEQH", "RHEOBKQHOBRLMKDOEQKIL", "JMBDLCMEGFJNQJHNQLNB", "GPIMFBIFOGEKHNPBEOKNE", "BREOHKOKOKIDPFCNBDRKA", "AFJPCNRIJMKNCQECNQBEC", "KMHNEMKNHKBJQDMEMILIF", "EMEBEOKNKOHFNAQAOLERF", "JCOAPFBFIEBHREBQEKBR", "HBMEPKBEOKMGQGDOADBPF", "GKGKCNBKENCJPJDQJGFPB", "ERIFMDPFBFKPKHKNENREO", "BQKBOEBRHRKGMFRHRJDCM", "HEBQHMEBREMIAOBJGOLOA", "BKNLQHFNHJBPJOKDGDCRE", "HQKEOBMEBPHDHRNCQJRFM", "QDBQLQFQEHBPKARHKPG", "EQBPBRHPNHLIAERNBPCR", "OKPERHNEPEMIBQJBEHPD", "NEBEPKPBOHKGDRLODPHOB", "QIPGNBOCDRHEBRHRKQEM", "HQHPKMHKOKODIBFOFGPH", "NHKQLBFBFIRGQLIEID", "BEPCLRKAIEMEQKRBEOEQ", "DQKQFHQENLGQOIFPIBMHN", "MHDPBFIOGKPKHOHKOENE", "ENKHCNAKEANJHBDGRFOAD", "KHKHNCKQAEQMHMEAKG", "FQENHBJHFBPIQKRNKRH", "MHKHPKMBPBKIKRJHLAMKH", "OJNBIDKPFQBKRBRKOKHO", "RKRKMEPMBKDHPERLAQFB", "KEPBOBMKBEOFCDQMFBFH", "GFPGDKGPGNEAQHNEHEQ", "REQBMBRBMHDILEOJHNGE", "LNLOKIJOKAEQBOEQEBKPB", "DQNDBNJHNLHOIJPBKCREA", "BQEQNHLBDQFMFRIENILGQ", "NEBFHLHBFNFMFGPHRDQ", "LMEOGPIDMHMKBQBREMQ", "EHNJENLNFMIQKALNCKP", "KIMFJPAMFANEHQIKANEA", "HNHMKNHOBKFPDOBRIJQ", "EHEHOHBRBPLAJICMAOFMH", "HAENEQANKIBFQMBDRLAKE", "ROHRBEOEHMKGPBJEIFPNE", "EHKBNBQFNBFARERIBRLB", "CRIFMERIPKHNBDBHNDHL", "NKPHBEHREPBLRCPAOJO", "REQKRHKOBKMANJPILOLHQ", "LQLNLNLQDQIQIRMIPBDR", "QFBKNFHNFHEPGQNHFARCD", "PHPHKHBEMEPGDPOHJNDPM", "KEPKEQERHPMLRMAKREGN", "JMRJOGQFNIQBFQLQHFLBN", "DMALMAQHDBKBEQANINCN", "HQHEPBPHMEPJAKPOLGLHO", "LQKBJHFQLBFCPFADNFQG", "HBPBQOBKBOHFQJPINBOAK", "KFQKHNHFHCMGJQOLRIL", "MBMFOAKGREAQCNKAHNQ", "PEBEOBQMEMGNHJMLFMCQK", "DQKFBKHQFBQCFRJOLIQOG", "EMEPKBOBENHCMEIQFHKF", "BPBPBEMHBRMAMIDGFIDBR", "BEHPKEBQEBMANLOCNJCFN", "NEBPEHBPKNHLHJPFNLAMF", "QEHFHNEBNDQAOKOCKQK", "EOHOENEHMEHFMAJDRGOJA", "NEMEHOKNBOJDRCOIKDND", "OBQHQKMKRHOCLGBPKDIN", "PHENDIEPEQJNHDBNBEN", "QHJQKFHQHNKIFNJBDIPK", "HOHOKRBOHOKIKRHADRNFO", "QBFBKQNJQEQOCMHMIFRDN", "KAEIBKQKQHKFPAPIOJBPD", "ENIKGENCKHCRLQEBJQIMG", "KBKHQFHQJQEGRHDPEIAOA", "BPEPEMKNKHPJREAPDIDQO", "BPEHOEHBMHOFRGNCRDPKN", "LMECLIPHMHLBJHJQJQHJ", "HEHQAEOLRIQGKCEAEQI", "PGFKHNGJOGPKRBEOBMEHO", "KILGKMHDCNPHKNREHEB", "BEINIQIQCNHRLFOLCEHAP", "KCNGEBNIKNCMBLDCMLQKR", "ERKMEHQMENFIAKPICMDO", "IKIEQAKQKHNFCDRHKPK", "CNEQAKBNINAOJRAKPGQ", "OILGOAKPAKMHEQEPEPBE", "EQHKBMHKOHPCMBNCLDBD", "IEPLBOQAHRHFBQBHDNKHN", "JBLQHENHDQBPLCDAEGNJD", "FQDQBFQNJEBPINHJODNCQ", "CKQCEGNEBNIOJCQLFIBKG", "JMBLINPEAMKHKPEPBHNE", "COIDGEMCDBKQENHQIQEG", "KNEMBPBKHPBDIPALNALPD", "KDNBQHENJHOHLPHAPOF", "QKANPCLCMINANINENQI", "PKBRKBOKBKMIDGKFIRMBF", "OIFCOKGLHOKNQJQDHFBJN", "JQBFBNHQDHRFNKGJRMH", "EQHBFBENFNDCLBMEBLFIC", "PERKMBMHQERGDGLPKQOLM", "EQHBMBRERBMALQMLDRKI", "KQMHMBKPHKHJDCDRINEOD", "AQEBHFMCMBQBEKPKBE", "NGNAQCNGEIQOAQBLHCPJC", "QHBPBQKBRBDCNGFPBLN", "BMEBEPKNHEPGAJIDNBJIJ", "KPECGDIEMLBNJHQFKHLN", "PHEMHKHOHENGDPNDIBRN", "HKOBRKHBOHBJMGQLGNGRK", "RNEHBOHEHOIPERFRHLRLB", "PBOKEHPEHBOFADMDCQMB", "EPMEBOEOEMHJHQJRCKGRE", "FQEBNFQNBQJIDBMKPGOAF", "HBOBREBREQFMICKFBPFG", "GKEQAEQENEGOEGDOIRJEO", "EBQENKIBKAMJQFBOECNA", "BFQKNJBDHDBMJCOKBQIA", "HPBENHKMKEQARFCKMIARE", "QBQCQBQENKGOCFHQOIBEB", "GEINIKNAKGCOAECLEADIA", "HFBNKHDQDQHAJHREMDGAF", "QNHNJHKBJHBPKRMIKBQA", "BQEBRBOHEHFNKMGMDIPA", "QAEQCNKGKIBPOLALDHBR", "HQKNKIKECQGOEIFRMDQC", "OEMEBQKEHEMGRCMHAJGKG", "MDHLGRIOAQDKHQDLQDNB", "EOKREBRBMENLDIRBNDIBF", "JQFNHBDHLBJGDIPDCDBDM", "HPHKQHBRKOLDPJHDAPCR", "IKMHQAMDCMHQKOKPKHEB", "KCEAQKBNCNBRILRHQFCM", "NHKQBREMKBKFMFODGRFO", "GKAKCQBNGQKMJGJQCPAF", "AQIQAQCKHQIDMBEOJDGOJ", "DBQHNBJBJHDIJRKIAPOLA", "HEBOEQKHMHRCDHPGFCLDM", "EHBOHKHMECQIPNLIEGM", "NFIJRELCMINBMEBMBQEOB", "REBPHOBEOERDNFAOINAJE", "EHBRBKBROKFPHDOKCOJ", "FMBJIPKILAJNDQBDQBFNF", "PCDOADHLGERKRKREHEPK", "OBKBMBMHKRJAKGBLALCM", "KQNHQEAQFPBJQGLIF", "EOBKQEREPBNDHRCKIOKAK", "EHLQHJBQDHADQDALDMID", "BDHRLMFPAREBKBEMQBMH", "NHBERBOHRHOFHEMGENIOC", "HBJBNBQLNBDCNKDOEMJIN", "OHNEBKEPEBMGMKEMAKC", "GENIKQAQEBPKRGQJDRKC", "BNAKECNEGNHLBMIQINKQE", "KHPHMEPHMEPFINAJIAJH", "QNENLBFQJHKGJHOKAQMLO", "EINCECEGQIREQFHFGNG", "JENBDQHNKNDCFHCFANEO", "BNCNKAQEANBFRECDADGB", "MIPFMFOBFBERBMBHOER", "PCDALCRKIODBQDKNHKNHE", "BPKPHQNKHPLAPNHENAJG", "MEHPBKRKPERJGCLRJEIRC", "DBFNBDNFBKECODARAMFND", "QKGKHKQAQNKMCPCRHLRG", "HPBRKRHNBEAPNGNJHPBM", "QHQLHLBQDQNGBFOBEBMG", "QBQMHKPHOEHFMEIROLOCD", "HKNJHBKQFBMDMKMGFMIN", "KOGFKOEMGJHKHJQBQJN", "EHERKQBOKBNDHCRLIFIRO", "PEHKMKPBEHDGOGJPGOLC", "KOKNEPKBMHNFCPLCEQHEO", "PMHKMKMEBKMDHMCQKGJG", "PNBEHKMHNBOAQFMLGOLFR", "HKBPKMHEHPKAFHOCFHFGD", "NHRKRKRERBOLMJDINEPBF", "EPKPKHNKOENGRCLQHOHRE", "NLNHLQFQNHFMJHOGFOLMI", "DHJHBJHBNDOHPIJHMDHL", "EOEMHOHKOKOFIAEGBOFME", "QEHKOEPBMBOFPAOFBFNC", "OBKHLGMPKGNFNKHDQDQ", "IKORDCFQCENHPEOHOHN", "BQKNKFNEHDQGPJAMEALAJ", "EPHPKPKEPEPIPMGMDNDP", "AQKEHCNCKBEOJQCQHQNK", "LQJBKHNHDHLMGDMJHPLNF", "DQNHKQFQBDBOLRLANEM", "EJCQBRKHPGQEKHOHREBEO", "CQEBKNINBNCFBOJRLHRBN", "LQJNFNBLQFHALRAEOLPL", "OCDOLMDLINEMKQKBOEHQ", "QHQHEOKRKOKGNJBEQCOLO", "BFQFHJQNLFIOHQKFHOBE", "OKHQDIOALAEKQECEKCEK", "RERHBOBOHOLCDQBDROKI", "MIDCFOHECDQLBJNQDNQB", "MAOEIKINILHQBHLBDHFH", "NKRKMHRNBEAFMALRNIBDA", "HFBFHDHQJHDGLHJBMLMA", "KREMHEPBNKHDMDIKDCND", "QDBFNDHQDBDOLIPEQDADO", "HQHEHKFBNEBMAPIREQIDN"
                    ],
                    [ // 5
                        "NBJBJQNBFHJCRECPAKQIK", "BOHEQBEQOHMIKMGBPCKOJ", "QKQLENLBDNFAJPHEGQGJM", "BDHQHNLEBQLPANKEMJFRE", "KPHEHQEQBOECLDOKCQNJN", "ENCEODRFAMBENKOHKQER", "EPNKHMHMKHOLHQHNIRHRN", "CMANPHPBKINENJQHDHDBQ", "HKMHKHRHMBKAOCMDQLHK", "HEQDQJBJNENAFRNLMFGJ", "KHQFQKBEHJBPBJCQLCFA", "LBQDLCEPDMEHPKBMKNKO", "KNHFBQFBKQFOHARIMGKOD", "BPHPHKHEQERJPNJDGFO", "NKHRHBRKPBFNLICKPCEAN", "ENFODCKPAFNHNEINAKBKQ", "KQOERBKOHKRGNIRJHOIO", "PCGOQBMDMIQBFNDHQKHK", "QCOJQDLARECQAEAQANIN", "NEAQNGBNHQEMLGFGMFICE", "EGDNAQKPKGDQDHNKQELQB", "KCEGKHQBQKNJCNEMFIDG", "HEOHEPHPKOJOLIMFIQG", "CQFAMBDRLOEAQCKQCNINH", "PBRHOEOBRBNJRIAFPEAND", "QHOHKERKRNCFMBLNKGNHO", "MGRAEMPDPHLNDQBNLNHD", "GBNCKAQNKQCFBFCPKGJNG", "RENHMBEBPKRDOJFAOGREA", "GFGJRHFLMJNQBEAEKHQCQ", "KAQBNPJNFCNBHOBEKMKRE", "KNDNFBNBQLDIEMDINAEOA", "NPAGMFRADRIENEAEGKIKG", "PEMKOEBPKMEGRDPCOECP", "CIPGLBMFNJHPHKHQEPBE", "NCKQAKGQGEHLRIEHPNJIF", "QDBNEIRECODHLBQFKBDNQ", "FBOQADGFMKIKGQIKAKH", "DNFBKNJQFQNAQJRMLGQDO", "NHDNBFNLBLEINAMDBDGOI", "BEGFJBOGMJBNLBHJHLQJ", "DBMIPCPJGRHQBKRHEBQB", "KANKHQEAEQEPHDHRAQKI", "HEBQEPKHBLPBDCOCDQLA", "DQBNBKNFHAQOCQJPARC", "KQEBMJNBRENKQAKCNKGQ", "QGQNIQEIQCQLPGMHOKCQ", "BEQBLNHJHEHRDIEPHEIRN", "OEBQBPBEBEPJHMBKNGLAO", "EHBERBRNEHQLBPEIFAECP", "QKMIRBJHRKNJQHFBNJN", "BNLHNHFHNKQOIBODNIEB", "REBQKBMEOKQGPMCFQOFPM", "KNEPKEBKOKPGRHEIQLDAP", "NBFHJEQDBJRMJPIDARGBL", "AHFNBNBRIFBNQLNDNL", "QNBNLHKBLPNGDAQFRNFA", "KEOEQKOKHMKCKQMHRAMLO", "FRJIOALMLAFHQKHOBQKHP", "HEQKOEBQKPJODOEIPNFG", "HQHDQBLNBNAROIAPGPFCE", "QHJDNFNHFBJIEHFPFILGE", "BMLBEALHJNBRKREHKMH", "MKRBQOEBPHNIFIJHMCOLH", "HENJQHBJHKEIFPIBDAJBJ", "KAEHKAKCNEBFRBKMGFIM", "HNAKGBQEQCDICJRKENDOL", "HQEQBKHPBKOGJOANKOHQD", "CEQHQEBECQALMBOCKHCDM", "NEHQBFNEQHFIPOJBFGJI", "PBDNADBFJCEBNCQIENEN", "EBMHOHNEBMHDMEGCJHMBE", "LBQFNDQNLNFMEANJQDCJI", "KQNJQDNLQBDMLAPJCLDH", "PJOIDARIDBDAKGKCEKCQ", "EPKPEOKEBKNAODGBJAMCQ", "NCEINBNKCQBRNDOJCMKP", "GQDIKNHPDNPEKBMKHKMQ", "QBDPGJNRIOEBPBQEOEME", "QHNFHLNKQBFOAPKIOJGFR", "QHJBDQJHKHPCNGLFHPARF", "EBIOIRFOIDQBEQKQDQBL", "JNLBEIMCRAIKGKBQINCN", "OGDMBQAMGMHKNKNBKREM", "ENENAENBKECMAQDNFOEO", "QBNHRHOHKQNLGEGMJAOCO", "BQJBQKQLBJNALGEPDHJMH", "QHEBDNLHJNFPCKNJPBQJD", "KQLHJFNHECNGDIBEMI", "QFHFHBQDQHDOBLAJEGRAN", "INGQEQAKAKODOHEMEPJD", "JBHEPDCMPDBDLBDKHNBQ", "QBMJHFIQFOKQKMHEMBEQ", "KCNINEAQAQDBLPIAKOB", "NENIQNEBQHQFIDCRILFR", "NHPBKROBMFGEANCLPIKO", "OEPBEHNBOBEAQMJICERHL", "DAJBDQEODNKAENBQBEQC", "CRIMIPKPIJRHENHOBMBEN", "BKRHKMHNBKMFALPARMFPC", "HFHFBDQNDHLALPOEIQGO", "EIQECQKIKBNLPHQKMGANA", "QHQHMEBPBMJMCNIKHCJFB", "FHBLEQNHFNFANKDIPAMHA", "KERMERHOEMHCRKHJAFGDH", "EHQEBPBRHREGRHPFRLERA", "RLQBGNLMFQAQHNAHQCKI", "KEHKQBPKRBRJHCKPGAKFM", "IQAEGEQNEHQJHOJMKRLDI", "LNDQKFQHQHLOARGNADIQC", "MPEOGOEKAFQBDBHKQDQF", "KHQLHLQHFBEADQGKAOGQC", "BMBQBNKOKBMJDALBMCJIN", "EMHPLOEIMCDBJBQBKNJBN", "FJNGJARAMIREHMEHPEBMH", "IODCHJGERJOKBPBKQBEMQ", "LNDHLQDBKBQAMJBFOGKDO", "QHEQKPEREMDGOHLRHEM", "PLOPGMLAHRKQLQHQDNLBL", "HENEPCJPEMHJHLNHNQKH", "BKBKINKANAEODQAFAOLG", "JFBNJBDQHFIQCOHNFAEI", "RGOCOAIDPAQHEJHFBFNJQ", "JNBDRBJAQHMHEHQEMKB", "REHPKMBNEPJEAKGJOCNFM", "BNBQFNBENKBOJEICJPKIM", "BNCEQGKBECKOHJIEGFAOL", "JHBFNKBFHJRKCDGKNBEOE", "MDMHDJOBIEMEKBEMHNB", "PHNKNEHNHMJHOJEGEGQFM", "OBKBMKMHENJAMKFQILIQ", "RHOBKHQHNBMLILAQMKPKA", "NBJMQINLMHNDJQFBEH", "QKGEHEQANHFHDQCOEPM", "BQDBGMIFNBINQCEQCQE", "EOHREHPEMBOFPLGJCDGAM", "HFHEQEQBEBFIQJFMCEPBN", "MCPGFPBDPFHDQFHDHFBD", "LQLAGMAMLCREHQERBHKBM", "HPHKMHKBEOHDCNDBLHQAF", "JBLHKHQDNJQOJBNALDINL", "BGFRDNBKPECQEQEBIKHQ", "EBQDBDNHBNBMEPLMGFQJ", "OHPBENHOHMAPLNLQLAL", "BQHNBKPKPHRJEIRINIBRN", "OLMPGJCIFLBQKBHRBREBN", "OHOKHBQOBEOCPNLQIKNDB", "LDBKQNLNDAOGLEPGEADA", "JMPIDIDJGMEHENHKNBRB", "EHLHBFQHQKQOJPDILBRNC", "CKEIKGEGNGQFPLFBRGLCQ", "BRBEMHEHBQHLRCJQDHPBN", "NKEOEPHKBKMCDAFIBLD", "KBKQMEBOEBQFGERBRBNEC", "NGQNAQAQEINFNCOHJAKEO", "HQLGMRCLQANHQHQKGNG", "DBFNHDNBEBDAMLHOEIADH", "QERBOEPBPHRJOBDGNEPEM", "KPEPBEOHBQCRMLFNGQDI", "KBQEMKBMHRHJCOHNJQEP", "HPBOHOBPEHNCDMFPLMIEI", "QMEBMBMBQHKIPDHNJADQB", "QIEINIBKNHNFNLBPADHBO", "RKHQKRHOHEPJCRNHKHEQ", "FQENBFQBNKHOFPJICPCMG", "RIPCEMEGDOBMEOEHQEMK", "RJANDMKBMCMENKBKNEPKP", "NIMKMIJPCQDBLHNJQLHK", "HBEHPKOHEPOIDCOKPJNAP", "EPHQKRKRERBFHBOGOKEBR", "CPKAMQJQFMEBNCEQINI", "BFQBLNJBNKNGKPDBNAJNF", "KQINKNCEHQEPFIQGROAD", "KHRHERBKHMKFCMKBMKECO", "QLQFQKQHNDGOGCQDARLD", "ENBPHBPHRHPFGPJRNHFR", "DARBPCQCPKIQKNAKBIQI", "EPHPBKBQKEOLRIEQJHLI", "KNBNDBQFNHFPOLGRMGJEN", "OBNKBMKHMKOGPGROFOIMA", "EHKOKOKHNKPIJOHNHLDPA", "FADKAJNDGNEMKHMKBHPH", "QKHEPBQHMERCJPOLGLPNB", "HEMBPEBQBKFMAPJHKGREM", "BKOHMKNEBEBJAPAQCNAO", "BNKENAKGNCQDRNINAMIO", "KEQHMBKNHBEIMIDAJNCPG", "OBMKEHREPHMILGFPNHFBP", "BNKIBKEQCKQFHPCMBJNAQ", "KBEQCENIKNERGQKCLOAD", "ANHQAQBKQANFOKGKPDMKO", "KAHNPFBIPDINEQIQECECH", "NHKNHJBDQBKICDGRBQIJ", "CPBNDGFMDJMEKOKMBHKHM", "EMIOFOELRBNKNKQGKAK", "GPIMHDOEOCHEMBRBHPEBQ", "RAFPLINLCOQDHJHKQJBNF", "GQGKINAKQNAMGLBJQAENH", "DHFBQENBDBFCJNARGPAJF", "BNKNENLHLBQIREHAJARJA", "EOHPMKEOHERFPAPGBNGQC", "EBOKHENEBEMAOCJPNCNF", "JHPKCDJHPBHNBLQFQEHJ", "QKOFPDNFAOKPKBHPBHPB", "HOPGNARFIJAQAQEGKIEBN", "JNDQLNDBLHBRNIQOCKEOB", "EBNQDKGEMQDQBFBDNFLB", "KNKQBQBNAKBMCEILBFPMA", "FQHKHNHFHNKPHBEBDAJGO", "LBQHFNJHQNKCKQARBPLAP", "KMHPHNHEOHEGDNJPLEGOG", "BKERBQKHNBOFQECDCNGBF", "KOKMHKQBPOLCDRDAKQIMH", "HBFQDBFNDAKIPGQCFA", "CNIEHNCNKQARDQCJCEPFH", "EHQKMHPHKEPLAJFMEBLO", "RHOERHEBNENFBEMDAMAPF", "HENKDQJQNHQGPHARFIOLH", "PENHBOBQKHCJPEIBQGFC", "QHENHJQBJNKIJFCMGLRGR", "MIPECQDKOAEBOBNKHNEKB", "PKQOBMKQBKNDAKRMGNHD", "ECMQEAEBOHQEHJNBNHKQ", "PDCEHQFAPCNCQBEGECNH", "KBRNHMBOKEHLIBPFQFOA", "QEHBRBKEPEPDCPKDNLPCF", "KEIKECNECOGEPFGMBPJ", "KHEMHBKBMEGEAQEOHJQDO", "PHBQHOKRKPCQDGJRCNAN", "DBNFHQFNJNEPNDARLNLNF", "KRBNKEOKMBPJGPIFNBJML", "FAOPAJBGEPAEIKNKAKHKC", "HRBOBEQBPKMALDNBJPFQF", "BKQININHENBLHEPOLOIDB", "AQBMJARECENBREPKOKQE", "RFOLBPJGOFNHKMQEKHOBH", "DQHKNHJHLBPDMANGJPI", "NJHQEQJBLBEIPOEGOCRDN", "FHDHQEHQFNDOIBLPKMILR", "PKOERHOHMKANIRHDALBPH", "EREBEREBQHCDOGNHCQCN", "FHEQNFBQNEQIMGOKADRBN", "COBEMBJMIQJBQLNEBNJH", "QBMHKMHQERBLIFOJENJR", "KEAKCEBNAQDMBRFBNA", "BPAEBEKRLRBEHEMQHOKQ", "KOEBPEPKQHLRCPJHKEPC", "IECKGEIKNAOJRHKCNHPNE", "CMCGPKPHFJBKREHOBOEMH", "HQOBEQEMHKADHNGBKFMF", "HBPKMHBEOHPCNJPIPCLNJ", "OKHBPEQKEBPIOHAMDNAQK", "FHFQBEBNENJAJHOFRKCOF", "OPDNCNLAHJHFNQFNFHE", "KQKPHKEQOKMCOGNEMHLMB", "BKQNDQKFHQDANJDIPKDGB", "OKOLPDBQGOFNQDBQJQHL", "RKMKMBMBRBMGARNGEQFIQ", "OHEBQEPKODAERCJEHRF", "EBEHRBEPKRMILCRDOEBL", "EOHEPKEBPBQGKDAKPFCLO", "QBNLQHLEHKBOFAFHEAEMF", "QHMEHMEQBKMLRCEHANFQC", "HENHDBFQJHEGRJREGBLNF", "QHQNJNDHKBOKFAPLFIRE", "BNHKHEPKEOFODHRLCPIB", "OKMKBRDCMRLBKBLQHLQFN", "IDHOADRDMBFBDHNFNDBQ", "LNBENFNBKQHRCQEIDPJOE", "FODNAMIEOHJNJBLQFNBN", "PGJIJMPJMEIEBEAKBNEN", "PELMQDARALQHRBRENKOBK", "QAEBEAKAQAKDOIFHALGQ", "DNHDHQHJNLEMGBMLBJAK", "QKOHKEQBOHBDOJRAQLBMF", "KBFBJNHEHKFCQBOFHPIMB", "DCDCHDOBGKORKMKBPBE", "BKBNDNLHLPIJRDCMIRA", "QIQJCMPAOJBEMEOKHKPEN", "GQNKEAQINEGJNBOEGJRF", "QDBQHQFBKHLRMFNIAPAO", "ALBIFQGMLNENCKQBNCK", "NBINLGDGRDHEPEQBOHRBQ", "KQHKRHBKBRHFQNHRAE", "MHKPHQBMKENGLFPDNLQNG", "RBRENEMKNLQADIOJHEA", "EBFQEHBFQBEPKCRHLGMLN", "PFQHMEHOAFBKOBNKNHPKB", "PEPKNHOHMEOJHNCPNFIRB", "NBPMEBRKHMHDHCOGCEOB", "EPEBNBOHRBKFRHLBDRKG", "JGPBEJGNHOFQLNLNHDKBH", "ANCMQJQIJMEBMQEBOEOE", "HKIQKCEGQKRDBOCRLGKQ", "HNGKAQGEHNCOCFHERGQB", "BEREQBPKMEHFCFMJARNJA", "OKNEMHKMHMKIQBLMEAJAR", "QKQCEQGKNEHPJGRDCKRFC", "GANEIKQCQARLIFREIK", "JBDNJNFHJQFGEPBFIOLPE", "JOBFRDMELNBECNANHNGE", "NBKBKPNKPHPLCOJOGKHO", "HQHBJNHNKHBRCODCDPEM", "GEOBDGDBLQIKNHKIQBNK", "LQBQDBFHENDPMIRFIEP", "HDQNLBFNJNEGFROBPCDIJ", "AQKCEGNAKQBLADRAMLQF", "HERNKHPKEBNFRGDHOGME", "ERHEOHEOEHLBJFIJQDRM", "KRHOEMHOBECNGMBNEBFRB", "KHREQKPKMERLCROIQOLNC", "KBDBDHDQEQBOGPNAJPKEM", "EBPBEBKEOBMFGQJFOGCRB", "REPKBEQBREMJMCDGKOGM", "EMEHRKBOHQHCJRLCRHPDN", "AFHOFJAHMBNEMHQEQE", "HKQBQNLHBQCLMLDMCLM", "HENKGKNAEBKOFGODHJGB", "BDNALRBGOKBEJBQJNFH", "AOCIFJHMLBLQJNFBDH", "HFHBDQFHLHQOFHJDIOCJI", "HRERBMHEQDQJGOKHODG", "CGQKGOGRJHEKPHNBMEHM", "BOAPCEOKINFNQHJQKNQJ", "HKQHKBREBQKDRERKPCOCN", "PIELPAGFMGNEBOEBRKRKN", "KNKMBKBQBOBLNHMGDRCNE", "MHQBEHOKNKNLQNIQBODBN", "JGNQCDPAHKRHKPENPKM", "NHNKHNCKEGKPEOGJRLMJ", "EPHEMKMEBPHLMGRGBPOBN", "HMENEHPBNKHDCMBMBJMDM", "HFBKQBDQFHJMCEARAPFHR", "KNBKBJHNJQBPOJGKNAQN", "EIKICNKEAEGRCOFANJIND", "KBOQFPADRDNHJBLBKHQB", "OBEPKMEHQKRJDOIRDICPJ", "CMKCRDBGRJBJBNQENHFQ", "FRIJCNIMPAMHNBMEOQHPB", "QBRKMBEOBEOALDROAQOG", "NPJCIQBGMANIEQANIEQC", "IKOQKCHNFRBKNCQIQEAQG", "JCHRJHLCJPKMERKBMBHP", "NHEBREPHMHKAQEIMFOHE", "QKEHBNBMHKOLGDQEIOFCJ", "KREHPBMHQBKCKMFROAERI", "ENDMANEQFKRBRBEOKMEQ", "BKNKPKHBMEBJCFOCFCPFB", "QHQBEQJQBFQARKOGBMFH", "BEHOBRERBRMIKDPDOIKHC", "JNHFQBFNHFQGCOFBMKCFB", "RBGLCFMEJMKNRBMHOHEM", "MKOKHMEHRNJQINLMLNIC", "RBKEPEHRBREILDMLQMJCO", "AKCNEQNCQCFREAKMJMHB", "MGKRGNEIOHNFNQLHFQLH", "NEHQEPKHKMHLQCRKIOHNI", "QFHNJQDHFNDPODHPIEAOI", "NKBOHPKMKEBLOFARFN", "GEIKCEGKEQALAKMLGNLPE", "INEINKCKAEGPJDHQMLGF", "LBQHBJHFBQJIENDBRFMGF", "KEBPKPHPHBMGQIQDMGRAN", "EKMLBMIEJMQCKAQKQGNKH", "OKQKEBPHKPJFCPLEBEBNC", "LBQEQKBFHFHCJPLROLFNI", "NCFRJQHOLGEBMKHPBMQE", "GQKHNBQKGKCDGOERAKIM", "EAKNKIQCENIRJCKFGRMCO", "NIEHCQENKANDHARJGMBNF", "MDMGFKMRFOHOEBQHNBKO", "BKBRBNHPHRGPOBNFHLIE", "RHOBKQBPEQBDGRKROIDRI", "MCIMAMRLIKOEHEBPHQHE", "NKHQCEGNGNERLQHKALIP", "KQEMEPBMKHMIMBRJHDHNA", "DQBKBLNEBQDOLEGEBEQC", "GEMFOKIMRBQCGNQINENE", "QEQMEHKHERIQAKQDHBMCF", "OHBOEOKBEMBLHKCDGJMJP", "MPAJOQIECPBNEBHFNQBQ", "KOEPBRKHMHOLQBFCEGJP", "AIODMHJMENAEQECEBKA", "KNJHDQDNFHFIKOHFPBJQG", "CKCQCKNCNECRFHOJIQEOL", "EAFNILRFLNINQHKQIQIK", "INKQBEGENJPDNGQNDHO", "QHKBEGENBNBLGDIPIBFCR", "QKHRBQKOHOLRIAOFOGJG", "GNHNGKGNKGLIJRECFRKB", "DPJAPBRDCOFBHDNHNQJQK", "BEMKMHBOKQEIFHLNEGCOK", "BFNLHLBFHBPIBOCRJDGNJ", "CQKGEIQBENCRFMLGBOHJA", "RKPKRHEMKHMFMHFRAJMGQ", "NLNFQDQBQHJANEAFPNJPE", "EQKGQINCQBKPLBEIOICRB", "KNHKHEOEOKGMIOCFPMCJC", "KEINEIKAEGCJAMKBQHREC", "FQHJQBDBNJFIOLPNAPIRM", "ENGKIQHNKBFBRDCFRIJB", "ENHKRKBREOKAQEOKHLIK", "KHEPKENHKHCMFPHDOHQF", "MHMHQKERHEOFPGKAJRCDQ", "NBRHKQMKREOFPBKQCDRMF", "EHOBNKEMBNKINCOJRHOFQ", "NIMBINHLRHQDQBQDHJHQ", "NBNGMLREANLNBFQKNLBQ", "KHLBQLQHJBJGRCDOADBFA", "RLQKCNIDPBNBEBNEQKH", "QKPMBOEOKEOFPERHKGNJ", "QEGEIKBNIKRCNCDMGAQ", "NKNKCQKHKGKRLNCKODIOB", "HEBPEPKEQBRCLIQEAEAJN", "EHERBEOBQEMLEGFHCRANJ", "HEOKQHOENEHAPJBOIFNHL", "QNEQBLHBLNEMDHJMAPNJE", "KHEQIQIEINALEHOCEGPM", "EGLRJNRFOINPBKRHEKMKR", "ENLQLQHDHNBMHDAOJBLM", "KGLHQDCOPFINGKHNGEBQE", "PHKOHEOEMHPJHOHAMARIP", "BLNDNEHBFHECPNJHFMGJH", "KQHEHPKROEOIFRNDMJRDI", "OBKHPBKRHOECOCOECQJER", "KRCFLAPDCDBHQDJQLHN", "RBQEMEHRHOECJGPBPGRJO", "FOHQEHFCPKANKCQIEIQ", "OEQBKHEMHQOCMKIPOFBKO", "QNBFHDBLHJGKCPLQHDM", "MIDQAFNIRCECKCNCKAEC", "OKOEBMEMKNHAQNJMGMIEP", "MEHOBLRDRCQFHLBQFKNKQ", "RKQOKBREHENLMHKILBRL", "NDNLFBFHBQFGFRDIEMLFG", "DMGOFMJCQLINCQBQEANKB", "OKQKBOHQEHRINALPLRLRM", "JGPIDHLCDGEANBKNQIEK", "BQJBKQDBFNECJRNFPOIDN", "HNHKHRHRMEOCNJNGJFPDB", "BKQEPKOKBEOAEAJBMKODA", "DQBQBFBDQLQOGEHCMLALF", "OCHMIOIRFGNBOQKBHOKHP", "HFQHNJBFQJDAKGFGLPKIQ", "DINHNAQDMQCKCHKBNIQB", "LHLNHDNDBFHMFAFRDBPBL", "AMHRLBDCNQBNQLBJNKN", "FQNJNHEHNFRKGDNAPDQJE", "QEHDQBLHNJQAERLFPCKO", "FBLNJQDQDQHRFOJFOKGPI", "REBREHPEQBRCKDBPCLRK", "LPIQIECFMEKBQAKIEAKN", "FCOIMAGRLNEBENBKPEMB", "RHOBEBQKREMJQLIKIAMKC", "CMRKGDIDCKBDNQJNFQKQ", "PEOEMHBRKBPDHRCQDIMF", "DQBQLNLHQMAFQMIDQEB", "JHLNJNLNJROFQGKMHEQ", "QEHKMKPBNBFBRIQOANFR", "IFAMPEINJQHKPEBR", "HOBEBNEBMEMCMGRBOINDB", "EPBRNHKHEQNLGCDAJOLHO", "PHKPHBPKBQBFGMKANBJPB", "KBEPKRHENKMGPOIBFNBQG", "EHMHKBNERENJCPLECJPB", "LRCODMEJOBNEANANCNAK", "BKHMKHOHPHPAPDGKFRNKD", "NIECNBQBKCOIJNFCNDPGD", "AOIEHEJNRGPEHMHRKPKRH", "QHFBFBFBKFOLCNJGBEO", "KERBPBNEOBMGQIQLERNFI", "REHKBROEMADBKRGLERA", "BNKPKPEPBQOIKODMENLMA", "EJQIOHDBPBHNLNDHLQLH", "RKBKHEBOHPMILOCMFCJA", "HREHOHQHQOECJAOJMAJGD", "PKBRHPHMKPBDPGCDNBFQ", "EQKHQHQLBJNCPFOJPIKBE", "MHRMHKHNHNLGBNAFPFIN", "DIKGOHRFJPKNQAHKGQHNE", "PKHBRKOBKMINFHRCMHDO", "EHOBKPHBRHEIJBPIMEGOA", "CQNEHCEANEQMKPLAFODRJ", "HBROHBREPHPDOKPANLNDM", "HMEMHMHKMEPCRGNLOLDBR", "ENFQNEQDQDNIDPHANHCLA", "OINRECLOBRKMPEPKBK", "FMDPAOERDGEBDBJNJQBLH", "FNQLAFAJCHMQBEQBOHME", "BQJHLHQDHDHCRDIDIMEA", "QNANGKNIQIPAQMGOFPO", "KBERKHPMKEMCNIPJGRCJM", "EIENGNHCEHKMBQFBLALBP", "EREREHKEQOHARMFOJCERJ", "IMBGFPELOKCEANAIQAEA", "OEMBPEHERKBDRJDCRJNAN", "JEQJQBFNHNFPFPEIRNHJA", "PEHNKHPBEPHLHCQOGJPI", "QFBJQNLNHBLOFRCNIQMA", "ENBKOKOBNKBFBLCOEAFCF", "FHQDQHJNHBLGEHFPLCRDC", "HOHNHKMBEPLHOKMJAMKE", "PBPHOENBPHOCLHFOHNGPB", "KBDBLHBFBJOGOIFCROIF", "KQHFNBLHBNBRGMHOFRMKC", "GEHQEGKQCNBRLPBRLMJD", "EQKIEAQNICQOLPBJRNCR", "KHEBQHMHEBOFNFAFMJFNG", "CRLOIRELMFNBQBQJQEQJ", "BEPKOBPEPHPIMBLMHJDAE", "LQBNBJHKFHMKFNAKPIB", "NEAENCQCEQARKIJADRJFM", "NKGKIQNGBECPCDGMGAPAD", "IEIEHQKHQKCRJDPHOCJP", "RJOKPDKIKGKORHMBEMEBN", "BNJHBQLEQBLGBRKDRFMAF", "EOKNBOEBRHQJNICJOCEHD", "QNBQGKHQCKQFAKRHEMFGK", "NBJNKNFBNJNGCNBDPGKA", "PBPKMHEBNKOINKODGJMEC", "EHNHQKGBQKNFPECPILHB", "KMBMHPEQBOBLOFCLNJMA", "DRHDBQECLIKANGKIKQEH", "GODHELMRLQBKGQANHQB", "DHQNKQHNJBKCKDODRNDCN", "BEGQINCQINBPLENFPKEH", "KGFBEORIFPKHKOKNKMKO", "BLBLRLQHPGFNFNBQJBEQF", "NJQJQDNHJDNIPNDPMEN", "KQKHQBMHRERCOFPINIOIC", "IOCKCQJAOIQKCEGQBEKA", "HPEMEBKQEPCJDRFNCKEQ", "MKPDJGLQGNHDNFLNQFHQ", "HQHBPEPEHMHLBJCJREIRJ", "NKRNKOEBREOLPJNAFINDO", "HKQBKENBPENAFIRMEHJEA", "OBOEPBMENKOIPNAOCLGKG", "KQICQGKEHCRFPBPFGLQM", "KOKEOBENEHBLADRCKPBRG", "PKHKBERHKNAPDGNFBJCQF", "IECNIKNECNCPFHKRDOFAM", "OENEOEHPBNLHMAOHPDIP", "KAKCNCEHEQGLPLNEIRHN", "HQDQHJBENLPBMJFRFGMG", "BQKEPKRNKBNCOLFNCQJGR", "HPEHPNKBPBQDBRFMLPIFQ", "KIQNKBEBNCJGQOGROIKFN", "LFNHNDNJNHJAOBLFBLPGO", "NBERHERBEBRLIDODQFPEM", "DBFQNLQDBNCLHRNKBLC", "MLNQFOGKRAKNFNHFLNHFB", "EBMBKEOEOBQAECDGBOENC", "RIEMPELOLPHKPBKBEOE", "IOFKGDLMFKQANHEAEIEK", "DMDJMEKNRKGKCKNBNBNE", "ENBKERHOHKBLCOKGRGKCQ", "MIDQEPCEMAKNDBHFNQLBQ", "FRLMADRAQEBEJBLNBF", "IKENINKCKNHJOGNJAFARE", "RHOBKREOEBQIOBKEQFCFN", "MKBNHEBPHBNDAKIKFARLI", "BNKHRBRBMKOIRHNECMFM", "BFNJHEBNDHDGNAPCLDHDA", "RBQBOBKMBRKCFIOAPIFIM", "FQJHQFHNLQNALMCFIQLAF", "BQBJILRFOGMEQBRBKPEKH", "JCDGJNBDIPBNKNEPBEBP", "NLHBQLHNJBECFQAERBLOA", "NKOHNBEBLPJGEBLFOC", "HBNEPHBKROIFBLOKFPFN", "BKDQNHNLNDHRNFGLEIKC", "IKGJGDPGFBOKMEHNKOB", "IQAENCEHKAPOCQHLNAJA", "RCNGFQHRCQBKBDHLNQLB", "ANCJOJPGPJCEINANIENCN", "FQFGPDNQGFOBPEOBOHREO", "EMEMKEBRNKNAMLFQEBPIF", "NEQHEREQKBECFOGFHKAEC", "QHKBMHQOBERLCFAQLEAQG", "EAKGKCKANANJHAQAPLEC", "EQGEIENKBNEOJODPNHPG", "BKNKQOKMHEOCROGOAEAF", "HKHQEBPBEHKFRANEPOEHM", "LHQDBQLENDPKAOCLEHPN", "HOEMBPHKBKOJAEIEMHKDH", "CNEGNGEQHNADBMKOFGKM", "MALNDMANAMQIQIKQGKAQI", "FQHFPJANLQKANBNANCKH", "OQHLIFLQAKBHRKBNKOKM", "QGQEGQIKENFPFADHMFAL", "NBJNJNBEBPGCMALBPNF", "NKQGNIDCMLRHMEPEHMBKM", "BQHRKHNEOHMLNDCPMICJQ", "EBPHKHPEROGPKGJFOIEM", "HMDJODHQJRINHENIQINHN", "BDCFMHLQAQBDQKQHLB", "CLGDJNDCDOEHPBMBOKOH", "BNGOPIMAHFBHOEHNBQE", "KBMKPBQBERBFAEGAREGFH", "BPKNHEHPBENIOKAPBOFH", "EOHKMBNHOEOFMGRAKQEPL", "BEBDBNHBKFCPLFOLPGJHD", "LQKQBQNDBQLCLGJOCOHFC", "NEQHDHFQFHBMJCDIMGDRE", "DBNLFQHLBQHAEPJDCDOIN", "QBRBNHKMHMKIFPOGFMKBE", "EHMGEQILQADKNEREPKPK", "NRFJHMIDPIMHMBOBHERHE", "KNIKIKEGKHERNFGOKOIAN", "HPBPKOKEOHDGEHEPILOG", "KQLNQAOEIQBEQBJHLNF", "AQICKNAKECEMGLBLARNCJ", "MFIRLGEBLQKNEREPHNEH", "KQKMHOBPKROFNBOANGPMC", "KMBPBRKREMFPEQGFHALE", "QLEQBLNHQNJOJRNANAOGM", "REOHEQHOERHJCLDRMJRLH", "QHQOKOBEHKRJIOFOADPKA", "BRHEMEBKHPHLRIENFOEGM", "FHJQBFNBLHBRALQOGJPA", "RBRHBMBKPNAFHDIKMFOI", "HRCMFHDGDRBKPBNBEKPB", "QEBPHEOBEBNGFOGAKRCLO", "BKEAQHCEQGCLCLMHLQKDM", "NLMQADBORDMHEMKREQEMK", "MBKMBOHROKECFAFBECQJ", "KMENEHRNBEMDHPHCQDCEN", "HOHMEREBNBNGOBLIOCOKE", "EHMKMBNKNEOJHMDPNGAQ", "EAOLGRLNAOAECKGNHQIQI", "CPFHDCOQGDBQLQDBDQFH", "IQKQBQGQKHCFPIJHRDCR", "FBNBNLQEQNFMAKIJPIQE", "BDBJBFHNHQIOFOKRCKB", "KHJHLQNHNLQOCJBJEBRO", "DHNFHJBNBLNCMFGLARKOK", "BDNKDBNKQFQGQFHFHJPOL", "HEIEQHANKAKRADOFMJIJM", "ENBRBRBKEPGENDQMFPDR", "NLNJIJPGPJBEBQLNEBNL", "EMEBRNHBKRKFIBEHLEOEA", "MKPKBMKHMEBJIDOEALMEN", "CEQAQKCKHBNFRKOJDNLP", "BEBLENBFBQNIKBFIDAEN", "BNJPFHDMCQEPKPBEKQEH", "QKNDHBKNFBFAFRLDPOJMB", "CMQDBOIPEANQEQKHNLN", "HKBRKBPHOHNFPJIFHKAFP", "OHOBMEMBKNFHDHCPMCEI", "IOPIJRIPDMEMHRBMBERB", "KHEQKQJHBQIFPGEPAPMA", "QNFNJHQHQNJRFQHLAKPAO", "HEBFHFHNHFHPAFIFPAPNF", "EHLQKNLNHBLCFGMGEQJG", "BKHRNEPHBMHJIKCFIAQCR", "QLBLEQNFNJQARIBRNGDQ", "NKBMEOKPHECPHKODBKOGF", "NRIDAQJBFGKBMEBREMQK", "DHQLBQHKQJEMAJFIAKRBK", "NKGBKQIEQNCDHJOLFIJOF", "GDNBEGQDIKMEHKOBPHNK", "DQDHENBKQDHRCJEGEBRAF", "EQJGJIDAJPHOBEHEHOK", "HBPHOBEOKBMCDOHEPAFQM", "RHMEPBMHEHOFOAJEOHPDA", "BKDNBLBQFNAQOEIDGAD", "EBOHKQOKOHMDOFBRJADRN", "HQDHQDBQJNBOFIAOBRFIJ", "QBMBOHQEHRIEMFQHCJH", "OCGOJGJNHRGNBDLHKHQDN", "RHBPEQKRHNKCKPAOJOHLO", "LBFBNLNBNLBRALGPLAPGQ", "RHKPHQBEOEHLAKQOAEBJH", "NBJMAKQFRCDNFBJNBHKHL", "NELMHPLADHOKBMEHMEHN", "ANBNIKGBEQCFREMGDRDM", "DQHJHKHDBNDRIKIPHMKEH", "OHBRHBENHPKCQMGRDBOIR", "MBPBREPBMEPDAPNBJRFQG", "NAKCHKPJOQDNBDBEBHDH", "BOBPKEMHRAJIOCKPHM", "BPEPENKQOBOAFHLPKBPCQ", "HOBKHOKOHENIMADGEGM", "ENKEMEHEHBMDCDNLCEMCK", "BQKBRKHQEOCOHQLFHROC", "QAKEIENGKNFOBNJECJOE", "OEGLOQAKMDQHEJBEQBH", "JHQLHBFHBNDRBNDRHPIC", "CPFADHDCMKBGQEKCNQHQ", "RKBOBNKRBKMGBKAOCQLMF", "COEHMDMIMENEGKNQCKNK", "PIOIRJHNPLQJQBDNKHQF", "HEMEHPNEQHCJPFBMALNB", "BNKRHENERNDPOICQOGKOD", "BMBEBQEBQOFROINJHJIP", "NEQCNKECKEBPGADRNJOGM", "HNEAKEBQCKIFOHPINBNL", "NGKGQAQBNEHPKFROAOHE", "LHFBQFBLNBFMKAFOFGCJP", "EHPKEPEHPHCDNLDQCOJH", "QKBNAKGQNKRGNLECEMGP", "KHOKMBNHMHBLAQGMGBLMH", "NAKBQECMFNHDHFKBLQ", "BFOBJAOGECQEKMEOBEKPK", "BJQFHJBNJBQGRNCKIOKF", "DHDHLQEQHDPGJMGQFQGKA", "QJBQBJDNHKPGENBDRHFO", "NBOKPEOEHPHJPEHMKCJND", "CQEHNKHECKGOBDQJGQMB", "BNHRNKHBPBMDIRILOFMHM", "AQBKCNHKCQBJROIQMCL", "BKCEQHAKNAQFCFPIAOIFI", "JRGOFPEILAKGQKNGNKAE", "NERKHQOEBMCNJDQFPECE", "EOEPKEROEAPMDGOAFPAR", "NBKHENEMEHJNAECRCNLPD", "EMBEOHMBNBRIPFBPEAMI", "DNDHKHKNLQFCQBKQLOKGK", "NEBNEHPHMHQJANGJMIAMH", "RKPHPEMEOENLRNGMFINJO", "QKNHKHPKERKGECLBPFRLO", "MKHKNBNHMKGPAMAFRCNI", "RNKQOBPKHFRNLOKIEAQ", "QANEHQIEGAQFOHAMHMHM", "DHFQDNKQNBDIOHRKAPGE", "BNFBQFBFQBEPGNHQFBMAJ", "NRCORLQDKMHOHNKRBN", "KQGKBEQCQARBOLEQBDC", "NQFQLBKGOHDQEJNFHFBK", "KNFBQDBNJHDIDRLNIMKIM", "RBMJAKBPGOEHKHMENEHM", "GECKAKECQNADHDRMJBNLM", "LAHOPANKBDOKHEKPEOBHO", "JQJEQJQFHQERFHAOKBMC", "BKNHKQHDQLFMJGFPADPBR", "CEQIENHAQHQJOEQCJOALP", "DAPLHOAPCRKBJQBFBNKBD", "EBDHFBQLQKNAEBPIFHFML", "ADCLCNCJMFJHEBFHFND", "MEJGECECDQBOEKPHKQEO", "BJHDQNBNKNJOHOHCLNEI", "BREQBEMHPKEAOCDIKFIE", "EQLBDNHBLHLILMKFRMAOD", "QBEOEOKBNKPDGOIKQKHP", "HQFNBJBNENERGBKCRJAND", "QBEIBKQBKECLBOEMLIKC", "EQEPHOHKNKGFMLBQMDQD", "NKRBEBKPEIPLIBMDHKE", "HENKBOEBMBLGOBLPENIRL", "BOHEPKOENKRCJQJFCOIEC", "BKBMBPHKPBQGFAEGCRCND", "RNKMHMBEBQKAFOINCKDRB", "KGNCEIKEQHEOKCNDQBOCJ", "CQEAQKECQHFGRJGNKQEO", "NIKIEINENEARBOGOJMJRD", "DBLHNFNBQJHRHLEIBMCD", "RKNKRHRHEHLDPBNIPJQNC", "HJBJQFQGLRBRBHMBKMKH", "BMLIRDCPFJINCENBKQBEN", "PLBMLRBIEHENEREHPBP", "AOCDLOFGQGDKQDKNHQHL", "BHKIDCFGLHPEMHQBKBEB", "KOEHNBEOHERIDPNFAENJP", "ERHEPKBRKECDGMGMEMJIC", "OHPBKNBREHRALBENKQBOI", "JHQHFQBKHBRBDNAFMHDR", "EQFBLNLHBDBPLNKGDOJQ", "HNGKHNEHEBNLOENDQAKHR", "EQMHKOKBOBMCLQOLEHAF", "JMFKPIMJIDBLBDBDNBJB", "QHREMERHPBKCFBRCQLRMC", "NRCMAEOFARBEMEOHKME", "EBQGNICENEAMKDQFAJCFC", "FAOLCMDBGFQHFNBKQBFH", "FKPFNCRLCFQEJNLQBQD", "HERKOKRHRKARMFRLIPNKI", "QCEINKQKHNGLICMFROLDP", "PBPHEMHQHRCPKDPLAQLQ", "PMHKRHKNEBQLCOJAPBJM", "KMBMHMEHOEMGFBMKMDHQM", "FJADNLIKMQKAKBGECQGN", "CJOBRLCQDMHNENKRHKBR", "JNFQHDHNHDGPAQGEMJOG", "IEGNGQBQCQALHAOKBPFPB", "BKRECLAKPBHQHFHQFQFQ", "HJHDBNLNHQFPGDGKAQLNB", "JBEHFNHBEBERJRIRJMDAP", "RLPINKMIFCHRKNKMBEMER", "NKAQGNINAQEOLQIRHLAF", "KBQEOKPERKNFIRLCQDGEH", "KQKOHQKEBEOLPGAMLQDIR", "HOHQBKOKOIFMHLEHKFAR", "AEIKCKBEQNARNJGAQHLNC", "OEBPENHPBKFAKEMEGPCKO", "BENLQNJBJHEMLQIOKCMBO", "KENEHBREHNAPKMFHRJGD", "DGLINJRAMLNKHNBIEKNKG", "DQKNFBQBNLEOFMDAFPFGD", "EHQOKEOEQADRCPGFOIL", "KNHKERBJRLRJILOFH", "EPBNHNEPBKNDHLHQMDAJA", "QFBNBLQEBFRILDQGMICNL", "FBENDBDQBNBPBJAOCDOCD", "ORHMCMGNANDNHENBNJNH", "QHPMKHKBMEHLBRLCJDBPM", "QEQDQBENKNHPLPFCMHFNJ", "KERKMEHRHNBLAOFCMHQL", "HQNENLHLBNLMLARCLIEGA", "BDQKBEBDQFPNGQDMIAND", "CDKRAOGKMARKBEQKOERHE", "HKHOHMHEPBQCLAFOHRJD", "KPBPHKOKHBPJPBRAKGPNE", "MRALIMBJRECKQGKQAKQK", "JNDQJHDBNEHCRMJFRIKFH", "RKAHORJADAKOBRKMBNEBR", "MKNBMBMKQHNFPDIDPJGE", "EAQKGQBQKNBFNIFMFGEB", "AQIKHKAEGNKRHOJNHPLP", "HOEPHKEBRIKDICRJIDR", "BNENFQEBNBJIKRKGAJBLF", "EBNKHPERBRECQMHAJPEOI", "EPMHKOBEPHALFMCDICMC", "NLGFOIENILNDJHQDQEHN", "KREBEPERBOKCQAMHMGA", "RLGDJQEGLRBJNBDKBFBQB", "JBOJAOERCHFNJQHFNKHF", "KQKEAQIQHNHMLEQGAPML", "BNKMHERBNHKAKPEIFHADM", "JIFIJBJPFKBKNHRKOBEN", "KHKMHMHKQHOJAPAKRJDGN", "OKMBRHQKOBMCKMJHCPHEO", "OBMPLAGRADHQKNDHKQJN", "NHRGMFNHMLQEHOQBEREME", "KCKIEGQBKNCJDGMJHARJQ", "QIKAQKCKHQKFMJHQLGDA", "KQCQCENCEIBJBMAQOKCO", "EQEMKHOBMHAFGMGRHCLQG", "NKNKHEOHMKRDHMIFGNDB", "HKQEGKCENEIDIJIPJQAOF", "HQDNHFBLFHECPMLBRJOA", "EMKRKEPKEQFCKMHBNJ", "HFHKFHDQNBFMJDIJNJICF", "EGEHKENANEIOGOGLRIFOA", "QKANCNAKCEQJPDMFHBFBO", "MHQJGOLIFHKBECQBGEAE", "IKNHNEGKCMHCRLQBRJ", "HFQHLHNJNEHCLCJPIRFAQ", "KIQIQENCKHNFMLFIRKGE", "OBOEOKHEBQFCQMJHDQNEO", "OKMHKNHKQHKAKRGOCJBRM", "HOEMKOKHMBKGBLQHAPFMK", "KQNLBEBFBLNCJQDGOCNHE", "FREPBDCOBNKNCKNAIEB", "GDAJBDLPDHNKMEKNBME", "RHKHMKNKREAQHBLPAEAOJ", "OFMHKGJHJBREBOHPHKQE", "OPFHJCRFCMKMKREKBMPK", "KRELPEGLRHLHQLHKNHFN", "ENKMKMHKFCPBQJOAPE", "HQEPBOKRKQOGPAQAQFILQ", "HOLRJIOJIDHNHNDBEHQB", "BOKRKQHEMERALRJHDCQKA", "HNIOBIDHPBLNHFHJBNKH", "BQOEBEOKBQMCDGDRJIAOI", "BKHOKPBPHBKILIQHLRGRN", "KHMBEREHBRHDPARMGMIJB", "BEMHRBKMKRKIKCOBDIRAF", "PHEMKMBEQEOLGPLQGOJFA", "PLHEAKIRAFHLBNBDHJQD", "MKBPKPEPENJDPCMFRFBK", "AQKAKIEBKERHNCMIRJR", "OPJGEOQILAQCEAECKQBK", "BDQHJDNDQLQGMBRJNBEHM", "RBMHKBOERHODMJCOGLHCQ", "AEGOLRLHDPBPKOEOKMK", "EJMIDREJOBQHNLBHQLQJ", "EHKBMKOKMHNGOJFCERAFO", "LNEBQLQDBNEPNIBRLHEA", "FQJQEBDBQBQCKGQMHARKF", "KNICNKIQKQBMDBQOEIDM", "MDGOHLHRCHDHLBQLHKND", "MKEMBOKRHKNIMEBRBJBRE", "ENGNEAQGQIQFGOKBEAODB", "FJPIEAHJAMHKMKNKHQBR", "OKHEHBMEMBPAJNICNAPEI", "QNANEANGBPFGJNDGBQD", "QHQLHJHKQJFROLCLQNDND", "NAECHDKOGJCNREBHRKBQH", "QDNBFHEBDQNGERLDOKDO", "QDHEHDNBQDHCLEPLERHOL", "FHFQKBQDOICDMEHMEI", "KBMEHERMKQBFGRDPLPIN", "HDHNFHENJNLMANEGBJQOA", "FJOFAHOQFQAHEKAQHKQI", "QKPKBQBMEBKIAMHCDBOH", "EHPBMBKMEBEGMHEPKDMAQ", "JNLAQHRHLPEBRHMKOBEK", "EHRNHKHEBQMLMEBPENGBM", "KBMKPKHPNEMGLANKBRAQI", "ENHEHDNHDQLILPDPBMIPN", "DBNKBLEQJNFIOARALMDCP", "BFODINFNAEBQBPBKPERB", "NENAKICNCKHMCFIJPNJAQ", "RHERNKOBEBMAMIOCJE", "NHNHJQFBJNBMHNAMKFML", "GMHECOQAOKNHDNQBDBNF", "EMKQHKHOBKEAOCRHODAMA", "KHEHBMHEPEOLINEMJOCO", "HKHQCQKEGKQFQIAQLMCL", "DPHDIMBDPKNFBHLBLBHJ", "BQEPBKBRBNBJMCQGQJEPH", "BREBQBQEHRBDIRNDCPADH", "HKEMBEBKPHRLPHFNCDIJM", "COIEKAIFOBEANCQEKCNQ", "RMHEPHBRKHNCRKDMJCLCR", "FHBEBQFCPHBLEHAJ", "JHFBJNBKBDHARKILDPIAN", "LGPJMQIFOJAKCNQKCKQBN", "QHFNFQLQBFNAKRAKQBPCF", "PIOGQKIPANDHQDQBFQEH", "ENHNGKGNEQEMHCDNEOHE", "HDHBDQFQHLEPHJPFCEOE", "KBKHNHJQHBOFIDPIJQGMA", "QKNAEHKCFNHLOKEGOCD", "PCECQAIRLNHKMKPHOEBH", "KNBKBJNFBLQAROFCPGO", "KBEMKQHERBFGFCJRCOLD", "IMIDAMBMIKBNBNHLHQH", "IPEIJNRGOLHOQEOBPBPKB", "QBEKBMJHRAKBMERBKREPK", "JQLBNEQLHBFPAJECRBMGL", "FLMANFKALBQAKQGKGEIQ", "QKHMKEMBEBOLMEALHFHEB", "BQKNFHNDNGRNDREIPHM", "KMHBNHEMBEOLGMCDNIQC", "QBNJBENFNBFGPBQJAODHK", "PHQBKRKQKBKIMCKBLRCDR", "OBOEHBOKHQKIFBRCMAERG", "JOKPAJGJANBHFBJBQKBQ", "RBKNEOHRHMBJRLAKDHPKP", "HEHKROKMKENCREINGFGAO", "HOHMBKHENEOJGPJIKPBOA", "BLCOLPAMDOEPKMKPBKHO", "QENDPKIOIJNQJNEBLQHN", "QHQOKOKHMKNAERLOAJBQI", "QJBQFQNHDHBPFIFOCKMKD", "MJIFKOKPCDBKPBNPEBHKM", "HBDHFNBKQHLIJOGDBLHNI", "HOBMKRKBEMKGKAJAPMLQN", "BPENHPKEMHPJMCKNIPIDC", "KEOBMBMKMHRCDRJDIKPDR", "OEHQBEOBOBECNAEQJDOIR", "HRHPBOBPHMDOIKMCNKQC", "QNLQHQBJNJDMDIFALHCJP", "KRHEOKBMKQHLOHCPNCLHR", "PHKQBKQBPEPIFCLPFQJHO", "FNKQBLEHJQDPANLMLERDM", "RHEBERBNBQJCRIODAOD", "NEGNKEGQHEBFMFPNGNEG", "DQJFHQFHDQBPDIPFQAREA", "EBNBMKHMKODRCPMGKERC", "DQEBFQDQDNBOALIOLMAP", "KRKPEBPEOKPDRDMKGDM", "BLNBFBQJENKRDGJARCNHA", "QLFBQKNEBNDRCEMJPICKO", "PKHREQBOKMEGBDCPMBDOD", "QDQDNDQBEHLGCMARBRHKQ", "EQCQNIECKGCRBQCJPLMKQ", "BKOEOHKPEPECDQHJOHRCD", "RBEMKMEHOKNIJADPGOEIF", "NAEQAQCECQARAKBOJMILH", "EOHRNBOKEPBJCQDIFBQ", "LFBKHQHLBFPCOEANJRLD", "NHNBDBKBNKFPIJFIAJPEQ", "BQBDNLHKHFQMIBPGMJOLN", "CQEQCKINICEOFGLQAPHDP", "DQLQEQHNBDNIMHNGOAOC", "BPKBMEMBKOAKILNKDPB", "EREPKEREBEIPKHFCQILC", "AKECQKNBEHCMBJBKPOKB", "BQHEPHPKPHNLNJGLIEAMJ", "QKQMBKBERNGDHQGFPGAD", "KMGEQGFGKPFLQBQLNHDBH", "HNKBMEMKNHBJRIBNAPDGM", "RKPBMBOEPBKDOKIKQMGPC", "QGNECNAQHKRFILGPHEP", "QKRHNEHKMBRIJNCQOFHDA", "PIOGJAMCMFPBEOBRHNKHN", "LNLHEHNBJHFGANJIPFIOD", "QDBNLEQBEOHOJGFQIJ", "HKBRHBQBOHNCLRHDMCNG", "FHNFBNLFHBFMLNIFGFOB", "QEHQJHDNHRFIOKNAMBD", "NDHLQBENLHQINJEPHJCMJ", "BFQKQHDQLHQAPDMFPLREA", "QBDNHBLQKFHMBJGDCJQE", "OBGQGMGFGJBHOBNBOHEO", "EBEOBRHKNKBLRFPGADAPD", "PEPKQOHPBKMCJAERMIDPN", "KOEPMEHEPKEGQDNHREMB"
                    ],
                    [ // 6
                        "DNIPLCRKPEBNQJQDQBHK", "QKNBQBKFHQEMGBFCRGMEB", "HKCKAQIQBQEMHLAOEIJFH", "RLCPBFADIDKGNGENCEA", "KBPEMKBRKNHCKMDOLIKFG", "HRBMBRKNKOLAQAFCJQG", "OHBEPKHPEOIFRLAPGEOHA", "QLNLHJQLNKERDGJCFQCKC", "GEGDLGERAFHREHRBRBKBE", "EBMFNBOEMANGQBQGEKNQ", "RFNGKADPBDKHKQKMBNB", "QGNGEIKCECKDGCRJRFMLF", "EBGKMPAOFJGEQIQCENKNQ", "MLBHFARBFKQAEKBNQKG", "NHNAEKRFGEHMEHMEMBME", "JBNJHKQBFHEMKFQOHCECM", "QKCNCNEBQKGJMHPHMKPL", "BEHPEOBMKOHLRBJRLCOJG", "MBKRHMKBEBRFHCPLANEQC", "DOFANJGECEJHDQDBHQB", "IQGAKGNEQKOKAJIJCPIJ", "IQAKGNKENEAOFGPBKQIEB", "IKNKAQCQECNFGDAJHADP", "HNEOBNEMHMIKPDBJPEMJF", "DNGJIMLPLPHNHEBMKPEM", "PBMEMBPEBRIKAFBFCEN", "BQLQJQHBKNDRAFGECJN", "KPEBREPKRBECMDQMJRIOB", "QDLOFBJBGJMBHEQEKRHOH", "RCJCILRJCPLNBEBFBEBFN", "EOKRNHQHKODPNILOECPLD", "BLNKILMLOAKNREHNBMBE", "PKOHKEMERBNJGMERIOFBK", "MEQHEOBMKHMIRLBQKMLFG", "ENHQCNAENIEROICLMDIQL", "RKBPHBPHQKNIPLRNIQHR", "PILCORJRDCQBGKCGEQK", "HKEMKHRHRKMFNCQFMAFML", "QEQEPKERKRBFIKQICRAQI", "EHEHEREPKMBDCERMCEPJM", "NJGDMIORJOBPEOREKBEP", "QDNHBFHQBFNGBMHCDHK", "PKENKHOBOBLMJPDAQNAL", "HBEMHQHKMENJDIJHMC", "JHEHFQFBLHMFAKRKFGN", "HFBNHQEHFHMARJNCRBRHL", "ERKREQHOEBNIKGADHJRI", "OHMBKMBNHOGLPCEPHJQI", "EPHBEMHBOERGPHLMHPJEC", "LCFBFBRCNFKQENBMHQEBN", "BNHCQEBQNKNJMFPIEGERF", "DQFPKNHDGPBKOHEKPBQK", "ENBRHRBKBOKADHAQKGNFR", "RHQOKRHOHKOFIEQFRLBPC", "PHKHDCOJPJNQBGENBGQI", "MHBMHKHEPHQJMHOJIBQBJ", "RHOEBOHOBRNDMHOAKPFCP", "EQEPKEOHEHKAJQMFBEOJR", "DAJPCOAFRJHLQJNQBQDB", "HJIOJCNIPDNFHELNQHDN", "BRBRBERBEBOFIFQKGMKID", "NBEBKBQJQHBRDPARGJQG", "FNJQHJHDQBNGJBLRFOLCJ", "EHQHBPEOKNHAFMGLDMIPE", "KMEHKEQOEBMJAQCJIDCL", "AEBNGENIKBOFPNHAJRK", "BKRBEPKHBNKFOILRDMIMB", "OKPEHBOHKQNJCKPODNEP", "AKQBQENAKEILRDNKMGDQ", "NBFNBFHFHQKCOICEPOLQB", "HPHMBPEBNDOGDCMLIM", "FNAFGJRBOGQHEQFBHQFN", "FQAHRFNBOAHFQDHQHLNBJ", "BNKMKPBEMBMAMKGFPEPLO", "MKHEHOKQKERCNLCNGBOAM", "MHRHNHOHBEIRLOKOKHCO", "BNKHQMHNHDQJQIODPJIR", "KNHNIKCNIKIOAPJNIKHPL", "IKQBOCKOGNQLNBQDBFKB", "QKBQAEIKENGDAPIOGMIO", "PEHPENKPKHEIFMAJBRGQA", "MGQJMQLCGMBNPBNHKME", "LNBDBJQJHBDPKGQBDMGOI", "DOQAMJPHJAFHEQDBLBFBQ", "PKBPHERBMBMLMKIMDHRCD", "ECQKNGKQCNHLQDRKGOAPN", "OKBRBERKREGFCLQOIRJC", "QHREMHKNHRAJMBKDIQKPM", "PEBQOHOHKEBFGRLRLNK", "RFIPHNLIOBHNJBFLQHQJ", "CRAHRBGFBPAKQCNGEQGEG", "EOREIJOAGMEQLQDBQENDB", "HBQJHLBEQHKGMLADPOJEP", "OBKBMKBPHQOGODQMFGBN", "BQIQAKENICQOHNIMIKFO", "AOGJMINKMDJQBQEQFKHD", "PEPBRHKREHNGOLBODCMJD", "ERKMKHBREHRCENDMCJQCP", "EHKNHPKMKQGFNHDAEMJA", "FQHKQLHQDHKCPGPLNCM", "IKIBECENHBMFPMDPNCPBF", "JHJQNJNEQHQGJHNJOGKHN", "MHKHREQENHNGNLMCKOGRD", "QKHPEHOKPEMGDMBOAMIQH", "HBJBFBDBJHKARIKAPGOIK", "HQFOFIMLINENDQKNDBHE", "RKHJAFGOCQKHNDBHDKQH", "RHNHRBOHPGMDAQJCKGR", "LOPAOAMIFOKNKPEKHKMB", "HOKRMKHNKREIRDRLMCKFH", "RKNHJIJHMEQGQINIKHKQ", "GEBQKCNKNGCFBPJMFOGD", "GEHAQCQNEGERBFGRGFRLG", "OQCMRGRIDQBGEINGQBNQ", "EHEOBEMKBMHFHMCLOLIK", "BMHKBEOHNEBFBPLOAOH", "HKIQGKGENEAJRAFGNHCQM", "NKAEQGEGBKGODREMHKFGC", "DNRLMCJMJNANIQCKBEB", "KHKBREQKHKMDMEHFGMHBN", "EREBPHEQHRIDCPOBNKDHC", "HOKPHPEHMKPFPGDNEPCRM", "FNJNJHBNJHCRLQMIJGDBD", "BEHNKOHEBNBJOBPAQERIO", "JCNHODCMHLHDQHNKHFQ", "JNDHDBDBKBFGOALEHOIKA", "KBNHQBEMEOEILPCOCRFRE", "QHPHKENEHPHFGKFOEIPBJ", "FMQDIMCEPFGNENKQBKNH", "NDHLBJEBQDRIPALNKIPOE", "FHFHBQFQLHJCPLGQJID", "HKHKNFNBNHNARMGOLO", "HAEQHAEQKNFGOGRHNBDHC", "DBKBNJBLBKRHNGMAPCFQL", "PEOGJCGENDMHQEHOKMBMH", "NEQDBNENBNJOFNCMJQEQG", "HKBKNBDBENEIOARAJMKMK", "ADJBLGORAOQJNJNHKBHQH", "OAPKGKRJIRDQKQBQFBJHJ", "JQKQDHQFQHKINDHFPAJHL", "MBQKRKPKMKMGNLRAQMLRH", "KHQBMHBOHBRDOBRNEIDHB", "RHPBMBEBMKDAJDMHKMGE", "NDHJQNBQNDBMGCPFQCOGF", "NFMEAQDAPINCQEQEIQAQ", "BQNAQNCEHNKRFANLMCDQA", "EQEHREBNKHMDQMAJHAPBO", "QKBPBKBPKMEAQAFBJAJAR", "BKPHPNBKMHEAJFPGNCQK", "MBEQKQBKMHKIFHERKQCQ", "ELIKBQFGOQKIEINEQHQG", "HNRBNGRDJGEOKBMKQHOBK", "QAKGQNIEBQAOLMIJRFOG", "QKBJHNDHLQJMARNIOLNFM", "PMBMHKOBEHCENDPGEBJID", "RBMERBQEMHOFBEIEADOLM", "AMDAKRJIJBEPEBERHREB", "BQKHDNEHFHQGMKALOBLPL", "QEBJNHDBNFHMKBNCJPDAJ", "JBJQJBJHQHKGOLCNCFAO", "OBKEOBPBEPJMKCOJCJFG", "COJQKCLRGDHNFHLQJQL", "BRBOBQBEMKGFBOAEALDHB", "LHDQBFQBLNBRJRIMCDRD", "PEMHDHQGDPEHEOBNPKHM", "GJMCJBRCPGKBMEQEPKHQB", "HECODBQAJBHEORHRERBE", "GRGDOGPARAHNDQFLBQBJH", "JCMDOKIOIRCEQEBQEINQG", "DCEAPIOQCLMQHKOKBKB", "KINECKCEGKIDIKPHPFHF", "HBNJHJNJQBLRFGMLMHPGD", "GNHQEGNIKHCDARFROFNCK", "BNHBDQLBJDNCOCLIQOHJB", "NHPHBKPHOAQFRBKCFCR", "DOIOECDORDCEBDKQHDHNH", "DBNKDNHDBENIFPJRLMGKB", "EBINAKMBQJHPEMPHMEKBM", "FOJMQHECQIMHEHEPEPBNB", "EQFQNJBNBENIFICJIOGRE", "EBRBNBRKRKNJHFAKIPFQK", "BDQHDNBFQNJAMEGEQJIRI", "MHRBREQKHPBLOLEGPFHQD", "JQNHLFHKNGMFRAQLPHOGA", "EGNKCNGKIJGDIEOIRODO", "MHREMBQBKEMLCRJBKRIQL", "OCDOJOPBFNAHEBHQBMHO", "BQHNKQLHQDQIEOCJCRLFO", "PFCPGNRIQCEQDHEQJHDHQ", "DNLCQDJGKBMKMBHMKNK", "MBKEOKBPKNCPEPFOGFH", "NHNKOEHKPIFHNLAMIBM", "JMKNBPLAFKAECEIKIECI", "AKCEQKAKBQDGQCFOFRCN", "DCLQGFHLPEQIEQBEGNEA", "HQKNENBKGQIRLAQNGFNC", "BFNHJBEHBQHOFNFQGJOCL", "KNBENFHDQFQAMEBKBQADH", "EBKEAQBNENAFAJRCQMDIN", "GEQNCNIKQKILQIRNDRA", "JBEHBLHEQHDALRGEPFIMG", "GKNGKCKQINIMKAMIRNLND", "QFHEHQNLFQHODGFOIBFQC", "GKEQANCEGNGRCQBMDNLQC", "KCPAHMGOALNGNGKCEQGKQ", "RBKMKRKEPEOFAKNFGNGQC", "BNEHEBEPHMCPLOFAOGPI", "PKQOBMKOHEHJREICNFQKB", "PBMKMKBEOBMADAJGOLIOB", "GQNAEIKNCNKOFNANIQHQ", "LRJODMDLPIEHKGENENG", "LPLAEGFMGNJQFNQEQBFB", "FCGQLPAMDADBDBEBQHFHL", "IQADRBQJGQHFHJBHKBQL", "FNDHBKFBLHQIFOJRAFBPD", "HKQKRNBRHKRLCQJHALBME", "AJMLOKPELAJQHNQJBDQJ", "BJBLHKBNHNBPAEGFILEOG", "PKQHEBOKNEODPEIBLCRGQ", "NKINHKNEGKIODAEHPJOCD", "IFQAFCFILOEKHOEPKHRE", "RNHKPNEOKHEIBMKCDMARG", "HPKMKENHKHEGNBKODBNK", "OGDBEAFMJHENCENBINQ", "BQDNLNEQHFBPKRCRIAMJM", "BJNEBDNLNEIERNDBQOGQ", "HQIAQKQECLCOCLIRFNG", "PBMHQOBMKENJGJEHDCEPM", "DNALCRBJAMBHNBRHREM", "KPKBKMHPOHOFCNCFOGARG", "MJNHOBJCPFHQEHEHPEQBO", "BQLNKQJHQHFPDARMAQBLF", "EQNBNGEANEBOLRIKHQKC", "BNDQBFBJEBKALOHEQALHL", "IDKRILGKGDNEPHEMBOEKH", "GNBKNIECKECDHMFHPKOE", "MHENHKOKEROCRIRLDMFAN", "QCERCGRKCEQHJQHDNQJ", "DMRAJQJPHFNGKANGNANKA", "KAQKCENAEIAPIFHCQKOHJ", "KHKEMKBQKPMFOLMIODPAN", "QNEIEQNCQIFOBEGLQOI", "KRKMKERNEHQLMFAMDQOIL", "LHJHLHQKEIRBDQNHFGO", "RHBRKPHNKRICERHFNKRF", "PEHPBPBKPKNLFQLIMAFPC", "QEGKNGKQGQIMLGARBLCQF", "MHEQBRENEHPFNGRDMALGE", "QHQFHFQLNBKGPFPLOGKN", "OBQIMJOIFOQBKIEGNIEQE", "GMHPGLCDAOBKNPEHPBQE", "BNKHEPKEREQGJDRFAKPLP", "JHQFQFQEQKOHPCNJOIQL", "DPGJQHDGJQKPHOKPEBNK", "NLQKNHDBLNLRLFRKEIDRJ", "QNHKGNBEQHBRJQFINJDRI", "INEGKCQIKIJBRFIRKMFHC", "PHPHEQHPHMBFMCMLMECKI", "IKGQECNKGQHLIDHPNGJOJ", "PKQKEHOHOKFHERGECMDQI", "LQBKDBLBNECRICJOFMIE", "HQEMHMENBKRIRKCPKHFAP", "BFCRJRJRIPEHNENFNHEBH", "GMGMRCLMDHPEBMBOKMKN", "NFQDHQJBECJFAMLPFAK", "DIPALIMENIQDKBNFHDNK", "KMKPHMBOKEBFNCFQGPJE", "HRHBKPEQBKMCFPFAEHMIL", "MEALNGNBOEQBDBHQHJNQ", "MGMRHDCJMKBENQHJBJQ", "EQHFNHNHNJHMCKRGLQDPO", "RLPIORFKAMBKHENKOKOH", "LPDAFILMCRENIENECQBQG", "KQHKNEOHENEIPKPLQALHN", "KHNAKEGKCEIPMIJGFGLR", "DQDBLHQEHBDIFHCRJMJQF", "NKIKQHQBNDQIKAODNHN", "HLBFQNHNLBDOIAPFNCMLD", "EMKEHOHBOERJCMIRHLRHB", "QHKRBEMBPKNIJPHOFCNIN", "QBLNKQDQHQHPDILCNJFCK", "GKQNIEGKINCDGBROEAROG", "OHPHPBQHEOKAFILBOCEMK", "ENFHQBDNLNIQMLOCRLEC", "OHOHPKOBMEHFBNCNIMFBR", "HOADGMBPAPEPBKNBOHKN", "EBDHLNFHJHDCLNJPCPMC", "BPHNEQEBMHOALEIRIAQHD", "KGKNCQNCKBPBLNEGEOK", "NEHQBDQBNHFMANHCLBOJA", "AEGKQGNAKQADRANKPNIR", "BEQIBNEBKBOANHDRLHCN", "QEBFBQHQFNLIFOHKGQFND", "EQGAQANINGCFRGPJOIJR", "HKQFBFHJEPDICJGFCNFM", "OBRBEHBNBERGJFBMIKAM", "PEREPEBMBNKIBERJFRIPH", "NHEQJHNBNFOJGADGAMJM", "MEQEKGDIMCQGNEHNECNQ", "AKNHKCKEAKCRDAMHRFCM", "EPHNKMHRHBNLIMKRIBDMB", "HEHEOHOBQKIDHNEGOEAO", "JQNJFQNDNFBRGRDMGQFC", "HMBPHEHNBQNCQJEPDREHC", "QCEIKGECNCKRIMLPLMHB", "LHJQFBQHBNLPCJIDNIRBE", "QEOHQHKOBRADOFNLIRIE", "BMEPHBRHPKMIRLECLDOIN", "NCNAQCQIQCQLQAPMLEQKG", "NEGQEIQNCECMCPOJHFGDM", "ENGQKOPJGLQJNDQEQDNQ", "HECNAEAKBKCOJADIFBERM", "FHNADCHKPAQHPHREHOEOB", "HOHKOEQBPDNAEOJOBRL", "BGMCELCEHDHOEKOKRKBNE", "HFHKBNENKFNIDQALRBMDB", "QHBLBNJEHDNIQDILPNBQ", "HREPEOKEBQKCLNEPLRIJM", "HNLBJHJHNDNCDANBOGARC", "MHNKHBQBMBOICRGPIRJHM", "BEQLBDQBNBLMAFGAKCOL", "KHLBQHFBKQDPHAKGQFPGM", "BLHDNBEBFNFGPFIJERJNG", "BMKOEOEHRERFBNGDRLAJ", "HMHROKHRHMEAODGLQALIQ", "JENLHLHQNDROCLHDRJIP", "FNJHFNHQENJMAMGDCPLAO", "REMHPHNHEGJIRIFQOB", "JHDBQDNKQFHOFQKIDMAOL", "MERNBOHKBQBDRNLNFRGCR", "NEHMKRBNFMLPEGAMK", "HDHBNLFQBRIBNLHDHRD", "ERHPBKPMHBMJOARLRDILM", "QLBNJNDBQNJGMERJCKRD", "JQFNBKQJHLFOKGDCECPHO", "KBRKBEMKMHBLGNFCLHAOL", "EHENKEMHKREAJMGLOHMFQ", "BKEMEMKHKPEGOENJGLPHF", "BERKQBERHPKDIPMAFMIDR", "MHOKHBRBRKBLILADAOHKF", "KBMHNEBOEPKIDQNCMKGMK", "DJPGRKMGDRAKNAEQAKBI", "HOBMBERMKILRFOGKALN", "CLPDLCPCJMBRHKHPHOEO", "EKNFIFRERFBJNFKNQHDN", "MDOPCGFIDQHLNEQLBLH", "EREMBNBEOEHFHANFOIPJP", "EREOBMHNKBNGOEIFHMFNF", "LHMRCQGDMQLNFBHNLNBE", "NLHDHBDBNKEIBRAEMEHF", "IQGRAILOEAPHKBKORHOEP", "HDNBDHDNFHMEGLPJEARL", "LMAMIENDOIREOHMHPKHME", "HBKOEQEHOKPGMGNLAEGL", "NJOALMRHRDRKMBEHEBRKM", "MADOALGFIPFBDBQHLNJBN", "AEMFGJQAMCQLNBLQKHNHF", "NGKHKNEAEHLRDRALHNHP", "EOBKRKMEMBDGLEBPMDMF", "ENEOHQEHBMHJQHCKCJBRI", "BOHEMBPEREHDHCLPKREGF", "BMHMINJNRJNFKQJQHKQ", "ENCQIKBNCQNJMGAOFPLFB", "QKHQCKEIQNADRJRMFPOB", "EQDQLQBJHLQGEQBPGKAF", "NBMEOEOBEPCPDQKARMJIN", "NKAQINGKBNEPHNDAJGMGO", "CQCOJOPBIQFQLBNLBJQD", "HKRHKBQEPBOCJROIENDN", "KROEBERBOKNAPFANILFO", "KOBERNBNHEOIBMHAJIEHN", "QCPLIOQDQAEBKMHMQKHEH", "RKBEOKMBQOJGODOJEBK", "PEOEHREQKOJCRLHPBFN", "DAGDODIFJCRBEHQEPEKRB", "KREPKOKOHBEGFNGOFRLEO", "GLHDKCIFOEGKGKGQKGKB", "BNBQENGEBNGJHKPDHKQCR", "BEPHPBMHKQIMHEAJMEBN", "QKHNKGQKQAMCJFRHRLPLD", "HEPHPNBOBOKFOGFHJNHDM", "LBLHLHFBFGMAEIDMKQO", "EAKCEQCEGQJGBOKMICN", "ENEPKHKBNKOIDOHKDHECO", "MBNEOKBEHOIEHADRMDQJO", "NCNBENIQCFMJDAJDMGB", "GBNCNEQKEAQJCMGAPOBFO", "PKEHPHKHNKMFMHRIRBEND", "DQJHDHQEQBQCFMHBOKIQF", "JIFRLCRECKHELHNDQJQ", "BQEGKQNGEHEPBJNBRBFP", "BPBMEMBEOKOGFPMDOHDQM", "RKNKBRHQOBNLOJFOIMCMH", "ARLHOFQHFQIEQGNKHEGN", "HKHKPHENHOHJODALGMGJE", "MLMEGMGPJAKBHLQBHDBHK", "NLMDKCJCQGNKNBOKHEOHK", "EQKRBEPBMHMIKDCPOGND", "HOHPEQEMHPOFINBMJCPB", "QKOHKMERKMBFIQHCNFOJQ", "FBEBNBFHQEAMDCJAPAKEC", "QHENHKPHMBNCNDRMLBQH", "BDPJRJMDIJOKOQBEKMKPE", "GNENBEIEIECLRCPMLHOL", "GEQBQGQKQKBROGPBPJEGQ", "BJHDQNJHDNJAKIJPGEOBJ", "KHNLBFNFBJBMLPNDAEOL", "OBKOHQOHBOKDOFRLCROIA", "QGOGPDBGDIQKGQHNININ", "AIJNPFQJGEMHEKNKOKRB", "AKINGQGQEAKRJHERGLOCL", "QFQNBFBDQJIPLOAPOGQJB", "HPKMHBPBKRBLCKINBOBML", "EAMELRLQBDHEKINCKAEKI", "OEPKBQBPHEODHAJHROKAE", "EQHQHPERKOKCPLGDIQDOC", "CKQKQGEAKAKOANJPHLND", "AHMRLQDNRAEMEOEKMEPKO", "FJOHKQIMBEQJNDNFHDB", "HEQOKBNEOBRICMBJNGME", "EPNHRHKHMEBFBPJFNCMHA", "BMBMBEOKNENDGNKARIQB", "HNEQKEAEHCEOGQMGDMJE", "AQNGKQKBQCKRCRGJQKCJ", "RHQHBEOBPKHDARHBLHJRJ", "EBJHQHQLFQDMFBQKIJIC", "RKRKEOEBPEBJANKQKOFNH", "MCHQDQGRJCEBKNQCQCK", "KGRAPCJAMJNHERBNKBKMH", "DOBJHOPCLNCQEAGEQINQ", "JBDBDBDQLBKGNFBJQAKFO", "BREPBMKHOBPAERDRMLCEA", "RBKOEQHBREPINJQIPCRAF", "EQKINIEGQAKPLRGOGJFI", "PHERKMEPNHECJRDBMJEBE", "DBINFOAKGMHMBHEBKQHQ", "NCQIEGECNKHDRMIADIPH", "ERKRBRERBKNGFMBLNHFGB", "QBPBKMHBKREALQNLCEMBQ", "HKPKEBMHOENLCFHFRMIF", "ENCQEBKHNKCPLQMLADPGJ", "BQHEBKEMHOJRLMGKOKHF", "FGKQBRDREGECECNBKCN", "EPENHBMBOHFCPKEGQHAD", "PHMKPBMBMHMCNFIJQJEHR", "KHOCGNDKOLPKRKPHEKRHE", "EBMKQENBRENFGNIRLIND", "MHKPBOHMEMHLPFBMGFQJA", "NLQHMFNJCMEOKBOQKNHE", "LHQLHBDNLHEIOLEIPGECE", "KNKEMBEMBOIMLRHAOGJHM", "JPDGOFANJNGEKQHNGNKN", "DOLNAHFPCDQHNEQELNLN", "POEBEPEPHPCFCRAJADBP", "GKNHPJAIMFCINGNEGKCEN", "GKBOGEJRDNHOBKBENBHO", "CDQCMFPCQGNKNKBKREPEQ", "EOEPHNHBREMIFIAODOID", "NHRHPHBEBPKCMFNKAQMAD", "DBJMAQBRDGNENBHDNFBND", "QNGKNIEHKQCPJNGRMDQCE", "QEQKHKPHBOHARNGFMFQLC", "IQEQNINCNENFPNKRJRHO", "NKHQHNKIAOIEOJENLOD", "EQHNEQJBJENIAFRBJHFIK", "CEHNCKEHNKQLPGOCEOIAQ", "CEHQNIENHKQJBDIKEPGFO", "KPHMKOEPBRKIPIBECPFAN", "DNBQNDHBNEQCFRKOERJIM", "EOEHOHEHMBNFMGPIANGL", "NBQKOKHPBEQDPKIRIAPC", "ENENIAEHAKQJODAQAKOLH", "EAKCKQHKGCKRLQBNAPBJ", "HEHEMENEHQMFAPNBKRHAL", "MEHKEOEHPEHDRBPLRIQHE", "QINHNKGQGKHDPIDNKDNKH", "EGQFLAPJMEHEHNAKQKN", "BMHBREREOKBLINFQIKBQM", "RBEBKOEHPMKDPOFPJIPLI", "QFBQBKFHLNKPEOFCJNKIF", "MERKOEMHPERGJHEQGBQC", "OBNBKMHMKHOGJPOGDOHMA", "EBPKRHRBKHMFQBEAEOKO", "RKMHBMKBNFCRGDILCOJ", "EAQINIQIEIKPHLDNECNK", "NEGQNAENGDCDRAERF", "JQHDBJQFHFAFQGLBOBRI", "KPHNEHQBRKOCDMBEQEIQM", "HBDHJNLQDQLCOIEQAFCKM", "NIPKPJARDQCQIQCKGENC", "NIQGKQGNANCJMFOKIQGPB", "EMKRENHBERINLRJRFQLO", "NHOHBPKBOKNFAKMFCRGL", "LNEHQNEBFQLALHRJHLOLI", "QBQAKGQAEBJICFQNCPCJ", "BRLGJPEAOBHDHLHDQFQB", "REOERHNHEOJPNBECJALE", "PCPDORAEPCQKPKPBMKBKB", "GPFNGOAILOHKOKHNHOEP", "PHEMERKMKNHCRLEQLBPF", "RFOJOAQJGKNBNHNFLQDB", "HEHNBPKOKQCNFNKBPFMG", "HKCKENCQANAFROJEHAOD", "EQHEIQIEGNKOGRDBPCQGF", "ENEIQCNAKCERJBJPJRNAL", "QHNBEGNKNKCDIQEQJAMAR", "ANEOFKHLPANHNKBPBRKMB", "KQBOBPKOKMKICRGAENLRI", "NENEGKENAEGJIAOLCJDIM", "BJNDBLNBNHKOFQGPOIQH", "HFQBNKNDBDCEIPKNKDAMK", "CFARERFMIPELBLBHFBHK", "OILHQGPBJNAECHEBEQC", "RBEQHMEBOHRGJGQJADBPI", "BOBEBRMKBMKDOINDRBEGP", "DHKAMDIJBMBNHDBJQDHDH", "CNCQECEAQGKFPGLHMECDM", "BPERNKMKBKPDRBFMIRAQF", "QHKQDBDBLNFOHEIFNJGMB", "GFQLNKAGOJHOHKNEMKHOK", "KEGQECKEAEBMGLIKPIMC", "KRBREQBOKHNFMDQNECJAN", "EMEOHMKMBNGBEAPIDQOIF", "NQAPJPHJNPBQLNDQEQBF", "IQHQKIEIECKPJBMHPLMEC", "QFHOLIDAPKBENFNHJBLN", "MEOBNEPEBQHDANGDOGBFR", "OERNKBMBMEOGFGPJHAJIN", "KPBPKPMBNLGAOJIAKME", "QHFHEHNEBNERALDRDNID", "BNJNHFNCPBPHPBQBKM", "HDQJNEHNHEIKOLEGKCFA", "PIMKGQAFCOHNEBHNPKMK", "GEQBEMQLIMHOKQBEPHO", "PKEHNBMHKRHLPFGRANBLH", "GQBNCKAQENEOIKRILFHAK", "MKMEPBQEBKBFAQMDGQGJB", "RAPIJNEHOCKCHNKIEAQE", "FKRIJMBJCDBNQBNEJHLN", "EQFBLEBQBFBOJFAJIPMJF", "GDOLREILCQBRHMHKREBE", "MKBKBEMEBNBLIKMBLDBPM", "OBKQHPHBNEHCERIFPBQND", "ENEBEMENKBRJMAJIKODHE", "HPBKERBKPBFGALMGJQDPI", "MIPBEPDKCEOHKMKPHMHP", "FHJHNBQJNFHCPKOJAQMCF", "BKNKPKRBRNKANFPGRLMDP", "RKOEHOHQEBEIQMJCRKN", "QKRKBPEBKHMFPEHRGPGO", "BOPCKBOFNJOBKBKRHPEHQ", "HEHMBPBOBOCRCNALGENF", "QGEHAEGKEQNFRNIPBMAQD", "JCKQKPLCKGEHNEBNDQEHJ", "EBPKBKOHKPNFMGBFBMENA", "CQIEIQCEQEBMGKRCJHCFA", "EHNBENDNBQLIMEPBQCFGD", "CJMBKPGPDKNEAKHKQB", "EINCEGKIQGNDIAPDPNKP", "PBKPBOKHQBRCLBQMBPDAP", "LNBDQHQHDIAJBMFPECND", "BLQIOANBOLHFBHQLHEQH", "ILMFKCPFHDNKIKCENHKBK", "QBLHRAKMAGDNQDNEBHLBQ", "NKBMBOEHBPHJALPIOKPAM", "NLBNDBNHQNLAOFBKAEOJI", "KEAKAECEAQGRILCMBLQMA", "AGJCRCDMGMJBDQDBNHEHE", "ANIQCNKCKIEPLCLNFAMJA", "PKEHEBREADBLCKPOFIM", "NKQGKANBQKHJPKHMGFQMD", "NJDHNHNBJHNAMEGPNFQGB", "LQANAMPDRDAEKAQECE", "EHMKPOBOERADGQDNLOLO", "NANEBQBQEQOFRGJHBKOC", "OEOIFGOQFKOBHOBPKBRH", "MEMKOKNHENAKEMDHDMDI", "HREHNBPMHKNLIBLPMBEMG", "OKHKNKOKHRNCEMCFQGPDO", "HQEPEOKOBKRJIFRKFADQH", "EHOEBPEMKHRLQIMDRALOC", "JBEQFBFBEHFIBMAKRJDAE", "RHOHOEOEHBMIRHRJBDPJC", "BEHREPNHPHODQFIQAOB", "OBMEPKHEBNBLPKOILOCLM", "KHNLBNFNJNDMJDIQEGJIC", "LQDBDQENENFMHALILPDND", "KRHQEHERHPBDGRLDRMANK", "EQAQNINHAQALIPCQKFCME", "NEPKPERBRBLPEMFANENG", "BMARIOPDNKNQCEBEINB", "KQHRKEBOHOJEIRNAOENJN", "OHPHPEMKRHBFGLPLALGFG", "GNIECQBQBNKDAOBRKQDOL", "BQJNBNHDHQLPNFBRINAOJ", "IECNBKQEIEARCOJDHCQF", "QHKHBRNEMBFMHAMBMJEN", "EMBKQKPKBOKAKNADMILRA", "QEQHDQNHLNJRIECMCFBJE", "HPHRHQKNENHJCDNBFBMBP", "MBKMBMHQCFIRDQBKG", "MEQHOBEHNBRCDHPHPMAFQ", "PECJQDRCQDRHMBHOBRBEH", "PENEHKHRKQKGDPNEMHKCD", "RAKHPIPLMBQFNHDJBQJ", "CFJGMDLBRCKQBMBOHKREQ", "HQNLHNJQKHBMFCKNLAFO", "NKMEMHKHPBRAFQCOJPLR", "KNHQHKDNFQARGKPFPGFQJ", "OEQKERHEPHMCJPNBMLPAE", "JPGPDGLRDCENHPEKOEMHP", "IOPCMJOQJHKBHNRHRBRE", "HBRNEHKBMEOADIRFQNIO", "KCEQNAKINEMBRLIAFCFPF", "DAEAMFAGPIQEBPHMEKB", "PBENHEOEBMAOLGANKBRJ", "PKEBPBEBKNBFGPJBKNALN", "NHPBEQKRBKNAFQIMKPARD", "PNHMHBMEPKNADMLAFMHQN", "BNHDPIEGJAKNININAKQE", "BDBQLHEQNDCJRMJQIBJND", "FRLNGLNDARANCECQHEG", "BQKPENBKBRKFAKQCJPGEC", "DHENRCDLAQKNDQDHNEBF", "EHEBNBFQHDNGRMEIJCDPO", "DNLNLHQNFHQOFBQECMEGE", "BKNBEBMEOHMLRLCLGFOIP", "DNHLQFHKFBNGBLFBRICM", "MQIJPHKAIFHEOKMEPEBMB", "RHMHKMKEHQKIKGADALDMD", "OKNEMBKBPHRCKNIFMCFRO", "BREPKOKHKEPDBJNAOHBKD", "HPMKEMBEPKOCPNAJDODBO", "AQGNBNBKCKFRLGDGRMAR", "EHEPBRKROHKFQLRLMFMCK", "BLBEQBJHJBDCOADGRALM", "EBOKNKPHNEBLHPHKFGQDA", "NGBNCNEQHBPIFOGAPIL", "BLBEQNLHLNJGPJALMLHQH", "AHPBEMLGEQKNHPHOHQH", "QHMERBRKEHOLIFARDGNH", "KHNBFNLBLBQGLCRMIMFCM", "BOKMBKPBNEQIQMGFHPLGC", "KHNBDHKNDQDIQEAPFNLCK", "QKEGNAECQBODHOANIPI", "QEQBJBFQJQFIDGCOKQMJF", "ERKEHPHOBREIPOHJRDPCP", "BNHFNLNJQKMBMCNFMIKP", "HOEBEBOBPNEGQEMJQGFIC", "LGLHNAJRGNHOHOKQKHO", "CQLOFHPECRBJQDNBNHDJQ", "NEHQKHEBJFOBOHDGMKD", "GOEOADKMJCLBNKNFQLBL", "HRKBREHPMHOFCRGNLQLM", "QKEINCEGCNAJOIRDIBOAM", "NENHOEHOKNBLHOLGKMBPB", "CQBORAGJGPKNBHLNHQLND", "NLQJNJHJHFQOHLCLIBOLD", "OKAMINDLCOHOHPKHREKH", "AQFHFPLAMBEBFNHQBKQD", "EPBEBNENKCOKHCJNDR", "CNEQCNHNKECFRKALHRMID", "EAQHQEAQNAKPMDCOANLQ", "FPDJMELAEMQBEKMKOQK", "NCEAQEININIPOCNDGLBKN", "MCPHLOHOCLMBKRHQHKQEQ", "BQENEOBOENIFBNLGDOEHP", "QEGPDCGJMGMRKRKBOHENH", "RBRKBMHQKBEIDHQKNGRMC", "RBKPBKNBKEPJILDPLILCO", "FQDNGMAOBRHFKNJBQHNFH", "BQKMBRBRKPHJBERILRAL", "RLBRGOQAMDLNQFBNJNDH", "RBRBNBKMBOAEPFRLIMJE", "HKBPNENHMKEGLHDAKPNBR", "QNEAKNIEHKIPKFHALDCPI", "AMFBJCJMADJNHQBDHDNB", "NKBMBENKQBKGNFICNJIOD", "FHDQHDHDQNJILMERIENI", "JMBELIPBRLCEQBGKINGNK", "FPHOJAPAHKBMHMKHOHO", "NBNKOKPHEBMLQOCFBNLBN", "HQGKHKQIQBKMGPFIQDICF", "GQBQAEGENENDRMLPJPHF", "KEPEBQHRKMAJAKRGLMEC", "KQOEMEBEQERGKECMDNGJ", "KQIQCEHQNGDBNAJFBMAR", "KIDBREMLNINEKBKPEQHR", "HQBQBLFQLBDGPFRCEMLQC", "HMKQMKOBOHRCLOIJDHPFQ", "DKMALIEJGRJHJQJHNHEBD", "HKCQKQCQCKHJRJGJCDQH", "KBQDQDHFBDPJAKFHPJMD", "EHKPBQEBQEBFROAOJOCJO", "BEREOKOEQKNDHMLDIERCP", "HQHBRHPHKRKIJEQJNCLCO", "NFQJBDQBLHERJECFCEGRJ", "OLOFHFCODGNEOKRKHMBHK", "BLBEAIRLOEOBHEOKBOE", "HQNEQJQFHNBRFCOIEBFPE", "KIFOGNRHOCEGKIEAGENE", "BPOEHMHKPKMCMHEGCFMHM", "KBKPHKQHPKEAQLPNFBLQG", "KANHFOLOAHEOHEKOKBQE", "AEHKCKCQEAQLMKPAJFBLN", "DNBLQEHNFBFCODMAJEC", "NRAGKILOANGNEHNQCEH", "NCEGKIEQEOGMLGDRMAM", "KOBMBPBQHKQDHBOCKDAPA", "IFAMJHOAFHQEOHPKHQEB", "CNGECKNHQEGJOJDHPEOC", "QEBREMEBOHRFCPKFPDMJ", "DREGFHQADCQEPEHEMKBME", "NBKQFHQHKQLAMKIDPLCRJ", "GECKHNAKAEADPCQBDGDC", "ALHFINFOFPKAKNBKAKCKG", "HEQJNEBNDBFMFPOHPJID", "KBMBQBENKMFQMGJNCOIF", "KEQIECKBQKGLPOAQAOCJ", "QEHQBNKEBFIOLRNJODIP", "BRKREHMBNHOLNGNCFCQO", "BKGRADARJOPKPBNEBEB", "EOEHOHKRKNGNLRGCODNEA", "GPKIECIPIJNBNFHEBHDN", "NBRHMBEBKPHFOAJHADOBP", "DMBQBPAIFIKQGKIEIQEH", "EAENBEANHKDHNGPOGER", "QKEGEHQIKQCDOEGLPFAFH", "EOEHERHKRNKIDCRMLDBP", "EIEQAQBNKNBPLANILPKPL", "QBPKOKOEMHKAEIFQAPALM", "EOKEHQERLCPAQIKFQB", "BKHKMHNEHERIEGKCLQGPE", "PERBKOKQHEPDOGJGMGPCJ", "NEHQBLBNKQKAQAKPFIQF", "EGNIEHQNIQBDOEBLGKBMK", "DQFHQBNLNFNCPLEOLEMFG", "RBRBKBQOHEOIPFMGRCLFG", "MKHNHPBPEBOCRFQBQBRF", "BQEMHQBKMHNLOALGNHLB", "QDBFQBQENDRCMFGOEILE", "JQNJBQJNLDQGKRFMDIDNJ", "HOEMKBRKRFOLCPAKAK", "NEQEGNAEGQGRLHRDQJGAE", "NKBMHBEOBROCDHCQGKBKF", "BPKOHKBERNLQJGJNIMIC", "BQOKNKOKPBPCPOHFPCOCK", "QLHBDHNLHBNCOERIPOCJD", "HLNHFQLBFNEOHCNJCDCQ", "KBNHDHLBDCFRBLCRJM", "EHREPHPKEQHCMGRKADIBN", "PEHBRKHEQJCPCPJIANF", "MKBHMDQGRENDBHJBJHNE", "EQHEQBKECENLADBODPKMA", "BMEBQHRKOHMJBRCFGLRNC", "OAHNDRLIEOEANQANQEQGK", "ENBQHENKNCNJCMDBKGMDQ", "MHPEPBMEHOECPJIFPNALB", "QNBFBQJNHEHOHRGLAMIRH", "LMFIMBKCLPLQDNDBKBK", "ODPHMKNHDKBNANEIQKQB", "LQHDNFHBJEQCMGFBOBRCM", "CEIOLPDNCOHNKQFHDBQJH", "EHBDHNHBNKFCQFQMCKDIL", "HFBOEBJAQBIPEHNKOEBHM", "PDGLIMQLMIKNHEHFNLHN", "DIOFPFNADPJHKHNFBLHFB", "AEKGLMHPFCNQDNBQHFHLH", "OBEQBEMBPKRGQBDHAQKHN", "EMCPLOPIMKBGQIKGENQH", "BNEBNBDNHFHMJAFHJQKM", "AKRHDMLAKGQLQBDHEBJHF", "LQENLQJHNFCPNFGQJOC", "BKFHQJFQBFGQJPDIAJH", "PIDLIRIEQIOQBEKPBEBNE", "EPINJCRIJIEMKOQHERKOH", "HRKOKREPEMCNBLEOCRCDB", "QKHKHNBJBDHPCKQCOHAP", "HKRBPEPBQHKGDRARHLGQI", "KHOEHEQHEROJOFOILNGKQ", "NIKBKNIKBNKPDPBPMLGO", "QHKAQGKQKBLMFIFGKGOIA", "MBNGEKOFCRHPBHMERENE", "KOEBQEQOEBMJINEQCPEC", "MHKPHNBKMKHARKCMJDMHE", "KHEQBPKREHKCLQAOKAOBJ", "NKNJQJBEHNJGAPLHQEMFI", "QDHJQBQLBLILFNBPFOLO", "KHOERNKQOHBFRJCFHMEIK", "PEQOENHKBEMIFNANARAJB", "GEMJBGOLMDAENCKGEBECK", "GLIMGMFPLNKBEKBNIQKH", "HNFHBKHLHBLPCKERLFMBL", "EIMAKAFKIDBFBLBFHFQL", "NIKHKQCECQBLPKCKNGDRM", "BLBFQFHNHEQALRDAOHAM", "KMBNHKOEREMILAKMKQFPK", "BOEMKNBPEQKALICPNDPOE", "LPFOJGEHFBQKCENIQKB", "NEQKBJBEBFQMIOICFAQK", "RKNHBKOBKMDNHECEIODP", "EPNHPKERBEOGNBNLDIDN", "HOHPHNBKEBOJAOBPLEPBD", "KRJHPGQIMEOKMQBEMEO", "HQKPEHKEQOKIBDQDMIPLN", "KHFQEBDQLHNIDOBMJMJPE", "HQFNLQNENHLGOANCRIKDM", "LNPCMLHLPGDJQBEQDNQK", "ENHNCKIEQGCPCFGNKDIJN", "GFMFRCFJOLOKNKHOPHKRE", "JHBNDHLHLNBRAQLQILFIC", "JQFHFHJBFNFIKMCLREHOE", "QIQBJMFPFRKHEBREQBP", "DHQEQKDQNHECPNBJQKIRK", "EQEMKEMHCQDNEAOBJR", "ANDMCNQBMDMKMBPBNKOKR", "IFRGFMFNRLBJBQLQEHQJ", "NAKQKNEBEIEPCNEPGQOL", "QHNJNLQLBEOGRKEPFR", "EQJBKHJQFQKCLMAJMLPFM", "NBRKOHEMKMJQBQIOLMFPO", "EBQBJQBLHFGBMLRNBEIJI", "IOLNAFGLRGKBENPHQHKO", "IOIERDAGPJNKBKBPKMBKB", "RGODQLINIFHNRHEOEKNKR", "QEPKOEREHPJAPGMFNCKE", "QGPADLBOQCEPHMEMEBM", "MFBIOCILMKBQKAKBIQEI", "FQBMCEIRFHNHOBOBKRE", "CHJAIDMARBJNHDQHKNBJ", "PBROKMBEBKBJMGBMDBPCL", "QJQNHNDBLNKAPBJEIBKN", "MHNKHEBRBOARFGLDCOFIO", "EOBOKNBEMEPJRIKIALGCF", "REBREBERKRHFRFMLHBMIJ", "PKCFMCFQLOAKHEQBNANKA", "FHDHDNBLNKHAECPGAMHP", "QDBLNDQNHQFMLECLIODGD", "EGRGMJANCFNPBKMHKHK", "CHDLRDCHDBQAINCEKAKH", "KOEMEBEPHMBDRAKBPEOID", "ENEPNHKPBENALCODPMF", "FBDQNBFQFHFANKOFNDGQ", "BOHOEBPBOKNIJGENIFOEM", "NRHLBPJAMBQDBEHJQJBH", "KBKOBNKQBOCRHDQMDGFH", "HQNCNKHQKCKMEGCJIKGDB", "QLPEPDAKMQEBHLBHLBJQ", "AFNPEAIDCEKQKCNQKCK", "BDALIRDOGREHKQIECEHNI", "HOEBOKBRHBQFHLPGBPEAM", "JBFQEHNJQFQAFCPDNEMCQ", "HPEMKQBEOERGAMLIDPJFN", "NFGJHMIEMGOEKBNEOEHNB", "RBEHOKBNBMBJEMGJFNIL", "ANCNHKNGKCKRHPCQADRL", "BLNHFQEQHFCKFOJNJNGD", "NAOAOGDLCJBKHKOEKOKR", "PNHREMKMEMLALGFBRBOG", "GLGOCDOLIJBKQEHPEMEOE", "KBKRKOEQEBEGJERNEIJIB", "MBMHKQHRFIJIOAOAQB", "GQINEAQCNIBPLHMHPNILM", "QHKANKBKCKIRLNAJGAPF", "AKCEANEQCKNDMJDHBJIN", "BMBENEPKRKMJGJQLQFGEO", "LQDHDNFQFHLOEIRLCJRGJ", "HNJQHJNJBQFIECLEMDGN", "HBEOKHKBPBPIJFPLIKAMA", "QBQKQNLBLEPEGOCFRKD", "KIKGKBKNANKPJQKGMDOLQ", "NENEBKGKEQIDQFPIJHCL", "BPECENEREBFQEQBEBLB", "KBEHMKPEHPHAKEMDINFGQ", "ENBQEQBJHEOEAPFRKCLI", "AQHNEGEGNBRKGJPFOBFB", "LNHNEQDQJNDIEPOJGQBRF", "HNJQLQJBKENGPNKNCJILD", "EHLNDNHFHQLOJIEHCJPMC", "NHNDNFQJBLDOKGPLBMAPF", "FAOPCPAFQINFNHFNHDBHD", "ERKENBOHBKHCJQHPGJROC", "EIRCGLARFGEOPHMEQEKH", "BMHEQOKMBEHCMAQDBEIFC", "KBKPBQHKOHOFMLRECFNKF", "HNBPEBKBPHBFPGBJRMHFB", "PNBOKOKEBKNIMBQFNHADP", "KMEHLBGDOINKAKHQEQIN", "KREHQBMBKNHDBMIECPNJN", "KREOKHMKBKNALNEGFNIDC", "EPKEQKMHNBOGOCFALEPNA", "CDRAHMBKNDCEAEINEQBQI", "HOEHKOKNEBQJMGMKAPOF", "KQNHKFNBFBQOJDGERKQOC", "KNHOBPBEOENLMGCDRIKOH", "PHKMKMBEBOKAFMGEOGFQB", "OHQBNERBEHNAPFRJEOEMH", "OHQBRBNKOBNJFGRERLIDI", "NKNBNBFQKNGNAMJBKHBF", "IMELAFLQIJPENHMQEBNK", "DIFMCEJNRGDLQBNLHKBLQ", "MKBMBMKOEQKDRCRMBFMDC", "CKIKQNGNKIMEAJDQAKCN", "HKBMEOKQEBPINKFGNJPMH", "NRIMAOFJOGLBHEBOEREQE", "KOERKMHKRBNIRAJDBDB", "HPMBMEREHRHFCLFGDPIBO", "ENJBJNFQHLPJCMILQNCLF", "HBMERKHEHRARKDHKMAEOE", "NBKRNBEHEBOIJQGDOKCJA", "QEIPAQLBDGKBDKNDNQBFN", "GAQEGKEIEIEOCLFGEODNC", "ENHFNJBNJHBOIEAPJCDME", "EQKPBRHRNCODRAFPGJF", "GJNLGFLRAOKBINIQKNQA", "CFPDMPJGDJBNKCEKQGEKB", "IJCFIRFOJBPBQHKRKQE", "CKNGNKAEGNDIBPICFOIBD", "JNLBQNFHFBQMAFHNJDICD", "LQHQENBDNHLMAEQJGFPNA", "GKQKGQANHKCDGLBNGPLIB", "CQBECKNHEAQOHFQNFHCQ", "NLHFBQLHDQKARNKFHPEA", "NGOAMPGDMENAQBGKAQK", "OBNHBMKHRFADPIAOJQB", "BRNEHBOKEMBFILPKCJIOD", "KNHCQKINCKCOJGBRGLMKI", "HEBKENEPBNBJMAKIDRM", "ODIPLGDGPBKQCQAEKHQG", "MHNGKMKQADKRBKMBOHOK", "FHJNDHDBDBDGJOCFAOEOC", "EQHMBEBKRKPLQIDGRIOD", "EBDMRGJAQAQLBDQJBEBNF", "PJNRJCHPGOQHDHJBHQBFN", "HJBDHJBNHQBPFINIKHRLG", "BPBOKPBOEQBLIQERBNGFO", "JNAEMDREOILBNBJHDQFQK", "QJQNLQBJNBJAOEGDRLOKO", "NHKQDNDHLFPOFHMGCMHC", "KMKPBKHNHKFPAQODBNLCM", "KPHOKBKEMHQLCDRNKPLO", "NLBQHNJHBNFOCENIPGBFG", "KEBPBRHMENCMHKOJCFRF", "KHLEBEHNFIRBQLMAJMD", "FAFAELGDGQKNBRBHMBHE", "QOHEREQKHKFICDGKPMLB", "HNJBJDHBDHBPGOFIPKGPF", "HPEHNHBEMKOGDQIEIPHJF", "NCQEHCQNEIKPHJPKICDM", "REBPKOHQHKNCQNGPCQ", "GQIKEGNEIKNDGMHBMKDAR", "NHOEQHMKMKMFBPECNBPDN", "RERNBEMEOKOFMJRIQMJND", "NDQHFHFNJNBMKNGPARAFO", "CNEGQKGKHEHRJHRGLHALD", "HMKHNKRKRBNFQCMLEIKDA", "KNHFBFHFQDPJDGKMIBN", "LHQKHLEQHBFALBMJPJGKP", "RELBGJPCEODNKHLNDBHNH", "BKOKEBRBNKMDCPCRHDIDP", "QBENKNEAENCLQGCJMGRHO", "HQJHQHKNLNDGJALMGEROD", "RKPOKHNBEIJGPALEGO", "CKNAEQCQCQJGCJNIMGC", "KBENKMHKOHPAFRGDPKAME", "DOIJNBRIEBLHQKHDBJH", "JNKNBKBDNDQCMLPLQGKHD", "BNAENEGKCQAPGDADPLNGP", "NBNKFQBDBERCKMHMAQF", "LRHDANLPGMQHRHREKBKN", "MEHEPNBOEPIJOGREGNLHN", "QHEBJQBQLQHOALHRGJMEI", "QKHQBJNFBLDIJPAKPNBOE", "BMEQBKHEQEMAOHJPOJGLD", "OKPHMKHNEHNGEBFQEPDOD", "KQDHOFCMEPHJHLHEHNLNB", "EQHOBEBROKMIQEQJAKRKH", "QGDOIPJAEAEQEHPEKHKMB", "MHKBKOHKPIKFOBMJBKA", "HFQBQBENJQJMGCPNLNALQ", "QBPHEPEROEHDGCMHJEGDO", "ENCHREPJGDPBEHNEMKPKQ", "QNFNHQEBFNKGMBMCDNJN", "HBKRKOEBQEHLOGDGOEMCJ", "EPKBRHRBOHQCLIMCEBFIC", "KGEQGKHQBNCRFIPFCFBPI", "EMEBREHKBENFOIDBPDBMF", "ERCHEAFLAOENEPHEHRER", "BDHBJQBNDQJGDARIOCKML", "QLEHLQHBFHQMBFCJMEIMC", "HKNGKIENHNBDIPBOFPDIQ", "JEHNDQBQHLNIJRBPCQBJ", "BQGNFGLMRKGQCEHNKINE", "HQBDNHLQBQNGKRKEAOLGR", "BEHKQCEAKANDIJCMICROB", "DBMLIOQDJCEOHRBMBEMKQ", "NEHNHNKNBEGDQHEGOLOBF", "PKRBRKOHBMEGFPIAQOFHN", "QNDQKBKFNBLGPFCMERARA", "QNHFHEBDQJHCDAQLGODRM"
                    ],
                    [ // 7
                        "HEGQCQHECQBFGJBQCOFO", "DINLOBQEMGEBHLHJHNDQH", "BQHMBKOKBOKFGMJCFBOHK", "KHEOBPHBPKNGFCKGOHBJG", "GRKOJBMHDQEQEGEBEQAE", "LQEMECGOLMBOBOEMKPEN", "NEQNGQCQAQBJGMEGBENFO", "BQENLBLNEHEICJRDPCP", "LNCREJCDIFNEMEKRKHMHN", "KBKPBMEHNEBFILPCOFRIA", "NBKEOERHOBKAQJEGQLHEN", "DNDHNDQNFQJIDQJICOIRH", "REBPEHEMKNKFAOGEOLPA", "EBRHBPKQHOARKCMJRIBDM", "KOEHNEHBOHOLDGMDHQIFI", "RKPHENBOERLIJNGAFRIJ", "GQCENBENAQHJIEMIJAFNE", "HEBJNFBJBNFMBMBQAPFM", "LQEAEJAIFMQHRBPHRKOH", "BKBKQGKANAPDBNGAFM", "OKPERHMBPBRDBRJCQNGJ", "LNFBJPDIJAOHKBMKMKHPE", "MBPBKHPBPHKCFNIPDOLNC", "BKMBFGMDARDHQFLNDHKNQ", "EHNDHBEQDBQIREMFAPJAP", "RAPDNBIOLAELNFHKBQHNB", "DHLNDQHNFBKRAEOKNJIRN", "QBKBNDBLBDIQJNFOGBJE", "LBLBQEHKBQKRGBOCPMGJG", "KHBQENFBJFOJQEIFBRCOE", "PHKEPHEPNEHFIQKOIQB", "RBKQBKMHMEOIDCRCJGQDH", "MLINAPCHLQEGKAIENECN", "BKBRAOBFRAQHLHNJHQFHK", "AKHRGJRDBRIEKINEQEIK", "CPCRJIMJRIQDNQHELHEHQ", "PHREHKNBOBMIPJDIBQIMD", "ALIFAOBLRAMHEHOEPBPHE", "FPAMGKMEJPFNBKHQJHLQJ", "KAQGQNIEQILNGLGLGPEI", "BKFQHQHFBNFIBPDCPHFCM", "NEBPHBKPBQMLBPLEAEBDM", "IEIKGNEIQKBOCPLGDNLOK", "GKQCQNCQBQLMDPDOFOID", "KODIQKNLGRFQKHQFBQFNH", "KRFNLNARHJNCKBNECEI", "NHKFNBFNBKHRIPLHARARA", "GENIQGKCQBNFCPGLEPAE", "BPHPHMBROEBDALHLOFBRA", "HOKEHPMHKPGJAOILAJEN", "BFGENJIFMHENBKGEKQCN", "QEBNAQKQNHDBRODGJCN", "EPJGEOPDOAMKOHEOENPHO", "IKCNINGKEBQFPGRCNFOGD", "BNGMJCHPLHKPBHMBHKPE", "NJNJHQHJFNFOGRLMCJNJP", "ANGMFAJOLQJBMEBNHMHQK", "HQHKHNKQOCRDGJEOEOIB", "PKPILQJCLBOENBMEHPHO", "LNFHRDAKGMBFHJQJBJQFH", "AOGOFJAREJBHDHNFNBH", "NEGQCNHEQGQOJOFMARDNK", "GDBRIRCFAQENCNGQBQC", "BEHQDNDQEBNAKIFNGOLEM", "BERERENBOCDBOCDGCJN", "MENHQMHEMKHDGKIMLDNCO", "QFNFQEHQBNKOJGQNLMKR", "BERKHEQKRHOCRHFGJHA", "NBPHKHBMBMKGEALOADOJN", "AEIQAEAQAQHJRHDCDRNEA", "AIELRDBJOJGEQINBNEQKQ", "QGANKHNAKOBLIADCJNC", "BERHEQOHOEQJIFNDAPGKB", "NFNHRCLGEPEKNQLQLHLHK", "KEOEHKBEQBPGDIMKRHJGF", "BKMHNHKMBPDCKDQHPALRF", "CDQLCPDADQGKNHEHKQGE", "EPEREMKMBLIKILANENJM", "QHPMEHOBKBNFAPJIAOLCM", "GNBECENEQECPBOHFANLEB", "BIELBMLADCEQGNCNQKI", "QGQEBNCECQLCNJCMBPEA", "JRCFIMPELGJQGEBIKQCEN", "HNKBFNEHEHQICOIFCEHRL", "DBLBGPEKMHQCNGNANEA", "HOFILPEMGKRKHREBKREO", "BKOHBPBQHKDQIERLDHCME", "OQHJNRINGFKAHNQANGQKA", "KQNFHLFQFHEPCJCECDICJ", "DRDCHFOGJMQEKGKCQGECQ", "EOEREMBKRHNGEICDIRFQF", "MQDIMKHQJIKBPKBOEKORH", "NHPBPBOBEMKDPOAOANJIB", "KEQKOHPBMBNIJDMCRHQKP", "KRHEHBMEMENFHPAEGFMAJ", "QNJHBQKNFNHPIKFRHCNFH", "NKRCMHFJOCOBREOBRHKBK", "NDBJHBJBJBJIJAPBEPLA", "NHBEMHPNHEMLFILOCLDOE", "QBEQBOHBMHRAOGQLEHPA", "BPHKPEOKOKMDHQCMGLNJR", "ODJCKMJAGLQHFBNQKNL", "NFQJHKQHLHJRGLCDNHRID", "PFGMRBELCDCECENQBNAHQ", "BMHKPEBEPHPAPKQLADCRK", "KHQKMKOEQBMDPOJRIKPCD", "QLNEBNHQKFHADQHAFMAFG", "EBLQKHNBQFIKOFGLPKPK", "PBRHBPEHRBFAEGFAOIOJ", "HLQNBNKDQKFGEGJAODRG", "QHKNLQNBQFMKPCRBDRIL", "ERBEREHPKERDIEBRCOBMJ", "EBENEOBKMBOJECQCLGADP", "EQOKEOBKMEQJQJNAKIDBQ", "LEBDQNDNHQKCKPIFBDRDN", "PMHPEQHKPBOJIFRHQAOCM", "QEHKPBPHMBMAPGJOFALEO", "HNKCQIEAECKMBDBMALOF", "INKCQAKNHNCOFIFHLMHN", "GDLAFPFBQFKOBPENBKBN", "ENKBEPKBPHMFGCJGBFHMB", "GMKCNFGDHLOEBRBRKNE", "ORIDKGMDANHMKOEKNBPK", "QOKMKHQBOHPAFNIDAKAEM", "ECNKCNKQANCDPIQFHOCNF", "REBNEMEPEBNFIJCQJRHAF", "QKNJBQNDNHFAPGFRFMCFB", "OHRKEHOKMBRLNHEAOGRGF", "KIKEAEQIKHQDCOLHKIQDP", "NHKQKBKNANKFCJQIMAEPJ", "CMHMJNCGOKNEKIEHQGEQ", "MHKHRHMHMBLGBPCPCKCO", "MHPKRBNKHRCKNGMJIFOA", "KQLEBFNFQEBRINCJBOBQ", "QNFNKQBDNJRAMDBLFNCO", "ANBGJRDOFAHNHNKBDKBQK", "ERHOBKMBQEBDHOAFQGQGN", "QKRBKEOKEMBLRDAMGRARD", "JAHQJGECMAQLNKNBFNLBN", "QEQHNIBKQGNJQJAOBKR", "AKQHRDIELIMHKOBQHOKBK", "LQBDNEHFNLNGOAROLODGB", "INIKANAEAKAMLMGRLNGQG", "HJQFHLNHLFHOIQDPEROJ", "EPEINDCRBLBEAKCKNGENB", "JHEIRDNCLMKNPENEHRBR", "BOBRHBRBEHCFCFOGLCMH", "HKNEREOEBMCPFQJPICRHM", "HEHDHBNHFQDIPJIRKEPIC", "RBOBRERBPNKDRDRGFCECL", "HQFHEBQFNHFCFIPJFQBPB", "BDQDHDBDNKBRLCKOGFIPF", "QNEQDHJQNHDIKMDQAPEQF", "EQFQDBLHQEGQEODPLIDCE", "HMKEPBQHKMADMHCFIROGD", "BJHQDBJHQFBRDOLQCREGK", "LNFQLHKFQDGFRIMJICOFQ", "RKQKRKERKEOGMHFHKAEOF", "QEBJHNHQNJAQNFHJPGEOH", "EQEBRKROEOCPLFOILQOE", "CNBKEAEQCKEPLPKHROGBE", "CORIJBOCGJAGEANEHEIE", "RKOHKOEMDQLHRDGCMDN", "KBRBPHNKQEHALPNAKMKRO", "NGQNHEAQBNLFIMCJDGOB", "LBDHFBDQLNKALNDIFOCRM", "HOCLQIEMBDREPBPKQBHEM", "QBEMKPEBKOFBNALIFBFM", "NBJNKQLBQBKIKDOJGBKE", "NBMHKHEMHCQDNJGAQMH", "QHAEHKNECKGRKCPHJDMH", "HDGJHFBOLQHMBPKBOBMH", "GNKCQNKEHEIFMKQEQGOC", "CNIFQAEOCPBEQEHQANCQB", "EHMBOHRKPNHDCDQFAJDOB", "KNKQBERKPHNLFPAPANIDA", "KQEQBDQLHQEODIALPGAKR", "FKCPLALIEPEBPEBNBNB", "JQBLBQNFQCFMCLREAOIJ", "RERHPKMHBNLHENGLNAMLM", "BNIPLRDQAMKMBQHMEKPE", "HKIECEQKAENDIJEAPDIJF", "QEBPKEHRBQKGOALFCPOF", "DHDNENKNFBECRKFCLGOJ", "EREREBNHEHKIQJNADMALP", "NJBQHBNDHNDRMFRHCOGJF", "CHJRAPKMPFHEBFQLHEN", "AQAQAOHLAHNHLHJNEQHD", "DANECLMDPIOKBMEBNHOR", "QKOBPEHKQBRLRFCNGJGOH", "CEINAECNGNEMIADGBQDC", "RFMEQILMADCNHEIQENAK", "BRHPKHNBMKPFARLODHCOB", "NBNKBEMBKOHDAMCLMKARE", "PEHQKBQERHCQGRJQLGLPF", "HQNJNLNDHDNCNIOEHLDBN", "JHJNHQBDQDODADREOIMEC", "QJNDHLQHEHJGDCOENJCPJ", "QDQEHBQEBJBMJAOCRIOHD", "COKCFGPLPANEMQBKRERHO", "BENEOBQENEMJCEOIDGERM", "HFHEHQKDHDNCJIJOIBRJO", "EQBEOHKMBQJGMDQIPCDGO", "QHRHMEHMERDRINBRGQBM", "QBMKEHRBRHMLEQIQOGLAK", "HEOCOHRBFOBOEBPERKRB", "OGRHKCDCGPDNDQDBQJBEN", "QFBQKQDNJBFCFBPFGEGDC", "QJGKREINJPHQJQHFBDJNJ", "EHEMHNHKHRLCNGMKGOBFM", "IQIQKCQKCNALGRFQMGQG", "NEBDBFQDQNDPEQFNCPDG", "BRKBMKBOBQOIEQILFIQO", "ORFMJHOLAHDNBHLBNELQ", "MEPHBOHPHBRCOGCDRLHRE", "NHBERBMKHEMFCOLNKHEMF", "AEBKEBNKIERLCDQJPLID", "BEOKRBNHEHKGNCRHPJPAO", "HMEQBRBPEODAPDGLGFPEA", "OHBKNHOBKQNFBLILDGPIC", "COQDKMGDCMBENLBNDBJBD", "MCQARFLANDAQHKBPEPEKQ", "AQCIRFLPCDOBNRBKRENKB", "ENAQIKNAQGQOLAEQEILCR", "ANAEHNCQKNBOJAPIFHNEB", "QJNLBKNFQNBMIQAMGDPHA", "EBEOKHREPKFOAQLQKDQAP", "EOHBMKRHKEPIFBLIOAEBN", "HQNGKINEQEADCNIMDOLPO", "ANAQNGKBKCKFCNBPIEMF", "BKEPNHOKNBOAKDNHRALEM", "RBPBERKEHEOFNICROHFHN", "QEHMHMBOBKOGNCLFRNIJN", "DOJPAOIRANFHNHLBEBDH", "BKOHNDRGMEHEKNBINIQ", "HOBREHBQBMBFMBDGCLRKH", "HNHRHBMECFQHJAFMKB", "OBREBMEHMENGOFHQGFRAL", "FLRFGJPADNKNBINKGEAN", "QFRDGDOENCKQELBNJHNDN", "KBEIKEHKINIJHMDQCQLRF", "ALOFGPAFJPEQBJBHEQDQF", "NEQHLENFBLBOAQNLPAFI", "HQGBQEHCECPEILCRGBJRM", "NEHDBJNFQJHOGJBFAPGDP", "EBPEPBMENEMFMLHROGDAR", "NBPBEBMEMHNAQJMKHLRGL", "FBNJEBDBFHDRDGMAJNEBQ", "IQKEGEQENGQDIBLRBQOGA", "NHQGKQKNECKDIJMKDNCLR", "ERKROHRKMHECQMDNLGJAO", "AKQNAENEHKEPEAJDMAKC", "QBLQNDNBKBJMEIPMIRBRN", "CPENAOQGOBFQJHLQHJBF", "BLNHNHFNLQHOIFAJRKDRB", "KBEQDBQJQHDARMDGJGEPA", "PHKMKEBPEPLHCKRJHDIQ", "OPDOCJIOLCJHFBLNFHJNB", "ENCNKBEGENAMCMLDPKIM", "RHKMKEOKRBKCFHMLRKCMF", "HMBKBKBNBPAKQOJAPHQJO", "KQBOENKPBKAFOBOKPFOIE", "NKEIKCNHQNGMGLPDHDBFM", "BPHQBNKHMHAFBLQFAJRHJ", "MPIQKIDGMJHEPHQHOEKHR", "HPHOEMBPHBKFHKOLCOKME", "EMEHRBOENBQLIJMFOLCPD", "BOKNHOHKMBLBDQIEOLIQ", "OHEBPHQMERHFHJMDIRF", "FMAMQGKPELQAEGQBECKNI", "HBQEHNERKMBLAFMLREQJP", "BOBOEMEPHOFMFIOHJRIL", "JBKHQJBQNJBMCRJQADHQD", "QHOBRHPBEMAMFAKAMALR", "LHNBEQBLBQECFHMLGNIPC", "LNBKBDBNBECOBLFPKQJHB", "CECQGEAEQNAJNLRLANGPF", "OKBHRILMFIFNDKNHEJQHN", "PEMKPEPHNHMGCPLDRLHAL", "MHOKHKERKMEGEOHBFIJP", "OHBKQBMHKPBDBQOIFRLPC", "OHKHBEMEBRHDHJQIPAMLF", "KNCQNECEQGBOGRDGAMGPN", "NKMEOKBQBROICLNFPCOCO", "LBIDOFPJMAQAENKHQHQG", "OKGLPKMCQGEKHEMBQKBPB", "AQCNEBKIENCFARBJIMCPA", "ANGEAKIEGEARGMJPDCPL", "JAMPCLCDOPHFBKNJQDNKN", "BMKBMKREHNDRGALPBPME", "ERBERENKBODHCKIJAKE", "EQHQBDBLNDBRKBMGCFGNF", "NFNEHLHFBNDIPLMGPFQHN", "FPGNLQCNRKCGKNCQCQKN", "OEHEQKOHBRKAOCFHJIKCP", "KPERHMBKPHNAQLMBLGKDQ", "QNIEBQEGNECJGDPMGMIC", "IOHFLMGREPEHNHEHFQDKB", "BQNLNHBFBQFOAPBKCQDAJ", "KERHKPKNENBLNCOKFAOID", "BFBQNBQNDQLOFBJAJFIK", "NEQNLNFHLNLRLEOANLFG", "JQNBDBQNDQDPGQNDALOGQ", "PEQKBPKPKHPLOILRIOAQO", "MENEPFLIMDNHQINGQCNEQ", "DPIKHMJGOCERKOBMBPH", "BQBQKGKNAQCRJAEREMJAF", "BMEQKMKPKFAJHBDID", "HRKPHNKBKMFGJNIKBMGP", "HBRHOEHRNEAFHJMBNAQCL", "OBMBOEQEHNHFMAFQCJOEO", "REOHKEQEHOKINLDNGOJDM", "HERHKHOHNKEIBDPINGJPF", "DHLQJNBEHBEANFCJFOCRN", "QKNGNHENCJFRGDRFOEC", "MBNKOBEBKOECJNBDGCLCO", "DHNBFHNDQLMALHDIPHJDA", "OKPKBMKEHKOJCDGOKMFR", "HKNERBKRKHNDHPIOIKRIM", "CLQFKCLIRBDHEQEKHNDB", "MQGQJCGPJCKBMHRHMBEKN", "KENKNBRKHEOFAMKHFIAJN", "QLIOFCIJBPEQBFHDHLQEN", "OBROKHPHBRBDIRLPEAMIN", "KEMKPKBEHMCNGBJMLDOAN", "QCKNBQAQNEIJOFBLIOJDA", "EPEHPBRHEHEAQIFBDNGRE", "HQKEHOKBEBNGOGPMCQJN", "DHENHDHDBQLIPKCOLDCRO", "BRHBRBRKRBLHFIRMLFGLM", "PEMKREHEBREGCPKGRLOD", "QHFQJNLNFBQAPFGNJOJFG", "PEPKEOKNHKPADAOGNFAJG", "MBKENBMKMBNDAJIPDAKNB", "HECKCQBQEHCOBPIFNCKQF", "BKHRDAQJODNINEKINIENQ", "KAKBENKAQEGFRIMCLHFP", "KNBPEREHMBLMARLQGADC", "APKAJNFAGKBOHKBHNRBK", "KHQAKNCNAQCPCMKQLFIEH", "BKRBPHQBEPLDMAJBQBEO", "BEOEMHRKMBQCDMAOBDMIR", "LNDQHNLBNEQOJDAOEGDRL", "NDNJBQNKDHKPODIAFQJRJ", "QEGNAQGQNKALPMINBLCKH", "KHKPNHEMKBEAPGLCOCQMF", "AFHRGECHPJNHOERBEKMBR", "OADIMLIPGMBNHMRBKQB", "BNEQMENEHKRCJMLHPKFQF", "KHBRBQBOBOHCRMCFNJAPM", "QEPEPKOHQEHCPNJOGLOFO", "EQKOENBKEPKILCQLQGFP", "NBEGEBKQHANJPFALNHRBR", "KNAQHNEQIKNFCMGKFBJOB", "RBEHKQHPNHCFRJBEOAKN", "NBJBLPCPGJNBLHLNFBH", "PHBEBRKMENKIRJHJCJHDR", "KMEHNEHERBNCJDICDBFRO", "FBJQENDBNECEIDPDPLGO", "MENEBQOEMEIMCRJRIOBN", "BIEOIJAEMJBQKBQHJB", "ENHPBOKOEROCJGREOKIFN", "QEOEHKPKREPLAOLGJFNGL", "KHMKERHPENEGCRHDGCKCJ", "KNKNJHDNENIJRHKDRHNCR", "BNLHKFQLEBQCDMALIKDO", "HQGNBECEQMGJHFGCMGB", "KCPGEAHODPBFNBDHQDBEL", "NKAKGNIBQEBPKDQMIRFMA", "CQNEHAQGKGMGRDNGOFMLF", "PEMHPKPHKPHJRCFBLIBPB", "HQKHQLNBMIFPNBJNALC", "QEHMKNEBKBFGOHEAJFRKA", "KHRKERBRENAPHFOBMKRA", "HPEMKOKEPEMDCFCOGRDIO", "FPJBGJCEBIDNHQFHNHFQ", "HJCNAKCJODQBQFHDNELN", "DNDBDNHKHDHMAQLODCFIO", "QKMBQOBEHBPJMEIBRJQGE", "NBEBNKBMHKOGMIDHRLGKM", "EBKEQERNHKMFPIEALNBME", "JQDBNJBNDHMCLODPENBO", "OKRKPKRHRHKDNCKIMEBKF", "EPBNEOKHOLQGFGCQLOH", "KBKERBNBMEHJPLEHOJQIL", "OJCOGKOFBMLBLBHQDNBL", "KEIKNBEIKBNJPAFGNLOBD", "DAPLBEGQLAOKMREBERKHN", "HFNJBQBQLNKMJAJDHQIRF", "NBPEHEOBRBKAKIPOFGPJ", "QGLCDRKCEMQEMEHMENB", "DHMCLBNQAOKHOKPHOEHK", "LGRLOJMCDAEKIEHEANAK", "BPKOEHQBPKMFAOKHDNFOA", "BKQHPKPKEPGEMFPNCLIJD", "KQGKNGKNKGCJOHCDNFND", "PKHKBMHKMEPDAMLRDQHAP", "BKPMHOEOBEBDPANDGJINA", "BLQBDBQDNBRFGKCNIDIL", "HNERKHOENEADMJNKGEMC", "BRHKPHPHOIDALHENCRD", "DAGERCLBOANJNLQLHNLBQ", "DMRDIKHMCPDJHDBFQFBHD", "NHMHPHQBKHNFAQAPHDCL", "MEQKBPEOHPKIJMDIMFRCQ", "KOEBMBKHMBKAMKAJRGJCL", "HNLQNKFNKHNIJGPFAMHEM", "BNHLBQLBKNEAODILGEPBD", "EIRKPADJOPHQFNQLQKHF", "JOFKCPBIPHQKBLHNDHFQ", "HQGKGANIENBMLGRMKFGCK", "JQNHEQDHQJHAKFRJRAOD", "EBMHOBKEMEMLDOKDHAJIJ", "PBRBQKHREMHCNGFARIOLA", "EPHKQBKMEBPIOICJEIFCO", "LHNENDNLQHDICRCMEBLEN", "PEHNBPBMBMEIDGQEQCRKD", "BEHKPMHPEPAOEAJNCPLQ", "AEBFIRCHJRJQBQEHJNDHK", "QJQNDBQFNLIAMJANHPAM", "DHLNDQBQNDNCFGFPKOBDB", "LAJRFILOIEKQFNQBLQHF", "IQNKEAKQCQGPNHLIMDMGC", "OBOKBEQOBOKANFIALHKPI", "KBNBFHFHDNJAREGCOJCLD", "BPEPMHBOHRHCLCLBQARGL", "DCHOKHDHPANBNEMEMKPKH", "HMBRKQBRHOKIPDGBRGCRM", "HFRFRDIQCNBREPBEPBEM", "EOHMKHRKMEGBNLHFGEAQ", "EQBOEPBMHBNGJBPCKPNDA", "NKCKGBNBRICRLMFQID", "JQNFQHNDNHFODAPFPMKCD", "RBREOKPKMEMDILFANEPHE", "KHDHDQBFBLDOLGPMJICPD", "HRMHKOEBPBNGERICFCLIB", "KHMHBKPEOEPDGRKOKOALG", "HPHEBPKPMHBLCQIKDAJOI", "BPMEBEBRERECKAMFRALNE", "PBRENBEREHKIQLCKHJFG", "NEPHMBKHOEBDOLGQOKHNC", "PHBPHREOCJQCNLNGNA", "KHBMKQKERHEGMDCJAJRJO", "BLNJIODLMCNEMEBQEBMHR", "QBLEQDQBLEPJHQFGOJFAO", "KPEHEQEMEBOLBNGQJQEAE", "EHRHOHBKOEPLAFOIMIOBE", "NFNHNHFQBFNARJDMGKRDI", "EPBFMEHRAFCQGKANQBQCN", "NPLADGQLPBEGQGNIKQBK", "BPHBRBPEBOHCLMKFADMFI", "NHJCDRLIMHQEQKCQAKCK", "OANIODLAOJRHEOQEBEBME", "FBEBDQLQNHLPAEPEGOCFA", "HKHRHNBRKRHDMJQMAEIRC", "NKBQEGEAKNBJCKCRFIRMB", "KOBKPERBKNBFPHLNEGFOB", "JNJQNFBENFHAPIDAMLOC", "KHNEANIKCEGMIFRNDMGAF", "HMBQHMHRKEPLPAJPECMEH", "QHEOHBKMBRHDCNLEROJEH", "LNLAPLMHFCKGQBEAKGQE", "REPBPHBEQOKDIJIAENFM", "GFLMQAEBLHOEHMEOKNR", "MBNBMBERHODHOALPEGDHC", "QNGQNHKNBECFMIANEAFM", "QDHBNLHKDNCMCJBRLCMH", "BNCQNCKAKMFOLRGQLH", "KAKNEINANCEPIADOGJQGE", "KBKRKHREQEAFIEHFNGOG", "CKRJGFOEJAKRBEHEHQERH", "CQGNIEAKNCERCOGDBLQNC", "KHNKEGKCQKNJIFQFRJDHC", "KEPMKMBMEBOADGCEMJCFO", "LBNDBQNDNHFAFOGRLAKER", "OGJBMRARJBHRBOKBHPKO", "CNGQCNANENBJREQAOIQN", "HQLQJEHQFNEMLPNAFGALD", "BOLBEMIDQLCQECNKQKQCK", "KOHKOBOKQBKAMFNLMLOEM", "BEHMEBNEQBLPHPKIAEPDN", "HKEMBPBOBEPGLRKHQNLOD", "KIEGAQCNAKNJPCLNDREG", "HNHERBEPKRFHDGPMIADQ", "CPLOLRDPLIQBOHOKBNKB", "MPLNGLAHDBKIENINAKQI", "EBPBOBNHNEHDCRJGQDOGP", "KQFBFBDHJHQIQDRNHNLAO", "QKHBJBNEBQEIMALRNIMFR", "QKGNIKCEQGEOFPJQAEHR", "KHOEBMEBMKMGDHEAJICLN", "LHQLQBENLHKOAMFGLMLHR", "BEMKHBMBMEQILOKOKPHLO", "PGDJGMKCPGDNLBQHKNLHK", "HBREOBRKEREIBFQDAJICO", "FNLNHLBNBNJOCDGLQFHBP", "BEPKBPBKNKQIKBOBDRFPC", "QAFMGENRAOBMHPEHMPEP", "BFQLEBLHQFQIMJPFMHLMI", "QBKRHBRBPKOLNGJBDIQLE", "AODBFRLHLGRHKRBQHMBE", "OEMKPKBNEPKGECLHLMHFG", "MBPBOKPEOHNADMGBQHFN", "QHBMBRBKQBPDNJMBPCLND", "NKGMCFCPGEOKOHRHEREH", "KPHREPBMEBRLBDIOHBRAD", "HBPHRKBQOHLPEBDPGNEM", "ENBQENCQNBKPCNHMCLNGJ", "REMHPHQKHECDIJOALFPD", "FBQHQDNHEHOAJIJDOJN", "QLHQEHKHFRGCOHOJGF", "NIFMJBHMLAHMEQENKHEME", "PBENKPKEHKMDIAPKBRLDC", "MBQCLGDQHPECKIQCNAQEC", "EHQEMHBQEOGLADHJGOHM", "KPKQIJCFRDQLBNDHQK", "FJCIMLNFCJBKNFBHJHQ", "DQHQJBEHEQDPKMAENBNDC", "NHNANIQENEMKFQIPIMHFC", "BDHDHKNHNEBPIOFIJIAP", "KQOHKOHERMKDOGARMADMH", "LNJBNJHDNFNCLAPCLFCD", "JBENFHBQJBNGJIAFGFPB", "KMBEBKMBOHQGAJMHRLQGB", "KNDQJHKFQBOGNLFHOIAO", "KNKMBMHEOENDIFOLHOHBO", "NHOBEQHNBMCJCPOIJFOCL", "EMBKEBNBRKPFIODGLANDA", "HNBKPEQBEHPIJDOKMGQAQ", "OLBOIKMFCOHENEPBEBPE", "QBKBPEBRHBNAEOFPKMBRG", "IMQIDPLGFAMBHMENEQBPK", "DBDBQKBFQBDRJAMLAKPFC", "KMBKERNERBRLFALEPMKCJ", "NHKBEBQFQNKCDMJPKMFR", "EBKMBKRKNBEIKILHEMADN", "KEREHKHEBMAOLIDRGNDPC", "BKBDHDQEHFQODREIPLCKQ", "KQEBOEREBPBFNCMJPNANF", "QANBQEGQILIDRNGPCN", "NKPKBPEOBOJANFIPLOFQA", "LQHBKQBQDRJGDCLCFPC", "KHMHMEQHMIQLGDCRGLHB", "HKPKMBMKEOLCQEPDIJIB", "MHMRFPBLMIENKNKNCEBE", "QKHBOBKBNEMFQGCODHNIP", "MHPJPCMEPBQHDBQBDBEH", "MHOBEBMKEQODGCFIBJPLM", "QADGMCOJGNKOBRHEOENK", "MGRHFJNAODNAKNIQEIEKH", "PBPBOBKQKQEGCJRFPKGP", "RBKBOEPHKMKDHPIPJMGRL", "HKCNAKNAECNLHPCJQGMBL", "KEBKPHOEPKMJQAOGPIOEH", "HEHNBLNDHJHRGMDARGREB", "QHOERNKHKBRJDGOLDANHO", "LQLQBNKQKDHRKOHOIKCM", "BOKMEOHEHOGCDOLEPIDGN", "NLBIFLAPEJMPBRHEBKNBK", "BEBOHBKBRENAQKAJMFARO", "OEBPEMKQHKNAOBDQCLGFG", "PHBPHNKOHKNFQNEGMJDPN", "INHENEBNCNADPGMICJRGJ", "JNHDBQJQKQDADQEPHPILO", "JANFIJBNCMQHKHDQLQJQE", "KAENECQBKIQFRHOGAJIR", "QJQJNBFNHKQIKFAROEIOD", "QLBQFBFHNBKGDQOJRGDHE", "QHEBPEPEBPLQJOGJCDPGN", "DLGRKQLODBKMEQKMHERB", "JHEQLHFBJNBMCPLPLNJOB", "REBPKBKQBEMDGLGMCNHLE", "BRBKQHOEHNHADNKRNCJDO", "RHQEMBKEOEINJPHOALIJ", "NBNKQNGQGKRCOHDAKNLA", "NBMKOBEOHKCJINFRLCEO", "NANFLCJNDQKPEKMBMKBE", "QFQBDQBJBJNIRLBOGJCEO", "QEHRHKNKRBKIKMFARBMB", "QBDQKBDBNFHPCLOFPLOKP", "HDHKQJHNDNDCNBROHALEO", "BNKQMEHBPBNIMKQAPODM", "QOKPEOKPBEHCQLOGOFNFR", "ENEHEBOHRKMCKGOHNJGQ", "OBERKHNHEPKGRLEIDHPKO", "NLNFNDBLNBQOIRFAOLINB", "AEINIKIKANIPLGDCPEHBO", "QHJBFBQBENJPJAMJQMLRD", "KHPKEMKNKHRCLCFPIMHAJ", "RHEHPERNEOBLFIOFRMCQD", "NHJQLQKHQEHMIOFAOAEGB", "ENFNBNJBDQHRNGEOFOCML", "KNKHKHOBPEQGDCDIDCQKC", "CECENBQGNKCDOJQIAJOA", "MKHEQBRKQERIFAFIJDGMC", "BQBOHBPBKMILAFRLAJMBQ", "REHQEOBKRHPAFGMKFGEGA", "RAKGODCRKGLQHFHDHJHND", "QAQKIQCECEBLBPKAODGNA", "HDHNHFNJQNFCFPMEALMGC", "QHOBKBERBMFGRGPJPEPG", "HPILHNLRIEBEBRHQBMBO", "KNIQLOGQLRINGECKGKQIN", "HEPHOKOKNBMJNGLBOEPIO", "NKPENEHKERECJDIEHCNIO", "NBQHEHEREBRCKEQFPOGFC", "NDNQHDPBIQBJBFNKHQHJ", "HBKMKEOBPNLRMKADMHLIQ", "PENEHOEOKHQDGNDCKBNDN", "JQDNJQNHFQKIFPFBKCPCK", "IMGJBHRJIQEHFQJNLQBK", "KEHRNKMEHKRCFPGQLHMHD", "JBNKBQLFBNHARGFNLQIK", "AHLOAFQIFOENBPKHRBEN", "GKANHNAKAKCRMFQGMJBFQ", "CEBLBLRDJGEKHQKHEBOEO", "NHPNBNHKMEHADPERAQGDH", "FNLBNBDBNKDCMLNAQAFRH", "BPHNKRERENKDGCMEQHDMB", "AHDPLIFJHMANEQCNBIQEK", "KNEBQMKHBOKDQDCOCKGNB", "HKBNIKENCEPAFRMCOIO", "JBEHQDHBJBLCPMGDPARNB", "NBNHKHENFNFODQBQCFMJC", "HBQBFHJNKENANGKPJERB", "GPLODMAMHOLBFQBNDHJQF", "NJHBEQLBKBQIRMARFIRLI", "CEJRIMLQDMQKHKAHNINQE", "NEIQHQKEGNEPJDPKNIOB", "DAERGRCOFNBNEBEBKNKO", "QHBKBPKROBFPAQBOKFOD", "PDHMQIDAJPBNIEGNEKAEK", "KNBJHNLNFHQOLIMJMCMJE", "KHRBMKPEHMECDPNGFBPGB", "NIRKBJCPDJNKNRHERKMEB", "HNPELIDGPLQBQCEQINCQK", "PHRHPHKMKNBFMLGEBPGLC", "PHQKHQBNKOIQHRAFRLMHC", "HJEBFQFHBKCQGDQIOKFCE", "AGLBGDLGMDNRBEHEPKRBM", "NEBNEREREHNALDIEPFRHC", "LHKCOJBNLCNQIKGEQGQC", "ENANHQGBKQNFPGFGDOKGD", "MFAENLBDMANKMRKOBHMK", "HKBEQHOBEQFGDPBJRCEQM", "BEGQIQEQEIBOGLNCDIFPG", "OHPKOEBPERNIQCJNFIAD", "FHQKFQLNHPHOJQGBJAJ", "GBEANIQBECEPMJCFQNGMA", "PKBMIOFLOANBORKRBKBN", "HENHQNLQFQNCPEOCLQKAF", "FQCOKCOIFCQBPEPKRHOEO", "KHREOKPKOKOLGPNAKFPNH", "DOGKCJCOLCEKOKBKMPKHO", "BRHNKOEMHMGOLAFINJEN", "NEPEBPHKBEBDIPKPCNILR", "GFOLCPDMFHRHQBHKOEOB", "QEBDQHDHNJCJGOGNKDGJ", "MEHOEPKRBENICDMJNAJEN", "HQHAKENAKHCFQGDPMLNK", "RANDLMBIEANBMBQBEHOHO", "REMHEMENHEBDAMJPDIPNH", "EREOKNBPBPKAKDCKRGBQO", "NEBKMHMKPHMGMFALCLCNK", "HBMERKMENBOGQGFIJRHJC", "FHKBNFBJHFQGAEPJRCPAJ", "FCIFPBFODHMBHNKPHR", "RBKREPMEHQGLPDMEPGNB", "QHNKBLBJHLDPCLEIMFRHQ", "HBFQJQBKNECDPDPOIKRL", "BLHQHKHDBQAQJQIOJREOB", "NHNHBEBJBQEOIKPDINIOC", "OKBOHKNHEQAMFQKAERAJ", "KPEBJGKIOKCENCQCQA", "MGPCELMDIMKHEBNDHQDHE", "BJEBNFNLQFNGMARIAPFCD", "KBEBFQDNBJQGFGOGPJRAK", "FREJOJHLAEKHNFNBHDBE", "KHREQHKBOHCJADILEOJHA", "NLQBNLHKFBQCFPOFHLHMI", "GJHRKGFMPJHNJNFBNDNF", "AEMRFGMFPFPKQKBKMBHKR", "EBQGQNGBEAMAMLFAMGF", "HRERKBQHRKOCJBEBOIKB", "KNJHQEQFNEHRCEGPKQOLM", "KQHMBKBPMHFNIMJNLMJQ", "IDPCOEADIPBRERKQEOHK", "PLHOHNAIOBFNLBNHNJBF", "AEQADCFMRIFBNQDNKBFQF", "NEHOEPKQOHBLPHCLHEGFB", "MQDRIDGLCDHEHMHKNHPBM", "JHOQGRFCMIPBEPHNBHEN", "JCPJODKHRHDQENHDKHEN", "HNFQKNHFQHBRFGRCLDQDM", "PKRBPHMHENIOCLGFIFCO", "AHMQFKCERJNEBQEAKGEGK", "GFIQDMADPFKBNEKMBNHOE", "FOLAPILBMEBENJQDLNQK", "AKEQCEQEQGAOCLPCDBOGD", "CEMLIOJAFOHOBEBNHPHM", "ADKMCNEAOAKCQECNAEGE", "NAEGNKQCKEMJQADIMFGF", "GQEINCKAQCNDBQHOAOGAD", "BPHBPEPNEHKDOFILCQOAE", "DOPCGRAOAKBQFBHKNHQB", "PKIDQBPBLIJBNHKHDQJNH", "AIDOPBGEILBEGENBECQHN", "BJHNENKDBQEILEPCRDMKQ", "MHFQHOBGDKBNIEKNCNKQ", "EPHEOKNHKRNLHNGLQIOFC", "IMDHRCJNGOELBFHJQBDHQ", "NHBNJENBEHBPILOHECQB", "KPBRBNEHEPDNGEHPOIDBR", "EQINANIQAECPMLAFGBJC", "CNGKGQCEAKBJIJFNHAOGC", "QHKNBPENBOGJFOFAFGOJ", "BKPNBKEBKRNIERDPLGNGC", "BNBEBPHMEHRFBPEOCJBQB", "IQGEGKIKANIDCMJDQADQ", "QHNFQNHJEBECERJAPOIQN", "NJBJBFQHDNFIALMFGERL", "CRJMKCLPADLQLBHEBHQH", "KRHOBMEBRERLBPNLCFPGQ", "RKOBKHMHBQCJNEALRBPN", "BEBEQKPKRHNADGPIJQIJH", "KGEQAQNKQHKODNGRLRAMJ", "BRKERHOKRKMFCFNJEICDN", "KEBKQCECQCOLRDOKPDPDA", "QBKRBPKMBKRFBLMFPHDAM", "EOKHRHRKEBOFILFRNLOGD", "LQDQBJBQKHQCRCJCKFIQJ", "BNKHAKNAKNJGDNHPBOI", "NFQJBNKQDQEAOCKIFQOBE", "HNAOLHMDRAKHNHPEBMEQE", "HERENBPEPBNFQKGECPC", "NHKHPHEPEBRCDPIOLQCJP", "HEQNBNENLBFMIFROJGFI", "DPJAHQJNAMQBKPEBMEHN", "BDBNDBJEBLBPCEIJEBKRB", "EQNIKIQECNCLOJDGPJEH", "PHPEHPNKQNFGEHKAPHLNA", "HMEBKEBOHKCJQFPDGPJML", "HQEOBOHKOBKFCJGFBKCQO", "KRKBPBROKMHFCPLANGML", "IQAPFGNEGJRHKPBEKOENB", "CJRFBPAHKPKQEKIQAQKB", "NFBNDHQBQJQGKAPLCMIRF", "LQKNJHJHFBNIPCEQMJNKD", "JBNBDQHFNFGRODMKFNGP", "OKNEHREBROIRALDMKIEQC", "KQKRNBMKPEBLCPDAQCFP", "NBQENKDHDBNIFCLHPOJMB", "HOEHRHQHKPHCKHJOFNINC", "BMEPHBRHMHMAQGLDCRJFQ", "DQDNLNFHFQLRIAOLHRJQL", "MRAKMECDMRHQDQEHKHLN", "HBDBKFNJQNJPGRCJCMGRJ", "LHBNLQFQHBEMGDIKNGJCJ", "KBEOHPEHPENCLFPIDHDOJ", "NGKAEQAECENFIOAEGQFN", "BFNBFHEQBNILPNALOIKOD", "LQKQDBJEBRJIRHMHCPN", "MGNFLQANRJOEKOBKBENER", "HEOKEMBMHPOLGNGAFMCOE", "EQNGQHEAENEPBOFAQECR", "KCKIKGEBKNCRJFMFQADH", "MQFHMHJRAGKNEBOQHOB", "HBOHNEQENHQDHPEILAOAR", "HENHQLFBDHFMIKOJECDN", "JHLBKQEQLBFMGRHCJCEGD", "QIDIOAPBJRKBGQECQGNKH", "GKBNIQBQCEALIMHDQJIR", "DBLHFQFBNBDANLEIPFGNF", "HEBKMKHEMKMGPHQKFQML", "BLQKDHFNEPMJOAMGDMGL", "EQHMHRBOKGPCMLMFPOIE", "MKPEHKPBMBDIRHLNHOBJ", "QDHECEIRAQKHNHJBELB", "BENHMEHMBOKGKCJOCKDMB", "HQBNEPHBEHRJRIRDCJARJ", "NHDRAJHFQGEKMPBHKHPHM", "EOERBEOBRKEAKPJFIMDBD", "KNHMHKOBQBEGFGBMJMCR", "MBKBNHEREPDOALNLHAQJO", "EQOHRKHOBPAMDGJRNFMF", "KHEHQOBKPKHLDOLHCPBEI", "KERKHEHQEQBLMEBFPGBP", "HEMHOKPNEBNICLRFIDCRB", "MDRAIJALPEHNQKANKAQB", "NBEQLNDHEBQIQLHCOHKPF", "BQDBJQHQDBNCRHQDAMAKR", "BEQMKPHOEBNJOFIQJMDN", "OKHOHPKBQBQLOIAQJMBLO", "KEGQKIBEBKCMDGFILPGA", "PKQHMBPEMHQJBOAJQIKF", "BNDHJHFNLNFGJDPFBFRO", "EOIKPCEJCRLNDHDBQFHQH", "EJHRLANRDCEBJHQHFBQKN", "QLQKHBFNFQEOBKFIFARCF", "QEHRHBEMHKQLOCMGLBFGC", "IQECQHQAECLGNLCRDQMF", "NEHJNKFQHEHAFPGCKBMA", "AGOCDCLNRINFHEHNDHLNF", "BNHBOBOEHBODIEPEOLGMG", "NGECEHQGNECJAOGKQJQH", "EBMKROBOBEPLARJQFBNAF", "FPGMQKQIJOHRBHREMERH", "DHPELHPAOGJNJNFNBNBLN", "BQLBLHKBQLECMIRJGEBQF", "IKINGDGOLHKIKQANKHKC", "NEREPHNKOHOCEBMILDMC", "NHLBNJDNHEIKOEOLFCLMK", "DGJIEMAOBPKBLBFBNFBJB", "QCQGNENGQAQDPLFNGCMFN", "NEQKBOBKOHQILFPDHOGKE", "HLDHLBQHNJHMEMJIDHCOE", "AGFMDHMRDHERERHMHREB", "NHCKQNHKCKBJOLPOILODP", "OFLCQEJRCFNDHQFQJHEB", "MKHBREOKBOCFCOIJNCE", "CFGPINLRCFNQHOKOEOEOE", "NEHBOKMKNBMJPMGPBJQFA", "KEMHQOHKPBOJHMGFRMJNA", "RKRKRHPBKOANGFCKOLBPG", "BOEBMHKREQMLMHRHLQGFC", "OEOEPBNBKQAMHJMFBKPGA", "PNBRERKMEHDCNHAMCOBDR", "PERKMKRBENLPHRKOCMIC", "RHNFAPDGQDBKREKPBNKBQ", "GQKAQIEINCNJPBRHCRJD", "LCHODCGFANBMHPERBNKO", "QINENANIEHCJPHDQJGBD", "NBNBNLQKNJFOKANBJGQEG", "HBMKOKBKMHNDQHLILNLMA", "KOEOKHMHMEQJDCFRIJAEC", "QDBQBQLBKQECJGQCOAFRB", "BLBNBQBNKBLCJNEOJGBNK", "DMREPILADOEOBHNEBKHQ", "DQKQBFNDBNKCMIFOBPAMD", "RBKQKBMHBOJNFPIENANLI", "RBOENKBRKPHJAOIDBKCLF", "OKOBOENKBKOLPBNCPMBJF", "FMCIJAIPFIKNBNBPKBKQH", "FPAKGDLNKAQBKPHOKBPHP", "QBMBKPKBQKOLGJCMIFICE", "KBLHQDHNHQFADHMLNGKBF", "QFHQHLFBQLRIKCDGMBQF", "NAJIMPBGRJAMHOKHEPKMH", "RBMKRBQHPKEGOCEHLNIQL", "BMHMEOKOEMKGDPHPNFOIN", "QKEHRKREMKQGDMGDCRGPL", "KHBQHDBLFBFOBJIMHJFBF", "KROHPEHRHKBJMFGPFAPHP", "RKQIDCJCNCEOKBPHEMERK", "HLQNHNFBKBKPHPCDPEIJR", "NKHPKHNKEHOANJDMFBRLG", "JPKINKMADGEQEQIEGNGQ", "OJGQIPKCNDMEBPHEOKQHO", "HEMKREQBEBMIQLOCPGPDA", "BKNKMHNEHMKFIJMGNJGMC", "AKQNGANCKADGJHMHCKIP", "ILAIFNGOJQINKCNEQKN", "HDQBFHNHNLNCQCJAKOERC", "OHOEQBMHMKNFHQMCRDPIE", "BQBQGKAQEQHRAKEPKMDGR", "ENLBQLNKQNBRDCKARMDMC", "KOHEOKHQHBRIMJMFHLEI", "MKBEREHBNBLPADBKMGKHM", "NEQOHKNBOHBFQCEPOCPFR", "KOAFIPJIOJBHMBMHMHEMH", "EBEGQKANEGBDHPALPANHM", "FQHLHNHFHBDPFGDQLARLG", "EIEQCEQGEANDGRGMKQFPI", "EIQNENCQGKRKOJDMCEC", "BNFNLBJHLQDOHFIJIBQIO", "JAFCJQERGDNAEBNBNBNKN", "BNEHNEOBEOHDPMLHCRIEN", "EIAECKIQGKPCDRAKMJCOH", "LOHFJMANCFNHNENFQFHK", "ECGQDILBOGNKNFHQFNJNL", "NEBDHNKNLBFOKOGMBQIO", "QHOBNBEHPEIFPKQKOJC", "ERKEHMBREMJGJDRLGEAPI", "NFHLFQBNBNDPNFRKCPOGF", "EQKBKREPKOHFAMILECEMH", "ADLQAEHOGPJQLBQBNFLNQ", "BQJQBFNJHNDOHAKRLGNLN", "PHEBMKRNBEMJAQLDRAKMA", "KHFHLNBQDCQJFGKAMEC", "BKQKOEHOKNKIDMCNHMJGP", "NEHOBPKPEBNDNCKGAKCMB", "PKPKBNEBPCDIRCJRIE", "DQNBQJEBLQDGMBPLIBKNA", "NKQHCNAQCQERDPAJEQFGP", "KQCEINGKHECOGFBJEMBDA", "BNFBNJBLNFHCJHDALPGDO", "MJAMPLQBKILBLNBQBLNLQ", "MHKEPNKOBJAKPOIODCKE", "ERKNKEOEBRFAODIBRDMG", "GQKINCKAQIKDARMJRIMK", "KQJNBFBQBMGRLQAFRL", "LNHQFHBJQKQAMGBJOHMIO", "FIECELAOBPINBQGQKAECK", "BENGEQNIQDALBRMLQGO", "KQAHMDAGLHEAEKNEKCKQ", "EINKGBKQGFGEGJQOGPJ", "EQNCKIBQCECMFPGCLDIC", "CKNAKBEBNKNJRNBQAMFOK", "OEPHOEQKEOBLHKIMCDPKP", "KQBOEBRBKBNGLAFBLMAL", "BRHQMHQEBKMGJOCPKNCOJ", "FNPADMGLMEANKIQGQAKA", "EOILRIRHOBFHFBNLBLBE", "BFNEQLENHKALOFARKMAOA", "EKPADNPAQBQFQBJQEBL", "FRLGOFLADLCNBNEHENEGN", "NGRJCRERLODKAQKCHKGQI", "IPFCJNCODIKIQEBEBKNQ", "KPKREBQBOKAOINLIJBFR", "QHQOKBOBOEOJILQALEILP", "NHNHBMBKEIJMGDNGCRKN", "BEHBDQBLQHKCDREQMJAE", "ILMBMKCQFGOPEKREBRHRH", "GQCNIQHKCNBPKFODHAQF", "OEOEPHBPHKBLBMCFILQFR", "KPMKHKOHEBKCKFPGARCMJ", "KBQHBLQJECJGQIKIPH", "QLNHBNFBFHNAOAEPHDGPM", "OBREBKENHPKCFIJQMGEPE", "LGEMIPAFKOKHQCQKHQANA", "HBFNHLQHEQLOGRLMGAFRO", "RFOARHRDQINFQBNFHLNEH", "HKBFHEQLBEHOGPHRLALNB", "MKREOKHEPOGKOENAJMGF", "KHRHROBKMBOIKDIOLRKHL", "PKEPHKQOKBPJHPECLRDI", "BFHNENDNHLEGRJCDBQOLB", "MGNDLGEKRDOKBMHKPBEBK", "KNHNBPEOBEOLCNGLNCKI", "GKPDNGMJAKQEMEPBKHKQ", "PKBQKNBOHENDIKPHLAJH", "HNAKCEQEBEIOCDINKPGLQ", "RBEBMHKMEHQFGAPLPFQME", "NDQLHBFNKBFAJPIDHRLA", "BKHQERBRMLGEPJIALBR", "BKNDNFHDQENIMCRGMDMHL", "QKBNCNKAKANJRJGNFPDC", "KBQBQOKHBOCKRNCJQOAD", "OAJOFHEILAPERBMENKBEK", "BNHNBJQENFHCOCJEAJDGD", "EQHBKPBQOKIJOFMFIDAMB", "HQINEBQEIKIPFQMIKMJPO", "QGQBNCQKCQEOFAJGAQFQ", "KNBMEBKRKHEIEPJNBMFQO", "HPKOKEHBOBPAQMLFRCEO", "EBPNBPBKMEGPNCFBMLGQ", "QJHQLNBJDQEGPBJAKHQ", "EBFNJNJNDQEAMJROGKMI", "KEININAKINFGBKRJGFNB", "KNHBOHMEBMKFCOFNCOHFA", "RKEQKRHRBENIQDBJERBLN", "EHNKBEHFQJQCJQFCMEQJP", "QBMEHREHNERJBLGMBKIJI", "KCKIEAQIEQKPLPGAFIJMI", "MQBNLPCDGPLBDNJBFHKNL", "QKHKENKPKEANJIFRFAR", "HQDQNFNBJOERAFADGQJQ", "KHQLGOBLCHJHDQHDBJBD", "JPCLGRCQFOANGNGNGEHKN", "HFHEBQBNBDMHPFIRCPMI", "QNJNHDNDQNDAOKECKIFCL", "GKAKEQHECKCMJFBRKDNCL", "AENENIQIQINLPHDMDRFRA", "HMHMEHBNBRKAPKBPMJGEN", "HFHBLQKHFNLMLGJBPKQAD", "ECNIKNKQCKCLOKDGRALHK", "QEINAFCOIDHOHOEQEQHKH", "LHKNBDBJQDQMKOAKBJNGR", "RKNBKREHRKAQDQEIKDPD", "BOHKQMENKBMLOIALMGKND", "RBGECLMRBJMEBEPEOEKHM", "BENKMEHRKMKFCJERIPAOI", "QEBKPHOBMBLRBMDGPJBN", "OHEREROBPCDPNIROJPHA", "LBJNEQHFHQCODGCPIOGO", "QNLBEHDQJHNGPILMIAODQ", "KNBLQEHJHQLMADBQKCOF", "MHRHENBMKMEGKMLFRJHLA", "AGFCDLRDGFMENKHEQERBR", "KNEBPHOBEOKFAJMFCRLC", "OGQCNFBRCLAEBDKNBEHQ", "NENEOEMEOHQLQNLAJDAOA", "ILOCJQDPJGFJQFBFBNQFL", "GJGMAMDPLMKOBNBOEOBE", "EBNEHBOKBRKINGQDQLGCP", "HEPNBKNKBKOLDRGJOCRIJ", "GKHNIKGKQGPKDQGQJODN", "NEBJBFBKQNJAOHDNBFGPC", "BEPHMKHQHRHAPEQIDRLB", "MBKPKNKBOHOFCDMJGLEOH"
                    ],
                    [ // 8
                        "JQNFQEQBQLFPJIPDAJOB", "HRBEMHNEHMEINKDGLCFRI", "CQNCKECKIBKPIMIFOBJQ", "KGQDIPDGLHKHMRBHPHRK", "PKHBPENHKPKINFBOIJARB", "QBKENEAKGKEMJFPDMFI", "ODMLIKARDRANBKQEIQHNG", "EPHKEMBMEQOIDCNIDICER", "IFOAIPJIPDKQBOBPEMHOK", "DILADQFOEPELBNBJNDNQB", "PEQOHBKPKHKCNHFIMJPCN", "MKPNEQHKGNDQJMKAMIB", "HRNHERKBOFIPJQOAMAJA", "IPCGLIEODPBQHEQBRKHE", "DRGDKCLBIOBKGEGQKCQIE", "BLHLEBKBNDQOCJMFILGCN", "GOEIJAFGJHKPHKBHNPHP", "RKEHPEQBKHNFBMIJCQDQN", "JNCGJOFQCKQEPBNPBEPH", "DJAIMDPHDRBFBDHDNHLBQ", "DHQJNLBJBENILCDHBPIK", "EQJNFBNLQLQALMGRLCDQ", "NKNHJQLNFQFPFAOFGJDN", "DBEQFNDQHDHRCFHMHJCFP", "BLNDQBKNFQDOICJMICLHQ", "NCQIQEAQKCPFPLRIBNHMC", "KMHKOBMKRHMAPMDNLGDAJ", "IFRADOBRIDKBQEOEPKPK", "HRBNKQOENIQFAMJNIQCD", "BNINEANENEIFOLAOGOLB", "JQKGRJHFADNKOBHRBOBKM", "FNKFBLBQENBMDIAKDPKMA", "NEQDHKDNDHLGAOGBLDGME", "KOHPBOHNHPKFIBQMBDAPI", "OCMGLGPKAQBDHDNFHDQB", "GPDRHFAPKGLHLHQJHNKNF", "DMQCNHDIQJNHEBMEMEKME", "EBQEAEQENIKRJIMHFRBJR", "EROBRHKOKREAQFOIAJPFC", "LCDRILOCMJQBQFNQEQF", "BMEOKEOBKPANLFAFGLMK", "EHAKHAKNGCJQDQCEGDOIR", "QKMEBNEMEPKGBKMJCQJFH", "AGEMBDBKIJANEHNHQAEKC", "DNDHENLQHQDPGCDHPBMC", "MEQHKHERBOIJOEHPDGEIC", "LMGQANPDMGJBKHJNFHDQ", "RBMKNEPEHRHLAFIALOAQ", "KEPMBRKPEOBJHCRDHLBM", "NKOBRKEBPKNFICQDAMKGC", "BEBNFNLNEIAFNJRLHDPA", "LPDMGJHERCPBRKMHEHRHM", "JRIQFPGRCJHNHREBHPKOH", "GQCQBKCNKAJPNAOJPDOA", "AJGPCLQGOCEMEHPKPBOKQ", "IEIKGECQCNHLMGDRKQNJ", "LQFQHQLEQHEGLHKMAPFHN", "JMFIQCPBNDGEAEKANCEKQ", "QHQFNKHBFHLICDGJGMJP", "HLNEBNBJQNHOIDAOKRILO", "PKHEMHPBOENIFPAPLDGAD", "QJQFQHQHLBJIKMGJIDAPG", "CPFBIRFQCPDQLQLHDQKNK", "EHFQJQFBNBECRFICOJGR", "HOHRHBEQBOARJMKOAFRIM", "KBNIENEIQBOEAPJFGFBE", "OEREBMKQHEBFQGADIPEOB", "QKGNANGQKAODGBROCNJD", "OKRHMEMBNKNFBOBMICOLG", "FBQKHQBQEHFGFHKCLMIPB", "RBPCDIDHJAEBMQBNBKPE", "HDPFQAJGMFCENEKIKANBG", "RGNFLAGPFBRBEOQKRHMK", "NIMDJMPCMPAEINAQINENK", "HPHOBRKNHMFMHDAJFG", "OLAKPCQLIKBDHQFBDBQB", "EMKMEQBPKMEIJINIRCLID", "FMRGPAHORAFKCHKNINANQ", "OKRKMEQHKEPGJOANILDQC", "MKBMEQHEQENFILPCQDIMJ", "EHMKQKNHPBPJPICPHQFNE", "ADQGRHDGFNBLNENEHDB", "QLGODGDLAFNBHKNLBNLB", "PHEREMEQHQJIDOALFHFN", "CQNCENAQGBPCJGPEPDARD", "AKGNEQEANBMDRLIFCF", "RKRNHMKHKBNFBMGKGMCFI", "PCFPIOBFCREBNHFBDKBHF", "EBEHQBPNERMIEPLOIFOLA", "KBNBOEOKHKPIRLMINBFAQ", "EBOKOKEBMEMCPFIBOJODN", "KOKHMEMHRBFOLIJCLFGPM", "ENIQGLIFNCKHOBOBKMPBH", "HKMBMBEQKQOFCEICLDCFM", "NFHLNDHBDNGMGFRJCKDI", "HFMCPFPJADKANKAQAHEGN", "NKBFNDBENFGKPJCMLFGL", "EMAFGOHPLINBKBLNHFHDN", "DAMJAFPCIRHNBHKBQLHQE", "FAGPJPECOANFBNHKNFNFQ", "MJOCFRJRKMENBEAKGNCN", "FHFBKQHFHFGDILCJOGF", "EQHCNKIKGQOGFBREILIC", "EMHMADRLALBHNHQEHLNH", "OEOEMKENEBODAJIQMEHFP", "QFQKQHFQDQHCMEBNIRFMH", "EQEQHNLQENHCRGKBJDGLB", "HPHKHEPKBOHFAJBPMIQAK", "HQBQBMKOEBNJIRFQCFQHM", "BEGBQHCNEGEPAPJIOFNID", "EIKCQIKIRDPKMJEIDM", "CQEAQEAEQCQDRLIOBKPG", "INJCFQJMDGLNFBEQHQH", "BKOBPEBPBEMANFOJIAOCR", "EPBRHQHQKQKCQODAJGFHR", "FQKRKBIFLOENCEQGKNCHN", "KPHMEQKHEBQIQFQJQGOLC", "EHEHDQDNHDQILNDMJQDPB", "IEGQANHKAKBJNFAQGJFOB", "NGQKBKGNKNGRBMJGEHFHA", "OKBOEHMKNBKGKFALANGMD", "MRFLCNLMIRDNHNKBHFNDQ", "ILORKADGMLHEQENREKBPB", "FNBJQBNBJFCQDIOEALBO", "KMKEPEBEBOKDPGLPAOJEB", "CGJPIPCHDKQAKQENHQEA", "IKGKBNINKANDHBRCOGFPM", "CGLOQGLQAOQINIQIKQBKH", "DBFHBEHFBNEIMKPLAKDPM", "FQLNBQKHJNGDGOKCPMJIA", "QEQOHEREOKMCJRGADHAMA", "MBKQBEBKOKPLARGKDOILM", "IKIKEQGKHNDBRKIBFMJC", "PHERBOKBRHRGDNIFMIPDP", "NBMBOHRHMIFMFBJHOAFA", "RKOHNHNBKMCJEQCPNGALC", "KHKNBFBNFQGNCDPHMLMDA", "FQHLEHLHBDADIOGPEQFC", "EQHMKHKPMHCQFIJCOFOB", "HPKEPMKOBKINLBFAPGRO", "JRIRINCLHDQBEPBKBEKBP", "EQNDNJHKHNBMKPNGEIQMF", "NLNKBNLHBQECMBLOFRGJM", "KQHERKNHOHRDGLNHBLAJP", "ECFGQIPLARKBLHLBLHQEB", "KPKHQKEPHPMGERIFPAJGO", "QLQJQBFHFCQECMJFPID", "HFCIOLNPCHNDNDNHFBEN", "KOBQEMBPKOKGLIDIPCRIF", "IRCPFMCQFAQKBJQJQKHQD", "NBEBKNBPKMCFPIOJPBFA", "INKINKANCEIRLCFNJAJMI", "HFAJBPAIRKHFQFQJNBL", "DBELCLHFJIKMEHEPHEOHM", "PMKBPHKBPHECEMJIBNAJH", "KERKOKOBKNLRGMFGPECR", "QLNGMAHFANKBKREBPHKP", "HPHKEPEPHNCMFIPJQLPHL", "QFHRCMQGLNAECQGNKGNK", "DNDNBFNJDHNIROCDOGQHL", "RBOEBPKEOKMJHKGRDAJHQ", "QKQFQHDNFNAEOCNJBDIRK", "HBREMEHNEOCLEPNCDHM", "OEOKPKBOKBECRDNHAJFMI", "QKAQNKANKIOLFAJQCLDIF", "MEQBMBMKRMGKCKPLRCQFO", "BQFHJQNBDBLARJOFGAKQL", "EPBNHBEHPBJHRMLIDBOLQ", "BPHBPERMBNJQCLFPGMDRO", "FBNFBKHDHQKMJMDAPKIQF", "PBFQFRCQFIQIEBKQKCNG", "AKOHDANIJCNQDBLBKHJNQ", "ENFQJHFHNHQGLOKEBJAMI", "KGNIBQECQKCMEAKFGJPO", "BKBKQEBMEBEGRKFIPJFQC", "HBOBKMENHOEGOJCKGFRKH", "BQEBNANKAEBLADQKCPMIF", "GQIKINKQINAFGMFHRAQLD", "BMDCHRCIMLNKOHKPBEMBO", "BQNBLBJHEHBRAFPFCLDIL", "IQHECQAEGKOEQHLFOGER", "EBKBPBEQBNCPKGEAFALHN", "MKADRCILBPAQENCNAQKAG", "KAQCEHENIBOAJPOCLOCP", "NEIFAKHPFIEHMEOKPKPE", "CQEPHNDLCFQBMEOKMBKNE", "BEBQNBRKEOIDMCQMFPCP", "OPGOHJOFOAHNDNBKNQFQH", "BOEROHPKHPOFNIKAJQFIP", "FOPDHLAGLAHQEBQHDHLQH", "PKEQOKEBMKBJRAPBOIKFM", "OBKPHMHQKRKDPLPOADRIE", "KHQFNBJNHNDAMHEHJNIMH", "MDMIJAMRFAKNKHKRBEMHK", "MEOHBRHEQBKDGQJIKADMJ", "KBNDQNHENFQMGERLADCEC", "EHQKPBMERGDQGAPJPGND", "HFMGEJIRAKNKHKPKQHP", "HPKHNBRBMKDMALAKRIEOE", "HMKHMENBMBDCJDGECEPMH", "OINCLNFCPLQEBQBQHDN", "MBRHNEPKHBPJEGQKDQKA", "CHQDPJGPEPHNKBHFQLNBK", "EIKIQNIEBQGFPDHQDILRC", "LFNBFQBDQNFIQLBDQHRGO", "JPLMQDIDPFNBHDKBNQFL", "EHMBQKRKRHKFHFGMKDRAJ", "QEOKEOBKERLFMIBDALMKM", "HOKPBQKHBOKADRMJEAFH", "EBMIJCPGMINHJQEQFBNQD", "EQHBRENEOHNFQIOJNFQGE", "BKQHEQJBFNEIOCLREBEMJ", "MHRKHKNKMBOLBPCOLIRO", "BEPKNENBNHOLGDQHLAQJQ", "MBMHENEPHNBLMEGFCJEQI", "CKPDLAFIEGKBREHEOPHRH", "EHNEBOHEOEOGJCMKRBOLO", "KNBKHLDBNJAMJIFCJBOJP", "NFHJBNDQBJQGFOEGCMBJO", "RHMHEPHEREIDPKGMJCFN", "KNCQEQECNIQMCLPDBM", "OBQCNLIPCDBFHQHFBFN", "DMLOQLCJNIFKHMBHKMHEK", "EBQHMEOKHKOAPLGCPLGEP", "ARJIMCHPLGJBDNHKBENFB", "FOCMDHEILBEHNBOKNHMH", "KOFJGKBKMFCKIEQANHNEH", "HMBMEOKMKQFCFIRGPLGPC", "DLOAFIDIMGNAQCQANKGQ", "BMKEPKEBKBFAJGMADHF", "HNECKCQIQCNLMIKNDGPJF", "FQHKDHQHQBDOJGJDOBPAK", "NDHJQHKFNHLPCMJAMIAM", "QKNLNLQBQHNCEILPNFNAF", "JBNBEHLDBQOFCLILQLAFC", "NECKNGNKCEAJQBPLQJAF", "DALPFARINDOHEHKPEBNER", "OEBQEPBOHEAJFHNECOBE", "AQHKQNIKEINFCKIJRLMFO", "BQHBJBEQENLGQKBJFPGB", "HJHLFNHJQNHCKPFBQILIM", "BNHRBMHKQKEGOLFGLAEPJ", "PHRMEMKEHBNCMJFGBOLQO", "BQLRAGPLOADQFBQEQHJBH", "NELPILAFRGNPHOKNHEBOK", "ENEBEBMBOEBLGPCLFPCRA", "IKAOAKCDGNBOHOERKH", "ENLHQBDNKFQGPGODCJEGC", "MKRKMKOHNEHDHEGQFOLCQ", "NFBLNDBNBLFAJMGBJFOCK", "KBMBMEOBKHMFAOIKMFQC", "REHOBMBPBEQIEQLNINFAN", "BRHREHPHPERFCPJERGLIF", "QHKRKBMEQHRFGLRAFQHER", "REOBNHOEOBNLIQLGMIDBN", "RFJHMGLCRLREHOHKBKNBR", "EQNAKNGQCKQJQCRMEIEHJ", "BQJHQHDQNJBRADILBPBDC", "EQJGFLAKMQHNEIEKNKHE", "BRHOHMBRBKPCOINBMJCRF", "EHNHBKQBLQLGECJCRCPAO", "LNHNLNBLBNEGRADBNGKDR", "NIEBEAQANKCLGEOCQLRFH", "HBKPHKBEGRFANERLDRB", "DIDJQADIPDOEHMQEQEHM", "QEBFNHBNHNKCPKFCRGCLH", "QEQLNHLHJQJIMCRODQNGB", "KEQKCQBQCEALPAFIRJHJR", "DHNEBLQNJQDCRINJMBPE", "HFOQBDGPCKHNHDBFHJNE", "CDIRANCKCFQDQDNQHDQJ", "CPDJOCGPIRJQFKHFBNEQB", "OHBKBPBMBOBFBEIJCPHJF", "QEHFBQKQLHECOGRECLMFO", "NGMADANLNINEHMHOKBOE", "BFGFLCHMIRBLNDKNQBJQB", "APBQFJCFOFHFQBFNJBL", "DQGMQLPDINBQKBKOEOHE", "HLQJNENBLBOKIDBNHCRE", "RHPKPBEBEOFREAKBJGCKF", "HNFQJHLNKOJNHCMIJFPAO", "HRGREGDLCNEBMQEOHKBM", "EGECNANKGNKDAQLMIEOC", "BFBJHDQDBJILQAPFGOEO", "EOKQMERBQOKIPJMCDHJIR", "QKNHKBKPBNKGPKQAKRLFA", "NENGKCKGKANJCRMJFIMLC", "HBEOEPEHKNLAMCRGCFQA", "QBRKOBNHPKEIEGFIOALIP", "KHMKEPMHMBMJPKGPCPJPF", "HKOBQEBEMHQCMHBDGDHLC", "IERDGQDBRGNHDQBLNBNEH", "EBKNEBMBEHRLRGCPDMLAP", "BMDRCMLIMDPBQBKBPEQKM", "HFBLHQBKNJHPADRDAFHNG", "CQAKAKQBKAFPAQLPKGRM", "ECENCNBQIFPMLEIQIRGE", "LQDBNBQDBEMBEGLBJCEM", "NKHBOBMBKPICJOCQJENFM", "KBRAJIQCFMKBNIEKCENQA", "GNKCQHNCEAEOILAFAEIPC", "MHOKEHBPHKIQJMFGQLOFB", "KBMKREHOKNKCFIRBDAEBF", "BQHOKQBKPMKIPIOJCFIRJ", "EGFOKHLAOFKHNEQKCQBIE", "CEQCEQIQHEAPKCQJHPHNG", "KNKQECQBKNHJOLFARKRLG", "OHNHERBPHBRIJPCJDMEIK", "DNJPAJNADNAQBEIECQIE", "GQCDCLIFOAEQBKQHREMK", "MBKHEQEBNHCDPJPOADQNE", "KCQEIKQNAQCLBREIFMEHK", "FNBKDHFHQKNAFPHQKCQJI", "MHBMBMERKPAMDNHJCFIP", "CKGMFRIPARLBHQBEQKINK", "QJMPEQGOFAEHDNKNJBNDH", "EHKECKNIKNHREIQDOLQI", "PHRBNHEBNKPLGQECLGDPB", "FQHQKBLQBDMEPLIAFIM", "HENECNIQNBPIDIJCPEGRE", "HKNBKOKQMBNFGJGMBRKID", "EPIFPGJPCOFNQBKHKQBDB", "EIEIQGQAKEIFOIFROLRB", "EBQOEHRHEBFBJIKCQHQD", "RBENBKOKERLIFGRBEQGOE", "FBNBDQFBFBKOGLAEHLGF", "AMDIPHMJMFOHQBKBMBEME", "NQDRCNLRGDBKOKHKBOEO", "ERBNCODRAINBFQBQBLNKQ", "KHENICNANKIJOCFPMJNH", "HFNHLBNBFBREGAFANIR", "FILCOGQKCJREKHRKPKNEQ", "BJHFQEHJBQFADMIPLNBDO", "IQBQEIKICENDBMIEQALBD", "NFMAPKGFNCDJQBQBFNELQ", "BQCDOILQIRBEOERHRKQ", "QDQBKNDNJIQFNDQLRKD", "LBKNDBEBNHDCDAPCPGDQ", "HNHBRBOBMEMGEOFHQCNDB", "KERKMBKEQHCEIECDMAJPF", "QBPHENBMEROFHRHFGLGCR", "QHLHQJHFNDQMHPAPKIROL", "HEQHBMKHKGLRIOENJOFA", "BNPFQAIJPFHNBKOBRHMBN", "CLIOPKAFPGRBHKNBEOBPK", "HOJAHFHEOIRBOEOHMKOEK", "HFBQENJNHDNCFPJNGCFAJ", "PDAKOGJPDOHEKNHLNQEB", "BQBPHEOBQEHAQDHJGOAPK", "DNIFCOJNQANBRKHKHQHO", "FJCPLNHMHDQEQCQGQGQB", "NBKMEBEPHROLCODGJQEGB", "BDQJHFBDQBDPLCDOGDQJ", "MQDNGJMBNCMKPHEPKRKNH", "NQJGFMRCJGMKRKQEMKHKQ", "BPEMHREBNKODGLAOFROBM", "MKREPKMHEIRHRLFMIPK", "CRJCIFLPBHEJQHLHDH", "NKOBKRHMKEBJMCJGLEPGM", "AFLOKMANDKMEOHMPBMEK", "FNKBNDQEHQDCPGEBRENDI", "KAOFGMPHLCQHFBDNHFHEL", "HLHDQBNDBFIJOBQIRKA", "CEKGJIKORAENHFNFBQBHL", "GQELGLORAJNHQBFQBDHN", "RKHOKEHNEOBJPGRAFILRE", "NJBQJBQLHDNADAPIJNAFH", "QCEQEQIECEAOGJRDCFOF", "EHNEPBEMBKQAJICKFMCRL", "GOPGMJCRGJBNKRKBPKBM", "CMBQDJIOKINEHEPKMHKQE", "AENGNKQBNCOFCOJIFHBO", "NKNCNGKAKGFCLPMJNHLC", "FNENIFAORCLHQDQFQBHK", "KQKINGKHNKHRFMGKOCLDO", "JHKDNJQHDHCFHPAOFINKE", "ERENHENHEOJBPAOCFIAF", "EBQHOKHNHPHJAJDGOBDHL", "EQHLNFBKQNFIDQBOLPGEP", "FNJHFHFNBENCFIEHFRAQE", "HLNHDBENFBQMKCMILPCKA", "HQNGNCQKBMFNDPOKANF", "JMEPDPGOAJBEQJBJNQKB", "HAQHCQKNCEQMFOJAQFRIO", "NEQNLQEBDHDOGLOFCQFG", "KRHEHQKREBMJCFICLCMDH", "LQAKHODAIPFNJQBELBHQL", "OIFBOARJQIEQKHRHRKPBE", "QLFBQJNLHQMHFHJIDMCOL", "CNEMGOHLIPEJQBFBLBDNQ", "LFHLBJBDHBFCFGBJCOGFR", "KQHENHEIKARGLDHEQCQ", "ANGQNKGQNECJMFGAPIQBN", "RJPAPGFGNKQHKREOBHN", "KQDBJHDQBJRIDOALRKIDO", "LBKNBLHNBKHCLIDIOGQCL", "HMBPKQBEPKDADAFMGALMD", "BPGOJQIJCQLHEBNLBDN", "MBMBNKOBKMEGCRKOJOFC", "GQHKINANIQBOLFGRJNDGQ", "RHNEBOKREROAJAPGMDINC", "DAHJOIDCJNEOHPKPEBKO", "JNHDNBDQHLRCPIMFNHDC", "GDKRLIMKGMBOQKBOQKB", "DHNBEHLEQLBMGDCJFN", "BEMKHRBQHBKIEADIAKNL", "NJHFBKQBQHKGKDCPLCFNF", "DPJCMCEQADBQDHLHNHLQ", "EQKHPHPBPHJDGOADBRJOB", "NDBFHQLQNFCEQJMLPADNK", "QNBEIQGBNHKFCFBLIPMLI", "MAOKIEQDMCLBQEBJBFND", "EAQNEIEAKQGLFGCLGPEG", "KEOHOHKOKPAJCFPIMDHF", "HKRBQEHEBQKGJCNJEQMDQ", "MEHOHBOKMHQARIDNJOAPM", "KHMERHMEODMIQAFMIC", "IQCKCEQHEQGRLIEHFQCPE", "FBKQLHJQFQNADPGAQAFPB", "OHKPKHKEBRMCMDMLIALQN", "RKOBKPHPHMHJDRCMCRICP", "DLAOEPJORCNFQHQHDNDJH", "BLBENFHLHBQOJNGCLHPMA", "NAEQKCKCKAQJHRLQOFOIA", "NDNHDHLHQFAPNAFGPJBQN", "OBMEPERBPHNIMCOFHRAPJ", "MHFMCLORGPHOBKNKRBKP", "DHDQHBFQKQFCERILGPCE", "EBKMKHEBOEOAPCFPOJGCN", "IFJHQIOCMBNQBEHDQFB", "BKPLCHDPDOLBNDHEBJHJ", "BMHEHROHPEALOGKDBMGF", "NKRKPHRBEHQGDGJGAJNF", "EPEMBQHEOBMDIFMCEMLPC", "FNHPIEJIEAEQFQHQJBJHN", "DHDHNJBNKNKGPEAJPHRNG", "NKHJQBJQJBDIOGQBNARDC", "BDBLENJQFNJROCMGLDIB", "LFBFHNLQNKHMBPGFPALGN", "HEOHBMEMBKMFRDOCJFGAQ", "DNIKGEHMLAEBNEJQFLQBK", "DNFCIKQJCFPHMKOHQKBP", "EOBQMBPKEMBFIRJARBFPK", "OIOAODPGPGKNKPEKQBPB", "JAFKBPAEQCJHFBLNLNBNJ", "GMDLIRHRFBNEHPBERKNP", "MEBEBOHOEOECFPJIDNHFI", "EMKNEPEHPKNFQMHEGRCFA", "AOPADCLIMLBNQFHQBNEQ", "BNBLFHLBDBEPEOKAJFIP", "BLQNFHNLHBLAEGMJCRFOE", "LIFLCJOFRAOEBNHRBOHPE", "AEGKQHEQKERDCJNFAPMF", "GEQINEAKAKAOAKGBQMLDC", "KMKPBMENBEOJPCROFQGQB", "KAQCNKGKNGEPLIDPHAJB", "NFQBLNKNHDILQBKIPMJA", "LRDGPAKHPDBNDQEQBEBK", "LNLQFHQFQNEGMJFOARGDB", "HMBPKMBKEMKDCNEOHJGCF", "DNEQLNJNHKRJIPOCLBDN", "EHEPHRBPKDGKGJFGCPLF", "EKBGDMCHFIPHEOKHEBNB", "NBMHPHOEPBEIPFIKBDCLC", "NHKFHQKQKNEIDNAOFPCRN", "BEBPBMEMKHNCDIKOIJHCO", "KHKEMBRHNEODGPJCNFHQM", "HPHNKHPNKEARJGDHRCQOD", "NBQIEQKQHNLPGJNDOKGF", "FQEGNBELAHPBKBNKOKOH", "NKBFQJDHQFOFHJQHNICDN", "GQKCQBNAKCPGBQCLNDIC", "LHOCGLMFCPKMKNKBMEH", "KOKRHKMBRHOANFQAERJG", "NKQBFHKHDHQAJRGQLEQFC", "ENKMERBKEPMAPGBNLARIE", "AMAIDAGERAHNHDBELHNQD", "FNHQBFBKFNJRJALDBNKCE", "LOGPFJPBJCNEHKREPBKB", "FCIECDAJOQJQHENQLBHL", "DNHJBJBEHCJAFGEAKRL", "KIEAEQIEHKQLCPFQIJHQ", "BFNLHNEQDHKAJFNCOHNFB", "EBKQEOHMKRIQAQMFILQIC", "BOKNKEBKOKHFAFRJIFHPD", "KGKIKEQAKNHPGBLFHMKRE", "BDBNJBKFNHBOIOLCFPOBE", "HBPHQKNEHMCMJRAMJPGMG", "EHOBQOBQEOCLFGMGFGDA", "RERBQHMBEOGBQJPOADGML", "PANFLINRDCEPKBPKHKOP", "ERKHEBEOHQKGJHBJAJIFQ", "KNHFNHJQJNJGCDINGOLBF", "ENKQHCNKAKCPCDHDRHQLO", "ENFNJQJNBQECKFCJPCKR", "BMBRHRKHEBMGQLPBRDGAR", "KHBPHKRNHBOFCLQGBMGAO", "RKMHMBEBKQOIOIDMLGCJF", "BMHBEMBOKOJRFPNGNFOHA", "KMEBQKBRHPBLAOJGRFMLR", "EBQKHRBRHBOJFPAEHFBOF", "BQKEOKEOERGLRDCNEQKAF", "PKRHOBNKMBODRHNDGPJCO", "LQDQNLQHJOGPMJAJDI", "JQHJEHDHBLAJQNKHCOFHL", "QBEBMHEPHBOLIKFCJBLHR", "KHJBNBNLBLEOJRDINLIJI", "DQNEQBDBJEHOFICLOCKPE", "KQBOHPEQHOAFIBRKNFNEQ", "GMPFCOLGPBLNFKHLQDNQ", "BFQJBJFBNDNGMBQCFQHLM", "HNKRBPBKRECRJFBRGRAQ", "CDILMBFRBPBINKNGQKANE", "QEPBQEOKPKDCKGJHOFQCJ", "BJBQJEBQNEQIKCPLBLADQ", "FGMQAGKIPJMHOBHOBOKBO", "NERHBOHPBMGJCJPODOLOA", "GNPFJQCPLBENHOBKMEHE", "EHEBFQJBQBNIOHLDGERCN", "QHNKBFQLHQDPOLRHMADGJ", "KBJBQFHDHJBRLIQHCPEAF", "PEHKBOEBRIREOFPMLCEO", "NHNLNBLENHJOKGNCLIDML", "QEQOEMHNKHEALFICPOBJ", "EPBPMEHNEBOJIDMHRNKDI", "FRIOHOJADOQIQCQIEKQAE", "AQCFGJQCDPKRHEBEREQB", "HJHBEBLHDQIARCPLOAPM", "OHPKQEQEOILDCRKHKME", "KQHENBLBDHQOBDNCRMAJC", "QHEHNBPBKQHFRNCNDGLPN", "QFHLNJQHFHMINFOAPLBQE", "QFQLQHDHKHMKOCRLAPND", "NFBLNBNDHKCEPILARIEG", "JCNEIRFIJBOBKBKHQKBR", "IQKIECQNHKBOFCLCOIRHO", "HNBMERKHEQBLOGJCKDAE", "KHNHRBPBOEPJIPJENFIRA", "MAGMFCLRIJBDQLNDBJH", "NKBKHMKHOHNGMFOCMIJRA", "PHBOKHRMHOJAQHCNLOGAD", "MERNHQKHKBOJMDCRLOIPC", "QKNIECNHBKNDMHLGDMICF", "KNKEGENBKENJGPHCNLQBM", "BDPJGFHPAHFHNKHJHLQ", "DQDHLNHDQBDMCLPDBPOGQ", "QBLHQHQKNKNAPMIFHBRAJ", "MINQHLIDMQBFBFHDNEB", "NFQENFHLDBRAQJPINLRM", "EOBOKENEHOHAQDGRKAOFO", "IQGKANIKGNAFILFRHPCQL", "HEBDQFQFQBFMBPLNCLIM", "HKRHQOERKBQDMALQMDGCD", "GRFPLALRGDBEBFQJBFHE", "QCKGQGNKGRLCDAMGNENC", "KBPHERNKHLRBLGARBLC", "GFPIMCLIMDMPBKRBEBNHN", "CFKRAPJMIEQFJQBKQLQH", "NIQKCQKNHEADBLQGRNIKP", "RBMKHRHENEHCDGLEHMFNG", "BPMHBPKHEMIDNBFPEAPF", "LBFHJQLHKQHARIJQJIRJF", "BFCRECLCOIEBREOBQHMPB", "ANECNKGAKIDBPBJCPGPC", "HLNFNDNEBEREIMAPADAND", "ANGRFCMBIDQHQEGENGEN", "ODCPKQJGREKIQBNININH", "KHQBNAKNAQNJGREPCKRNL", "NFILADOHPEQDHNDQKQDQ", "QNCNIEBNEGNDRBPKFGLRO", "OKOEMKOKMHOLGCPIPFNJA", "HPKQEHKRERDPJGNBLNCF", "QKBQOHEPKOEAJAJHFGJFM", "KHLMANHDNIEMQEPBEBME", "BKOKHMHEOHPIPADGJIANB", "JOBNPAFPFNAQBQJBJBQDB", "HFHDQNBNKNERFCEGRALGF", "HNHQBLHJEQAMCJPODQIE", "MBENEPHEOKNFGMDAPKRLH", "AKIQCQECEQAOLNGFAJC", "PHKPKQHBOERFAPGAFMCJO", "PJPFAFBELIEMHQKOHMBM", "CLNPCRGMQJMRHREKBKMB", "QFNFBQHQKHJRIFMHDQNGE", "RHKBNKOBKHOJHAPKOLAPF", "LQHFNLNBFBQMGFBQLFQCR", "EGEQCEGKNGNFIJMDIQENB", "KPKMEMEBQOGAOHLCNFGAL", "FQLBDQBLENCRHMEGLARBQ", "BKBKREOBPHKFRAEPJDGDO", "JQBEQDNHKHNCQDRADADPM", "KHEMBQBNEPAOFRMLQAOGQ", "RJCIPGMGLNKNCNHNGKNC", "QKBDNHJNHQDOKNJODGCR", "CLMDINHOEGEQHNBMEMBHN", "AEGBNECQEHMCPNDGJNBOL", "HNBKOHKBKIMDPHAPGPJ", "GENKCQEAQBKRJNBQJAMGJ", "EBFGNALGDNBMQHOEBKN", "AQAQENKCQHDQLAREARODR", "ALOBINFJOLOKMHQHKMHKB", "NKBFQKQEBECPDIKOBLM", "QFNDNKNDNBEGPIOFICMIL", "PBRHMENBKNJODIRBDNDAD", "LNDHKHNENDHOGRFICDPK", "FRERDCQLRANANAKIQANG", "EHKRERKEOKOFCMBRMKAJG", "DOCFHDGFMJHRBERHMHER", "BDQDQNBJBLQGLDRAKHPC", "HERNENKOHRNDRIFOLRARN", "AGFPIOPBFRKNCECKGNCEI", "QHRKPBMEQGEPJMGKMADA", "RBQDKRAQLGEHRKNREOHEH", "MKAGLGPAGDQDBNHDBKNL", "BKRHOEQKQBJQOIDCDRNH", "NHQIKHKCQCQJBMFBFIKOL", "ENBQMBMBEHBFMAMIJQNFH", "EQJBNDNHQHQOLDCFBRBJI", "BLBQEBLQKHNCJEGFMHNCE", "KIQNECKNGECJMIPCLNKHA", "QNJHQDNKHBRDCMJECDIJ", "NEQBKNFHEHRDBPGALRDCO", "QHMEMKBMEMIDAKIPEQFR", "BLFNHBJBJQNIRFBOGAEMG", "MEBKQBEMKRMIOEGFNIPNL", "CFMEJGFHRAKBKOHREHEKQ", "MFIJCOFINIJBFNQFQBDBJ", "OFOEAJIMFPEKBKNHOBKP", "NBNJQLNLBKBRBKDCJMKIF", "ADPBOIOBRBJQKQJQBJHL", "EHQBFBFNEBRJBPOECJGFP", "NKQGBNGKQNDCMEQALOFRF", "NGECENINKNKFNJRAKRIM", "LFBDBNFBKNIFMGENCFGP", "KEBPENBMHKFGLOGCJPKDC", "NHDBEHBQHNJAMFRLNANKO", "FAGLQINFMQEHLHFHLHKB", "QKRHBKPBEHFGCMALEHPF", "EMHOBEOEOECDOAJEIMBFA", "PEAHPGQFKAQAKCECEHQ", "BNBQFBNENJQIDIRICJRFG", "EHEBQOERHKGNJADOLNBK", "CQIKINKGQKGDPJBRFMG", "OEQMHKQBEOGRJGBFNINK", "HLHDQHDQENCPNKBOJIAD", "QDJCRLANGPFNLBKNHDBJQ", "GEKMPLGPDQHMQEKBRKPE", "NEQKGNANAKAOADIEPJCPN", "HNLHBQBJEBKAPFHRJPIE", "PMHBOHMKRENGPCDRLBQB", "QMBPHOHOEMECLADGMEGDQ", "IRLCLINDHRJMHMENPHEK", "BOBEBPMKRENGCDCLFADGO", "HNEPHNBPKHDPAECFOILDA", "NDHFNDBQBLQMBLAFGLOKN", "MBMHOEOKENCFPINDOIEID", "HJQHKQHENFNAJIMFHRNHM", "KPKHBPNEPHLCDGPOJRHBM", "BRAJPFQALIFBELBEHQJHF", "BEAQBNENGQBMCFROJPIN", "EBQNLNHDBNDCKIJIARFGJ", "NDCGELRKGDNLNBNENJQB", "OEBPEOHEOBKFCRIREOLAN", "HOHRBEMBPBMDPIKMENJIC", "HNJNBDBJNFAERLQEIFOAD", "QEHJBNHJHBDGFMCKCLARI", "NJBDBFNHLNBPIJCPOFPCO", "EGRLAPKMGDBENAKBNAKBQ", "QBPHKQHNHBNCMLNFGCKCR", "NKQNJNDBLHKILEANLERDO", "QHOKHNBMEOEGFAFQLMGCK", "QLQCGMFJAMLQFHDHNDNJH", "DIDNJCMPJCRKMKBPBREMH", "LHLHLBKQLHLMGQJIPFGAO", "OBPHOEQKBMLGQLADOKRNF", "MBRHEQBEBODGLRAKRMBL", "KHMEPHOHKREGJCFGNJNL", "BEPKHBNBPKRDGOHENIDMA", "QEBPBKRHPEMJHOCRIJDAQ", "KREBRBEMHNKGJEGMDIKIA", "NDNJHQLHJQGPDBLQAKPK", "FNJBDHLBEBQIBOFCJDOHM", "EHMENERBNBMGCECLOFCQF", "KPBQOKHMBKGAFAEOENAPL", "RBKMKHRHOHLGAQFMERJC", "BNKBNENEMEMGOIARLGDQC", "EHKHPHMHQKRADOIERFQJC", "HFQHFNHEBNJALDIAPHJQF", "PKNHFPAGOLBNDKQDNHDH", "GKQCEHNKQKFCPMJIPENF", "RKRBEOEHKQIDPIEGLCFN", "JOBQCNGJRAMHEHQKPHOER", "FLMEGNKOCHFHJNHJNDHN", "LQJHDNFHEBJCJBLMIJIMJ", "BNHCNGKIQKAOFCLEOALCN", "ENEBFHLQEBNAJPGJFPOHD", "EBRNHPKPNHKDQOIBDBERC", "DNBNLQLHFNFIPLQBKQDCP", "HMBQHMKQBMHDPLNCMIFHA", "EQHFBEQNDBKGODIPJCPJ", "PKPEREOHNBRCNGLHEREGF", "HRBMEHMENKRCLFPLHOGQL", "HNBKOKHMBRBDIJFCPOFIP", "HOHPHOHKRHDPEGLCRKDRD", "MHQBMEBKOBOFPGMLAEHDA", "AIDGEBMRCPHLBENKNQHQE", "HDHJNDQHDBEMLGRFQCNEA", "KHMEMHPEHLCKDRAMLPKI", "EBRHQNEBFPJRGDBRCK", "OHPHKPENEHOFMAJQDGNJ", "KCKNCQCQKBQJDPEMFHRCR", "BJHDHQFNHKNCDGAKDRJAD", "CIODGMPGLOEANGEGNEQGN", "DGMFIJCJBGREKREBOKHPK", "HDKMEAFRJGEKQEBPHRHEM", "DBQLNBQHEHFCFROGMCLBK", "OFLBDMIDCNENFQHFLBN", "MAGOBFJQCOEHOEBNPEKM", "HOADRAQBGLRBRKOBPBRE", "AHODRAPGRFKPEKREPHQBM", "KQBPEQKEPEMAMGFMJCKEQ", "EQHENFBJQHFRBJGODCJBO", "KEREBKBRBNGRFCJMBRIB", "JNALORLIQDMBMBPHKMBQE", "AFMJOCRDQFGKGKBNECNCN", "QGBEGNAEQNCFAPEHJEIRM", "MFADGPBFQLBHOKBOBMQER", "JHDNBJNJQLNIFCMEHQBML", "LRIDCJOCOCLQJBEQLBQFH", "QJDQBJBJNFNGMAPLAPFNB", "QNKQJHBKQBJCOJGEGFGAN", "NHQEBEGKAEGRIMGODIMEO", "AECNIQKEANKMGJCDOGFMF", "MHOKMBOKNHJRIMDRCKIM", "KECNKIKEQGEOJIMAJIEQ", "LINRHODJRGFQDNBEBNBHJ", "HOEHBPEMKEODMIALHCJDC", "DGKNBHEODGNQBQJHNHQLB", "FQFRLMBDIQHKQJHKBDN", "INAQIQBENGCJPKGRMFICP", "BFBDHFHBQBFPJAEHFGJGO", "DMFHLALGFCPEMHNPKBHPE", "DBNJNKQHLNJOKGFALQMGN", "IOGDPLMBDGFBQDHKQBFHL", "QLBNJHFNDNBRGMCLCDGRB", "DNEQJHLQJFIQOCNHCOFPJ", "EPKRHNKHPBQDQJGPLAEGD", "KOEBEBOBPDPINAMIRCJG", "HMKHMERHEPKCJPFHPGQB", "KNIQKQBEIEAFIKAJQOAPE", "DQBQLBLEQKEPHJCLFCOGD", "HRKHKRHENERGNECQJFCRE", "EBEAEANGNCRJHAFARNIP", "QJHKDBEQFHMICJCKPDRA", "MDKIOCDNDOQBHDHJHKNBJ", "ENEPBPEPOEBJANFNFIOBL", "EANENINAQHOCODOJCRG", "RBOKHMKRKHDHMLDGCJREB", "AMFNRHNIJRAKCKQANQGEA", "NKHRKBPKEMEGBLPDRNFCD", "FNLQHKQHDNBMDIAQHJODP", "FQBPAIRELMJHLNQJQKHN", "HKEIQKEHAKCRIJAEMFGK", "FQJQKNFBDHKRAKBDOFBLI", "ENKBQIQKQECJGKFREBOC", "NDNJBQBNJBQCOJGFCNEHA", "NLAEODNQGRBQBHEHNHLHN", "AMDJCMGEOJBRBPHEOKMBK", "HOHNBKMKPBMCFNIQENIRJ", "BINDNAGOELHKBOHPHNKB", "IKQGNKHKHENLINDREMKEM", "FCEQGPIMJAFHKBJHJNHQB", "GQEBJGPJAOKRBEBNKO", "EIFQHMRGELBKRHREQKOER", "JPAFGJIPCRBHMKNEBMKQ", "OKEMKHEHRNKCFGNADPHAM", "EBMEOKBEQHNFILPFCMGRB", "IJPHOAGLGFAKIQGEAQEAK", "CECNKANIKHCDQLALMIJNB", "BDCMFMHMFLNBECHENKNAN", "KOKHQMHEHBOGFCLOCPKDN", "PHMBMBNHEMECJQJIJRIOD", "PBKMBMENBMJOARNBJFIC", "QKCENHKEGNKDBRIMFANJB", "EHPHNHMBKNFRIEAPFOIN", "IJNDGPHOLAHEKGECKQEA", "BKQALPERFCRHQHRHPKHR", "EGECECQICNCFMHJIAJPFH", "BEHDNHQDHFAPGLBRLPOEO", "HMKHQKPBKNIJPDCJRFPHP", "RGFMCDGLOGLHNLHLNQHNE", "MEHKEBREMHNFAJEGLADPK", "EQIQCEQNCQIDIJCQBOKP", "RKRFCLBEIDKHQBMBKHKHP", "QJQDBLQHFNFGMDRCOFPEI", "HQINKEAENKEODIAPLOAKP", "HEBPKBPKQKOJGFPGMHPCK", "KHBJQHBLBDHALHMIFCPJM", "BQOBEREMHKNCDQIPJQKHA", "NDQLQBFQLDIQEMGNLQHC", "NKMKBNHNERBFQIMBDRICR", "BDHQLHQBKHLOADIBPOBE", "NKMFREAJPDANEKBENKQ", "BKBPBMEMEHNDGAJDCLHPD", "NHEBMKHPEOGADOLQEGR", "BNHMHRBMHOHCFOIQJNKMI", "KBRHKHMBKQMLHCFGLMEMB", "KHFHBQFHJQHRJGKOIRILC", "EHMEPKQHKOLAMFGAPCLPA", "NHPENKQHLARGLQMHRJD", "BKQBKOKPEBNFIJCPLADCR", "RHBKHQMHQOEAJIBPOAJE", "BFHBEQLBDQDIKRADMGAFH", "BQLAORIFLCQFBJQFQFNKN", "MEBRBQEBPERFPHQKRGAML", "HOLQHLPCIJOHKNBEMKQBR", "HQKQFQJBEBFREIJQBEINC", "BQBREOKEHOECJFNCMGJNI", "QEMENEOHBODPIQLDRHAQ", "HMKREBOBOCFHRAEQGFHCO", "LOFQJGLCIRJHJBDNJNFQE", "PKOEPEQEMEHCLIFCEHRNF", "KHOBKBRKMBJIMHMAMLDIO", "DNHNHLEBQJQOLECLIMKIL", "DBFNDQNBKQHRDGOFCRMJD", "DNLHLHQJNFGLMKDIBQC", "LNHKHKDBDNGAQJIOCJHJM", "HBNLQFHBLHDRIMLGFGMEG", "QIFQGQLPAIEHERBEPBNKR", "KNENHNIEIBODCJIFPAPB", "OKBMBPKERMKDPIAJHRHQE", "KRHPHKOKNKMJRNIRHCJF", "QKPEPBOHKOKCQNANFIQJM", "KEHKBMBOKEQIJBQNAEGLM", "REPKNHKRBEMJAFIJARNDM", "CJQCLRJMJBHNHEPHEMP", "JQHNHNLNEOGCLOEGECM", "EBKGQCNEBKHRGPLARGDB", "KMKNEOHPHBRDAEHNLDMEG", "KEOBQOBENHFIRAJOCFHEA", "LFNBJNBNKNJPBEMILPCPD", "ADQFCLQJCMQFNBJBQFHNE", "DBQJHQKQNHFGJEAQBPJGB", "QAECQCQCEQKFRKHLRGAJM", "EQKAQHENCKCLCENFAPOIL", "BPEHRNKHOBOLRIDCMKOJA", "NBNEQKDHLBFGNINKRGJC", "EQHPKPKEBNEALFMARGOBM", "OHNEBEHENBODQBDCDIJQG", "ERHFBGRFNAFBOBKPHOKO", "NHQIQEGAFILRCPDMGE", "MKAFQCQJHRKOEOBOBHQ", "HQNLQEQHJBMAFHRKGLGA", "QHQJDHJQDNBREHAFRJEIE", "EQNFQNDHNBDOEAPODICE", "KBNBOKHMBRCDQMARJFGO", "NCMAFAPGDJNKQCNKNAING", "KBOEOBOKEMADILINCMIM", "EGDKPILBDKQKCNCEBKCE", "RAHJBDPGOHFHNQEQBJHF", "BQCEBFCPGEQHEHJBFHJ", "IKANKNGNHQNLGMGFRLIJC", "RKHNBQBOEBLCKFBRLGAQ", "MHRHOBNKBPCJDPHFGADP", "LNHQBKQKNDQIMJRGDCQJE", "BREBQKEBOERDQILCFPAJ", "EAQGNEHECKIMLDRIBKNHO", "OBQHRBKPEOAQMIJOLFA", "BREMBKBREBPCLAFQLCLMA", "KAOIPDAOBJMEMBEOKRBHQ", "QIQNEAQBQNCPDGLAFIEB", "PHBKRBRBRBKIJBKALDRHJ", "MBQKHENEOKRDARLFILHDO", "NKPKROHEPHLGFQNLIAFC", "AIELPDCGERKQEPEOHKB", "BOEQEHQOBKHLECKBRNLIE", "RHNHBMKMEMLIFILALOGLR", "HRBENKMERKMAEOLBKCPDN", "EBQNFNFHBQDAPJGARCMJH", "MHEPKEQHRKMLMDIOHPANK", "QBQBLBKHBQDRFALOFMFIF", "OEHEMEQEHKOLPHCJRAMIL", "BQNBLNKNLNJGFIOALNCPD", "HKHBNDNLQKPARLEIBPA", "QKNEPKRKMERAQOLFCMFBE", "KHNBNJDBDBNAOHRIJQCMB", "CDKCOIDAKMFNBDBHJNQKQ", "MFLCMDPHQJGEBKIQINEIN", "EPKEHOBPEBMDHOGJCEROE", "NKAJMHKIPANBNDJHFNKBQ", "NJENDBDQNFHPFGBDAEOLG", "MGJMKBDCIFPHMPBEMEHKN", "HEPBMHQBPLIOHCLPHNJD", "MKMHMEBEBQDBFANFGOJR", "BDHJQFBQDNKOGALCQKNK", "JNDNHBNEHFRJCKQJOGAPF", "NGPGNCJIOFQDHNLQHFB", "FARHFBNLGQDNKBKBQFNB", "ILNAMDJPBQKCKNANKNI", "KBNKQEHNFQNALFGPNAMGQ", "HKMHMBKHRERARKIJADICK", "GEIPFKQLAOEHDNQELBKQH", "QEININKECQKMFCDMLQGFO", "BQLNBDQDNBFRAOFPOIRKA", "BEQHJBNDBKQIMHRIDRAR", "DANRLCMINLNQKMHRERKRB", "HEBPBKRBEOGLERMIJEQLI", "FQDQFBKBQHEOFOJICQJRN", "PJRADNIOBJNGEKHNCNGNQ", "BQNJBDNHQBPFQCDGMKBPJ", "RHEPENEMHROLGOFILCFRJ", "ODQBLGFALMBMEHOKOHMH", "JCDHQFPGMRDNQFHEBFNBJ", "DNARCQIRDOKHQENFBNFBF", "HPKROBEMBKOFIBLRCPNGJ", "EOEPHEQBNHKDGQOIDCNIC", "JQBQNLBFQKHMLIKDRNFID", "BNBPMBEBRENJFGRAFGPBF", "NKMEHRHRKCFGBNCFHRD", "PKQHEMBKREBLHECQNJFC", "HPEHEMKHRKPFRJEOHOALD", "HKQBQBDQHLNCKIMFRCFMJ", "QADMJIQAPDBKGQCKIKNG", "AQDRJAFJCOEHOEOENHQH", "KHEPHRNKNEOGRFCRBOBLI", "BQHPERNBERARLMIPEBLCD", "NFLQGLOPJAOBKBKPBRBOE", "EHEOKQKQHRBFCNGOKMHJB", "ENJHLNHBNFIQKDPDIRJB", "NHOEQHEOHPDIJHLDCJFOL", "MERKMKRHEQEALHDMGRCDA", "HNKHQBNKHPBFHFOGLBMFG", "GJIPIEAQDOKQCNGQINHQA", "OKEOHBMENAMCFADGRHLDN", "MEHEHOHQKHEIAMDAJGPHM", "BDHLQNLBQBDRJGAOIDBNJ", "OEOEOEPBPENALDANBKOHP", "EHEROHKMHBNIFRBQLIKOK", "KBNBPBMEHBRGALPGOAJBN", "RHERHKHQHPOJIAFGJBKCO", "BDNJDQDNDNECPHEBDIPHD", "HEJHRDAELGMQHMKMKRBRH", "LBFJHRAIKOHQDNJHDBHQL", "MEOKEMBKOBEGPDBJQGMCE", "MEBMEPKBQJGOFIOCJEB", "KHRKHENEOBOFMJIFMAKR", "EHEHAKNBNAEMGKOLADAKA", "ARIFHPJGKOGNFNKNLNBNB", "AMGDCLCPFRGKNANEKANQG", "HQHQKDBDQJMIJHOECPDP", "NECEAQHNEAQLGOKDIQNKO", "HENINICENBFCKOJILNJBP", "KEQOEMBQKOHLCMGKHBPJN", "KNBOHROHENHAQLODICEMF", "DQHLNKQDQBDMHCPJIFIQE", "DBNKHLNBFHFCPGKDRLBOL", "MCINJPBHQCLQKNBJBKHQF", "NJQGEHMJADBMBOBERKMQB", "HNKDNJNHFNDGLENGRFNAR", "FOILAFMFMFANBNGKBQKCN", "GMDJCDRBFPCQEHEKGNCKB", "NHDHNENLENFGALGKOGDAP", "MEMHBEMKHEHDCKPKGOJOA", "NCHPFGODJAKMKNHKPEOEN", "QEPKPHPNHKAPFOKIDMLC", "EQKRBREREHRJGFGJNAOAE", "FOEKNKCOGLBOKQERKRBPE", "EBERKQMHBEMFHLADGFQFH", "BQKAECKQIKADRMJGMKGRG", "MHMKOHQBMKOGMLFHCOKHL", "LNFQENHBFBLAFMLAPLEOB", "NHKDHQEBQJIQFCDRMJEHC", "KCIMFCPKIFBNDKBQEJNQ", "MREQBIFAGLHNPEHRHKBKR", "MENKRKOKMBMCQJBRBFRIC", "KGOAFPJMKAOBEQEOHEBP", "HKQENGBKINAFPNGMCERGF", "JMAGFHFPDGEBKOHREBQKM", "GCNECNAQENJIEPAJPFGR", "AJIEBQLADQEOEKHPBOH", "FQHFBNBEHNLADRFOLQOGB", "KRNEBMHOBPHLAFRLICOLR", "FGJANHNFCRBNKOKBKHRE", "KNKNHBOBNHDNJIOBPCLI", "EBEQBQDHFHRIKOCLGMHA", "BQHQNDNJFBKPEQHFMIPAE", "OBMHBNENEHOFHCEGKQLFA", "FHLBQBDNDNECMGREBFCMD", "JBQDHNKHKFHPHAKRJMEGC", "QFBQBDHQDBQGLPAENKMHL", "QBEPKPEBODBOGLMFRAO", "BNHJNLHQKHQOKCLOCDIBR", "QAEJIPDGMCNQKHDQKBFNB", "KQDBKQHKNDQGDHMDPCNG", "AGQJPFCMJAEHMHPKNPBOE", "QBREMKEPBRHLFAQOJEBDO", "HPHEOKHOEBOAJGFIQLAP", "BREOBEREBEHLOGCFOKRLB", "MHBOKHRNENCMGQAPLIDN", "KGKRIFMLCRDBHQHEHFNF"
                    ]
                ];
                /***/
            },

            /***/
            "Sy1n":
            /*!**********************************!*\
              !*** ./src/app/app.component.ts ***!
              \**********************************/

            /*! exports provided: AppComponent */

            /***/
                function Sy1n(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "AppComponent", function() {
                    return AppComponent;
                });
                /* harmony import */


                var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                    /*! @angular/core */
                    "fXoL");
                /* harmony import */


                var _scramble_scramble_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                    /*! ./scramble/scramble.component */
                    "mx2c");

                var AppComponent = function AppComponent() {
                    _classCallCheck(this, AppComponent);

                    this.title = 'cube-trainer';
                };

                AppComponent.ɵfac = function AppComponent_Factory(t) {
                    return new(t || AppComponent)();
                };

                AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
                    type: AppComponent,
                    selectors: [
                        ["app-root"]
                    ],
                    decls: 1,
                    vars: 0,
                    template: function AppComponent_Template(rf, ctx) {
                        if (rf & 1) {
                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-scramble");
                        }
                    },
                    directives: [_scramble_scramble_component__WEBPACK_IMPORTED_MODULE_1__["ScrambleComponent"]],
                    styles: ["[_ngcontent-%COMP%]:root {\n    --bg-color: 236, 240, 241;\n    --logo-color: 107, 89, 109;\n    --accent-color: 170, 109, 163;\n}\nbody[_ngcontent-%COMP%] {\n    font-family: Arial, sans-serif;\n    font-weight: bold;\n    font-size: 14px;\n    color: rgb(var(--logo-color));\n    background: rgb(var(--bg-color));\n    text-align: center;\n}\n.input-color-container[_ngcontent-%COMP%] {\n    position: relative;\n    overflow: hidden;\n    width: 24px;\n    height: 24px;\n    border-radius: 2px;\n    border-color: #FFF;\n    border-style: solid;\n    border-width: 2px;\n    margin: 5px;\n    display: inline-block;\n}\n.input-color[_ngcontent-%COMP%] {\n    position: absolute;\n    right: -8px;\n    top: -8px;\n    width: 56px;\n    height: 56px;\n    border: none;\n}\n.title[_ngcontent-%COMP%] {\n    font-weight: bold;\n    font-size: 40px;\n}\n.ritle[_ngcontent-%COMP%] {\n    font-weight: normal;\n    margin-top: -20px;\n}\n.wrap[_ngcontent-%COMP%] {\n    margin-top: -15px;\n    margin-left: 0px;\n    text-align: center;\n}\n.outder[_ngcontent-%COMP%] {\n    border: 5px;\n    border-color: rgb(var(--accent-color));\n    padding: 25px;\n    background: rgb(var(--accent-color));\n    color: rgb(var(--bg-color));\n    margin: 40px auto;\n    border-radius: 8px;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    width: 70%;\n}\n.settings[_ngcontent-%COMP%] {\n    border: 5px;\n    border-color: rgb(var(--bg-color));\n    padding: 25px;\n    background: rgb(var(--bg-color));\n    margin: 40px auto;\n    border-radius: 8px;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    width: 25%;\n    z-index: 999;\n    position: fixed;\n    top: 25%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\na[_ngcontent-%COMP%] {\n    transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);\n    display: block;\n    margin: 20px auto;\n    max-width: 100px;\n    text-decoration: none;\n    border-radius: 8px;\n    padding-top: 10px;\n    padding-left: 25px;\n    padding-bottom: 10px;\n    padding-right: 25px;\n}\na.button[_ngcontent-%COMP%] {\n    color: rgba(var(--bg-color), 0.8);\n    background: rgba(var(--accent-color), 0.7);\n    box-shadow: rgba(var(--accent-color), 0.4) 0 0px 0px 3px inset;\n}\na.button[_ngcontent-%COMP%]:hover {\n    color: rgba(var(--bg-color), 0.95);\n    box-shadow: rgba(var(--accent-color), 0.7) 0 0px 0px 40px inset;\n}\n.big[_ngcontent-%COMP%] {\n    font-size: 1.2em;\n}\n.small[_ngcontent-%COMP%] {\n    font-size: .7em;\n}\n.square[_ngcontent-%COMP%] {\n    width: .7em;\n    height: .7em;\n    margin: .5em;\n    display: inline-block;\n}\n\n.custom-dropdown[_ngcontent-%COMP%] {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    margin: 10px;\n    \n}\n.custom-dropdown[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    background-color: rgb(var(--accent-color));\n    color: rgb(var(--bg-color));\n    font-size: inherit;\n    padding: .5em;\n    padding-right: 2.5em;\n    border: 0;\n    margin: 0;\n    border-radius: 3px;\n    text-indent: 0.01px;\n    text-overflow: '';\n    \n    -moz-appearance: none;\n    \n    -webkit-appearance: none;\n    \n    appearance: none;\n}\n\n.custom-dropdown[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::-ms-expand {\n    display: none;\n}\n.custom-dropdown[_ngcontent-%COMP%]::before, .custom-dropdown[_ngcontent-%COMP%]::after {\n    content: \"\";\n    position: absolute;\n    pointer-events: none;\n}\n.custom-dropdown[_ngcontent-%COMP%]::after {\n    \n    content: \"\\25BC\";\n    height: 1em;\n    font-size: .625em;\n    line-height: 1;\n    right: 1.2em;\n    top: 50%;\n    margin-top: -.5em;\n}\n.custom-dropdown[_ngcontent-%COMP%]::before {\n    \n    width: 2em;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    border-radius: 0 3px 3px 0;\n    background-color: rgba(0, 0, 0, .2);\n}\n.custom-dropdown[_ngcontent-%COMP%]::after {\n    color: rgba(0, 0, 0, .6);\n}\n.custom-dropdown[_ngcontent-%COMP%]   select[disabled][_ngcontent-%COMP%] {\n    color: rgba(0, 0, 0, .25);\n}\n.icon[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    margin: 5px;\n    fill: rgb(var(--logo-color));\n}\nh3[_ngcontent-%COMP%] {\n    display: inline-block;\n    vertical-align: middle;\n    padding-right: 5px;\n}\n.break[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n    height: 0;\n}\n.settingsWindow[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: center;\n}\n.parentDisable[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: #000;\n    opacity: 0.25;\n    z-index: 998;\n    height: 100%;\n    width: 100%;\n}\n.no-js[_ngcontent-%COMP%]   #loader[_ngcontent-%COMP%] { display: none;  }\n.js[_ngcontent-%COMP%]   #loader[_ngcontent-%COMP%] { display: block; position: absolute; left: 100px; top: 0; }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOEVBQThFO0FBQzlFO0lBQ0kseUJBQXlCO0lBQ3pCLDBCQUEwQjtJQUMxQiw2QkFBNkI7QUFDakM7QUFFQTtJQUNJLDhCQUE4QjtJQUM5QixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLDZCQUE2QjtJQUM3QixnQ0FBZ0M7SUFDaEMsa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLFdBQVc7SUFDWCxxQkFBcUI7QUFDekI7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsU0FBUztJQUNULFdBQVc7SUFDWCxZQUFZO0lBQ1osWUFBWTtBQUNoQjtBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGVBQWU7QUFDbkI7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixpQkFBaUI7QUFDckI7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxXQUFXO0lBQ1gsc0NBQXNDO0lBQ3RDLGFBQWE7SUFDYixvQ0FBb0M7SUFDcEMsMkJBQTJCO0lBQzNCLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQixVQUFVO0FBQ2Q7QUFFQTtJQUNJLFdBQVc7SUFDWCxrQ0FBa0M7SUFDbEMsYUFBYTtJQUNiLGdDQUFnQztJQUNoQyxpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsVUFBVTtJQUNWLFlBQVk7SUFDWixlQUFlO0lBQ2YsUUFBUTtJQUNSLFNBQVM7SUFDVCxnQ0FBZ0M7QUFDcEM7QUFFQTtJQUtJLDhEQUE4RDtJQUM5RCxjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsb0JBQW9CO0lBQ3BCLG1CQUFtQjtBQUN2QjtBQUVBO0lBQ0ksaUNBQWlDO0lBQ2pDLDBDQUEwQztJQUMxQyw4REFBOEQ7QUFDbEU7QUFFQTtJQUNJLGtDQUFrQztJQUNsQywrREFBK0Q7QUFDbkU7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjtBQUVBO0lBQ0ksZUFBZTtBQUNuQjtBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixZQUFZO0lBQ1oscUJBQXFCO0FBQ3pCO0FBR0Esb0JBQW9CO0FBRXBCO0lBQ0ksa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLGNBQWM7QUFDbEI7QUFFQTtJQUNJLDBDQUEwQztJQUMxQywyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixvQkFBb0I7SUFDcEIsU0FBUztJQUNULFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixzQ0FBc0M7SUFDdEMscUJBQXFCO0lBQ3JCLHFDQUFxQztJQUNyQyx3QkFBd0I7SUFDeEIsaURBQWlEO0lBQ2pELGdCQUFnQjtBQUNwQjtBQUdBLG1DQUFtQztBQUVuQztJQUNJLGFBQWE7QUFDakI7QUFFQTs7SUFFSSxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLG9CQUFvQjtBQUN4QjtBQUVBO0lBQ0ksMkJBQTJCO0lBQzNCLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxZQUFZO0lBQ1osUUFBUTtJQUNSLGlCQUFpQjtBQUNyQjtBQUVBO0lBQ0ksaUNBQWlDO0lBQ2pDLFVBQVU7SUFDVixRQUFRO0lBQ1IsTUFBTTtJQUNOLFNBQVM7SUFDVCwwQkFBMEI7SUFDMUIsbUNBQW1DO0FBQ3ZDO0FBRUE7SUFDSSx3QkFBd0I7QUFDNUI7QUFFQTtJQUNJLHlCQUF5QjtBQUM3QjtBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixXQUFXO0lBQ1gsNEJBQTRCO0FBQ2hDO0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsc0JBQXNCO0lBQ3RCLGtCQUFrQjtBQUN0QjtBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFNBQVM7QUFDYjtBQUVBO0lBQ0ksYUFBYTtJQUNiLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsdUJBQXVCO0FBQzNCO0FBRUE7SUFDSSxlQUFlO0lBQ2YsTUFBTTtJQUNOLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLFlBQVk7SUFDWixZQUFZO0lBQ1osV0FBVztBQUNmO0FBRUEsaUJBQWlCLGFBQWEsR0FBRztBQUNqQyxjQUFjLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBZb3UgY2FuIGFkZCBnbG9iYWwgc3R5bGVzIHRvIHRoaXMgZmlsZSwgYW5kIGFsc28gaW1wb3J0IG90aGVyIHN0eWxlIGZpbGVzICovXG46cm9vdCB7XG4gICAgLS1iZy1jb2xvcjogMjM2LCAyNDAsIDI0MTtcbiAgICAtLWxvZ28tY29sb3I6IDEwNywgODksIDEwOTtcbiAgICAtLWFjY2VudC1jb2xvcjogMTcwLCAxMDksIDE2Mztcbn1cblxuYm9keSB7XG4gICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogcmdiKHZhcigtLWxvZ28tY29sb3IpKTtcbiAgICBiYWNrZ3JvdW5kOiByZ2IodmFyKC0tYmctY29sb3IpKTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5pbnB1dC1jb2xvci1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHdpZHRoOiAyNHB4O1xuICAgIGhlaWdodDogMjRweDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgYm9yZGVyLWNvbG9yOiAjRkZGO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgbWFyZ2luOiA1cHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4uaW5wdXQtY29sb3Ige1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogLThweDtcbiAgICB0b3A6IC04cHg7XG4gICAgd2lkdGg6IDU2cHg7XG4gICAgaGVpZ2h0OiA1NnB4O1xuICAgIGJvcmRlcjogbm9uZTtcbn1cblxuLnRpdGxlIHtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LXNpemU6IDQwcHg7XG59XG5cbi5yaXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICBtYXJnaW4tdG9wOiAtMjBweDtcbn1cblxuLndyYXAge1xuICAgIG1hcmdpbi10b3A6IC0xNXB4O1xuICAgIG1hcmdpbi1sZWZ0OiAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ub3V0ZGVyIHtcbiAgICBib3JkZXI6IDVweDtcbiAgICBib3JkZXItY29sb3I6IHJnYih2YXIoLS1hY2NlbnQtY29sb3IpKTtcbiAgICBwYWRkaW5nOiAyNXB4O1xuICAgIGJhY2tncm91bmQ6IHJnYih2YXIoLS1hY2NlbnQtY29sb3IpKTtcbiAgICBjb2xvcjogcmdiKHZhcigtLWJnLWNvbG9yKSk7XG4gICAgbWFyZ2luOiA0MHB4IGF1dG87XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICAgIHdpZHRoOiA3MCU7XG59XG5cbi5zZXR0aW5ncyB7XG4gICAgYm9yZGVyOiA1cHg7XG4gICAgYm9yZGVyLWNvbG9yOiByZ2IodmFyKC0tYmctY29sb3IpKTtcbiAgICBwYWRkaW5nOiAyNXB4O1xuICAgIGJhY2tncm91bmQ6IHJnYih2YXIoLS1iZy1jb2xvcikpO1xuICAgIG1hcmdpbjogNDBweCBhdXRvO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcbiAgICB3aWR0aDogMjUlO1xuICAgIHotaW5kZXg6IDk5OTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAyNSU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xufVxuXG5hIHtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAyMDBtcyBjdWJpYy1iZXppZXIoMC4zOTAsIDAuNTAwLCAwLjE1MCwgMS4zNjApO1xuICAgIC1tb3otdHJhbnNpdGlvbjogYWxsIDIwMG1zIGN1YmljLWJlemllcigwLjM5MCwgMC41MDAsIDAuMTUwLCAxLjM2MCk7XG4gICAgLW1zLXRyYW5zaXRpb246IGFsbCAyMDBtcyBjdWJpYy1iZXppZXIoMC4zOTAsIDAuNTAwLCAwLjE1MCwgMS4zNjApO1xuICAgIC1vLXRyYW5zaXRpb246IGFsbCAyMDBtcyBjdWJpYy1iZXppZXIoMC4zOTAsIDAuNTAwLCAwLjE1MCwgMS4zNjApO1xuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBjdWJpYy1iZXppZXIoMC4zOTAsIDAuNTAwLCAwLjE1MCwgMS4zNjApO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbjogMjBweCBhdXRvO1xuICAgIG1heC13aWR0aDogMTAwcHg7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDI1cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgcGFkZGluZy1yaWdodDogMjVweDtcbn1cblxuYS5idXR0b24ge1xuICAgIGNvbG9yOiByZ2JhKHZhcigtLWJnLWNvbG9yKSwgMC44KTtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWFjY2VudC1jb2xvciksIDAuNyk7XG4gICAgYm94LXNoYWRvdzogcmdiYSh2YXIoLS1hY2NlbnQtY29sb3IpLCAwLjQpIDAgMHB4IDBweCAzcHggaW5zZXQ7XG59XG5cbmEuYnV0dG9uOmhvdmVyIHtcbiAgICBjb2xvcjogcmdiYSh2YXIoLS1iZy1jb2xvciksIDAuOTUpO1xuICAgIGJveC1zaGFkb3c6IHJnYmEodmFyKC0tYWNjZW50LWNvbG9yKSwgMC43KSAwIDBweCAwcHggNDBweCBpbnNldDtcbn1cblxuLmJpZyB7XG4gICAgZm9udC1zaXplOiAxLjJlbTtcbn1cblxuLnNtYWxsIHtcbiAgICBmb250LXNpemU6IC43ZW07XG59XG5cbi5zcXVhcmUge1xuICAgIHdpZHRoOiAuN2VtO1xuICAgIGhlaWdodDogLjdlbTtcbiAgICBtYXJnaW46IC41ZW07XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG5cbi8qIEN1c3RvbSBkcm9wZG93biAqL1xuXG4uY3VzdG9tLWRyb3Bkb3duIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgbWFyZ2luOiAxMHB4O1xuICAgIC8qIGRlbW8gb25seSAqL1xufVxuXG4uY3VzdG9tLWRyb3Bkb3duIHNlbGVjdCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKHZhcigtLWFjY2VudC1jb2xvcikpO1xuICAgIGNvbG9yOiByZ2IodmFyKC0tYmctY29sb3IpKTtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgcGFkZGluZzogLjVlbTtcbiAgICBwYWRkaW5nLXJpZ2h0OiAyLjVlbTtcbiAgICBib3JkZXI6IDA7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICB0ZXh0LWluZGVudDogMC4wMXB4O1xuICAgIHRleHQtb3ZlcmZsb3c6ICcnO1xuICAgIC8qSGlkaW5nIHRoZSBzZWxlY3QgYXJyb3cgZm9yIGZpcmVmb3gqL1xuICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICAvKkhpZGluZyB0aGUgc2VsZWN0IGFycm93IGZvciBjaHJvbWUqL1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAvKkhpZGluZyB0aGUgc2VsZWN0IGFycm93IGRlZmF1bHQgaW1wbGVtZW50YXRpb24qL1xuICAgIGFwcGVhcmFuY2U6IG5vbmU7XG59XG5cblxuLypIaWRpbmcgdGhlIHNlbGVjdCBhcnJvdyBmb3IgSUUxMCovXG5cbi5jdXN0b20tZHJvcGRvd24gc2VsZWN0OjotbXMtZXhwYW5kIHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuXG4uY3VzdG9tLWRyb3Bkb3duOjpiZWZvcmUsXG4uY3VzdG9tLWRyb3Bkb3duOjphZnRlciB7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi5jdXN0b20tZHJvcGRvd246OmFmdGVyIHtcbiAgICAvKiAgQ3VzdG9tIGRyb3Bkb3duIGFycm93ICovXG4gICAgY29udGVudDogXCJcXDI1QkNcIjtcbiAgICBoZWlnaHQ6IDFlbTtcbiAgICBmb250LXNpemU6IC42MjVlbTtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICByaWdodDogMS4yZW07XG4gICAgdG9wOiA1MCU7XG4gICAgbWFyZ2luLXRvcDogLS41ZW07XG59XG5cbi5jdXN0b20tZHJvcGRvd246OmJlZm9yZSB7XG4gICAgLyogIEN1c3RvbSBkcm9wZG93biBhcnJvdyBjb3ZlciAqL1xuICAgIHdpZHRoOiAyZW07XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBib3JkZXItcmFkaXVzOiAwIDNweCAzcHggMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC4yKTtcbn1cblxuLmN1c3RvbS1kcm9wZG93bjo6YWZ0ZXIge1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIC42KTtcbn1cblxuLmN1c3RvbS1kcm9wZG93biBzZWxlY3RbZGlzYWJsZWRdIHtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAuMjUpO1xufVxuXG4uaWNvbiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBtYXJnaW46IDVweDtcbiAgICBmaWxsOiByZ2IodmFyKC0tbG9nby1jb2xvcikpO1xufVxuXG5oMyB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgcGFkZGluZy1yaWdodDogNXB4O1xufVxuXG4uYnJlYWsge1xuICAgIGZsZXgtYmFzaXM6IDEwMCU7XG4gICAgaGVpZ2h0OiAwO1xufVxuXG4uc2V0dGluZ3NXaW5kb3cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5wYXJlbnREaXNhYmxlIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgYmFja2dyb3VuZDogIzAwMDtcbiAgICBvcGFjaXR5OiAwLjI1O1xuICAgIHotaW5kZXg6IDk5ODtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbi5uby1qcyAjbG9hZGVyIHsgZGlzcGxheTogbm9uZTsgIH1cbi5qcyAjbG9hZGVyIHsgZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogMTAwcHg7IHRvcDogMDsgfVxuIl19 */"]
                });
                /*@__PURE__*/

                (function() {
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
                        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                        args: [{
                            selector: 'app-root',
                            templateUrl: './app.component.html',
                            styleUrls: ['./app.component.css']
                        }]
                    }], null, null);
                })();
                /***/

            },

            /***/
            "UsXn":
            /*!************************************!*\
              !*** ./src/app/cstimer/mathlib.js ***!
              \************************************/

            /*! exports provided: mathlib */

            /***/
                function UsXn(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "mathlib", function() {
                    return mathlib;
                });
                /* harmony import */


                var _mersenneTwister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                    /*! ./mersenneTwister.js */
                    "2xHg");

                var DEBUG = false;

                var mathlib = function() {
                    var Cnk = [],
                        fact = [1];

                    for (var i = 0; i < 32; ++i) {
                        Cnk[i] = [];

                        for (var j = 0; j < 32; ++j) {
                            Cnk[i][j] = 0;
                        }
                    }

                    for (var i = 0; i < 32; ++i) {
                        Cnk[i][0] = Cnk[i][i] = 1;
                        fact[i + 1] = fact[i] * (i + 1);

                        for (var j = 1; j < i; ++j) {
                            Cnk[i][j] = Cnk[i - 1][j - 1] + Cnk[i - 1][j];
                        }
                    }

                    function circleOri(arr, a, b, c, d, ori) {
                        var temp = arr[a];
                        arr[a] = arr[d] ^ ori;
                        arr[d] = arr[c] ^ ori;
                        arr[c] = arr[b] ^ ori;
                        arr[b] = temp ^ ori;
                    }

                    function circle(arr) {
                        var length = arguments.length - 1,
                            temp = arr[arguments[length]];

                        for (var i = length; i > 1; i--) {
                            arr[arguments[i]] = arr[arguments[i - 1]];
                        }

                        arr[arguments[1]] = temp;
                        return circle;
                    } //perm: [idx1, idx2, ..., idxn]
                    //pow: 1, 2, 3, ...
                    //ori: ori1, ori2, ..., orin, base
                    // arr[perm[idx2]] = arr[perm[idx1]] + ori[idx2] - ori[idx1] + base


                    function acycle(arr, perm, pow, ori) {
                        pow = pow || 1;
                        var plen = perm.length;
                        var tmp = [];

                        for (var i = 0; i < plen; i++) {
                            tmp[i] = arr[perm[i]];
                        }

                        for (var i = 0; i < plen; i++) {
                            var j = (i + pow) % plen;
                            arr[perm[j]] = tmp[i];

                            if (ori) {
                                arr[perm[j]] += ori[j] - ori[i] + ori[ori.length - 1];
                            }
                        }

                        return acycle;
                    }

                    function getPruning(table, index) {
                        return table[index >> 3] >> ((index & 7) << 2) & 15;
                    }

                    function setNPerm(arr, idx, n) {
                        var i, j;
                        arr[n - 1] = 0;

                        for (i = n - 2; i >= 0; --i) {
                            arr[i] = idx % (n - i);
                            idx = ~~(idx / (n - i));

                            for (j = i + 1; j < n; ++j) {
                                arr[j] >= arr[i] && ++arr[j];
                            }
                        }
                    }

                    function getNPerm(arr, n) {
                        var i, idx, j;
                        idx = 0;

                        for (i = 0; i < n; ++i) {
                            idx *= n - i;

                            for (j = i + 1; j < n; ++j) {
                                arr[j] < arr[i] && ++idx;
                            }
                        }

                        return idx;
                    }

                    function getNParity(idx, n) {
                        var i, p;
                        p = 0;

                        for (i = n - 2; i >= 0; --i) {
                            p ^= idx % (n - i);
                            idx = ~~(idx / (n - i));
                        }

                        return p & 1;
                    }

                    function get8Perm(arr, n, even) {
                        n = n || 8;
                        var idx = 0;
                        var val = 0x76543210;

                        for (var i = 0; i < n - 1; ++i) {
                            var v = arr[i] << 2;
                            idx = (n - i) * idx + (val >> v & 7);
                            val -= 0x11111110 << v;
                        }

                        return even < 0 ? idx >> 1 : idx;
                    }

                    function set8Perm(arr, idx, n, even) {
                        n = (n || 8) - 1;
                        var val = 0x76543210;
                        var prt = 0;

                        if (even < 0) {
                            idx <<= 1;
                        }

                        for (var i = 0; i < n; ++i) {
                            var p = fact[n - i];
                            var v = ~~(idx / p);
                            prt ^= v;
                            idx %= p;
                            v <<= 2;
                            arr[i] = val >> v & 7;
                            var m = (1 << v) - 1;
                            val = (val & m) + (val >> 4 & ~m);
                        }

                        if (even < 0 && (prt & 1) != 0) {
                            arr[n] = arr[n - 1];
                            arr[n - 1] = val & 7;
                        } else {
                            arr[n] = val & 7;
                        }

                        return arr;
                    }

                    function getNOri(arr, n, evenbase) {
                        var base = Math.abs(evenbase);
                        var idx = evenbase < 0 ? 0 : arr[0] % base;

                        for (var i = n - 1; i > 0; i--) {
                            idx = idx * base + arr[i] % base;
                        }

                        return idx;
                    }

                    function setNOri(arr, idx, n, evenbase) {
                        var base = Math.abs(evenbase);
                        var parity = base * n;

                        for (var i = 1; i < n; i++) {
                            arr[i] = idx % base;
                            parity -= arr[i];
                            idx = ~~(idx / base);
                        }

                        arr[0] = (evenbase < 0 ? parity : idx) % base;
                        return arr;
                    } // type: 'p', 'o'
                    // evenbase: base for ori, sign for even parity


                    function coord(type, length, evenbase) {
                        this.length = length;
                        this.evenbase = evenbase;
                        this.get = type == 'p' ? function(arr) {
                            return get8Perm(arr, this.length, this.evenbase);
                        } : function(arr) {
                            return getNOri(arr, this.length, this.evenbase);
                        };
                        this.set = type == 'p' ? function(arr, idx) {
                            return set8Perm(arr, idx, this.length, this.evenbase);
                        } : function(arr, idx) {
                            return setNOri(arr, idx, this.length, this.evenbase);
                        };
                    }

                    function fillFacelet(facelets, f, perm, ori, divcol) {
                        for (var i = 0; i < facelets.length; i++) {
                            for (var j = 0; j < facelets[i].length; j++) {
                                f[facelets[i][(j + ori[i]) % facelets[i].length]] = ~~(facelets[perm[i]][j] / divcol);
                            }
                        }
                    }

                    function createMove(moveTable, size, doMove, N_MOVES) {
                        N_MOVES = N_MOVES || 6;

                        if (Array.isArray(doMove)) {
                            var cord = new coord(doMove[1], doMove[2], doMove[3]);
                            doMove = doMove[0];

                            for (var j = 0; j < N_MOVES; j++) {
                                moveTable[j] = [];

                                for (var i = 0; i < size; i++) {
                                    var arr = cord.set([], i);
                                    doMove(arr, j);
                                    moveTable[j][i] = cord.get(arr);
                                }
                            }
                        } else {
                            for (var j = 0; j < N_MOVES; j++) {
                                moveTable[j] = [];

                                for (var i = 0; i < size; i++) {
                                    moveTable[j][i] = doMove(i, j);
                                }
                            }
                        }
                    }

                    function edgeMove(arr, m) {
                        if (m == 0) {
                            //F
                            circleOri(arr, 0, 7, 8, 4, 1);
                        } else if (m == 1) {
                            //R
                            circleOri(arr, 3, 6, 11, 7, 0);
                        } else if (m == 2) {
                            //U
                            circleOri(arr, 0, 1, 2, 3, 0);
                        } else if (m == 3) {
                            //B
                            circleOri(arr, 2, 5, 10, 6, 1);
                        } else if (m == 4) {
                            //L
                            circleOri(arr, 1, 4, 9, 5, 0);
                        } else if (m == 5) {
                            //D
                            circleOri(arr, 11, 10, 9, 8, 0);
                        }
                    }

                    function CubieCube() {
                        this.ca = [0, 1, 2, 3, 4, 5, 6, 7];
                        this.ea = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
                    }

                    CubieCube.EdgeMult = function(a, b, prod) {
                        for (var ed = 0; ed < 12; ed++) {
                            prod.ea[ed] = a.ea[b.ea[ed] >> 1] ^ b.ea[ed] & 1;
                        }
                    };

                    CubieCube.CornMult = function(a, b, prod) {
                        for (var corn = 0; corn < 8; corn++) {
                            var ori = ((a.ca[b.ca[corn] & 7] >> 3) + (b.ca[corn] >> 3)) % 3;
                            prod.ca[corn] = a.ca[b.ca[corn] & 7] & 7 | ori << 3;
                        }
                    };

                    CubieCube.CubeMult = function(a, b, prod) {
                        CubieCube.CornMult(a, b, prod);
                        CubieCube.EdgeMult(a, b, prod);
                    };

                    CubieCube.prototype.init = function(ca, ea) {
                        this.ca = ca.slice();
                        this.ea = ea.slice();
                        return this;
                    };

                    CubieCube.prototype.isEqual = function(c) {
                        for (var i = 0; i < 8; i++) {
                            if (this.ca[i] != c.ca[i]) {
                                return false;
                            }
                        }

                        for (var i = 0; i < 12; i++) {
                            if (this.ea[i] != c.ea[i]) {
                                return false;
                            }
                        }

                        return true;
                    };

                    var cornerFacelet = [
                        [8, 9, 20],
                        [6, 18, 38],
                        [0, 36, 47],
                        [2, 45, 11],
                        [29, 26, 15],
                        [27, 44, 24],
                        [33, 53, 42],
                        [35, 17, 51]
                    ];
                    var edgeFacelet = [
                        [5, 10],
                        [7, 19],
                        [3, 37],
                        [1, 46],
                        [32, 16],
                        [28, 25],
                        [30, 43],
                        [34, 52],
                        [23, 12],
                        [21, 41],
                        [50, 39],
                        [48, 14]
                    ];

                    CubieCube.prototype.toFaceCube = function(cFacelet, eFacelet) {
                        cFacelet = cFacelet || cornerFacelet;
                        eFacelet = eFacelet || edgeFacelet;
                        var ts = "URFDLB";
                        var f = [];

                        for (var i = 0; i < 54; i++) {
                            f[i] = ts[~~(i / 9)];
                        }

                        for (var c = 0; c < 8; c++) {
                            var j = this.ca[c] & 0x7; // cornercubie with index j is at

                            var ori = this.ca[c] >> 3; // Orientation of this cubie

                            for (var n = 0; n < 3; n++) {
                                f[cFacelet[c][(n + ori) % 3]] = ts[~~(cFacelet[j][n] / 9)];
                            }
                        }

                        for (var e = 0; e < 12; e++) {
                            var j = this.ea[e] >> 1; // edgecubie with index j is at edgeposition

                            var ori = this.ea[e] & 1; // Orientation of this cubie

                            for (var n = 0; n < 2; n++) {
                                f[eFacelet[e][(n + ori) % 2]] = ts[~~(eFacelet[j][n] / 9)];
                            }
                        }

                        return f.join("");
                    };

                    CubieCube.prototype.invFrom = function(cc) {
                        for (var edge = 0; edge < 12; edge++) {
                            this.ea[cc.ea[edge] >> 1] = edge << 1 | cc.ea[edge] & 1;
                        }

                        for (var corn = 0; corn < 8; corn++) {
                            this.ca[cc.ca[corn] & 0x7] = corn | 0x20 >> (cc.ca[corn] >> 3) & 0x18;
                        }

                        return this;
                    };

                    CubieCube.prototype.fromFacelet = function(facelet, cFacelet, eFacelet) {
                        cFacelet = cFacelet || cornerFacelet;
                        eFacelet = eFacelet || edgeFacelet;
                        var count = 0;
                        var f = [];
                        var centers = facelet[4] + facelet[13] + facelet[22] + facelet[31] + facelet[40] + facelet[49];

                        for (var i = 0; i < 54; ++i) {
                            f[i] = centers.indexOf(facelet[i]);

                            if (f[i] == -1) {
                                return -1;
                            }

                            count += 1 << (f[i] << 2);
                        }

                        if (count != 0x999999) {
                            return -1;
                        }

                        var col1, col2, i, j, ori;

                        for (i = 0; i < 8; ++i) {
                            for (ori = 0; ori < 3; ++ori) {
                                if (f[cFacelet[i][ori]] == 0 || f[cFacelet[i][ori]] == 3) break;
                            }

                            col1 = f[cFacelet[i][(ori + 1) % 3]];
                            col2 = f[cFacelet[i][(ori + 2) % 3]];

                            for (j = 0; j < 8; ++j) {
                                if (col1 == ~~(cFacelet[j][1] / 9) && col2 == ~~(cFacelet[j][2] / 9)) {
                                    this.ca[i] = j | ori % 3 << 3;
                                    break;
                                }
                            }
                        }

                        for (i = 0; i < 12; ++i) {
                            for (j = 0; j < 12; ++j) {
                                if (f[eFacelet[i][0]] == ~~(eFacelet[j][0] / 9) && f[eFacelet[i][1]] == ~~(eFacelet[j][1] / 9)) {
                                    this.ea[i] = j << 1;
                                    break;
                                }

                                if (f[eFacelet[i][0]] == ~~(eFacelet[j][1] / 9) && f[eFacelet[i][1]] == ~~(eFacelet[j][0] / 9)) {
                                    this.ea[i] = j << 1 | 1;
                                    break;
                                }
                            }
                        }

                        return this;
                    };

                    var moveCube = [];

                    for (var i = 0; i < 18; i++) {
                        moveCube[i] = new CubieCube();
                    }

                    moveCube[0].init([3, 0, 1, 2, 4, 5, 6, 7], [6, 0, 2, 4, 8, 10, 12, 14, 16, 18, 20, 22]);
                    moveCube[3].init([20, 1, 2, 8, 15, 5, 6, 19], [16, 2, 4, 6, 22, 10, 12, 14, 8, 18, 20, 0]);
                    moveCube[6].init([9, 21, 2, 3, 16, 12, 6, 7], [0, 19, 4, 6, 8, 17, 12, 14, 3, 11, 20, 22]);
                    moveCube[9].init([0, 1, 2, 3, 5, 6, 7, 4], [0, 2, 4, 6, 10, 12, 14, 8, 16, 18, 20, 22]);
                    moveCube[12].init([0, 10, 22, 3, 4, 17, 13, 7], [0, 2, 20, 6, 8, 10, 18, 14, 16, 4, 12, 22]);
                    moveCube[15].init([0, 1, 11, 23, 4, 5, 18, 14], [0, 2, 4, 23, 8, 10, 12, 21, 16, 18, 7, 15]);

                    for (var a = 0; a < 18; a += 3) {
                        for (var p = 0; p < 2; p++) {
                            CubieCube.EdgeMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
                            CubieCube.CornMult(moveCube[a + p], moveCube[a], moveCube[a + p + 1]);
                        }
                    }

                    CubieCube.moveCube = moveCube;

                    CubieCube.prototype.edgeCycles = function() {
                        var visited = [];
                        var small_cycles = [0, 0, 0];
                        var cycles = 0;
                        var parity = false;

                        for (var x = 0; x < 12; ++x) {
                            if (visited[x]) {
                                continue;
                            }

                            var length = -1;
                            var flip = false;
                            var y = x;

                            do {
                                visited[y] = true;
                                ++length;
                                flip ^= this.ea[y] & 1;
                                y = this.ea[y] >> 1;
                            } while (y != x);

                            cycles += length >> 1;

                            if (length & 1) {
                                parity = !parity;
                                ++cycles;
                            }

                            if (flip) {
                                if (length == 0) {
                                    ++small_cycles[0];
                                } else if (length & 1) {
                                    small_cycles[2] ^= 1;
                                } else {
                                    ++small_cycles[1];
                                }
                            }
                        }

                        small_cycles[1] += small_cycles[2];

                        if (small_cycles[0] < small_cycles[1]) {
                            cycles += small_cycles[0] + small_cycles[1] >> 1;
                        } else {
                            var flip_cycles = [0, 2, 3, 5, 6, 8, 9];
                            cycles += small_cycles[1] + flip_cycles[small_cycles[0] - small_cycles[1] >> 1];
                        }

                        return cycles - parity;
                    };

                    function createPrun(prun, init, size, maxd, doMove, N_MOVES, N_POWER, N_INV) {
                        var isMoveTable = Array.isArray(doMove);
                        N_MOVES = N_MOVES || 6;
                        N_POWER = N_POWER || 3;
                        N_INV = N_INV || 256;
                        maxd = maxd || 256;

                        for (var i = 0, len = size + 7 >>> 3; i < len; i++) {
                            prun[i] = -1;
                        }

                        prun[init >> 3] ^= 15 << ((init & 7) << 2);
                        var val = 0; // var t = +new Date;

                        for (var l = 0; l <= maxd; l++) {
                            var done = 0;
                            var inv = l >= N_INV;
                            var fill = l + 1 ^ 15;
                            var find = inv ? 0xf : l;
                            var check = inv ? l : 0xf;

                            out: for (var p = 0; p < size; p++, val >>= 4) {
                                if ((p & 7) == 0) {
                                    val = prun[p >> 3];

                                    if (!inv && val == -1) {
                                        p += 7;
                                        continue;
                                    }
                                }

                                if ((val & 0xf) != find) {
                                    continue;
                                }

                                for (var m = 0; m < N_MOVES; m++) {
                                    var q = p;

                                    for (var c = 0; c < N_POWER; c++) {
                                        q = isMoveTable ? doMove[m][q] : doMove(q, m);

                                        if (getPruning(prun, q) != check) {
                                            continue;
                                        }

                                        ++done;

                                        if (inv) {
                                            prun[p >> 3] ^= fill << ((p & 7) << 2);
                                            continue out;
                                        }

                                        prun[q >> 3] ^= fill << ((q & 7) << 2);
                                    }
                                }
                            }

                            if (done == 0) {
                                break;
                            }

                            DEBUG && console.log('[prun]', done);
                        }
                    } //state_params: [[init, doMove, size, [maxd], [N_INV]], [...]...]


                    function Solver(N_MOVES, N_POWER, state_params) {
                        this.N_STATES = state_params.length;
                        this.N_MOVES = N_MOVES;
                        this.N_POWER = N_POWER;
                        this.state_params = state_params;
                        this.inited = false;
                    }

                    var _ = Solver.prototype;

                    _.search = function(state, minl, MAXL) {
                        MAXL = (MAXL || 99) + 1;

                        if (!this.inited) {
                            this.move = [];
                            this.prun = [];

                            for (var i = 0; i < this.N_STATES; i++) {
                                var state_param = this.state_params[i];
                                var init = state_param[0];
                                var doMove = state_param[1];
                                var size = state_param[2];
                                var maxd = state_param[3];
                                var N_INV = state_param[4];
                                this.move[i] = [];
                                this.prun[i] = [];
                                createMove(this.move[i], size, doMove, this.N_MOVES);
                                createPrun(this.prun[i], init, size, maxd, this.move[i], this.N_MOVES, this.N_POWER, N_INV);
                            }

                            this.inited = true;
                        }

                        this.sol = [];

                        for (var maxl = minl; maxl < MAXL; maxl++) {
                            if (this.idaSearch(state, maxl, -1)) {
                                break;
                            }
                        }

                        return maxl == MAXL ? null : this.sol.reverse();
                    };

                    _.toStr = function(sol, move_map, power_map) {
                        var ret = [];

                        for (var i = 0; i < sol.length; i++) {
                            ret.push(move_map[sol[i][0]] + power_map[sol[i][1]]);
                        }

                        return ret.join(' ').replace(/ +/g, ' ');
                    };

                    _.idaSearch = function(state, maxl, lm) {
                        var N_STATES = this.N_STATES;

                        for (var i = 0; i < N_STATES; i++) {
                            if (getPruning(this.prun[i], state[i]) > maxl) {
                                return false;
                            }
                        }

                        if (maxl == 0) {
                            return true;
                        }

                        var offset = state[0] + maxl + lm + 1;

                        for (var move0 = 0; move0 < this.N_MOVES; move0++) {
                            var move = (move0 + offset) % this.N_MOVES;

                            if (move == lm) {
                                continue;
                            }

                            var cur_state = state.slice();

                            for (var power = 0; power < this.N_POWER; power++) {
                                for (var i = 0; i < N_STATES; i++) {
                                    cur_state[i] = this.move[i][move][cur_state[i]];
                                }

                                if (this.idaSearch(cur_state, maxl - 1, move)) {
                                    this.sol.push([move, power]);
                                    return true;
                                }
                            }
                        }

                        return false;
                    };

                    function identity(state) {
                        return state;
                    } // state: string not null
                    // solvedStates: [solvedstate, solvedstate, ...], string not null
                    // moveFunc: function(state, move);
                    // moves: {move: face0 | axis0}, face0 | axis0 = 4 + 4 bits


                    function gSolver(solvedStates, doMove, moves, prunHash) {
                        this.solvedStates = solvedStates;
                        this.doMove = doMove;
                        this.movesList = [];

                        for (var move in moves) {
                            this.movesList.push([move, moves[move]]);
                        }

                        this.prunHash = prunHash || identity;
                        this.prunTable = {};
                        this.toUpdateArr = null;
                        this.prunTableSize = 0;
                        this.prunDepth = -1;
                        this.cost = 0;
                    }

                    _ = gSolver.prototype;

                    _.updatePrun = function(targetDepth) {
                        targetDepth = targetDepth === undefined ? this.prunDepth + 1 : targetDepth;

                        for (var depth = this.prunDepth + 1; depth <= targetDepth; depth++) {
                            var t = +new Date();

                            if (depth < 1) {
                                this.prevSize = 0;

                                for (var i = 0; i < this.solvedStates.length; i++) {
                                    var state = this.prunHash(this.solvedStates[i]);

                                    if (!(state in this.prunTable)) {
                                        this.prunTable[state] = depth;
                                        this.prunTableSize++;
                                    }
                                }
                            } else {
                                this.updatePrunBFS(depth - 1);
                            }

                            if (this.cost == 0) {
                                return;
                            }

                            this.prunDepth = depth;
                            DEBUG && console.log(depth, this.prunTableSize - this.prevSize, +new Date() - t);
                            this.prevSize = this.prunTableSize;
                        }
                    };

                    _.updatePrunBFS = function(fromDepth) {
                        if (this.toUpdateArr == null) {
                            this.toUpdateArr = [];

                            for (var state in this.prunTable) {
                                if (this.prunTable[state] != fromDepth) {
                                    continue;
                                }

                                this.toUpdateArr.push(state);
                            }
                        }

                        while (this.toUpdateArr.length != 0) {
                            var state = this.toUpdateArr.pop();

                            for (var moveIdx = 0; moveIdx < this.movesList.length; moveIdx++) {
                                var newState = this.doMove(state, this.movesList[moveIdx][0]);

                                if (!newState || newState in this.prunTable) {
                                    continue;
                                }

                                this.prunTable[newState] = fromDepth + 1;
                                this.prunTableSize++;
                            }

                            if (this.cost >= 0) {
                                if (this.cost == 0) {
                                    return;
                                }

                                this.cost--;
                            }
                        }

                        this.toUpdateArr = null;
                    };

                    _.search = function(state, minl, MAXL) {
                        this.sol = [];
                        this.subOpt = false;
                        this.state = state;
                        this.visited = {};
                        this.maxl = minl = minl || 0;
                        return this.searchNext(MAXL);
                    };

                    _.searchNext = function(MAXL, cost) {
                        MAXL = MAXL + 1 || 99;
                        this.prevSolStr = this.solArr ? this.solArr.join(',') : null;
                        this.solArr = null;
                        this.cost = cost || -1;

                        for (; this.maxl < MAXL; this.maxl++) {
                            this.updatePrun(Math.ceil(this.maxl / 2));

                            if (this.cost == 0) {
                                return null;
                            }

                            if (this.idaSearch(this.state, this.maxl, null, 0)) {
                                break;
                            }
                        }

                        return this.solArr;
                    };

                    _.getPruning = function(state) {
                        var prun = this.prunTable[this.prunHash(state)];
                        return prun === undefined ? this.prunDepth + 1 : prun;
                    };

                    _.idaSearch = function(state, maxl, lm, depth) {
                        if (this.getPruning(state) > maxl) {
                            return false;
                        }

                        if (maxl == 0) {
                            if (this.solvedStates.indexOf(state) == -1) {
                                return false;
                            }

                            var solArr = this.getSolArr();
                            this.subOpt = true;

                            if (solArr.join(',') == this.prevSolStr) {
                                return false;
                            }

                            this.solArr = solArr;
                            return true;
                        }

                        if (!this.subOpt) {
                            if (state in this.visited && this.visited[state] < depth) {
                                return false;
                            }

                            this.visited[state] = depth;
                        }

                        if (this.cost >= 0) {
                            if (this.cost == 0) {
                                return true;
                            }

                            this.cost--;
                        }

                        var lastMove = lm == null ? '' : this.movesList[lm][0];
                        var lastAxisFace = lm == null ? -1 : this.movesList[lm][1];

                        for (var moveIdx = this.sol[depth] || 0; moveIdx < this.movesList.length; moveIdx++) {
                            var moveArgs = this.movesList[moveIdx];
                            var axisface = moveArgs[1] ^ lastAxisFace;
                            var move = moveArgs[0];

                            if (axisface == 0 || (axisface & 0xf) == 0 && move <= lastMove) {
                                continue;
                            }

                            var newState = this.doMove(state, move);

                            if (!newState || newState == state) {
                                continue;
                            }

                            this.sol[depth] = moveIdx;

                            if (this.idaSearch(newState, maxl - 1, moveIdx, depth + 1)) {
                                return true;
                            }

                            this.sol.pop();
                        }

                        return false;
                    };

                    _.getSolArr = function() {
                        var solArr = [];

                        for (var i = 0; i < this.sol.length; i++) {
                            solArr.push(this.movesList[this.sol[i]][0]);
                        }

                        return solArr;
                    };

                    var randGen = function() {
                        var rndFunc;
                        var rndCnt;
                        var seedStr; // '' + new Date().getTime();

                        function random() {
                            rndCnt++; // console.log(rndCnt);

                            return rndFunc();
                        }

                        function getSeed() {
                            return [rndCnt, seedStr];
                        }

                        function setSeed(_rndCnt, _seedStr) {
                            if (_seedStr && (_seedStr != seedStr || rndCnt > _rndCnt)) {
                                var seed = [];

                                for (var i = 0; i < _seedStr.length; i++) {
                                    seed[i] = _seedStr.charCodeAt(i);
                                }

                                rndFunc = new _mersenneTwister_js__WEBPACK_IMPORTED_MODULE_0__["MersenneTwisterObject"](seed[0], seed);
                                rndCnt = 0;
                                seedStr = _seedStr;
                            }

                            while (rndCnt < _rndCnt) {
                                rndFunc();
                                rndCnt++;
                            }
                        } // setSeed(0, '1576938267035');


                        setSeed(0, '' + new Date().getTime());
                        return {
                            random: random,
                            getSeed: getSeed,
                            setSeed: setSeed
                        };
                    }();

                    function rndEl(x) {
                        return x[~~(randGen.random() * x.length)];
                    }

                    function rn(n) {
                        return ~~(randGen.random() * n);
                    }

                    function rndPerm(n) {
                        var arr = [];

                        for (var i = 0; i < n; i++) {
                            arr[i] = i;
                        }

                        for (var i = 0; i < n - 1; i++) {
                            circle(arr, i, i + rn(n - i));
                        }

                        return arr;
                    }

                    function rndProb(plist) {
                        var cum = 0;
                        var curIdx = 0;

                        for (var i = 0; i < plist.length; i++) {
                            if (plist[i] == 0) {
                                continue;
                            }

                            if (randGen.random() < plist[i] / (cum + plist[i])) {
                                curIdx = i;
                            }

                            cum += plist[i];
                        }

                        return curIdx;
                    }

                    function time2str(unix, format) {
                        if (!unix) {
                            return 'N/A';
                        }

                        format = format || '%Y-%M-%D %h:%m:%s';
                        var date = new Date(unix * 1000);
                        return format.replace('%Y', date.getFullYear()).replace('%M', ('0' + (date.getMonth() + 1)).slice(-2)).replace('%D', ('0' + date.getDate()).slice(-2)).replace('%h', ('0' + date.getHours()).slice(-2)).replace('%m', ('0' + date.getMinutes()).slice(-2)).replace('%s', ('0' + date.getSeconds()).slice(-2));
                    }

                    var timeRe = /^\s*(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)\s*$/;

                    function str2time(val) {
                        var m = timeRe.exec(val);

                        if (!m) {
                            return null;
                        }

                        var date = new Date(0);
                        date.setFullYear(~~m[1]);
                        date.setMonth(~~m[2] - 1);
                        date.setDate(~~m[3]);
                        date.setHours(~~m[4]);
                        date.setMinutes(~~m[5]);
                        date.setSeconds(~~m[6]);
                        return ~~(date.getTime() / 1000);
                    }

                    function obj2str(val) {
                        if (typeof val == 'string') {
                            return val;
                        }

                        return JSON.stringify(val);
                    }

                    function str2obj(val) {
                        if (typeof val != 'string') {
                            return val;
                        }

                        return JSON.parse(val);
                    }

                    function valuedArray(len, val) {
                        var ret = [];

                        for (var i = 0; i < len; i++) {
                            ret[i] = val;
                        }

                        return ret;
                    }

                    Math.TAU = Math.PI * 2;
                    return {
                        Cnk: Cnk,
                        fact: fact,
                        getPruning: getPruning,
                        setNPerm: setNPerm,
                        getNPerm: getNPerm,
                        getNParity: getNParity,
                        get8Perm: get8Perm,
                        set8Perm: set8Perm,
                        coord: coord,
                        createMove: createMove,
                        edgeMove: edgeMove,
                        circle: circle,
                        circleOri: circleOri,
                        acycle: acycle,
                        createPrun: createPrun,
                        CubieCube: CubieCube,
                        SOLVED_FACELET: "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB",
                        fillFacelet: fillFacelet,
                        rn: rn,
                        rndEl: rndEl,
                        rndProb: rndProb,
                        time2str: time2str,
                        str2time: str2time,
                        obj2str: obj2str,
                        str2obj: str2obj,
                        valuedArray: valuedArray,
                        Solver: Solver,
                        rndPerm: rndPerm,
                        gSolver: gSolver,
                        getSeed: randGen.getSeed,
                        setSeed: randGen.setSeed
                    };
                }();
                /***/

            },

            /***/
            "ZAI4":
            /*!*******************************!*\
              !*** ./src/app/app.module.ts ***!
              \*******************************/

            /*! exports provided: AppModule */

            /***/
                function ZAI4(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "AppModule", function() {
                    return AppModule;
                });
                /* harmony import */


                var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                    /*! @angular/platform-browser */
                    "jhN1");
                /* harmony import */


                var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                    /*! @angular/core */
                    "fXoL");
                /* harmony import */


                var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                    /*! @angular/forms */
                    "3Pt+");
                /* harmony import */


                var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
                    /*! ./app-routing.module */
                    "vY5A");
                /* harmony import */


                var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
                    /*! ./app.component */
                    "Sy1n");
                /* harmony import */


                var _scramble_scramble_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
                    /*! ./scramble/scramble.component */
                    "mx2c");

                var AppModule = function AppModule() {
                    _classCallCheck(this, AppModule);
                };

                AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
                    type: AppModule,
                    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
                });
                AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
                    factory: function AppModule_Factory(t) {
                        return new(t || AppModule)();
                    },
                    providers: [],
                    imports: [
                        [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]]
                    ]
                });

                (function() {
                    (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
                        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"], _scramble_scramble_component__WEBPACK_IMPORTED_MODULE_5__["ScrambleComponent"]],
                        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]]
                    });
                })();
                /*@__PURE__*/


                (function() {
                    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
                        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
                        args: [{
                            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"], _scramble_scramble_component__WEBPACK_IMPORTED_MODULE_5__["ScrambleComponent"]],
                            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]],
                            providers: [],
                            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
                        }]
                    }], null, null);
                })();
                /***/

            },

            /***/
            "dG7U":
            /*!**********************************!*\
              !*** ./src/app/cstimer/cross.js ***!
              \**********************************/

            /*! exports provided: cross */

            /***/
                function dG7U(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "cross", function() {
                    return cross;
                });
                /* harmony import */


                var _kernel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                    /*! ./kernel.js */
                    "i8Ow");
                /* harmony import */


                var _mathlib_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                    /*! ./mathlib.js */
                    "UsXn");

                var cross = function(createMove, edgeMove, createPrun, setNPerm, getNPerm, Cnk, getPruning) {
                    var permPrun, flipPrun, ecPrun, fullPrun;
                    var cmv = [];
                    var pmul = [];
                    var fmul = [];
                    var e1mv = [];
                    var c1mv = [];

                    function pmv(a, c) {
                        var b = cmv[c][~~(a / 24)];
                        return 24 * ~~(b / 384) + pmul[a % 24][(b >> 4) % 24];
                    }

                    function fmv(b, c) {
                        var a = cmv[c][b >> 4];
                        return ~~(a / 384) << 4 | fmul[b & 15][(a >> 4) % 24] ^ a & 15;
                    }

                    function i2f(a, c) {
                        for (var b = 3; 0 <= b; b--) {
                            c[b] = a & 1, a >>= 1;
                        }
                    }

                    function f2i(c) {
                        for (var a = 0, b = 0; 4 > b; b++) {
                            a <<= 1, a |= c[b];
                        }

                        return a;
                    }

                    function fullmv(idx, move) {
                        var slice = cmv[move][~~(idx / 384)];
                        var flip = fmul[idx & 15][(slice >> 4) % 24] ^ slice & 15;
                        var perm = pmul[(idx >> 4) % 24][(slice >> 4) % 24];
                        return ~~(slice / 384) * 384 + 16 * perm + flip;
                    }

                    function init() {
                        init = function init() {};

                        for (var i = 0; i < 24; i++) {
                            pmul[i] = [];
                        }

                        for (var i = 0; i < 16; i++) {
                            fmul[i] = [];
                        }

                        var pm1 = [];
                        var pm2 = [];
                        var pm3 = [];

                        for (var i = 0; i < 24; i++) {
                            for (var j = 0; j < 24; j++) {
                                setNPerm(pm1, i, 4);
                                setNPerm(pm2, j, 4);

                                for (var k = 0; k < 4; k++) {
                                    pm3[k] = pm1[pm2[k]];
                                }

                                pmul[i][j] = getNPerm(pm3, 4);

                                if (i < 16) {
                                    i2f(i, pm1);

                                    for (var k = 0; k < 4; k++) {
                                        pm3[k] = pm1[pm2[k]];
                                    }

                                    fmul[i][j] = f2i(pm3);
                                }
                            }
                        }

                        createMove(cmv, 495, getmv);
                        permPrun = [];
                        flipPrun = [];
                        createPrun(permPrun, 0, 11880, 5, pmv);
                        createPrun(flipPrun, 0, 7920, 6, fmv); //combMove[comb][m] = comb*, flip*, perm*
                        //newcomb = comb*, newperm = perm x perm*, newflip = flip x perm* ^ flip*

                        function getmv(comb, m) {
                            var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            var r = 4;

                            for (var i = 0; i < 12; i++) {
                                if (comb >= Cnk[11 - i][r]) {
                                    comb -= Cnk[11 - i][r--];
                                    arr[i] = r << 1;
                                } else {
                                    arr[i] = -1;
                                }
                            }

                            edgeMove(arr, m);
                            comb = 0, r = 4;
                            var t = 0;
                            var pm = [];

                            for (var i = 0; i < 12; i++) {
                                if (arr[i] >= 0) {
                                    comb += Cnk[11 - i][r--];
                                    pm[r] = arr[i] >> 1;
                                    t |= (arr[i] & 1) << 3 - r;
                                }
                            }

                            return comb * 24 + getNPerm(pm, 4) << 4 | t;
                        }
                    }

                    function xinit() {
                        xinit = function xinit() {};

                        init();

                        for (var i = 0; i < 24; i++) {
                            c1mv[i] = [];
                            e1mv[i] = [];

                            for (var m = 0; m < 6; m++) {
                                c1mv[i][m] = cornMove(i, m);
                                var edge = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
                                edge[i >> 1] = i & 1;
                                edgeMove(edge, m);

                                for (var e = 0; e < 12; e++) {
                                    if (edge[e] >= 0) {
                                        e1mv[i][m] = e << 1 | edge[e];
                                        break;
                                    }
                                }
                            }
                        }

                        ecPrun = [];

                        for (var obj = 0; obj < 4; obj++) {
                            var prun = [];
                            createPrun(prun, (obj + 4) * 3 * 24 + (obj + 4) * 2, 576, 5, function(q, m) {
                                return c1mv[~~(q / 24)][m] * 24 + e1mv[q % 24][m];
                            });
                            ecPrun[obj] = prun;
                        }

                        function cornMove(corn, m) {
                            var idx = ~~(corn / 3);
                            var twst = corn % 3;
                            var idxt = [
                                [3, 1, 2, 7, 0, 5, 6, 4],
                                [0, 1, 6, 2, 4, 5, 7, 3],
                                [1, 2, 3, 0, 4, 5, 6, 7],
                                [0, 5, 1, 3, 4, 6, 2, 7],
                                [4, 0, 2, 3, 5, 1, 6, 7],
                                [0, 1, 2, 3, 7, 4, 5, 6]
                            ];
                            var twstt = [
                                [2, 0, 0, 1, 1, 0, 0, 2],
                                [0, 0, 1, 2, 0, 0, 2, 1],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 1, 2, 0, 0, 2, 1, 0],
                                [1, 2, 0, 0, 2, 1, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0]
                            ];
                            twst = (twst + twstt[m][idx]) % 3;
                            return idxt[m][idx] * 3 + twst;
                        }
                    } //e4perm, e4flip, e1, c1
                    //obj: -1:only cross.
                    //	i-4: end when e==i*2, c==i*3


                    function idaxcross(q, t, e, c, obj, l, lm, sol) {
                        if (l == 0) {
                            return q == 0 && t == 0 && e == (obj + 4) * 2 && c == (obj + 4) * 3;
                        } else {
                            if (getPruning(permPrun, q) > l || getPruning(flipPrun, t) > l || getPruning(ecPrun[obj], c * 24 + e) > l) return false;
                            var p, s, ex, cx, a, m;

                            for (m = 0; m < 6; m++) {
                                if (m != lm && m != lm - 3) {
                                    p = q;
                                    s = t;
                                    ex = e;
                                    cx = c;

                                    for (a = 0; a < 3; a++) {
                                        p = pmv(p, m);
                                        s = fmv(s, m);
                                        ex = e1mv[ex][m];
                                        cx = c1mv[cx][m];

                                        if (idaxcross(p, s, ex, cx, obj, l - 1, m, sol)) {
                                            sol.push("FRUBLD".charAt(m) + " 2'".charAt(a));
                                            return true;
                                        }
                                    }
                                }
                            }
                        }

                        return false;
                    } //e4perm, e4flip


                    function idacross(q, t, l, lm, sol) {
                        if (l == 0) {
                            return q == 0 && t == 0;
                        } else {
                            if (getPruning(permPrun, q) > l || getPruning(flipPrun, t) > l) return false;
                            var p, s, a, m;

                            for (m = 0; m < 6; m++) {
                                if (m != lm && m != lm - 3) {
                                    p = q;
                                    s = t;

                                    for (a = 0; a < 3; a++) {
                                        p = pmv(p, m);
                                        s = fmv(s, m);

                                        if (idacross(p, s, l - 1, m, sol)) {
                                            sol.push("FRUBLD".charAt(m) + " 2'".charAt(a));
                                            return true;
                                        }
                                    }
                                }
                            }
                        }

                        return false;
                    }

                    var faceStr = ["D", "U", "L", "R", "F", "B"];
                    var moveIdx = ["FRUBLD", "FLDBRU", "FDRBUL", "FULBDR", "URBDLF", "DRFULB"];
                    var rotIdx = ["&nbsp;&nbsp;", "z2", "z'", "z&nbsp;", "x'", "x&nbsp;"];
                    var curScramble;

                    function solve_cross(moves) {
                        init();
                        var ret = [];

                        for (var face = 0; face < 6; face++) {
                            var flip = 0;
                            var perm = 0;

                            for (var i = 0; i < moves.length; i++) {
                                var m = moveIdx[face].indexOf("FRUBLD".charAt(moves[i][0]));
                                var p = moves[i][2];

                                for (var j = 0; j < p; j++) {
                                    flip = fmv(flip, m);
                                    perm = pmv(perm, m);
                                }
                            }

                            var sol = [];
                            var len = 0;

                            for (var len = 0; len < 100; len++) {
                                if (idacross(perm, flip, len, -1, sol)) {
                                    break;
                                }
                            }

                            sol.reverse();
                            ret.push(sol);
                        }

                        return ret;
                    }

                    function solve_xcross(moves, face) {
                        xinit();
                        var flip = 0;
                        var perm = 0;
                        var e1 = [8, 10, 12, 14];
                        var c1 = [12, 15, 18, 21];

                        for (var i = 0; i < moves.length; i++) {
                            var m = moveIdx[face].indexOf("FRUBLD".charAt(moves[i][0]));
                            var p = moves[i][2];

                            for (var j = 0; j < p; j++) {
                                flip = fmv(flip, m);
                                perm = pmv(perm, m);

                                for (var obj = 0; obj < 4; obj++) {
                                    e1[obj] = e1mv[e1[obj]][m];
                                    c1[obj] = c1mv[c1[obj]][m];
                                }
                            }
                        }

                        var sol = [];
                        var found = false;
                        var len = 0;

                        while (!found) {
                            for (var obj = 0; obj < 4; obj++) {
                                if (idaxcross(perm, flip, e1[obj], c1[obj], obj, len, -1, sol)) {
                                    found = true;
                                    break;
                                }
                            }

                            len++;
                        }

                        sol.reverse();
                        return sol;
                    }

                    function fullInit() {
                        fullInit = function fullInit() {};

                        init();
                        fullPrun = [];
                        createPrun(fullPrun, 0, 190080, 7, fullmv, 6, 3, 6);
                    }

                    function getEasyCross(length) {
                        fullInit();

                        if (length > 8) {
                            length = 8;
                        }

                        var cases = _mathlib_js__WEBPACK_IMPORTED_MODULE_1__["mathlib"].rn([1, 16, 174, 1568, 11377, 57758, 155012, 189978, 190080][length]) + 1;
                        var i;

                        for (i = 0; i < 190080; i++) {
                            if (getPruning(fullPrun, i) <= length && --cases == 0) {
                                break;
                            }
                        }

                        var comb = ~~(i / 384);
                        var perm = (i >> 4) % 24;
                        var flip = i & 15;
                        var arrp = [];
                        var arrf = [];
                        var pm = [];
                        var fl = [];
                        i2f(flip, fl);
                        setNPerm(pm, perm, 4);
                        var r = 4;
                        var map = [7, 6, 5, 4, 10, 9, 8, 11, 3, 2, 1, 0];

                        for (i = 0; i < 12; i++) {
                            if (comb >= Cnk[11 - i][r]) {
                                comb -= Cnk[11 - i][r--];
                                arrp[map[i]] = pm[r];
                                arrf[map[i]] = fl[r];
                            } else {
                                arrp[map[i]] = arrf[map[i]] = -1;
                            }
                        }

                        return [arrp, arrf];
                    }

                    function get_cross_sol(scramble) {
                        curScramble = _kernel_js__WEBPACK_IMPORTED_MODULE_0__["kernel"].parseScramble(scramble, "FRUBLD");
                        var solutions = solve_cross(curScramble);
                        return solutions;
                    }

                    return {
                        solve: get_cross_sol,
                        getEasyCross: getEasyCross
                    };
                }(_mathlib_js__WEBPACK_IMPORTED_MODULE_1__["mathlib"].createMove, _mathlib_js__WEBPACK_IMPORTED_MODULE_1__["mathlib"].edgeMove, _mathlib_js__WEBPACK_IMPORTED_MODULE_1__["mathlib"].createPrun, _mathlib_js__WEBPACK_IMPORTED_MODULE_1__["mathlib"].setNPerm, _mathlib_js__WEBPACK_IMPORTED_MODULE_1__["mathlib"].getNPerm, _mathlib_js__WEBPACK_IMPORTED_MODULE_1__["mathlib"].Cnk, _mathlib_js__WEBPACK_IMPORTED_MODULE_1__["mathlib"].getPruning);
                /***/

            },

            /***/
            "i8Ow":
            /*!***********************************!*\
              !*** ./src/app/cstimer/kernel.js ***!
              \***********************************/

            /*! exports provided: kernel */

            /***/
                function i8Ow(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "kernel", function() {
                    return kernel;
                });

                var kernel = function() {
                    var scrambleReg = /^([\d]+)?([FRUBLDfrubldzxySME])(?:([w])|&sup([\d]);)?([2'])?$/;

                    function parseScramble(scramble, moveMap) {
                        var moveseq = [];
                        var moves = scramble.split(' ');
                        var m, w, f, p;

                        for (var s = 0; s < moves.length; s++) {
                            m = scrambleReg.exec(moves[s]);

                            if (m == null) {
                                continue;
                            }

                            f = "FRUBLDfrubldzxySME".indexOf(m[2]);

                            if (f > 14) {
                                p = "2'".indexOf(m[5] || 'X') + 2;
                                f = [0, 4, 5][f % 3];
                                moveseq.push([moveMap.indexOf("FRUBLD".charAt(f)), 2, p]);
                                moveseq.push([moveMap.indexOf("FRUBLD".charAt(f)), 1, 4 - p]);
                                continue;
                            }

                            w = f < 12 ? ~~m[1] || ~~m[4] || (m[3] == "w" || f > 5) && 2 || 1 : -1;
                            p = (f < 12 ? 1 : -1) * ("2'".indexOf(m[5] || 'X') + 2);
                            moveseq.push([moveMap.indexOf("FRUBLD".charAt(f % 6)), w, p]);
                        }

                        return moveseq;
                    }

                    return {
                        parseScramble: parseScramble
                    };
                }();
                /***/

            },

            /***/
            "mx2c":
            /*!************************************************!*\
              !*** ./src/app/scramble/scramble.component.ts ***!
              \************************************************/

            /*! exports provided: ScrambleComponent */

            /***/
                function mx2c(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "ScrambleComponent", function() {
                    return ScrambleComponent;
                });
                /* harmony import */


                var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                    /*! @angular/core */
                    "fXoL");
                /* harmony import */


                var _Scrambles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                    /*! ../Scrambles */
                    "QsgX");
                /* harmony import */


                var _cstimer_cross_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                    /*! ../cstimer/cross.js */
                    "dG7U");

                var ScrambleComponent = /*#__PURE__*/ function() {
                    function ScrambleComponent() {
                        _classCallCheck(this, ScrambleComponent);

                        this.scramble = "";
                        this.solution = "";
                        this.GetSolution = "Get Solution";
                        this.HideSolution = "Hide Solution";
                        this.SolButtonText = this.GetSolution;
                    }

                    _createClass(ScrambleComponent, [{
                        key: "newScramble",
                        value: function newScramble() {
                            var MoveNames = ["R", "R2", "R'", "F", "F2", "F'", "L", "L2", "L'", "B", "B2", "B'", "U", "U2", "U'", "D", "D2", "D'"];
                            var MoveNamesWCA;
                            MoveNamesWCA = ["R", "R2", "R'", "B", "B2", "B'", "L", "L2", "L'", "F", "F2", "F'", "D", "D2", "D'", "U", "U2", "U'"];
                            var Level = +document.getElementById("Level").value;

                            var RandomScramble = _Scrambles__WEBPACK_IMPORTED_MODULE_1__["scrambles"][Level - 1][Math.floor(Math.random() * 1000)];

                            var TextScramble = "";
                            var TextScrambleWithSpaces = "";

                            for (var A = 0; A < RandomScramble.length; A++) {
                                TextScramble += MoveNames[RandomScramble[A].charCodeAt(0) - 'A'.charCodeAt(0)];

                                if (A > 0) {
                                    TextScrambleWithSpaces += " ";
                                }

                                TextScrambleWithSpaces += MoveNamesWCA[RandomScramble[A].charCodeAt(0) - 'A'.charCodeAt(0)];
                                console.log("TextScrambleWithSpaces: " + TextScrambleWithSpaces);
                            }

                            this.scramble = TextScrambleWithSpaces;
                            this.solution = "";
                            this.SolButtonText = this.GetSolution;
                            return false;
                        }
                    }, {
                        key: "toggleSolution",
                        value: function toggleSolution() {
                            if (this.SolButtonText == this.HideSolution) {
                                this.SolButtonText = this.GetSolution;
                                this.solution = "";
                                return false;
                            }

                            if (this.scramble == "") {
                                return false;
                            }

                            this.SolButtonText = this.HideSolution;
                            var scrambleArr = this.scramble.split(" ");
                            console.log("scrambleArr: " + scrambleArr);

                            var sols = _cstimer_cross_js__WEBPACK_IMPORTED_MODULE_2__["cross"].solve(scrambleArr.join(" "));

                            console.log("sols" + sols + '\n' + "sols length: " + sols.length);

                            for (var i = 0; i < sols.length; i++) {
                                console.log("sol " + i + ": " + sols[i]);
                            }

                            this.solution = sols[1].join('  ');
                            return false;
                        }
                    }]);

                    return ScrambleComponent;
                }();

                ScrambleComponent.ɵfac = function ScrambleComponent_Factory(t) {
                    return new(t || ScrambleComponent)();
                };

                ScrambleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
                    type: ScrambleComponent,
                    selectors: [
                        ["app-scramble"]
                    ],
                    decls: 21,
                    vars: 3,
                    consts: [
                        [1, "wrap"],
                        ["href", "#", 1, "button", 3, "click"],
                        [1, "outder"],
                        [1, "ritle"],
                        ["ID", "Output", "STYLE", "font-family:Helvetica, Arial; font-size:30pt", 1, "scramble"],
                        ["id", "scrambleText"],
                        ["ID", "sol", "STYLE", "font-family:Helvetica, Arial; font-size:30pt", 1, "scramble"],
                        ["id", "solutionText"]
                    ],
                    template: function ScrambleComponent_Template(rf, ctx) {
                        if (rf & 1) {
                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 1);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScrambleComponent_Template_a_click_2_listener() {
                                return ctx.newScramble();
                            });

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Get Scramble");

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2", 3);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Scramble");

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "label", 5);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 0);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 1);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScrambleComponent_Template_a_click_12_listener() {
                                return ctx.toggleSolution();
                            });

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 2);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h2", 3);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Solution");

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 6);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p");

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "label", 7);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
                        }

                        if (rf & 2) {
                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.scramble, " ");

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.SolButtonText, " ");

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);

                            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.solution, " ");
                        }
                    },
                    styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NjcmFtYmxlL3NjcmFtYmxlLmNvbXBvbmVudC5jc3MifQ== */"]
                });
                /*@__PURE__*/

                (function() {
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ScrambleComponent, [{
                        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                        args: [{
                            selector: 'app-scramble',
                            templateUrl: './scramble.component.html',
                            styleUrls: ['./scramble.component.css']
                        }]
                    }], null, null);
                })();
                /***/

            },

            /***/
            "vY5A":
            /*!***************************************!*\
              !*** ./src/app/app-routing.module.ts ***!
              \***************************************/

            /*! exports provided: AppRoutingModule */

            /***/
                function vY5A(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */


                __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() {
                    return AppRoutingModule;
                });
                /* harmony import */


                var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                    /*! @angular/core */
                    "fXoL");
                /* harmony import */


                var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                    /*! @angular/router */
                    "tyNb");

                var routes = [];

                var AppRoutingModule = function AppRoutingModule() {
                    _classCallCheck(this, AppRoutingModule);
                };

                AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
                    type: AppRoutingModule
                });
                AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
                    factory: function AppRoutingModule_Factory(t) {
                        return new(t || AppRoutingModule)();
                    },
                    imports: [
                        [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
                    ]
                });

                (function() {
                    (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
                        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
                        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
                    });
                })();
                /*@__PURE__*/


                (function() {
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
                        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
                        args: [{
                            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
                        }]
                    }], null, null);
                })();
                /***/

            },

            /***/
            "zUnb":
            /*!*********************!*\
              !*** ./src/main.ts ***!
              \*********************/

            /*! no exports provided */

            /***/
                function zUnb(module, __webpack_exports__, __webpack_require__) {
                "use strict";

                __webpack_require__.r(__webpack_exports__);
                /* harmony import */


                var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                    /*! @angular/core */
                    "fXoL");
                /* harmony import */


                var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
                    /*! ./environments/environment */
                    "AytR");
                /* harmony import */


                var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                    /*! ./app/app.module */
                    "ZAI4");
                /* harmony import */


                var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
                    /*! @angular/platform-browser */
                    "jhN1");

                if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
                    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
                }

                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function(err) {
                    return console.error(err);
                });
                /***/

            },

            /***/
            "zn8P":
            /*!******************************************************!*\
              !*** ./$$_lazy_route_resource lazy namespace object ***!
              \******************************************************/

            /*! no static exports found */

            /***/
                function zn8P(module, exports) {
                function webpackEmptyAsyncContext(req) {
                    // Here Promise.resolve().then() is used instead of new Promise() to prevent
                    // uncaught exception popping up in devtools
                    return Promise.resolve().then(function() {
                        var e = new Error("Cannot find module '" + req + "'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    });
                }

                webpackEmptyAsyncContext.keys = function() {
                    return [];
                };

                webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
                module.exports = webpackEmptyAsyncContext;
                webpackEmptyAsyncContext.id = "zn8P";
                /***/
            }
        },
        [
            [0, "runtime", "vendor"]
        ]
    ]);
})();
//# sourceMappingURL=main-es5.js.map