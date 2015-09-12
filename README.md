# hexTime

The time based on powers of 16. See the bottom for usage.

## How do we normally divide units of time?

These are the seconds, minutes, hours, and days you grew up with. Here's a
a little chart describing how many of a smaller unit fits into a larger unit:

| Number of   | 1 second | 1 minute | 1 hour | 1 day |
|:-----------:|:--------:|:--------:|:------:|:-----:|
| seconds in: | 1 | 60 | 3600 | 86400 |
| minutes in: |   | 1  | 60   | 1440  |
| hours in:   |   |    | 1    | 24    |
| days  in:   |   |    |      | 1     |

As you can see, there are:

* 60 seconds per minute, 3600 seconds per hour, 86400 seconds per day
* 60 minutes per hour, 1440 minutes per day
* 24 hours in a day

You already know this, even if you never thought about it...You count 60
seconds for 1 minute, 60 minutes for 1 hour.

But does it seem a little arbitrary to have to count 24 hours for 1 day?
Maybe it does...Most of us grew up with that system and we accept it.

If you like numbers and/or the uneven partitioning of the day bothers you,
read on.

## What is hexadecimal time?

Hexadecimal time is an alternative way of measuring time, based on 16.
One hexadecimal day is equal to one 'regular' day.

In hexadecimal time, the proportions of a smaller division of time to a larger
unit of time is based on 16. Here, they are represented, decimally:

| Number of | 1 hex second | 1 hex minute | 1 hex hour | 1 hex day |
|:---------:|:------------:|:------------:|:----------:|:---------:|
| hex seconds in: | 1 | 16 | 4096 | 65536 |
| hex minutes in: |   | 1  | 256  | 4096  |
| hex hours in:   |   |    | 1    | 16    |
| hex days  in:   |   |    |      | 1     |

*Here are the relationships, when you convert the above values to base-16*

| Number of | 1 hex second | 1 hex minute | 1 hex hour | 1 hex day |
|:---------:|:------------:|:------------:|:----------:|:---------:|
| hex seconds in: | 1 | 10 | 1000 | 10000 |
| hex minutes in: |   | 1  | 100  | 1000  |
| hex hours in:   |   |    | 1    | 10    |
| hex days  in:   |   |    |      | 1     |

Pretty cool, huh?

##### Read more about hexadecimal time

* [Wikipedia page](https://en.wikipedia.org/wiki/Hexadecimal_time)
* [Intuitor](http://www.intuitor.com/hex/hexclock.html)

---

## Usage

All numbers are expressed in base-10.

#### Convert from regular units of time to hexadecimal units of time

```javascript
var fromRegular = require('hexTime').fromRegular;

// convert regular seconds to a hexadecimal seconds
fromRegular.toHexSec(86400);

// convert regular minutes to hexadecimal minutes
fromRegular.toHexMin(1440);

// convert regular hours a hexadecimal hours
fromRegular.toHexHour(24);
```

#### Convert from hexadecimal units of time to regular units of time

```javascript
var fromHexadecimal = require('hexTime').fromHexadecimal;

// convert hexadecimal seconds to a regular seconds
fromHexadecimal.toRegSec(42);

// convert hexadecimal minutes to a regular minutes
fromHexadecimal.toRegMin(42);

// convert hexadecimal hours a regular hours
fromHexadecimal.toRegHour(16);
```

#### Use `HexTime` like a class

```javascript
var HexTime = require('hexTime').HexTime;

// convert from regular time to hexadecimal time by passing it the
// regular time as a string
HexTime.convertToHexTime('12:00:00');

// get hexadecimal hours from hexadecimal seconds
HexTime.getHHfromSS(65536);
// get hexadecimal days from hexadecimal minutes
HexTime.getDDfromMM(4096);
// get hexadecimal days from hexadecimal seconds
HexTime.getDDfromSS(65536);
```
