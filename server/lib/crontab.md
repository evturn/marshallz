### ////CRONTAB SYNTAX/////

`*     *     *     *     *`  command to be executed
-     -     -     -     -
|     |     |     |     |
|     |     |     |     +----- day of week (0 - 6) (Sunday=0)
|     |     |     +------- month (1 - 12)
|     |     +--------- day of month (1 - 31)
|     +----------- hour (0 - 23)
*+------------- min (0 - 59)

min  hour  day/month  month   day/week  Execution time
30   0     1          1,6,12  *         00:30 Hrs  on 1st of Jan, June & Dec.
0    20    *          10      1-5       8.00 PM every weekday (Mon-Fri) only in Oct.
0    0     1,10,15    *       *         Midnight on 1st, 10th & 15th of month
5,10 0     10         *       1         At 12.05,12.10 every Monday & on 10th of every month