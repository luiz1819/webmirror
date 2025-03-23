import{__esmMin as e}from"./react.Bw_BZ6ND.mjs";function t(e,t){return{customHTMLBodyEnd:'<!-- Performance monitoring -->\n<script>\n;(function(){\nvar ua = navigator.userAgent\nwindow.dbbRum = window.dbbRum||[]\nwindow.dbbRum.push(["sampling", /mobi/i.test(ua) ? 100 : 25]) // sample 100% of mobile\ntry {\nwindow.dbbRum.push(["tag2", /bot|-google|google-|yandex|ia_archiver/i.test(ua)]) // test if it\'s from a bot\nvar repeatedVisitor = JSON.parse(localStorage.framerCookiesConsentMode || "{}").analytics\nwindow.dbbRum.push(["tag1", repeatedVisitor !== undefined]) // if we have the entry, it\'s a repeated visit\n} catch (e) {}\n\nvar dbpr=100;if(Math.random()*100>100-dbpr){var d="dbbRum",w=window,o=document,a=addEventListener,scr=o.createElement("script");scr.async=!0;w[d]=w[d]||[];w[d].push(["presampling",dbpr]);["error","unhandledrejection"].forEach(function(t){a(t,function(e){w[d].push([t,e])});});scr.src="https://cdn.debugbear.com/9uWCuyolIuHX.js";scr.crossOrigin="anonymous";o.head.appendChild(scr);}})()</script>\n\n<!-- Anonymous Analytics -->\n<script>\n!function(){console.log("Initializing Framer Analytics Anonymous");const t="visitor_id",e="cookie_consent",n="https://api.framer.com/auth/signin",o="https://events.framer.com/track";function i(t){const e=document.cookie.match(`(^|;) ?\${t}=([^;]*)(;|$)`);return e?e[2]:null}function s(){const t=()=>Math.floor(65536*(1+Math.random())).toString(16).substring(1);return`\${t()}\${t()}-\${t()}-\${t()}-\${t()}-\${t()}\${t()}\${t()}`}function c(t,e){const n=new XMLHttpRequest;n.open("GET",t),n.withCredentials=!0,n.onload=()=>{try{const t=JSON.parse(n.response);e(t.userId||"")}catch{e("")}},n.send()}function r(n,c){const r=new XMLHttpRequest;r.open("POST",o),r.setRequestHeader("Content-Type","application/json");const a=[{source:"framer.site",timestamp:Date.now(),data:{type:"track",uuid:s(),context:{userId:c||null,visitorId:i(t)},event:"site_cookie_consent",cookieConsent:i(e),isInEU:null,eventName:n}}];r.send(JSON.stringify(a))}!function(){if(i(t))c(n,(t=>r("visitor_id_already_set",t)));else{const e=`\${Date.now()}\${Math.random()}`;!function(t,e,n,o){let i=`\${encodeURIComponent(t)}=\${encodeURIComponent(e)};path=/;secure;domain=\${o}`;if(n){const t=new Date;t.setTime(t.getTime()+864e5*n),i+=`;expires=\${t.toUTCString()}`}document.cookie=i}(t,e,365,"framer.com"),c(n,(t=>r("visitor_id_set",t)))}}()}();\n</script>',customHTMLHeadEnd:`<link rel="preload" as="fetch" href="https://api.framer.com/site/users/me" crossorigin="use-credentials">

<!-- Google Search Console -->
<meta name="google-site-verification" content="srewg7cpiErKYvspydAuj9hVuvnpDkL6-xS2Zrm0DNY">
<meta name="google-site-verification" content="Hkr9R7Mbf5Msjc0FJoCdSkbCOq5wpvDZMVf70JwRbDY">
<script>!function(){const e=["BE","EL","LT","PT","BG","ES","LU","RO","CZ","FR","RE","GP","MQ","GF","YT","BL","MF","PM","WF","PF","NC","HU","SI","DK","FO","GL","HR","MT","SK","DE","IT","NL","AW","CW","SX","FI","AX","EE","CY","AT","SE","IE","LV","PL","UK","GB","AI","BM","IO","VG","KY","FK","GI","MS","PN","SH","TC","GG","JE","IM"];window.dataLayer=window.dataLayer||[],function(){dataLayer.push(arguments)}("consent","default",function(e){const a="framerCookiesConsentMode",t=localStorage.getItem(a),n=localStorage.getItem("framerCookiesDismissed"),r=localStorage.getItem("framerCookiesAutoAccepted");return{functionality_storage:(o=null!==t&&(null!==n||null!==r)?function(e,a){try{return JSON.parse(e)}catch{a&&a()}}(t,(()=>localStorage.removeItem(a))):e).necessary?"granted":"denied",security_storage:o.necessary?"granted":"denied",ad_storage:o.marketing?"granted":"denied",ad_user_data:o.marketing?"granted":"denied",ad_personalization:o.marketing?"granted":"denied",analytics_storage:o.analytics?"granted":"denied",personalization_storage:o.preferences?"granted":"denied"};var o}(Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone?.startsWith("Europe")||(()=>{const a=navigator.language??navigator.languages?.[0];return e.some((e=>a?.toUpperCase()?.includes(e)))})()?{necessary:!0,analytics:!1,marketing:!1,preferences:!1}:{necessary:!0,analytics:!0,marketing:!0,preferences:!0})),window.dataLayer.push({"gtm.start":(new Date).getTime(),event:"gtm.js"})}();</script>
<script src="https://www.googletagmanager.com/gtm.js?id=GTM-KQFN6BX" async="" crossorigin=""></script>
<!-- Plugin: ced618 --> <script>
    (function() {
      // Initialize shopXtools with version first
      window.shopXtools = window.shopXtools || {};
      
      window.shopXtools.version = "1.2";
      
      const fcConfigs = {
        storefrontDomain: "frmrspply.myshopify.com",
        storefrontAccessToken: "24a8115139d22e9090b060fde36db1e5",
      };
    
      const CURRENCIES = {"AED":"د.إ","AFN":"Af","ALL":"L","AMD":"֏","ANG":"ƒ","AOA":"Kz","ARS":"$","AUD":"$","AWG":"ƒ","AZN":"₼","BAM":"KM","BBD":"$","BDT":"৳","BGN":"лв","BHD":"د.ب","BIF":"FBu","BMD":"$","BND":"$","BOB":"Bs.","BRL":"R$","BSD":"$","BTN":"Nu.","BWP":"P","BYN":"Br","BZD":"BZ$","CAD":"$","CDF":"FC","CHF":"Fr","CLP":"$","CNY":"¥","COP":"$","CRC":"₡","CVE":"$","CZK":"Kč","DJF":"Fdj","DKK":"kr","DOP":"RD$","DZD":"د.ج","EGP":"£","ERN":"Nfk","ETB":"Br","EUR":"€","FJD":"$","FKP":"£","GBP":"£","GEL":"₾","GHS":"₵","GIP":"£","GMD":"D","GNF":"FG","GTQ":"Q","GYD":"$","HKD":"$","HNL":"L","HRK":"kn","HTG":"G","HUF":"Ft","IDR":"Rp","ILS":"₪","INR":"₹","IQD":"ع.د","IRR":"﷼","ISK":"kr","JEP":"£","JMD":"J$","JOD":"د.ا","JPY":"¥","KES":"KSh","KGS":"сом","KHR":"៛","KID":"$","KMF":"CF","KRW":"₩","KWD":"د.ك","KYD":"$","KZT":"₸","LAK":"₭","LBP":"£","LKR":"රු","LRD":"$","LSL":"L","LTL":"Lt","LVL":"Ls","LYD":"ل.د","MAD":"د.م.","MDL":"MDL","MGA":"Ar","MKD":"ден","MMK":"Ks","MNT":"₮","MOP":"MOP$","MRU":"UM","MUR":"₨","MVR":"ރ","MWK":"MK","MXN":"$","MYR":"RM","MZN":"MT","NAD":"$","NGN":"₦","NIO":"C$","NOK":"kr","NPR":"रू","NZD":"$","OMR":"ر.ع.","PAB":"B/.","PEN":"S/.","PGK":"K","PHP":"₱","PKR":"₨","PLN":"zł","PYG":"₲","QAR":"ر.ق","RON":"lei","RSD":"Дин.","RUB":"₽","RWF":"FRw","SAR":"ر.س","SBD":"$","SCR":"₨","SDG":"ج.س.","SEK":"kr","SGD":"$","SHP":"£","SLL":"Le","SOS":"Sh","SRD":"$","SSP":"£","STN":"Db","SYP":"£","SZL":"E","THB":"฿","TJS":"ЅМ","TMT":"T","TND":"د.ت","TOP":"T$","TRY":"₺","TTD":"TT$","TWD":"NT$","TZS":"TSh","UAH":"₴","UGX":"USh","USD":"$","UYU":"$","UZS":"so'm","VED":"Bs.S.","VES":"Bs.","VND":"₫","VUV":"VT","WST":"T","XAF":"FCFA","XCD":"$","XOF":"CFA","XPF":"₣","XXX":"","YER":"﷼","ZAR":"R","ZMW":"ZK","BYR":"Br","STD":"Db","VEF":"Bs."}; 
      const knownCurrenciesWithCodeAsSymbol = ["CHF","PLN","SEK","NOK","DKK","CZK","HUF","RON","HRK","BGN","ISK","MDL","BYN","KZT","AMD","UZS","TJS","KGS","MNT","GEL","AFN","MRU","RWF","XAF","XOF","XPF"]; 
      // Initialize default currency variables
      let defaultCountry = '';
      let defaultCountryCode = '';
      let defaultCurrency = '';
      let defaultCurrencySymbol = '';

      document.addEventListener('checkout__settings-updated', (event) => {
        const { current } = event.detail;
        if (current) {
          // Update the global default variables
          defaultCountry = current.defaultCountry || '';
          defaultCountryCode = current.defaultCountryCode || '';
          defaultCurrency = current.defaultCurrency || '';
          defaultCurrencySymbol = current.defaultCurrencySymbol || '';

          // Set session storage only if it's empty
          if (!localStorage.getItem('selectedCountry')) {
            localStorage.setItem('selectedCountry', defaultCountry);
          }
          if (!localStorage.getItem('selectedCountryCode')) {
            localStorage.setItem('selectedCountryCode', defaultCountryCode);
          }
          if (!localStorage.getItem('selectedCurrency')) {
            localStorage.setItem('selectedCurrency', defaultCurrency);
          }
          if (!localStorage.getItem('selectedCurrencySymbol')) {
            localStorage.setItem('selectedCurrencySymbol', defaultCurrencySymbol);
          }

          // Clear product cache and refetch products with new currency
          localStorage.removeItem('fc_products');
          localStorage.removeItem('fc_products_timestamp');
          
          // Refetch products with the current country code
          const currentCountryCode = localStorage.getItem('selectedCountryCode');
          if (currentCountryCode) {
            fetchProductsByCountry(currentCountryCode).catch(error => {
              console.error('Error refetching products after currency change:', error);
              window.shopXtools.status = "ready";
            });
          }

          // console.log('Session storage is set:', {
          //   defaultCountry,
          //   defaultCountryCode,
          //   defaultCurrency,
          //   defaultCurrencySymbol
          // });
        }
      });
      
      let domain;
      let products = [];
    
      // ALL QUERIES
      const getProductsQuery = \`
        query GetProducts($cursor: String) {
          products(first: 250, after: $cursor) {
            edges {
              node {
                id
                title
                vendor
                handle
                productType
                tags
                collections(first: 250) {
                  edges {
                    node {
                      id
                      title
                      handle
                    }
                  }
                }
                images(first: 20) {
                  edges {
                    node {
                      url
                      altText
                      width
                      height
                     }
                    }
                }
                sellingPlanGroups(first: 1) {
                  edges {
                    node {
                      name
                      options {
                        name
                        values
                      }
                      sellingPlans(first: 10) {
                        edges {
                          node {
                            id
                            name
                            description
                            recurringDeliveries
                            priceAdjustments {
                              orderCount
                              adjustmentValue {
                                __typename
                                ... on SellingPlanPercentagePriceAdjustment {
                                  adjustmentPercentage
                                }
                                ... on SellingPlanFixedAmountPriceAdjustment {
                                  adjustmentAmount {
                                    amount
                                    currencyCode
                                  }
                                }
                                ... on SellingPlanFixedPriceAdjustment {
                                  price {
                                    amount
                                    currencyCode
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                options {
                  id
                  name
                  values
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                variants(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                    endCursor
                  }
                  edges {
                    node {
                      id
                      image {
                        url
                        altText
                        width
                        height
                      }
                      title
                      sku
                      quantityAvailable
                      availableForSale
                      requiresShipping
                      selectedOptions {
                        name
                        value
                      }
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      \`;
    
      const getProductsQueryBackup = \`
        query GetProductsBackup($cursor: String) {
          products(first: 250, after: $cursor) {
            edges {
              node {
                id
                title
                vendor
                handle
                productType
                tags
                collections(first: 250) {
                  edges {
                    node {
                      id
                      title
                      handle
                    }
                  }
                }
                images(first: 20) {
                  edges {
                    node {
                      url
                      altText
                      width
                      height
                     }
                    }
                }
                options {
                  id
                  name
                  values
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                variants(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                    endCursor
                  }
                  edges {
                    node {
                      id
                      image {
                        url
                        altText
                        width
                        height
                      }
                      title
                      sku
                      availableForSale
                      quantityAvailable
                      requiresShipping
                      selectedOptions {
                        name
                        value
                      }
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      \`;
      
      const getCartQuery = \`
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            createdAt
            updatedAt
            checkoutUrl
            buyerIdentity {
              countryCode
            }
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  sellingPlanAllocation { 
                    checkoutChargeAmount {
                      amount
                      currencyCode
                    }
                    sellingPlan {
                      id
                      name
                      description
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      image {
                        url
                        altText
                        width
                        height
                      }
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        title
                        handle
                      }
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                  attributes {
                    key
                    value
                  }
                  cost {
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            attributes {
              key
              value
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      \`;
    
      const getCartQueryNoPlans = \`
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            createdAt
            updatedAt
            checkoutUrl
            buyerIdentity {
              countryCode
            }
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      image {
                        url
                        altText
                        width
                        height
                      }
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        title
                        handle
                      }
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                  attributes {
                    key
                    value
                  }
                  cost {
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            attributes {
              key
              value
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      \`;


      // Get available currencies from the store
      const getAvailableCurrencies = \`
        query GetAvailableCurrencies {
          localization {
            availableCountries {
              currency {
                isoCode
                name
                symbol
              }
              isoCode
              name
            }
          }
        }
      \`;

      // Get products by country
      const getProductsQueryByCountry = \`
        query GetProductsByCountry ($cursor: String, $countryCode: CountryCode) @inContext(country: $countryCode) {
          products(first: 250, after: $cursor) {
            edges {
              node {
                id
                title
                vendor
                handle
                images(first: 20) {
                  edges {
                    node {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
                sellingPlanGroups(first: 1) {
                  edges {
                    node {
                      name
                      options {
                        name
                        values
                      }
                      sellingPlans(first: 10) {
                        edges {
                          node {
                            id
                            name
                            description
                            recurringDeliveries
                            priceAdjustments {
                              orderCount
                              adjustmentValue {
                                __typename
                                ... on SellingPlanPercentagePriceAdjustment {
                                  adjustmentPercentage
                                }
                                ... on SellingPlanFixedAmountPriceAdjustment {
                                  adjustmentAmount {
                                    amount
                                    currencyCode
                                  }
                                }
                                ... on SellingPlanFixedPriceAdjustment {
                                  price {
                                    amount
                                    currencyCode
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                options {
                  id
                  name
                  values
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                variants(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                    endCursor
                  }
                  edges {
                    node {
                      id
                      image {
                        url
                        altText
                        width
                        height
                      }
                      title
                      sku
                      quantityAvailable
                      availableForSale
                      requiresShipping
                      selectedOptions {
                        name
                        value
                      }
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      \`;

      const getProductsQueryByCountryBackup = \`
        query GetProductsByCountryBackup($cursor: String, $countryCode: CountryCode) @inContext(country: $countryCode) {
          products(first: 250, after: $cursor) {
            edges {
              node {
                id
                title
                vendor
                handle
                images(first: 20) {
                  edges {
                    node {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
                options {
                  id
                  name
                  values
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                variants(first: 250) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                    endCursor
                  }
                  edges {
                    node {
                      id
                      image {
                        url
                        altText
                        width
                        height
                      }
                      title
                      sku
                      quantityAvailable
                      availableForSale
                      requiresShipping
                      selectedOptions {
                        name
                        value
                      }
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      \`;




      window.shopXtools = window.shopXtools || {};
      window.shopXtools.products = {};
      window.shopXtools.fetchCart = null;
      window.shopXtools.dispatchEvent = (eventType, detail) => {
            const newEvent = new CustomEvent(eventType, { detail });
            document.dispatchEvent(newEvent);
          };
    
      window.shopXtools.handleCartMutation = async (mutation, variables) => {
        const endpoint = \`https://\${domain.host}/api/2024-07/graphql.json\`;
        const token = fcConfigs.storefrontAccessToken;
    
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({
              query: mutation,
              variables,
            }),
          });
          const result = await response.json();
          if (response.ok && !result.errors) {
            // If this is a cart mutation and we have cart data, save it to localStorage
            if (result.data && (result.data.cartCreate || result.data.cartLinesAdd || 
                result.data.cartLinesRemove || result.data.cartLinesUpdate || 
                result.data.cartBuyerIdentityUpdate)) {
              
              // Find the cart object in the response
              const cartData = result.data.cartCreate?.cart || 
                              result.data.cartLinesAdd?.cart || 
                              result.data.cartLinesRemove?.cart || 
                              result.data.cartLinesUpdate?.cart ||
                              result.data.cartBuyerIdentityUpdate?.cart;
              
              if (cartData) {
                //console.log("Saving cart data to localStorage:", cartData);
                // Update the global cart object
                window.shopXtools.cart = cartData;
                // Save to localStorage
                localStorage.setItem("shopXtools.cart", JSON.stringify(cartData));
                
                // If this is a buyerIdentity update with a country code, update currency settings
                if (result.data.cartBuyerIdentityUpdate && cartData.buyerIdentity && cartData.buyerIdentity.countryCode) {
                  //console.log("Country code updated in cart:", cartData.buyerIdentity.countryCode);
                  // Trigger currency settings update
                  initializeCurrencySettings();
                }
              }
            }
            return result.data;
          } else {
            console.error("GraphQL errors:", result.errors);
            return null;
          }
        } catch (error) {
          console.error("Network error:", error);
          return null;
        }
      };
    
      window.shopXtools.fetchCart = async function(cartId) {
        const variables = { cartId: cartId };
        const endpoint = \`https://\${domain.host}/api/2024-07/graphql.json\`;
    
        const tryFetchCart = async (query, queryName) => {
          try {
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": fcConfigs.storefrontAccessToken,
              },
              body: JSON.stringify({ query: query, variables }),
            });
    
            const result = await response.json();
            if (result.errors) {
              console.error(\`\${queryName} failed with errors:\`, result.errors);
              return null;
            }
    
            if (result.data && result.data.cart) {
              // Save cart data to localStorage
              //console.log("Saving fetched cart data to localStorage:", result.data.cart);
              window.shopXtools.cart = result.data.cart;
              localStorage.setItem("shopXtools.cart", JSON.stringify(result.data.cart));
              
              // If cart has buyerIdentity with countryCode, update currency settings
              if (result.data.cart.buyerIdentity && result.data.cart.buyerIdentity.countryCode) {
                //console.log("Country code found in fetched cart:", result.data.cart.buyerIdentity.countryCode);
                // Trigger currency settings update
                initializeCurrencySettings();
              }
              
              return result.data.cart;
            } else {
              console.error(\`Cart data not found in response from \${queryName}:\`, result);
              return null;
            }
          } catch (error) {
            console.error(\`Network error during \${queryName}:\`, error);
            return null;
          }
        };
    
        let cartData = await tryFetchCart(getCartQuery, "Primary cart query");
        //console.log(cartData);
        if (!cartData) {
          //console.log("Primary cart query failed, attempting backup cart query...");
          cartData = await tryFetchCart(getCartQueryNoPlans, "Backup cart query");
        }
    
        return cartData;
      };
    
      const configValidation = () => {
        if (!fcConfigs.storefrontDomain) {
          throw Error("Storefront domain not found");
        }
        if (!fcConfigs.storefrontAccessToken) {
          throw Error("Storefront access token not found");
        }
      };
    
      const setDomainUrl = () => {
        let storeDomain = "https://test.shopify.com";
        if (fcConfigs.storefrontDomain) {
          storeDomain = fcConfigs.storefrontDomain.startsWith("http")
            ? fcConfigs.storefrontDomain
            : \`https://\${fcConfigs.storefrontDomain}\`;
        }
        domain = new URL(storeDomain);
      };
    
      const shopify = async (type, query, variables) => {
        const endpoint = \`https://\${domain.host}/api/2024-07/graphql.json\`;
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ [type]: query, variables }),
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": fcConfigs.storefrontAccessToken,
          },
        });
        const json = await response.json();
        return json.data;
      };
    
      const setupInitialToolsObject = () => {
        if (window.shopXtools) {
          return;
        }
    
        window.shopXtools = {
          __eventsIdentifier: "shopX__events__fragment",
          dispatchEvent: (eventType, detail) => {
            const newEvent = new CustomEvent(eventType, { detail });
            document.dispatchEvent(newEvent);
          },
          status: "loading",
          cart: {},
          products: [],
          getProducts: (_id) => null
        };
      };


      // Function to fetch available currencies
      const fetchAvailableCurrencies = async () => {
        // console.log("Domain object in fetchAvailableCurrencies:", domain);
        // console.log("Domain host:", domain?.host);

        const endpoint = \`https://\${domain.host}/api/2024-07/graphql.json\`;
        
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": fcConfigs.storefrontAccessToken,
            },
            body: JSON.stringify({ query: getAvailableCurrencies }),
          });

          const result = await response.json();
          //console.log("[CURRENCIES] Result:", result);
          if (result.errors) {
            console.error("Error fetching currencies:", result.errors);
            return null;
          }
          const availableCurrenciesAndCountries = result?.data?.localization?.availableCountries;
          
          //console.log("[CURRENCIES] Available Currencies:", availableCurrenciesAndCountries);
          sessionStorage.setItem("availableCurrenciesAndCountries", JSON.stringify(availableCurrenciesAndCountries));
          //console.log(sessionStorage.getItem("availableCurrenciesAndCountries")
          
          return { availableCurrenciesAndCountries };
          
        } catch (error) {
          console.error("Error fetching currencies:", error);
          return null;
        }
      };

      // Initialize shopXtools and attach fetchAvailableCurrencies to it
      window.shopXtools = window.shopXtools || {};
      window.shopXtools.fetchAvailableCurrencies = fetchAvailableCurrencies;
      
      

      // Function to initialize currency settings
      const initializeCurrencySettings = async () => {
        // Ensure domain is initialized before proceeding
        if (!domain) {
            await setDomainUrl();
        }
        if (!domain || !domain.host) {
            console.error("Domain is still undefined after initialization. Cannot fetch currencies.");
            return;
        }

        // Retrieve available currencies from sessionStorage or fetch if not available
        let availableCurrenciesAndCountries = JSON.parse(sessionStorage.getItem("availableCurrenciesAndCountries"));
        if (!availableCurrenciesAndCountries) {
            const currencies = await fetchAvailableCurrencies();
            if (!currencies) {
                console.error("Failed to fetch available currencies");
                return;
            }
            availableCurrenciesAndCountries = currencies.availableCurrenciesAndCountries;
            sessionStorage.setItem("availableCurrenciesAndCountries", JSON.stringify(availableCurrenciesAndCountries));
        }

        // Get values from window.__FcCheckoutConfigs
        const fcCheckoutConfigs = window.__FcCheckoutConfigs || {};
        const configCountry = fcCheckoutConfigs.defaultCountry;
        const configCountryCode = fcCheckoutConfigs.defaultCountryCode;
        const configCurrency = fcCheckoutConfigs.defaultCurrency;
        const configCurrencySymbol = fcCheckoutConfigs.defaultCurrencySymbol;
        //console.log("configCurrencySymbol", configCurrencySymbol)
        
        // Get values from localStorage
        let storedCurrency = localStorage.getItem("selectedCurrency");
        let storedCountry = localStorage.getItem("selectedCountry");
        let storedCountryCode = localStorage.getItem("selectedCountryCode");
        let storedCurrencySymbol = localStorage.getItem("selectedCurrencySymbol");

        // Get cart data from localStorage
        let cart;
        try {
          const cartData = localStorage.getItem("shopXtools.cart");
          if (cartData) {
            cart = JSON.parse(cartData);
          } else {
            cart = {};
          }
        } catch (error) {
          console.error("Error parsing cart data:", error);
          cart = {};
        }
        
        const buyerIdentity = cart.buyerIdentity || {};
        const countryCodeFromCart = buyerIdentity.countryCode;
        window.shopXtools.cart = cart;

        // Determine the country code using the priority sequence
        let finalCountryCode;
        let finalCurrency = null;
        let finalCountry = null;
        let finalCurrencySymbol = null;
        
        if (countryCodeFromCart) {
          // Priority 1: Use country code from cart
          finalCountryCode = countryCodeFromCart;
        } else if (storedCountryCode && storedCurrency && storedCountry && storedCurrencySymbol) {
          // Priority 2: Use values from localStorage if all are present
          finalCountryCode = storedCountryCode;
          finalCurrency = storedCurrency;
          finalCountry = storedCountry;
          finalCurrencySymbol = storedCurrencySymbol;
        } else if (configCountryCode && configCurrency && configCountry) {
          // Priority 3: Use values from window.__FcCheckoutConfigs if all are present
          finalCountryCode = configCountryCode;
          finalCurrency = configCurrency;
          finalCountry = configCountry;
          finalCurrencySymbol = configCurrencySymbol;
        } else {
          // Priority 4: Use first available country if nothing else is available
          if (availableCurrenciesAndCountries && availableCurrenciesAndCountries.length > 0) {
            finalCountryCode = availableCurrenciesAndCountries[0].isoCode;
          } else {
            console.error("No country data available");
            return;
          }
        }
        
        // If we only have the country code (from cart or when other values are missing),
        // find the matching country data to get the currency and country name
        if (!finalCurrency || !finalCountry) {
          const matchedCountry = availableCurrenciesAndCountries.find(c => c.isoCode === finalCountryCode);
          if (matchedCountry) {
            finalCurrency = matchedCountry.currency.isoCode;
            finalCountry = matchedCountry.name;
            //finalCurrencySymbol = CURRENCIES[finalCurrency];
            if (knownCurrenciesWithCodeAsSymbol[finalCurrency]){
              finalCurrencySymbol = finalCurrency
            } else {
              finalCurrencySymbol = CURRENCIES[finalCurrency];
            }
          } else {
            // If no match found, use first available country as fallback
            if (availableCurrenciesAndCountries && availableCurrenciesAndCountries.length > 0) {
              const firstCountry = availableCurrenciesAndCountries[0];
              finalCountryCode = firstCountry.isoCode;
              finalCurrency = firstCountry.currency.isoCode;
              finalCountry = firstCountry.name;
              //finalCurrencySymbol = CURRENCIES[finalCurrency];
              if (knownCurrenciesWithCodeAsSymbol[finalCurrency]){
                finalCurrencySymbol = finalCurrency
              } else {
                finalCurrencySymbol = CURRENCIES[finalCurrency];
              }
            } else {
              console.error("Cannot determine country settings");
              return;
            }
          }
        }

        // Update localStorage with the final values
        localStorage.setItem("selectedCountry", finalCountry);
        localStorage.setItem("selectedCurrency", finalCurrency);
        localStorage.setItem("selectedCountryCode", finalCountryCode);
        localStorage.setItem("selectedCurrencySymbol", finalCurrencySymbol);

        // Also update window.shopXtools for global consistency
        window.shopXtools.defaultCurrency = finalCurrency;
        window.shopXtools.defaultCountry = finalCountry;
        window.shopXtools.defaultCountryCode = finalCountryCode;
        window.shopXtools.defaultCurrencySymbol = finalCurrencySymbol;

        // Dispatch an event to notify the application of currency settings changes
        const currencyEvent = new CustomEvent('currency__settings-updated', {
          detail: {
            previous: {
              defaultCountry: storedCountry,
              defaultCountryCode: storedCountryCode,
              defaultCurrency: storedCurrency,
              defaultCurrencySymbol: storedCurrencySymbol
            },
            current: {
              defaultCountry: finalCountry,
              defaultCountryCode: finalCountryCode,
              defaultCurrency: finalCurrency,
              defaultCurrencySymbol: finalCurrencySymbol
            }
          }
        });
        document.dispatchEvent(currencyEvent);
      };


      const handleProductData = (newProducts, countryCode, inventoryData = null) => {
        // Transform the data to ensure collections are in the expected format
        const transformedProducts = newProducts.map(({ node }) => ({
          node: {
            ...node,
            collections: node.collections?.edges?.map(edge => edge.node) || [],
            // If we have fresh inventory data, use it, otherwise keep existing
            variants: {
              ...node.variants,
              edges: node.variants.edges.map(({ node: variant }) => ({
                node: {
                  ...variant,
                  // Update inventory if we have fresh data
                  quantityAvailable: inventoryData?.[variant.id]?.quantityAvailable ?? variant.quantityAvailable,
                  availableForSale: inventoryData?.[variant.id]?.availableForSale ?? variant.availableForSale
                }
              }))
            }
          }
        }));
        
        // Get existing cached products with prices
        let cachedProductsWithPrices;
        try {
          cachedProductsWithPrices = JSON.parse(sessionStorage.getItem('fc_products_with_prices') || '{}');
        } catch (error) {
          console.error('Error parsing cached products:', error);
          cachedProductsWithPrices = {};
        }

        // Update the cache with new products for this country code
        cachedProductsWithPrices[countryCode] = transformedProducts;
        
        // Store in sessionStorage for quick access
        try {
          sessionStorage.setItem('fc_products_with_prices', JSON.stringify(cachedProductsWithPrices));
          sessionStorage.setItem('fc_products_timestamp', Date.now().toString());
        } catch (error) {
          console.error('Error saving to session storage:', error);
        }

        // Update the products array with current country's products
        products = transformedProducts;

        // Update shopXtools
        window.shopXtools.productsWithPrices = cachedProductsWithPrices;
        window.shopXtools.products = products;
        window.shopXtools.getProducts = (_id) => {
          const fullId = _id.startsWith('gid://') ? _id : \`gid://shopify/Product/\${_id}\`;
          return products.find(({ node: product }) => product.id === fullId);
        };
        window.shopXtools.getProductsForCountry = (countryCode) => {
          return cachedProductsWithPrices[countryCode] || [];
        };

        // Dispatch the event
        window.shopXtools.dispatchEvent('data__products-ready', { products });
      };

      const fetchInventoryData = async () => {
        const inventoryQuery = \`
          query GetInventory($cursor: String) {
            products(first: 250, after: $cursor) {
              edges {
                node {
                  id
                  variants(first: 250) {
                    edges {
                      node {
                        id
                        quantityAvailable
                        availableForSale
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        \`;

        const fetchPage = async (cursor = null) => {
          const variables = cursor ? { cursor } : {};
          const endpoint = \`https://\${domain.host}/api/2024-07/graphql.json\`;
          
          try {
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": fcConfigs.storefrontAccessToken,
              },
              body: JSON.stringify({ query: inventoryQuery, variables }),
            });
            
            const body = await response.json();
            if (!body.errors && body.data) {
              return body.data;
            }
            return null;
          } catch (error) {
            console.error('Error fetching inventory:', error);
            return null;
          }
        };

        let allInventory = {};
        let hasNextPage = true;
        let cursor = null;

        while (hasNextPage) {
          const data = await fetchPage(cursor);
          if (!data) break;

          // Extract inventory data
          data.products.edges.forEach(({ node: product }) => {
            product.variants.edges.forEach(({ node: variant }) => {
              allInventory[variant.id] = {
                quantityAvailable: variant.quantityAvailable,
                availableForSale: variant.availableForSale
              };
            });
          });

          hasNextPage = data.products.pageInfo.hasNextPage;
          cursor = data.products.pageInfo.endCursor;
        }

        return allInventory;
      };
    
      const fetchProductsByCountry = async (countryCode, cursor = null) => {
        // Try to load from cache first
        if (!cursor) {
          try {
            const timestamp = parseInt(sessionStorage.getItem('fc_products_timestamp') || '0');
            const cachedProductsWithPrices = JSON.parse(sessionStorage.getItem('fc_products_with_prices') || '{}');
            const now = Date.now();
            
            // Use stored data if less than 5 minutes old and we have data for this country
            if (cachedProductsWithPrices[countryCode] && (now - timestamp < 300000)) {
              // First show cached data
              handleProductData(cachedProductsWithPrices[countryCode], countryCode);
              window.shopXtools.status = "ready";
              
              // Then fetch fresh inventory data
              const inventoryData = await fetchInventoryData();
              if (inventoryData) {
                handleProductData(cachedProductsWithPrices[countryCode], countryCode, inventoryData);
              }
              
              return;
            }
          } catch (error) {
            console.error('Error loading from session storage:', error);
          }
        }

        const tryFetchProductsByCountry = async (query, queryName, variables = {}) => {
          const endpoint = \`https://\${domain.host}/api/2024-07/graphql.json\`;
          // console.log("Domain object in fetchProductsByCountry:", domain);
          // console.log("Domain host:", domain?.host);
          try {
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": fcConfigs.storefrontAccessToken,
              },
              body: JSON.stringify({ query, variables }),
            });
            const body = await response.json();
            //console.log("[DEBUG PRODUCTS BY COUNTRY] Body:", body?.data?.products?.edges);
            if (body.errors) {
              console.error(\`\${queryName} failed with errors:\`, body.errors);
              return null;
            }
            if (body.data && body.data.products) {
              return body;
            } else {
              console.error(\`Product data not found in response from \${queryName}:\`, body);
              return null;
            }
          } catch (error) {
            console.error(\`Network error during \${queryName}:\`, error);
            return null;
          }
        };
        const variables = cursor ? { countryCode, cursor } : { countryCode };
        //console.log("[DEBUG PRODUCTS BY COUNTRY] Variables:", variables);
        const body = await tryFetchProductsByCountry(getProductsQueryByCountry, "Products by country query", variables);

        if (!body) {
          //console.log("Primary products by country query failed, attempting backup query...");
          body = await tryFetchProducts(getProductsQueryByCountryBackup, "Backup products by countryquery", variables);
        }

        // If we have valid data, handle it
        if (body) {
          const newProducts = body.data.products.edges || [];
          const allProducts = cursor ? [...products, ...newProducts] : newProducts;
          handleProductData(allProducts, countryCode);

          const pageInfo = body.data.products.pageInfo;
          if (pageInfo.hasNextPage && pageInfo.endCursor) {
            await fetchProducts(pageInfo.endCursor);
          } else {
            window.shopXtools.status = "ready";
          }
          // Return the products
          return allProducts;
        } else {
          console.error("Products by country query failed.");
          window.shopXtools.status = "ready";
          return null;
        }
      };
        
      // Initialize shopXtools and attach fetchAvailableCurrencies to it
      window.shopXtools = window.shopXtools || {};
      window.shopXtools.fetchProductsByCountry = fetchProductsByCountry;

      setupInitialToolsObject();
      configValidation();
      setDomainUrl();
      
  const validateDomainForFreePlan = () => {
    if ("premium" === "free") {
      const isFramerSubdomain = domain.host.includes('framer.app');
      if (isFramerSubdomain) {
        console.error('Free plan users can only  use a Framer subdomain');
        return false;
      }
    }
    return true;
  };

  if (!validateDomainForFreePlan()) {
    console.log('Domain validation failed, products will not be fetched');
    return;
  }

      
  if ("premium" === "free") {
    // Wait for DOM to be ready
    const insertWidget = () => {
      const widget = document.createElement('div');
      widget.innerHTML = \`
        <div 
          style="
            position: fixed;
            bottom: 60px;
            right: 20px;
            border-radius: 10px;
            overflow: hidden;
            z-index: 999999;
            transition: opacity 0.3s ease;
            box-shadow:
              rgba(0, 0, 0, 0.26) 0px 0.636953px 1.14652px -1.125px, 
              rgba(0, 0, 0, 0.24) 0px 1.9316px 3.47689px -2.25px, 
              rgba(0, 0, 0, 0.192) 0px 5.10612px 9.19102px -3.375px, 
              rgba(0, 0, 0, 0.03) 0px 16px 28.8px -4.5px;
            width: 142px;
            background: white;
          "
          onmouseover="this.style.opacity = '1'"
          onmouseout="this.style.opacity = '1'"
        >
          <a 
            href="https://framercommerce.com/?utm_source=framer&utm_medium=badge&utm_campaign=free_tier" 
            target="_blank" 
            style="
              display: block;
              line-height: 0;
            "
          >
            <img 
              src="https://www.dropbox.com/scl/fi/liuwd84g4nioi6fmu93e1/fc-free-badge.png?rlkey=yearpo3rkxqalq4mtmabujdk4&raw=1" 
              alt="Framer Commerce"
              width="142"
              height="36"
              style="display: block; width: 100%; height: auto;"
            />

          </a>
        </div>
      \`;

      // Check if widget already exists
      const existingWidget = document.querySelector('[data-framercommerce-widget]');
      if (!existingWidget) {
        widget.setAttribute('data-framercommerce-widget', 'true');
        document.body.appendChild(widget);
      }
    };

    // If DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(insertWidget, 1);
    } else {
      // Wait for DOM to be ready
      document.addEventListener('DOMContentLoaded', insertWidget);
    }

    // Backup in case DOMContentLoaded doesn't fire
    window.addEventListener('load', insertWidget);
  }


      // Initialize cart from localStorage
      const initializeCartFromLocalStorage = () => {
        try {
          const cartData = localStorage.getItem("shopXtools.cart");
          if (cartData) {
            const cart = JSON.parse(cartData);
            //console.log("Initializing cart from localStorage:", cart);
            window.shopXtools.cart = cart;
            
            // If cart has buyerIdentity with countryCode, we'll use it during currency initialization
            if (cart.buyerIdentity && cart.buyerIdentity.countryCode) {
              //console.log("Found country code in stored cart:", cart.buyerIdentity.countryCode);
            }
          } else {
            //console.log("No cart data found in localStorage");
            window.shopXtools.cart = {};
          }
        } catch (error) {
          console.error("Error initializing cart from localStorage:", error);
          window.shopXtools.cart = {};
        }
      };

      // Initialize cart before proceeding with other initializations
      initializeCartFromLocalStorage();

      // Check domain before proceeding with product fetch
      if (!validateDomainForFreePlan()) {
        window.shopXtools.products = [];
        window.shopXtools.status = "ready";
        window.shopXtools.getProducts = () => null;
        // console.log('Domain validation failed, products will not be fetched');
        return;
      }

      if (!window.shopXtools || !Array.isArray(window.shopXtools.products)) {
        // Initialize currency settings first
        initializeCurrencySettings().then(() => {
            // Get the stored country code
            const storedCountryCode = localStorage.getItem("selectedCountryCode");
            if (storedCountryCode) {
              // Then fetch products with the correct country code
              fetchProductsByCountry(storedCountryCode).catch(error => {
                console.error('Error fetching products by country:', error);
                window.shopXtools.status = "ready";
              });
            } else {
                console.error('No country code available for product fetch');
            }
        }).catch(error => {
            console.error('Error during initialization:', error);
        });
      }
    
      window.__currencyMap = CURRENCIES;
      

    })();
  </script>`,customHTMLHeadStart:`<!-- Plugin: ced618 --> <script>
        (function() {
          window.__FcCheckoutConfigs = window.__FcCheckoutConfigs || {};
          window.__FcCheckoutConfigs = {
            ...window.__FcCheckoutConfigs,
            checkoutLocale: "en",
            defaultCountry: "Netherlands",
            defaultCountryCode: "NL",
            defaultCurrency: "EUR",
            defaultCurrencySymbol: "€",
            metaPixelId: "",
            googleAnalyticsId: ""
          };

          // Store settings in localStorage for persistence!!
          const existingLocale = localStorage.getItem('checkoutLocale');
          if (existingLocale === null) {
            localStorage.setItem('checkoutLocale', 'en');
          }
          const existingCountry = localStorage.getItem('selectedCountry');
          if (existingCountry === null) { 
            localStorage.setItem('selectedCountry', 'Netherlands');
          }
          const existingCountryCode = localStorage.getItem('selectedCountryCode');
          if (existingCountryCode === null) {
            localStorage.setItem('selectedCountryCode', 'NL');
          }
          const existingCurrency = localStorage.getItem('selectedCurrency');
          if (existingCurrency === null) {
            localStorage.setItem('selectedCurrency', 'EUR');
          }
          const existingCurrencySymbol = localStorage.getItem('selectedCurrencySymbol');
          if (existingCurrencySymbol === null) {
            localStorage.setItem('selectedCurrencySymbol', '€');
          }

          // Dispatch checkout settings update event
          const checkoutEvent = new CustomEvent('checkout__settings-updated', {
            detail: {
              previous: { ...window.__FcCheckoutConfigs },
              current: window.__FcCheckoutConfigs
            }
          });
          document.dispatchEvent(checkoutEvent);

          
          
        })();</script>`,description:`Design, scale, and publish your website—no code needed. Start for free today.`,favicon:`https://framerusercontent.com/assets/Io89FonxEaWg4nxvQQllVLwPUUI.png`,robots:`max-image-preview:large`,socialImage:`https://framerusercontent.com/assets/ZXV4KtE6NwHb7TgmfSLsobIO0.webp`,title:`Framer: The website builder loved by designers`}}var n=e(()=>{});export{n as init_siteMetadata,t as metadata$93};
//# sourceMappingURL=siteMetadata.BE9C0RTQ.mjs.map