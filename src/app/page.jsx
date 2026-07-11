'use client'
import { useEffect, useState, useRef } from 'react'

const MALAKESA_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAAB0CAYAAAD3lyfIAAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nOy9d5gc1Znv/33POVWdZ0YjjQKSQELCIiMQIBQZgw0WAoNtBlBEBMtpndb2zxvvytfXG7w/717by2JsYxMEyJbtxQQJ2xiEAtHknEVQliZ2qqpzznv/6BlpJGa6e2Z6kqjP8/QDmq6q8+3uOvWe8AYgJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCSk36HBFhASEhIyxKFl86OTAiNGCqIaJltNDCEEedZS1gqbheDtZk9++9oX4Q+22JADDDkD19AAqXbGLyJmp+dn85O3b86/1VcNi+YkTyAyx/f4RBKtt2/K/KGv7XfF8rmxIzUws0dyCOzL3H1rNyDdH5qWzE+cxNYeW86xQpA3dWP2nlWA7Q8tfYCWzI0vZHCsJydZQW+s2Zh9uj8ENcxCTKnYBcQQ5RwvBf/l1o35t3vXTvz8nvQ1InDEJv7wiy1727o7ZvH8+AWwnOipnr4gJO9c/VB+U6Wut3Ru4hQLu4iJPkrgkwDqfH/Y9pc65DQG0CSBdwD8xYCfEyxf8FT6L/3VB7ti5Qw46UTsIljInpwnWD23ekvbq/2lazA49AcadNzd8dMY+B8I0j08lSJMLwE4uS/t19dDWcv3S4g6gLkn7YNZrvzYiJqf3t/U0hcNXeGT+KUgPhuFTlQeDDHOxv8FyP5DpfUAgGH6iSA6C1TcaBEDlqG2z0+cjI2Z5/tDS29ZPC9xHoPvApHpwWnkMGcXLEDd+vXwKq3JcZILwPY3ECjZB4ghIky3AljRkzZWzkC81YnfLyxmsqDyBh0MyQByMv8xAA90dcjSefFxlnEvBBn05F7tCwxiRh5Aso9XosVzE8uswN9Y5uNICB2VQklJUBIgKswHiCCAA4MPZsAyw1oQM9cay7XW8slsYCys6+q4XTYfL1mm+y3zA3dszt6DfvxuWpOpFWTNDSRQ/j3NIEV6K4Cp/aVrMBhyBg6aJQShOuEo0YP5pTGM1qw+6aq5sZm/3Jx7rLfNH2GTnwTb0VUJJWQPBGjDaMtqmIzp0aipHJbPio3XzPXRmKKYorJFeb6xLZ69BsA/oh86FIGV7woeE5FF7yNrGS0ZDdY9G1EODHRVIJEdHVdlzziYgZZ0kDgxH7twPXK/rbQiBhRAtjapSvZPP6fbSNsefa/LzkOiOZ94QBJmpJJSSEElZ4q+NiaTs3CYv3bzpnSXxg0AWLKEIaTiSvaoA/cBrY1N53v2HRzKFfXRSWzFbWT5rKgjRFRJSEllPR+JAEkEKYBOi2ISgGQGtGGhjT3RGJ4WGHztyjnJE2/ekn6xL3qLwYyVcIStjRbvl50xltGa0VM+e3b8jJ89lH2iv7QNNGUtgQwHpCQ4AkFU4Ot9uY4BvmGUMD0xbv2NdtRSIxH0xLgBgKOECICxX5gXnd9f2oYzS2bWVjHZS6Ku7NHyJBHgOIQ2jS/0l7b+oqEeST+feFACM2riUpZzn/uBMZmcFQr8lZs35340ADIHlCVnx88QRryoBM1MJZVIRCSkrEz/JwIcRYhFJBJR6QCAJO63icXlsyNTJJsZKaf0oKUzUhBcibyyuKq/tA0Gh42BAwA3IlQr02c+Pzs5ujfnL5mfOEmynV3liiE1s7Ww10CJHo9QhSAoCS2IPtsfuoY7HAkawBAp2fN+4Cgh2ojqr5qXrOsPbf3B1XNGpcgkNgjCadVxKUUZ4yU/0CaTt8IBvnTLptx/DYDMAWVZffJEY/GAVCJWE1dlGfyhDEnnSkOk3V58EOWQm2YsaTgBbn9oGwwOLwOnJEkCS2VX9uZ8A3xVC/Jc2bOZUn9yxZz46YL5mBqn5wYOAFxHyhbGp1fOQLzS2oY7lvkq7QhDvfi5HSlAAEbBLK28sspz9ZxRqYzMPSQFptfEypu5eYE2mTwLQfjCzZuy1w+AzAGloR7JwPCfpCPiVbEKTdkGF2LwNcopb2n1UFylhCUka0bEFlZa2GBxWBk4AHBdIdOML9fX92x/cfHc6hHEvCTmiCE1ehEkVmhBOVXOcLsLXEcQQJFIKvGpSmsbziybH50sYGenlIj05vzC0pMQjQKfq7S2SrNkZm1VRuQ2CeDkmriUogzjFvhaZ/MsJPC51RuzNwyAzAFH2sQ/MPGo6og8LJ6DS89OzZXgI1Ju76ahRICroAXRNZXWNlgcFj9sZ1xHCg2MOtbELu7Ricpew4BM9vLm6A9WzoDDxEscl3r1EAYKW96OQ+xbO+QfxANJYNVyQ5Tr6b5mZyKuoJylaV+akzyhktoqScPHRlTriLdZCJxYU+ayZBAYnfZYSsJnb92U/dkAyBxwVtQjCuavxFxZ9nqNtUAQWHiBRc43yHoWOc8g7xf+pjX3zO+6wmiLa7SgoC8LUI6STppw/qL61KgKShs0DjsDVxiFEGvgG+WeswoQ1tqvktu7ZcD+Ih2PX0DgqirVtxGmo6RIW5rz+Vmx8ZXSNswhEK9gh/o0W5eCIAWMI821lRJWSVbU19QI398sCMeXO3PzfaMzOSsk6OpbN2Zv7E99jIL3c59fvYis9G3VOQKIxp3SX4o2zJlMkGvJBEjnjZ/L67fyntnsBfrBnG8fyeX1qxnP7GnLaTSnAzSldb4tp40fWNgBMngNsxADm4a40zf/AaUECWauMnpRpbQNJkPKmaJSuK4UbZpnfXZO8oSfleGO++rc1ELB5ohqZ2gtVViIq62CLwjRvlzHUUQkYGJCLAPwrxWSN2xZMi82m8FHVTl9H8+4SojGwF7Z0IBvrl3bg7ijfmbx3OoRORtsFoRp5c7cfN8E2byVBLrq1k2ZW/pbYxAYm8nbSvQ5IYCmnpxgwBdDCktUPHTFDyxn84YF434B8R9eU/rh7rKVrKivqfFM/hQCTfeNOD8w5hzKG5cEBfGIdPvz6aJk4hIQl2Wwi1HwEBZCa74WwI8rJG/QOCwNnJJEjoDvwn4NQEkPQivs11kKLUTfRvSVZPm5qZHaNwuiqngsCzPgBQZRRxbNS+Mqki3arkRo4GAhrzSCs46gorFvfmAhJaGYQ4brCsr5tmbCjsTHgcx9FRfbCxpmVdUaobdIwjE1MSnLcaLxPBPkPCtBdOXqTZnVAyATALMLvOuzM72vV9qXasn25HgLnuuW8J5lAJ6n/Sjw4xs3575V6po3bWhuBvBQ++uHDbMQUzJxNlu7NJPjBiYI6qdnrhH0WZLEpX7qfGDgSFH0nnYcKdoCffJV85LH/3JT+qUKSx1QhrWBswx09zs5rnRa8mZpw8dGfHNtkcwii+pTx5Ix9fEio/li7fQXvsdXkACXGpF5geGcZwlCcLTIflLEldQS8ORr58Zn/Hxz9snKKx4erKhH1DPmChVRRWPfmBlZzxgrZb421r0hFERwBTgo7HEOuoFbfm5qpOebLYJ4anVMSSrHW9LTQc5jSeClqzdl7xgAmZ0xt29u6dHsqxII5jq3RKiYMZY1k6vZ+Wcg1+M21j6CXPug577Fc6u/TOwvA9HCnBLbeim7SwrZY+zZcVcV/bGtZeTylrMuuLaIY42SRK7gfMyaKwF8u5JaB5ohtSTXE9qzScA3Xa9yu4oIxGqcn19R9DqGv6IF+ZFujIMfWG5N64HfOhZ8tS3DddIENgCAVlP4b7eXE4VA+BjhsPGQ6g2BjV0MUKxaiqL3fmCYmSFJm6gp8esrV1ETaOGXZ9ZWVVJrT1lUnxrlBfYRKXhqTdwpa8/N83SQ81lIwYtXb84NtHEbNAhc1R7p0S1sGSD4lTDAt29uabp9c+5Ht2/Knn/Hhra9fb1eZ4yQy5hgSoU3aWMsAGLflkwBpxzppomuamgYitmHymf4Grj2zFMtPne5Hk5EiDhCtDL9NbpZvFsys7YKMCuibvehAUFgfDtAKfU6WFSfOlYwn1ZVYsPYWoZv4QrgtzKwJR24lCNUC7Bk5Qz0IpH14YFlcVXgCL/Usz/QllPgzUycb9W2qBuD64BALKJu/rJKau0JDfOSddaaRwTx0dUxp6ww3w7jJpgX3bIx96v+Vzl0ICq9eiWEABiRK4ewlywAWGuvJbd07hXtsxcD7iTA8XTxx4XjCKEZoxK7E+dUUOqAM2wNXAdKW8d081u5jhQ+MPHz8xLndfW+cfwVBFJJp+uRjzbMvkGvXfR7jbHLjaB8qRGZry07hH1C81eFhZPv7otoJ+JIMkDSjccPm0DOntBQnxhL4I8lpCiemosBHTCihOuJxZ1+wJlihxMIEUdQCw1O6i4NqhOwjwqiySPiTom5aQHP137WZyLw5bduzq3tf5VDC8uUtlx85ColkSvhsTR3LpkXmzNQ2nrCFfPjp0rwMSlZfL3VWoZnEWPmH1gSj7WVGLQJIkQU+zFrh/WKz7A3cGDolsB26b0mBCGiYJj4r7t4m1jYr8GVgrpZqQgCbYgHtr7TKkAwYYVwRMlZlg5skGLcccsjuW0WtKVV26JaC8HJYEulHW8OR5TGEgsE8W4GNB34xjIDOhC5u4h5jWtsotQypSOlSDNO++b86ORKai6HPHC+EHRUTVyVFQLl+drPeiwU82WrN1U+WfRwwBLv8UsYOACIx5yIlOJIBm1aNj/++OJ58b9bPC925lBZumNWV2tBvioxfwuMsQ5h55Gbcw8Lwq2ihIEDACWV20Z0ydVzRqUqJniAGdZOJgAgiH+tPXsZdzNFdxwl27T++LXzo5N/3qlm1uJ5ifOYeVJ1Nw87ZsD3IRTxGh+0pN8+wCG8Pi/xUWIeW1UiANlYRmDhZphXAwAJuk35dia7EsXOdBwpWow5/0vnpkZe9+e2fZVVP7RhwlXaLT3BCQJjawh/uG4D0g0nZP+oauPpZmMTI4vkA1WSIAmaIa5GoXrDgGCBqJBkqmJlGjcv8LM+hAIuvWVz7vf9r7A4BqhZPDfRN0cGYV+/fWPudz05hSA3+tpOglv8diAC4jHlupbh+/Z0MnyStvieszPuLZuHFwFssURPCkFPTtmQfmnVANY7rK+HgjFLo4pKDoYD33pRi9tXAXZZgN8YgR/nDXO0yF3juEQ5D1JStgHALyqpfaAY9gZOsbxRC9uQ8ZmT7gd/LEcROQQ/xvRX6BT8bYCvs6JAdhMa4AXGCoFGbfE7EAbMwFnCVZrIU4KKxr5pba0D7Prl5tzjAABBvxUG12U1c6LIDMVRggiaha8XATjskud2R6GAJZ9Q41DRUbtlINCgqOWbAGDti/AXzaPfao8vhUL3I9lC6i65N7DXAPhfGKBaaNGYcsoNksx72vd8EDM+fcvm7N39KqwMhJCChElI4H/39hoWLJSl3QB6ZOAE83oyvIIZRQeEHShBUFFJAKLWMrThiLF8mjH2ZFsIOFevz4+ll4M2GuY/CeLf96YIbU8Yr1OfYDLVpbwnjQUCSzHLuAMAbn04vfvyecnNbYGdHZXdhyERCK4C2PA1GKYGbtgvUSriRgLdlgtMt4UnlSucZsLKhlmIAYWSEgJ8XsqVXY58GIDvWZ0ErgOoqHdiJWmoRxLMn465pfMj+oHRNeDVaH+Q3rGhba8Fbcia7r8HoOBt4zpCZIk+VKm7LIkrtaBMpIRjaqAtE7G3z8mt6/ibIKxxjU3oEktarisoAMZ9de7Q26/xPO15PpMGPnXHEDBuQMEdPZVQblUfXnGXiLvbYyiCaUzfxaB9bX6pxecPIgTBdQRiEYlk3FE1KUdVJxzEIiopJS0gou8bFm8unx9/YvHc+MoFC/pnHz8Q+KyWZEp5lwRaWwd499Yt2b/s/wygW0VQerLpuFJmmWatqI9O6qvewWDYGzgAkBY/UpajfjdOFhFXEjPFxjjxxQAgpPNXRsDvbnoeBIYtQewR9JP+1H0ojq76NIOcZIlKkcYytCU3z+K2zn8nFrfJgGUpf0pHSZFjnLiyPnVsBWQPeerroRh2mXRFycmO1saOINx90wbkO/62TWQeYKLm5qD4voUUBEfCMKFX1Sz6Cy+vvZzPxBYXr9mUvXew9QwF1r4InwSt0j5bXYF8WkIAEUcgHlNUnXScVFySUGIGCb5uVDr+7vJ58WsruW+3eG71CMlmQbKM9II6sF4cOCh4X2v6HRGQK/HhlRDkCPgxFsv7qnkwOCwM3OrNmWcNi0dbAtPlbKswayHKMb6x7DwkGPbaaDezNwAIfBukLP9u7YbMzn4T3QWGzDXWgS21ZBJoYyPEW2/YnHm2898jSv4PAciW8KZUkqAEB1GjD6viht1xhI2fR+Da6hI19awFfA1Bmm7u/PcNG6DBtNYEXDJbhuMI0QR8ZlV939KrVQrP015eMxj0ydu2ZNcPtp6hxLSH0j+xRH9uzZoygmx6hpICiaikqoSrnIgYbQg/SeyM3V+pJMZWmcsZoFiJwbC2zIGlmC/FQTGOax9pbWSIB9MBF08vVyju6+QtrkbRXElDk8PCwAGAEPhPFbDsLvGq60qRA47jfPy/QYimVNeby6Y9tkwz/rM/9R7KFfNjEwV4XtLp3vB2EPisqwx9IFfgTRuam5noT9mAiy5TAoBSUrWArlp1GN0D3cEQKwJFuZJLOcawAqfz+eyfDn1PAmtca5MBF38SukqSBUXTiF3SN9WVgZmFBeAAJYN7P2ysAqx1ncsYeKElo4OgN1mbSyAIiLkSqbgjmWiOY80zi2YmxvT1umywkko4yACA1tq64Ndu3JB+4QParFgtNVOpEghKSeEBR101PzarD5IHhcPm4ZbKpP/Hgva16q5DBqQguAKBZSyH021kAHxf6zjh+Z9vyT3an3oPRZBaZon8WIk9Im0YmuH6kLd39T5B3i4Nq1LB6RFHUACM2jMv8dE+yB7yrKivqQHbi2NOidg3AEFgTQ3R7376JD6wEjB1c3ojg/a06OIjXiLAdQhpMzgxcYcSjTpOTJEIiO+9cl7i3MHWM9RYe39TS1RkZlum37RlDbd6xlZ6NgcAUgDJhOMQYXQswvf0ZV9u8fzIMRJ2eneD9M5oH0FUUJe5RSlQdwJsS634SEFwJbwo07Bb8TlsDNxPn0RAgq4zgel2pOpGCh5DNY7scqmKGfA0SDH9R3/p7A5rzdVwSZVaBAi0sVHiV67f0vZqV+9HjXsXgU0mKH7TCkGISBim3lU/Hy742lwGAIlSgbDMCAyUhegyi/4qwAL0K+tzyaSEjpKiDTT3i/WJsb0SXWGiUeXEFAkNXhcauQ9y0wbk12zKLBZEnwh8fqM1rW1LzphAV3hGVwg5cHzmU47MxD7f28tY46wwRIFTYklCG8sBIxqQ6TIF222PNbYakn/MBFxydu84wmkDX7FiiCy9l8thY+AAAHm+QVqIdND1xqmjBFUlFLpLMxpoYyWQzsvMmv6UeSiL58XOFMCUmlJ13woZNkySu34IA8AvtuxtA4v1Oc357o7pQDlStjJd3FCPZC9kDwus4Ku0I2yprJ5+wKyAplEb0xu6O4bJrHGsTZbasFGKIAgcN3ZZ71RXnmhUOVGHSIPXLZ+b+Nhg6wHaY00D26eXtpXbF7ptY+aPZmzmeDAu1prvS+eNaUoHpiWrg7xvoY1FiRXqkghBiESEzIH+vpezOGLBVztu6bpvWlsTIzx34wbvje6OUcyrpbGiVFCLo6QAKCZ17KKeSx48DisDd8djmV0M+k3W734PqtskfQx4ntVJy9d39qAbCCzLFYGgnCqR/FVbC81QrbLrEVkHxOZ2pa1bavzpOEQMqPFIXNpj0cOApfWRqYLtzCqndEV0rY2pBdasKhKou2Zj7hFLtL2lxIiXACglRBMwpEIxOoycIb53KBg5X2ubzRmbzeu23r5832bAKFnzsVzWroW5bXP2njWbMhcqR46B5UWs+RdZ325tyxo0p7VtzuhcOm840BZlJEP5ABFHCc0YNTadqO/puUvn1pwtwWOTqkQpBABBwEaAbi12jIyl72aGzpTITVmoEwejiIZkcd/uGPaB3ofCbH/oWFoUGMFOD2q3B8aysVA5gf/uT32H0nACXBAvjpQR+xZoa6PAK3kdaVk8NzKiu+OU8R8OHOh0YKnK6X6dnkBwHSCn7ecA3NS7TzB0YSOXGaJcVIp4seOMLSxPehZ3L55b3e332n7RuwLNSxEpnrA64ghqDeyUr81OTP+/D2ee6YX8ssh52vcNZLmZTKJR5QA6yAd87/K5iYW3bM7c31/aSkEAO4R3b9qUO3qwNBTjlkKmn7XtLzTMS9Yptmex5Vm+5bMDjTMBEAkKoo6IRJxyysq279MKeHFrzwXwh55o0tJcwyQCKYpnL9HGsma4AfDHYve0yQJM9s9ZbT6ecFTRazpKOunAnLtoZmLMHY9ldvVE92Bx2Bm4NZtzj10+N/FMi29PGBUr7ZHYgR+YICnwhxs25t7rT32H4oxMXgi2qXI2jAPNbIDjQUFjseO0IhAD2rApVTfAdZRsC/TMlXNjR/50c+7dnqkf0pABXcVO6SK2urDJTi0C6/BB/5IP4FjAsixaI1BKghIwRPxZAF/qge4eIS08azjVlNN6REyVSPBWoN3I6aFg5IYTazel9wC4u/2FhnokHRM/1xq+MGfM0qxvqCqmIiU89wEAUpGjPT6jJ+2vnIF4qzWfiUWLF0EGgKAQxE0EfrZUrgoJAJpKbjg6SpAgY6qidgmAAfdT6A2HnYEDAAn5n9aYG8stVNoe/+QqFgPvXMJ8tVEiEFR6PT4ZU7InWwBCUMkgUCUIiqCjoCsBfLf8qw9tFs+PzgPzhKoihWw7cB1B5TyU9kNU1n3lulI05s2S+np8dcOG/nPTj4AfyBma2pTTR/TAyKkOI7f07MSFqx/KfCA0IqQ4azcgDWR/D+D3DfOSfycs396SNWfXJqVTMrkKAZqoR+ECbfGqTxNpN17GzRqLKHKd8h8WJMrbrnIVSU/jGgwTA3dY7cF10JRq/RUYbaXqeHXgB9pEwa/9fHP3Dgb9waL61CgiPj+pSs8ygMIGtZTlv8pbLwGUQ6qVeFitrZeCrbwykDJbzqoRAT36Xku4Au3HUYI0UHUa4p/o48cp3g6w3dV2Nhtsb8rpErspB4hGlYo6RGz5nqVnJz7enxoPd9ZuSu9J2NinAfazJTyYAUAQkSbU9KQNA/tZVqLsft2Te7q8xVVAuVLkGccvn5c4uSfaB4vD0sCtXw9PgK7XXvHyMQAKziWBZdcOfGgAa17MDFsqG0F/4zqKfKYjvzAndtZg6qgUDbMQg7CXuw5Kxr71J6K9PJFv0GuX8HK55ZHctg4j15jVZWef6nA8+bAZucXzI8dcMT9+aiWv+Yste9ssxJN5wyUH1swM4tKezh0snxUbr9jOTZaxldGfKEHkCs4ngGERE3dYGjgAIGmul8xOtkRX9wLDYHiZRLbLYMh+RfA17Agq3xWmf5ACcAQCR9GwLm7YgZKxS8AUKeZgM1A4jqQm4Pyv1df0aLTeG255JLcNlmfBYntTL43clfO7Lg58uGGt+j+C8dTyebE/L5oXPbtS12WG4DI6NDNYgfaWe93AUcusIBMpawG6f1GudLPEy+rrh/4W16A/APqL2zbk3rck7sr4tmjaKt83QRWJn9/6RxSt2lxplsxLHi+YT65ySsezDASOI1QT8xX9lfl8QBHiqkCJYCjc3I4kImJy2F80EO2t2ZLdDsuzyGJbj42cS6SZ7/4wGDkrhGMFWaHEXILYcOX8+OOL58WuWDkDRT1ui9EwL1knYc8olVQAAMBsFWFH2XrJXCud0nvqA4GrpAgYtVNtfMjfJ0PhGdBvEOsfKsMR3U3eqsAwayYno/WPB1qbBV9pCDm3B6EM/YnrSLJM8cnp4RXIeShXzIkfQZbPTarSlQMGAiKC4whq5oFL3bVmS3Y7W55NFtuae2LkIh8yIyfBiZhyqxIKQtJpRLQ6E4/vvXJebPWSOfEFPTF2V8yJHyHA95GAiJUxy2ILn5m7zEZ0KIvnxmdIiympIbAiARTCHKIKvmJcPdhaSjEkZg/9xR2b8g9dMT/xSmtOT3HFB91grbUyRdhww8PemwOpq6EBkndihXRlydmSZYbWfcueQAQ4UhTNBU4EOIrYGqwE8Js+NdgNWYWrFs9NbO/rdYjsm7dtynWpkYRcasn4cad4wVgACDT3OTOFbHf8KYarhGjzzUlfmR855kcbvdf71GCZrNmS3X7FnPhsAA83Z/X4mrgqa6c3GmmPk/P57ivnJy66eWPmj/2psyIVvduRiu69tYukwiXPE4R4TMkYA4G2scA3DQwszsTjdul8vMwWD1nCM5Kwm5n3Wan2KbDS2tSQoGnW0nmC+FMsQDUxVfKZygx4FlHLtKkcfUaoq5mM311x5v3XBaCDUlloSyOlKOlIJZVw27T95Ir6mpqbNjQ397HJfuOwNnAAoMh8zrJYGnRV15Bh00QDGtgNAGp34hyA61JFKm934OW19jQsULpCQHcwKM4uUBspXi7GdYRoM+acz89Ojv7Jw+ndvW3vUNqNp7EWn+9rRSwLCGmpFd0YYWZ7lXFFyWe5NhbpnAGB23qrhQFpQao25bjF2lNSQAljHCOuBvC3vW2vp3QYOSbe0pzVE0bEywwhiCgHrIN8wHcvm5f45K2bMj0KRi6XSlT07sCyFXFD4wF8pbfXKCTKFnAd4cYLcaRSG3uiNXaaLmTpUgwSZAwMCrNzYgSOQyLqSOmo8iqvam0sMfyMyZaMP1w5A04rzJKIUzywGwCCwHI2ZxjEvd5uYZBjhRUjE6qoMXWUIAGDiPYvA/DT3rbX3xz2Bm71Q/lNAMoaKQ0YFlcZSZ6i4rOMQq4+iBTzkp9syf26t80tnpf8ntHm64gUz6jfftNyxDFLgMqVCyIiJGNKAn0v+OgHFn7edDm+XDovfpoFH5t0ZMlBbKCtjQMv/HxT7pTealk0M2zNoaQAACAASURBVDFGuLwtrZlTJUyHUkLss/ZqAH8H9HmQXTbtRm4OS97S1BMjdyDjyV39ZeQ6KnpX4lpe1k+TqVxeyvZBGZzCbXvAuHBhVQVUOIZQ2vB0hgF4vvESTL9c/QhKJu5ui6cWCjaphKNKfjYTGC9FuPcnm3K9Tr23eHZiugA/HViGU2SYSERwHSKjcS2GsIEbEmu6HyaunjMqBfCnYqr08qSvLYPY22dzd/elTSlxh7KIdVfxvDOuQ6KNh1ZF6nKxLK7UkjKRMoJ6/IBtivgXfWmvPffpg1ltSj6oIo4gHxj913OS9X1pszes2ZLdrhizmfn9HsbJOVGHyILvWjYvcX7/qhwmUCEeVRChvPnawfiBscYSWgT/aznHG+BarYQttSTBDHgGbv6Qyt095faHM88Y4O10GTHEypEyyzj9mvrI1L602Z+EBm6AyQvvMwCpuFu6d+jA6Grg92vLGOkV49YN6Rcs0yut2pYui6GkyDMd+/n65Il9aXOgWTkDjiVeKsvde7MQbZ7oc9UIAm5TAatSe3lCEBxJJpBmUBIwr96U3aEYs9n0ysiJ0Mj1HW0s5/IWkvGtNWWkBGyYVVUrYc5PluE9GWhjCZzdlex71XYidbPxS5fQUVKQI+BHjFze1zb7i9DADTCGzLXaIVuicEBhedJAaRY3V6JdQeJWKlWeHoXsB45AEDFmWMXEtcXinxDgmmrZda2/zgRa2yTxIz+vQMLYIOL+DwFoLSO413GEaAIuWdUHV/S+sHpTdodCwcg19jzjibDgu5bOTfRrVpaBhMoJWKsQvraczhrrMK6/eXP2unLOkY5dxAREy3AP0oH1EqC169ej13v1HQh4t0tmNyhjxUc55GQIV6OoC9vgERq4AWTx7OhRgjG7yhEl1+39wLAitLyqKpMIV1Jwh2COeKa007hSUjWDljc09H3PbKBgIVYEinIl02gxI9DgGFGflic7WHt/UwtDrM8FyJY61lWCmMlpSyY+U4m2e0OHkYPh9xuzPTdyTPz7w8HISdhXpbaiKaO9dN6yNtwvO6PGMrI57Wezhh3Gd2/anP1yuecysJJUaYcpywzPIJoH3dZHuQCA2zd6rxuiF8pJddgeEzf+mvnReZVou9KEBm4gcdRyS+RFy9gjCgIbpCx+VakkvbduzL9tiZ5s1VwyXX7EIQqAEaO2D/1ATgBYPLd6hGB7Ucwp7kQDAL5mBsNm3chvK9W+YHObq020K0fdzhS89IAM235P3VWM1ZuyO4ykWbD8Xk+NXOwwMXJ3bMz8rWEzjSy+42v7QltWozkTBK05017ctPfWjgvp/5DO6qA1o2EMv2QEz7tpc/Y7KNOMLp2TmibZnlxO7FugrZXAvuzYzIZeiz4EAdwE35Zc8RGC4Ep4DsSQjIkbsl6U2bz2ACpyMzABA5N1gwBK50zRvHFsrQBQ1CPMWl4kwU5LJiiZg84yonniosUKe4qwWC18+4OWwJaTAy9iBS8GUHRNX1iQH5SV07oidPXgYehLCHC0Z7yWfPEnk2WoFOFPN9zf1FIpTYHJ3aOcmNeaDYwoUQGTGdJnOmtlfWrUTze0dZmqiQgM5pL3HABYzZFYL+YeazdkdjbUJ2ZLww83Z/R4R5Yul9KuDgyOgPj3V8yNzV+zOfdYV0dpzbDFum+F0UylA9AO4VebvdcA718A/Muy+dHJBuIcHdj52tA5xDwBAIiQF4IgBEWUAIEJ1B5SWiiyVJhBMRNYW18zk2U4AKcl068YfNMtm3Jb0MPfSEu+QjCQzemS9wAzVJLptlvXoqRBKhcnsGsCRf/elAm8Mu5ppYkvbWjANWsrqKESDD0Dp2MvIeL9KDAcLXVPMCgrspluy7FXAmHF40bY6wJjSy4rMrDvxkdam7p7XxH/jbV0XDmZJRjYfePm7MM9U1ucZC7zs3QiBmvLy/LRRvxg8SP4ZaXtcdl+KwTTNYrwfOd/C2X/xFZ8Cway1FOaCTYLU9FA9rWPILd4rrgEwIxyrAQRtzTVtXV7n1htt0iJ6wNjS/dPAtpI9OrzdBg5YfD/BcYmyj6RAGZYUuoDg4RIkGjJyey2vKereqOp9xAzc6+D6G/dmH8bwI3tLyyfFRtvHHGCtTyVGVO1tR8JCGPJchJESWYkQfCJOUOgVgveS0SvgPGMtXi6pSr3fF/2w0jQr8hQztrSe1skoLOmeOXunnLLI7lti+fHLoURx5RzTzPTjqFm3EJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkLKYkhGn4eEDDdmzIAzMkiOEAhGKClqNdsREiIBAMycJMJBXrjMCIgoDQAGNqNINGljGy2cJr823Vip+MeQkA8zoYELCSmDhhPgZoQ7DUIeB+IpBJrIwESAJ4H4SDBV1i2euAVM7wG0lYD3GPwemN4kNi/Fjf/a2hfhV7S9kJDDkNDAhYQcwienIRVEomdA4CwinkFMJzIwBYeU+1GSrKOEcB3RXvOtvVikJKhCcDCAQgYTeUjCJWMZHRlEjOXCyzCMsdC2UK/ODywCba02fGg2CwPGGwC/AKInifGozOf/cter6HVtu5CQw5HQwIV86LlkOmoCjp3D4I+TwHxmHIv2NHaSyEZcIaIRiagrEXUFIq6EowolUwYCy4wgsPACi7xvkfcN8p6B51truN34MSwRXgZoIzH+lFe5B+5/EhXL1hISMhwJDVzIh5KFp7nHWRaXwuICAs4EQYCAmCM5HlMUj0gkohLRyNDON53zDHKeQSankfEM5z3T0acNA48TY51U9jd3P+m/MqhCQ0IGgdDAhXxouHB65BgmWgTgMmacAACuIptKOCIVd5CMKSjZsy5BRIi4DqJRBcdRcBwJR4n9/98xyRNCQLaXOjDGwrYnai9UbTfQgUagLYLAIAg08nkNzw9Qqs7coWjDaMtqtGUDtGUCG7QvbxLR82z516z4jvVPem/26KIhIcOU0MCFHNasAsQTp0bPYaavArwQALlS2OqUI6qTBaNWCkdJJFMxJBMRJBIRJBMRxOMRRCMOlCPheQG8vIYfBAi0hQ4MtDYIdMGIBUHXDpGOo9qvL6CUhGo3jq7rIBpRcCMOdGCQzwfI5jxkMh7SmcJ/29pyCHTp1H8536ClLUBTm2+9wAoUErz+mUA/3Slzdz75JEpWlwgJGa6EBi7ksOS8k5FQFPscBH8TjHGSyNZUuWJklYt4tPtlR6kEamuSGFETR3V1HFVVMThKorUth0zWRyadRyaTRybrI5f3EQT9m1/WcSRiUReJRASJeASJZBTJuItUKoZAG7S25tDSmkVjUxbNTWlo031q3GzeYF+rj+ZW3xpmQYTtbOn/lyp3w91Plq5nFxIy3BgwA/dXF4w4ycIuHaj2Qj6cWMtOY4s5LeuZM61FLOJKHlXtUm2V+wFPRqBQz6q2NoUxdVUYWZtAIhFFU3MGTc0ZtLTk0NqaRTY3ND3y4zEXVVVxVFfHMKLdKGcyeexrzGDXnlY0NrbBdlG6wlhGY6uPvc0ee4ElIZBNxOTjI1LyaSEonNGF9CtsxW3X39f03EC0NXAGbmF1AzN+PVDthXz4yOYN9rUYaMOIuRJ1tRHUpj5Yok8piXFjqzF2TA1GjUyhpTWLXbtb0bivDc1tOXA59Yx6wc6mwlLl2BH9U6WKBKEmFUPtyBTGjK5CdVUce/e1YefOZmzf1QyjD5ndMdCSCbCzMY+cZyAlobZKIhkb2o41IcOey69b1zIgtmDADNyqBrh7dCo1UO2FfHjYvcdMymTsD8A421Fkx9fFRU3COejuJhDq6lKYMKEWo0dVYe/eNmzf2YTde9qgy9jLqgTrn0iDAHzijOSAtOcoibq6KhwxrmDId+9txfvvN2LPnjYcVMOSgca0jx17cjYwLIiwIRkR3xg1Tr4zIEJDPlTUqba2VWsHJlFBuAcXMqy54NTYZwD7CzCl6moiNHZk9KClSKUkJk4YiaMnjULe03j3vX3YsbN5wIxaB+mcxbon0gADC85MIhU7NHa7fynMWmtw1MRRcCMKb2/djffebzzoe7CWsbvJw86mPBMjw0Qr1z2du2NAhYaEVJDQwIUMS2bMgDPaRP+LgJURJexRRyREvFPMmpICkyeNxuTJddizpxVvbd2NlpbcoOnd+EIGb+0obG8dPc7B/BPLL6Bdaaqr4pg8uQ6j66rw1tt78PbW3TCdnFOyeYOtOzPWD6wg0PWZmtxXwtyYIcORcLE9ZNhRX4/oiHzsNwQsHpFyMHl8kiJOYUZEBBw5cSTOmDEFWhs89cxWvPd+Izxv8J7PgWE89Xoevub2fwNTj+ja6WUg8LwAO3e1YMeOZowbV4MTj5sIHRi0tBYGAI4SqK1yyQ8s8r45w8k7p4w/Vt+5dWto5EKGF+EMLmRY0TALsXQuup6As0fXRHBEXWz/e/F4BKecNBFSSDz7/DtoS+cHUekBnn0rj2fe8g4EbRNw6tFRnHJ0dHCFtVOViuGUkyYi0BbPPv8ucp28RrftyWFPswcCHszU5C/YsAFD40sNCSmDcAYXMqyYPCp6E4CLxo6MYtyoA8ZtdF0VzjzjaLz77j48/8J78PyhMdlgBh5+OQcvONiDMesxjp0YwQClsyyK52u8914jHEfh1OlHoqU1j2zWAwBUJRwwgHROT3by6sjXd+o7B1dtSEj5hAYuZNiwcHrsmwx8Y2S1i/GdjNukSXU4/tjxeOIvb2HnrqGVX/jd3T7e2uHj0MgDYxk1SYGaxNDpgs3NGTTuS2PGqZNgrUVzSyH2OxVX8LRF3jOnTB3rtLyxUz86yFJDQspi6PSukJAifGJ6dJJg/C4ek3LyuARR+9TnyIkjMeXoMdjyyGtIZ7xBVvlBNr2QQTr/wbg6y0BbzmLahMggqOqevBdg+/ZmnHzSkdDtmVIAoDqh0JbRrI396LHjnVte26GH1kgiJKQLBtZXOSSkl0jwvzPBnTg6vt+4jaxNYtox4/DIY68jnx96CTia0gbZLoxbB5mcRVPbwIYrlEPe8/HoY6/j2I8cgdoRBW9PIsLEMXEC4BrL3x9chSEh5TEEdgBCQoqz8KTo0SzxRm2VS0eOiQMopNiqn3ccnn/xfezZ29rvGtqyFm257vM8dsVzW/PY2Vh8L3BsrcLJk3rmbJKKCaTi/T82HTUyhZNPOhIPbXp5fxjBuzuzaGzzWVpMufu5/Nv9LiIkpA/0T86gkJAKYiWuIIBGVR9YzjvqyFFoackNiHEDgGiE8PDLeexuMQDKS+XFtvT4cXeTwZ9b0mWqIIyuljhn+sDE0O3d14aWlgwmThyJrVv3AABG1kTQ2OaTJboMwL8NiJCQkF4SLlGGDH0YFzlS2M5VAI6cOApvbd09YBIcSTh/RhInHeXCkQLGoOTLllHLzTKXdS1XEqaNd3H+jCScHtas6wtvbd2LoyaO3P/vRFTCVWSZ+KIBExES0ktCAxcy5BECU2NRuf9edZRELOKgqTkz4FqmT4nh7JNiSMUGzsgkYgKzT4jjzGmx0gdXmKamNGJRF0odGFxEI0oAOGbAxYSE9JDQwIUMaRZMRYQZI1114FaNxyLIZAfPY3JcrYMFZ6QwIikh+jGQTRBQHZdYMCOJiaOcfmunFNmsh3j8QFWG9t+ibsFUDC0X0JCQQwgNXMiQJjcBBoyDFvssLGiQ0lx1EI8IXDQziUljFVxVeS2uIowf5eCTs5JIDnBi5kMhEgfVlWNmgMG5CRh6LqAhIZ0IDVzIkGbDBmgI7Ao6ZQLJZX0k4hHQIDsBC0GYf2ICp02NIR6pUFdiIOYKnDw5inOnJwYtX2UHRIR43D0ofZevGSSwI0zAHDLUCQ1cyNCH8UrO0/vnENpYtLblUFc3MHXVSnHsRBfnTE9UpAROIiZwzskJnDhpaKz+1dWl0Nqa3R8mwAByeW1h8crgKgsJKU1o4EKGPMz8u8CwSGcPTBjeeXcvjp48ZhBVHcyoKol5J8YRcXo/44o4hLNPiqNuxNBJMDRl8mhsfW/v/n+nswG0ZWEF/3YQZYWElEVo4EKGPOSq3wAwe1sOOJZs29YEpSTGjx8xeMIO4d09Gl5QXoxcV3gB493dQ2fVb+KEWiglsX178/6/7Wn2AcA4gfrdoAkLCSmT0MCFDHnWPZHZCdANLekAbdlCSi4G49nn3sEJx41HTU18kBUW2N7Y93RhO5qGRsqxEdVxHHfsEXj62Xf2l/lpy2q0ZgIw03/f9UJm1yBLDAkpSWjgQoYFUqp/AnHL+7tz1pj2B246j6eeeRdnzpiCqqqBjxHrjB8wPL/3s7cO8j73aRZYCapTcZxx+hQ89fQ7SLfX1NOG8d7urCXiZqudVYMqMCSkTIbOYn9ISBFe2+Fnp45x3zaWL815FrVVLgGFGK10xsPpp07e//+Dwdu7Ary9MyiaxMtVgBSAKZLS0higOiFQmxqcrjlubA1OO3USnn3uHezZ2wag4Fjy9vYM5zxDTGL5fc9lnhwUcSEhPSQ0cCHDhjd26Rc/Mla5XmDne9qiOumAAGQyHvbsbcP0k49CIh5BY2O6rDRZleSJ13Noy3ZtuUgAqajE6cfEMGGUg5aMhd9NSksGoC1jyjj3g2/2I1IJnHjcBBx1VB0ee+INNLZniWEA7+7KojUTEAjfW/90/roBFRYS0gc+VNUExi0cN+Nizl3UOcN0El6LODP3w39eBYtVLD7++IgvTwNGAJYlUzAJ+ae/tN67zz30cXTJ9JrL/bc//3HOv3jteu/ug967aMaoy/TrX1hC2YcuXqc3on6VujD+g2+9o9tufP6P2J9A8aiLjpo827ZcOBJcNRH+y/dmcndt7IgtumjGqMv0m18YTR2DEItLbe7e+vuCJ7p+H5iC/JtfX5e/FQDqFhxx6mcoe7ECYGG5iuyeL8r0nUfehe2dpc64YMzMk5CfX01WnGr15hXrc1v6+j33J6sA8dj06C8IuLI66eCosfH92USUkjh+2hGoG12FF196f8CKnzIDv9vS2mW1gXhEYFytwlnHxfbnkDSW8ZfX8ti620fO+6CVS8UFPj27asCqfY8dU4MTjx+PXbtb8dKr22B0e0gAM7buzKIlHQDAL898Jn/tKqBnJRWGEacvqLv0TApOPLBvY3EK51/47Hr/N/v/1NAgz05vOO8Y8k8ZyaZlqUnfc9If8V7H27ELPzL+Ut6+4jyb/vGy9WjFgplVnxEvfvlBSt/UeA+2ATio71pYjhJnzuX8/QvXBc901jPc+uZQ5EO1B2etcECc3MPiLAnz9VrYKhDFT3yx3dDf/VMJ0FfroGczUSot5KRnRPTXjy90rj70WhO8vQ2zwUc9QPI70xpw0HDbhT+KiP7hUbg31SxAFWJnSgb+Fg5G7z/o/Bnjppvmx09mc6ZmqZ7hyA+/GHe/e/A17N+PhTmKiZNMlCTJTvfvc5IY++uuCCFOc9s/I0FUbWV32fU6tjGYgf3XGLHgqAWnUu7+abB1TRwZvYGcP763QC6o1PfdH6wC7Ppn8lcB9MOWdIDX30+z3x4ErrXBcy++h2eefQcfmToOc2dNw8ja/o+V292ikT9k38x1Cpn/F5yRxLwT4wclSJaCMPPYGC6amcL4kU4htKDT6Xmfsael/70pR9YmMW/2R3DMMWPx1LNb8fyL7+03bl5g8dp7aW5JBwDxf6x7Jn/NqsPYuAGABUVAnNwD0TAC+nIiSgqIAwGJDb+Ws7MPrJmB/M9rCUdvJ/dTN6jU87sXqnmdLjOemP9+l0E1AMSMrQbT3wfA+I4DOvddIkrtYWfW3Yhsmb4Ax3ccMxz75lDkQ1UuZ9f6bY/+BHh0zMIJ1yznxuPu3JX99nNP4gNua1HmfYJ5qxVUHTD8OGz2oANWsZjy+IhF3xa5v5luq+o2Zvyzx0D/qfMhCia7F7E3byD9rfXZXd/bc4ijX0Qg7oLjMxD88W9k229PxxHXVelmv/MxBGt/RekfPH8vXgCAQ9eGCMxJ4u1seQcAHKvMk4e8b5Kgd/YQrMf0EQFKrkodeJQ6woxMsElfzPZ39+Xa/lJdNeoHE4LWfeV+n4MIr3sm97ULTom9k8ub77/6bquYOCYhapIF272vMY1ND7+CsWNqcPJJRyIIDN56ezd27GoG28ovXb6xzUegC9cVREjFBGYcE8GRo4svM8YjAh8/LYHt+wI88VoebVkLbRmBZry+zcfomsp3TxKEcWNqMGVyHZRSeOW17di5q/mgXGjN6QDv7cxaw2wA/ta6p70fVlzIEOSp9btvewq47fQLRo/5OGfVd9elv9n5/Vjb38yaJrwLNyM94/F78RLAdNYFo9fcwsH/+vtV+vzvrSp/ANC57wZEDgPBaIv9/X8Y980hxYfKwJVLRogJAasZloNFi5D79mnrzB2d33cfO/HYCWRO/bhNXPQMOHEn1DIcYuAYLK+QI779C+Ot/5/4P/76o4e04a1/8s03F4y54haSn/21iXz/Y2h7KwH1j4B+4MBRRNcguei1BWIHEfhr3HrfMevx5oE2iJoZ00BUiHg2/EbnNiyR08J0SguLk45HvlrJ7OzvdEqvtDtz7Zpn49eN/DfS3z8+7kwbFeS3QOEbAIZFIct1z+b+84JT45ustb/euiMzuSrhYEJdDK4jwAzs2NmMnbuaUVdXhaMnjcbxx43H++834v3tjfu9AyvBntbCVxqLECaPcXH6MVGIHqTYOmKkg0/OdPDs1hze2OYjnef916wUyWQUE8fXYvz4WqTTebz6+k7s2dt6kGELtMW2PTk0pwOAsE0QXX7P0/lHKipkGOMI/8ga2NafJfHGKQAA4l08/vF9RCs/ugHiez2Y4Xb03TTJk0fA+9hN1puf+wP299/h3jeHCh+qJcryYJzLmdU/Wbfv6hcR+dWLLC/521UHf09Txd4lx4Cf3Q2YUURPPQp5fsunMPLQK/2yTb/0LOI3/xO1/mscB88Up5w3ZfQ8bm26cV3TxT8/8+vj7+X4g/eT++M59QcGHYVOQNNANB2g6VCFZY8OCNb+ltpW/fe6lmv/e13LtZ9Yp+/r/H6UTePdu1o+dxePu/INyPFfNOrUzu+fGf+voy+zLQ/evK5p/vXymMmbRKTqFhv52758ewPNuqezf3GQP41A17emA/vK1ja7szG/PzkwM7B7dyseffwNPPrY6wABM8+YgrPnHYtjpo7tc3hBJm/RlrWYMMrBJ8+qwpnTYj0ybh2QAKYfHcPCmVWYWOcgnWNk8n1bEaxOxXHM1LE4e+5xOOuMKbDMeOSxN/Do429g954Dxs1Yxo59eby0tY2b2wJLRP/li/xJ9zydC41bJwKKbG2EqLo4h+MKf2GqI//MOvBbczcUEk8L7eYNiG5wUQsAFEnXxcA0iXHQKlBH370le3HDG1DvrpZ0UH29w6FvDgXCGVy3EL/CJ/zb0+Q98c+PBxf8C8w9AIAFP4pM4P91xVXIffWodeYerGJx9mMjP/q8n78EMDd2vsIvY1vZMef/60Py8WemIEh2Tt63x5WT9rC7/vsXyLu/9MQP394ncPFIa17dUA/rbGhXAGt/S+lV3S1RMoS4nFNfm79A7AWAJOnmUxKZf1+89uAs7+n1L7z85gVjfvNTDr4zt14/uLl9FtdE7vkvisj//qeF0dXb7Ntens0po2Hvrdx3ODDc+QyagdwXF5wS/5mBvW7nvvysPY2eHTnCFWNqopDt+1/pjIdXXt2OV1/bjhE1SYwZU40Z0ydDKoHdu1uxrzGNfY1tyOfLD7bO5C3OPz2F0dWVcUiOuYRzpyewu8Ugk7dIRMsfg8ZiDkaOSKG2tvDZgkBj9+4WPPfCu13WzrOWsbfZx+6mnNUWAsBTAvTFe57OPV6RD3OYkTvjjUdff7zu95dY+lNkobh7ux05vhrBzCtJL4y376JmUpe+sj3zoxc+Y1O/yi8UD+w1O847DuaxSRm88nxXF91wU/61Cyb8+4Os/+27F/o3/GO7I8rh0jcHmw+lgbPWPgXi/3vhRTDPdd61umilwePf/qEg+RfAIr3+hZe3XzDqS/exmwByAIC4vb52jNK/eFqahwAAq8g2fmLs/3kOMoF2u+LD3cvAv3wnB4MNf2h8c8GYFUcjmAN9wIOy9Z7XHn/qgvEzBDILamCTx1n/u1U57/dO+zq+D3cvE76HAF2Wrfbh7mUW39tJkB3edgTrvXACGGsP/YzEL9CR3zmZs0tersJooOBJ+fq9239cc0HdsyfAn1WNANNtcMXH7gse6Kq94cD6Z7NPA5hz4SmxSyzsP+1u9E7Z1+Tb2mpXjKpxEXEKRogZaGxKo7EpjZdf2YZ4zMXouiqMGVOF448dD8sWTU0ZtLRm0dKSQ0trFkHQdWWY/tgnA1DSYDqORE11HFVVMdRUJTBiRBwkBP5fe/cPImcRxnH8+8zMu/vuu3t3OVQM6kWQiKiJKFoYUAgS/HdGC9HCwsJKsLYUztbKRrAVrEwR0fzRWFgokSiCCVEsDBgP4cAkd7m7d/fd952Zx2Iv/y4hJiZocjcfeNli391iYfa3M/M8O6dOLnNyfonfjs3RH9SXfG1VB06erjl1uo5B1YAeBn1330/1Z1yyeWF9icJu1XjxL4sZiQdnZl7LDn3wzGbqh++Q+vu33PIbt5xfmbxrpv76xfue6vkTL0/h77yX5p2/uoNP3993bmtg9dg+3t/x8e/F7tteCtkUNH/C2hub/5d11SaQrCsy/Uh7JypvKzwB0O04vXW8JRO97LLLiEWnxeRkj4nxnPHxLhsmOoSglP2Kshw1k/f7Q6phw2BQM6z9dS9eMSK0c0febpHnGd2iTbe7chU51ggLiwMWF0sWFgfMz5cXHGmzWojKYtlwYqGmrEbftQrfEvW9/UeGe0jBlqxBKeCSNW/6odYWNfZNQV9XGBNEx3tONvRajHfdFZ251mo7ekWbXi+nKNp0ixZ53iJvZ7TzDO8DTRNoGo/3XLq1fAAAAj5JREFUEd8EGj+a9TU+wOrGcxEyN5qlZc7iMotzhixzZJnFOcuwqqmGnqqqKfs1ZTmkLCuW+0Pq4T8XoYxCzbOwVLNYelVUBJYQ+cjH8OGXh+ufr/7TTJKbRwq4ZN3Y+ShF8J0XIL4KMo2QC2jRcTJWOMaKjG7+7/bSnLO0Ww7nLFlmV0LKYMxopcsYwdrRe4cQzhbBxHgmDCNNE/A+MKw93l/9Ydmjs9oCi/2GpdLTr7wqCEIlqnvAfGLsYO/nP15Y8JAka1UKuGRd2v4gvY7rTCP6nIFnFW4HsCKxk1tT5JZu7ujmDuduzGHS+Ei/CpRDT38QGFRhZU8NEOZQvkBlv9fB3gNHuLjKJEnWuBtz5CbJf+z5ra2tGLtDJT4pIttQNp55zhli3nam3bLkLUM7M2SZoeXMFS1vXosQlaaJ1D5SNZFhHanqQDX0McTz2leEOdCDquabqOGrtPyYJCngkuSSnt7SmcocjyvxMTAPILoFZROreketSMwyI5kVsVaw1mAtOBk9AiByURCGqGf35UIAr5EQIIRICEoTVJsm6tkZ2TkR4Q9UjkL8RcX8EBoOHTg6mCVJkgukgEuSK/TKNjpVWdzvrd4jkSmEu5W4SZC7EDaKMqlwTX9+KbCswjzKHKKzqJlFOa6GWaIc6xX9X3d9t9KzkiTJZaWAS5LraPt2XOd0b1JiMynWjgGEoB1rND//vhClslYGABrCkppsvrd5+dSuVU36SZIkSZIkSZIkSZIkSZIkSZLclP4GtSIfOFnogKAAAAAASUVORK5CYII="

// ── Helpers ──────────────────────────────────────────────
const fmt = (n) => 'VT ' + Number(n || 0).toLocaleString()
const fmtDate = (d) => { if (!d) return ''; try { return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch(e) { return d } }
const todayStr = () => new Date().toISOString().split('T')[0]
const addDays = (d, n) => { const dt = new Date(d); dt.setDate(dt.getDate() + n); return dt.toISOString().split('T')[0] }
const uid = () => Math.random().toString(36).slice(2)

const getBalance = (inv, payments) => {
  const paid = (payments || []).filter(p => p.invoice_id === inv.id).reduce((s, p) => s + Number(p.amount), 0)
  return Math.max(0, Number(inv.total) - paid)
}

// Shared CSV/Excel download utility
const downloadCSV = (filename, rows) => {
  const esc = v => { const s = String(v == null ? '' : v); return s.includes(',') || s.includes('"') || s.includes('\n') ? '"' + s.replace(/"/g, '""') + '"' : s }
  const csv = rows.map(r => r.map(esc).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

const getStatus = (inv, payments) => {
  const paid = (payments || []).filter(p => p.invoice_id === inv.id).reduce((s, p) => s + Number(p.amount), 0)
  if (paid >= Number(inv.total) && Number(inv.total) > 0) return 'paid'
  if (paid > 0) return 'partial'
  if (inv.due_date && inv.due_date < todayStr()) return 'overdue'
  return 'unpaid'
}

const Badge = ({ status }) => {
  const colors = { paid: '#EAF3DE:#27500A', unpaid: '#FAECE7:#712B13', overdue: '#FCEBEB:#791F1F', partial: '#FAEEDA:#633806', draft: '#F1EFE8:#444441' }
  const [bg, color] = (colors[status] || colors.unpaid).split(':')
  return <span style={{ background: bg, color, padding: '2px 9px', borderRadius: 99, fontSize: 11, fontWeight: 500 }}>{status}</span>
}

// ── Main App ──────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleLogin = () => {
    setBusy(true)
    setTimeout(() => {
      if (pw === 'Malakesa2024!') {
        setError('')
        onLogin()
      } else {
        setError('Incorrect password. Please try again.')
        setPw('')
        setBusy(false)
      }
    }, 400)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#1A0D06 0%,#3D2214 40%,#5C3D0A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src={MALAKESA_LOGO} alt="Malakesa" style={{ width: 240, borderRadius: 8, display: 'block', margin: '0 auto 16px' }} />
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: 2 }}>INVOICE & PURCHASES MANAGER</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,215,0,0.2)', borderRadius: 16, padding: '32px 32px 28px' }}>
          <h2 style={{ color: '#FFD700', fontSize: 20, fontWeight: 700, margin: '0 0 6px', textAlign: 'center' }}>Welcome back</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', margin: '0 0 24px' }}>Enter your password to continue</p>
          {error && (
            <div style={{ background: 'rgba(163,45,45,0.25)', border: '0.5px solid rgba(163,45,45,0.5)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#ffaaaa', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="ti ti-alert-circle"></i> {error}
            </div>
          )}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                autoFocus
                style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: error ? '1px solid rgba(163,45,45,0.6)' : '1px solid rgba(255,215,0,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
              <button onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, fontSize: 16 }}>
                <i className={`ti ${show ? 'ti-eye-off' : 'ti-eye'}`}></i>
              </button>
            </div>
          </div>
          <button
            onClick={handleLogin}
            disabled={busy || !pw}
            style={{ width: '100%', padding: 13, background: pw && !busy ? 'linear-gradient(135deg,#8B6914,#C9A84C)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 10, color: pw && !busy ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 15, fontWeight: 700, cursor: pw && !busy ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}
          >
            {busy ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 24 }}>Malakesa Transfer and Tour — Port Vila, Vanuatu</p>
      </div>
    </div>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try { return sessionStorage.getItem('malakesa_auth') === 'yes' } catch(e) { return false }
  })
  const [page, setPage] = useState('dashboard')
  const [invoices, setInvoices] = useState([])
  const [payments, setPayments] = useState([])
  const [clients, setClients] = useState([])
  const [purchases, setPurchases] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [employees, setEmployees] = useState([])
  const [customCategories, setCustomCategories] = useState([])
  const [salaryRecords, setSalaryRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)

  const reload = async () => {
    try {
      setLoading(true)
      const [invRes, pmtRes, clRes, purRes, supRes, empRes, catRes, salRes] = await Promise.all([
        fetch('/api/invoices'), fetch('/api/payments'), fetch('/api/clients'), fetch('/api/purchases'), fetch('/api/suppliers'), fetch('/api/employees'), fetch('/api/purchase-categories'), fetch('/api/salary-records')
      ])
      const [invs, pmts, cls, purs, sups, emps, cats, sals] = await Promise.all([invRes.json(), pmtRes.json(), clRes.json(), purRes.json(), supRes.json(), empRes.json(), catRes.json(), salRes.json()])
      setInvoices(Array.isArray(invs) ? invs : [])
      setPayments(Array.isArray(pmts) ? pmts : [])
      setClients(Array.isArray(cls) ? cls : [])
      setPurchases(Array.isArray(purs) ? purs : [])
      setSuppliers(Array.isArray(sups) ? sups : [])
      setEmployees(Array.isArray(emps) ? emps : [])
      setCustomCategories(Array.isArray(cats) ? cats : [])
      setSalaryRecords(Array.isArray(sals) ? sals : [])
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard' },
    { id: 'invoices', label: 'Invoices', icon: 'ti-file-invoice' },
    { id: 'payments', label: 'Payments Received', icon: 'ti-cash-register' },
    { id: 'clients', label: 'Clients', icon: 'ti-users' },
    { id: 'purchases', label: 'Purchases', icon: 'ti-shopping-cart' },
    { id: 'suppliers', label: 'Suppliers', icon: 'ti-truck' },
    { id: 'vnpf', label: 'Salaries & VNPF', icon: 'ti-building-bank' },
    { id: 'vat', label: 'VAT Return', icon: 'ti-receipt-tax' },
    { id: 'reports', label: 'Reports', icon: 'ti-chart-bar' },
  ]

  if (!isLoggedIn) return <LoginScreen onLogin={() => { try { sessionStorage.setItem('malakesa_auth', 'yes') } catch(e) {}; setIsLoggedIn(true) }} />

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 14, color: '#1a1a1a', background: '#E8D5A3' }}>
      {/* Sidebar */}
      <div style={{ width: 220, minWidth: 220, background: 'linear-gradient(180deg, #2C1810 0%, #3D2214 40%, #4A2D18 70%, #5C3D0A 100%)', display: 'flex', flexDirection: 'column', boxShadow: '4px 0 20px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(255,215,0,0.15)', textAlign: 'center', background: 'linear-gradient(135deg, #1A0D06 0%, #3D2214 100%)' }}>
          <img
            src={MALAKESA_LOGO}
            alt="Malakesa Transfer and Tour"
            style={{ width: '100%', maxWidth: 188, borderRadius: 6, display: 'block', margin: '0 auto 4px' }}
          />
          <div style={{ marginTop: 8, background: 'rgba(255,215,0,0.1)', border: '0.5px solid rgba(255,215,0,0.3)', borderRadius: 4, padding: '3px 8px', display: 'inline-block' }}>
            <div style={{ fontSize: 8, color: 'rgba(255,215,0,0.8)', letterSpacing: '2.5px', fontWeight: 700 }}>INVOICE &amp; PURCHASES MANAGER</div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '8px 0' }}>
          {nav.map(item => (
            <div key={item.id} onClick={() => setPage(item.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', fontSize: 13, color: page === item.id ? '#1a1a1a' : '#C9A84C', cursor: 'pointer', borderLeft: page === item.id ? '2px solid #8B6914' : '2px solid transparent', background: page === item.id ? '#EDD9A3' : 'transparent', fontWeight: page === item.id ? 500 : 400 }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 16 }}></i>
              {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,215,0,0.15)' }}>
          <button onClick={() => { try { sessionStorage.removeItem('malakesa_auth') } catch(e) {}; setIsLoggedIn(false) }} style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)', borderRadius: 8, padding: '7px 12px', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
            <i className="ti ti-logout" style={{ fontSize: 14 }}></i> Log out
          </button>
        </div>
        <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,215,0,0.2)', fontSize: 11, color: '#C9A84C', fontWeight: 600, textAlign: 'center', letterSpacing: '1.5px' }}>📍 PORT VILA, VANUATU</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {loading && page !== 'dashboard' ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>Loading...</div>
        ) : (
          <>
            {page === 'dashboard' && <Dashboard invoices={invoices} payments={payments} purchases={purchases} loading={loading} setPage={setPage} setModal={setModal} />}
            {page === 'invoices' && <Invoices invoices={invoices} payments={payments} reload={reload} setModal={setModal} setSelected={setSelected} />}
            {page === 'payments' && <Payments payments={payments} invoices={invoices} reload={reload} setModal={setModal} setSelected={setSelected} />}
            {page === 'purchases' && <Purchases purchases={purchases} suppliers={suppliers} customCategories={customCategories} reload={reload} setModal={setModal} />}
            {page === 'suppliers' && <Suppliers suppliers={suppliers} purchases={purchases} reload={reload} setModal={setModal} />}
            {page === 'vnpf' && <VNPF employees={employees} salaryRecords={salaryRecords} reload={reload} setModal={setModal} setSelected={setSelected} />}
            {page === 'reports' && <Reports invoices={invoices} payments={payments} purchases={purchases} salaryRecords={salaryRecords} />}
            {page === 'vat' && <VatPage invoices={invoices} payments={payments} purchases={purchases} />}
            {page === 'clients' && <Clients clients={clients} invoices={invoices} reload={reload} setModal={setModal} />}
          </>
        )}
      </div>

      {/* Modals */}
      {modal === 'newInvoice' && <NewInvoiceModal clients={clients} onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'payment' && selected && <PaymentModal invoice={selected} payments={payments} onClose={() => { setModal(null); setSelected(null) }} onSave={() => { setModal(null); setSelected(null); reload() }} />}
      {modal === 'newClient' && <NewClientModal onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'newSupplier' && <NewSupplierModal onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'newPurchase' && <NewPurchaseModal suppliers={suppliers} customCategories={customCategories} onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'manageCategories' && <ManageCategoriesModal customCategories={customCategories} onClose={() => setModal(null)} onSave={reload} />}
      {modal === 'newEmployee' && <NewEmployeeModal onClose={() => setModal(null)} onSave={() => { setModal(null); reload() }} />}
      {modal === 'editEmployee' && selected && <NewEmployeeModal employee={selected} onClose={() => { setModal(null); setSelected(null) }} onSave={() => { setModal(null); setSelected(null); reload() }} />}
      {modal === 'viewInvoice' && selected && <ViewInvoiceModal invoice={selected} payments={payments} onClose={() => { setModal(null); setSelected(null) }} onPay={() => { setModal('payment') }} />}
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────
// ── Month/Year Picker (calendar popup) ────────────────────
function MonthYearPicker({ value, onChange, accentColor = '#8B6914', allowClear = false, clearLabel = 'All months' }) {
  const [open, setOpen] = useState(false)
  const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']

  const hasValue = !!value
  const [vy, vm] = hasValue ? value.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1]
  const [viewYear, setViewYear] = useState(vy)

  const wrapRef = useRef(null)
  useEffect(() => {
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { if (open) setViewYear(vy) }, [open])

  const label = hasValue ? `${MONTHS_LONG[vm - 1]} ${vy}` : clearLabel

  const selectMonth = (mIdx) => {
    const mm = String(mIdx + 1).padStart(2, '0')
    onChange(`${viewYear}-${mm}`)
    setOpen(false)
  }

  const isSelected = (mIdx) => hasValue && value === `${viewYear}-${String(mIdx + 1).padStart(2, '0')}`
  const isCurrentRealMonth = (mIdx) => {
    const now = new Date()
    return viewYear === now.getFullYear() && mIdx === now.getMonth()
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 8, border: `0.5px solid ${accentColor}`, fontSize: 13, fontFamily: 'inherit', background: accentColor, color: '#fff', fontWeight: 500, cursor: 'pointer' }}
      >
        <i className="ti ti-calendar" style={{ fontSize: 15 }}></i>
        {label}
        <i className="ti ti-chevron-down" style={{ fontSize: 13, opacity: 0.8 }}></i>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '110%', left: 0, zIndex: 200, background: '#fff', borderRadius: 12, boxShadow: '0 8px 28px rgba(0,0,0,0.22)', border: '0.5px solid rgba(0,0,0,0.09)', padding: 14, width: 250 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <button onClick={() => setViewYear(y => y - 1)} style={{ border: 'none', background: '#f5f0e8', borderRadius: 6, width: 26, height: 26, cursor: 'pointer', color: accentColor, fontSize: 14 }}><i className="ti ti-chevron-left"></i></button>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#3D2214' }}>{viewYear}</div>
            <button onClick={() => setViewYear(y => y + 1)} style={{ border: 'none', background: '#f5f0e8', borderRadius: 6, width: 26, height: 26, cursor: 'pointer', color: accentColor, fontSize: 14 }}><i className="ti ti-chevron-right"></i></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {MONTHS_SHORT.map((m, i) => {
              const sel = isSelected(i)
              const isNow = isCurrentRealMonth(i)
              return (
                <button
                  key={m}
                  onClick={() => selectMonth(i)}
                  style={{
                    padding: '8px 0', borderRadius: 7, fontSize: 12.5, fontWeight: sel ? 700 : 500, cursor: 'pointer',
                    border: isNow && !sel ? `1px solid ${accentColor}` : '1px solid transparent',
                    background: sel ? accentColor : '#f8f5ee',
                    color: sel ? '#fff' : '#3D2214',
                  }}
                >
                  {m}
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
            {allowClear ? (
              <button
                onClick={() => { onChange(''); setOpen(false) }}
                style={{ fontSize: 11.5, color: '#A32D2D', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Clear ({clearLabel})
              </button>
            ) : (
              <button
                onClick={() => { const now = new Date(); setViewYear(now.getFullYear()); onChange(`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`); setOpen(false) }}
                style={{ fontSize: 11.5, color: accentColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Jump to current month
              </button>
            )}
            <button onClick={() => setOpen(false)} style={{ fontSize: 11.5, color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Pie Chart (reusable SVG) ──────────────────────────────
function PieChart({ data, size = 160, colors }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const palette = colors || ['#8B6914', '#3B6D11', '#A32D2D', '#5C3D0A', '#D85A30', '#2E7D2E', '#633806', '#1A4D1A']
  if (total <= 0) {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 11, textAlign: 'center', padding: 10 }}>
        No data
      </div>
    )
  }
  const r = size / 2
  let cumulative = 0
  const slices = data.filter(d => d.value > 0).map((d, i) => {
    const fraction = d.value / total
    const startAngle = cumulative * 2 * Math.PI
    cumulative += fraction
    const endAngle = cumulative * 2 * Math.PI
    const x1 = r + r * Math.sin(startAngle)
    const y1 = r - r * Math.cos(startAngle)
    const x2 = r + r * Math.sin(endAngle)
    const y2 = r - r * Math.cos(endAngle)
    const largeArc = fraction > 0.5 ? 1 : 0
    const path = `M ${r} ${r} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
    return { path, color: palette[i % palette.length], label: d.label, value: d.value, pct: Math.round(fraction * 100) }
  })
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.length === 1
          ? <circle cx={r} cy={r} r={r} fill={slices[0].color} />
          : slices.map((s, i) => <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth="1.5" />)
        }
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {slices.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: s.color, display: 'inline-block', flexShrink: 0 }}></span>
            <span style={{ color: '#444' }}>{s.label}</span>
            <span style={{ color: '#888', fontSize: 11 }}>({s.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────
function Dashboard({ invoices, payments, purchases, loading, setPage, setModal }) {
  const totalInvoiced = invoices.reduce((s, i) => s + Number(i.total), 0)
  const totalCollected = payments.reduce((s, p) => s + Number(p.amount), 0)
  const outstanding = invoices.reduce((s, i) => s + getBalance(i, payments), 0)
  const overdueCount = invoices.filter(i => getStatus(i, payments) === 'overdue').length
  const recent = [...invoices].reverse().slice(0, 6)

  const purchasesList = purchases || []
  const totalPurchases = purchasesList.reduce((s, p) => s + Number(p.amount || 0), 0)
  const thisMonthPurchases = purchasesList.filter(p => p.date?.startsWith(new Date().toISOString().slice(0,7))).reduce((s, p) => s + Number(p.amount || 0), 0)
  const recentPurchases = [...purchasesList].sort((a,b) => b.date > a.date ? 1 : -1).slice(0, 6)

  // Trend calculations: this month vs last month
  const now2 = new Date()
  const thisMonth = now2.toISOString().slice(0, 7)
  const lastMonthD = new Date(now2.getFullYear(), now2.getMonth() - 1, 1)
  const lastMonth = lastMonthD.toISOString().slice(0, 7)
  const invThisMonth = invoices.filter(i => i.date?.startsWith(thisMonth)).reduce((s, i) => s + Number(i.total), 0)
  const invLastMonth = invoices.filter(i => i.date?.startsWith(lastMonth)).reduce((s, i) => s + Number(i.total), 0)
  const pmtThisMonth = payments.filter(p => p.date?.startsWith(thisMonth)).reduce((s, p) => s + Number(p.amount), 0)
  const pmtLastMonth = payments.filter(p => p.date?.startsWith(lastMonth)).reduce((s, p) => s + Number(p.amount), 0)
  const purThisMonth = purchasesList.filter(p => p.date?.startsWith(thisMonth)).reduce((s, p) => s + Number(p.amount || 0), 0)
  const purLastMonth = purchasesList.filter(p => p.date?.startsWith(lastMonth)).reduce((s, p) => s + Number(p.amount || 0), 0)
  const calcTrend = (cur, prev) => {
    if (prev === 0 && cur === 0) return null
    if (prev === 0) return { pct: 100, dir: 'up' }
    const pct = Math.round(((cur - prev) / prev) * 100)
    return { pct: Math.abs(pct), dir: pct >= 0 ? 'up' : 'down' }
  }
  const trendInvoiced = calcTrend(invThisMonth, invLastMonth)
  const trendCollected = calcTrend(pmtThisMonth, pmtLastMonth)
  const trendPurchases = calcTrend(purThisMonth, purLastMonth)
  const Trend = ({ t, goodDir = 'up' }) => {
    if (!t) return null
    const isGood = t.dir === goodDir
    const color = isGood ? '#3B6D11' : '#A32D2D'
    const bg = isGood ? '#EAF3DE' : '#FCEBEB'
    const arrow = t.dir === 'up' ? '▲' : '▼'
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: bg, color, borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>
        <span style={{ fontSize: 9 }}>{arrow}</span> {t.pct}% vs last month
      </span>
    )
  }

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const m = d.getMonth(); const y = d.getFullYear()
    const amt = invoices.filter(inv => { const id = new Date(inv.date + 'T00:00:00'); return id.getMonth() === m && id.getFullYear() === y }).reduce((s, inv) => s + Number(inv.total), 0)
    return { label: MONTHS[m] + ' ' + String(y).slice(2), amt }
  })
  const revenuePieData = monthData.map(m => ({ label: m.label, value: m.amt }))

  const purchaseMonthData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const m = d.getMonth(); const y = d.getFullYear()
    const amt = purchasesList.filter(p => { if (!p.date) return false; const pd = new Date(p.date + 'T00:00:00'); return pd.getMonth() === m && pd.getFullYear() === y }).reduce((s, p) => s + Number(p.amount || 0), 0)
    return { label: MONTHS[m] + ' ' + String(y).slice(2), amt }
  })
  const purchasePieData = purchaseMonthData.map(m => ({ label: m.label, value: m.amt }))

  return (
    <>
      <Topbar title="Dashboard">
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={() => setModal('newInvoice')}><i className="ti ti-plus"></i> New Invoice</button>
          <button className="btn" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 500 }} onClick={() => setModal('newPurchase')}><i className="ti ti-plus"></i> New Purchase</button>
        </div>
      </Topbar>
      <div style={{ padding: 20 }}>
        {loading ? <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>Loading...</div> : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 16 }}>

              {/* Total Invoiced */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Invoiced</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.1 }}>{fmt(totalInvoiced)}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{invoices.length} invoice{invoices.length !== 1 ? 's' : ''} total</div>
                <Trend t={trendInvoiced} goodDir="up" />
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11, background: '#3D2214', color: '#FFD700', borderColor: '#3D2214', fontWeight: 600 }} onClick={() => setModal('newInvoice')}>
                  <i className="ti ti-plus"></i> New Invoice
                </button>
              </div>

              {/* Collected */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Collected</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#3B6D11', lineHeight: 1.1 }}>{fmt(totalCollected)}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{fmt(pmtThisMonth)} this month</div>
                <Trend t={trendCollected} goodDir="up" />
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11 }} onClick={() => setPage('payments')}>
                  <i className="ti ti-cash-register"></i> View payments
                </button>
              </div>

              {/* Outstanding */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Outstanding</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#D85A30', lineHeight: 1.1 }}>{fmt(outstanding)}</div>
                <div style={{ fontSize: 11, color: '#888' }}>unpaid balance</div>
                <div style={{ height: 22 }}></div>
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11 }} onClick={() => setPage('invoices')}>
                  <i className="ti ti-alert-triangle"></i> View unpaid
                </button>
              </div>

              {/* Overdue */}
              <div style={{ background: overdueCount > 0 ? '#FFF5F5' : '#fff', borderRadius: 10, padding: '14px 16px', border: overdueCount > 0 ? '0.5px solid #F7C1C1' : '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Overdue</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#A32D2D', lineHeight: 1.1 }}>{overdueCount}</div>
                <div style={{ fontSize: 11, color: '#888' }}>invoice{overdueCount !== 1 ? 's' : ''} need follow-up</div>
                {overdueCount > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#FCEBEB', color: '#A32D2D', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>
                  <span style={{ fontSize: 9 }}>⚠</span> Action needed
                </span>}
                {overdueCount === 0 && <div style={{ height: 22 }}></div>}
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11, ...(overdueCount > 0 ? { background: '#A32D2D', color: '#fff', borderColor: '#A32D2D', fontWeight: 600 } : {}) }} onClick={() => setPage('invoices')}>
                  <i className="ti ti-send"></i> {overdueCount > 0 ? 'Follow up now' : 'View invoices'}
                </button>
              </div>

              {/* Purchases */}
              <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Purchases</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#8B6914', lineHeight: 1.1 }}>{fmt(totalPurchases)}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{fmt(purThisMonth)} this month</div>
                <Trend t={trendPurchases} goodDir="down" />
                <button className="btn btn-sm" style={{ marginTop: 4, fontSize: 11 }} onClick={() => setModal('newPurchase')}>
                  <i className="ti ti-plus"></i> New Purchase
                </button>
              </div>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card>
                <div style={{ fontWeight: 500, marginBottom: 14 }}>Revenue — last 6 months</div>
                <PieChart data={revenuePieData} size={150} colors={['#8B6914','#A8841A','#C9A24A','#5C3D0A','#3B6D11','#2E7D2E']} />
              </Card>
              <Card>
                <div style={{ fontWeight: 500, marginBottom: 14 }}>Purchases — last 6 months</div>
                <PieChart data={purchasePieData} size={150} colors={['#A32D2D','#D85A30','#C9744A','#633806','#8B6914','#5C3D0A']} />
              </Card>
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 14 }}>Recent invoices</strong>
                <button className="btn btn-sm" onClick={() => setPage('invoices')}>View all</button>
              </div>
              {recent.length === 0 ? <Empty icon="ti-file-off" msg="No invoices yet" /> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: '#E8D5A3' }}><Th>Invoice #</Th><Th>Client</Th><Th>Date</Th><Th>Amount</Th><Th>Status</Th><Th></Th></tr></thead>
                  <tbody>{recent.map(inv => (
                    <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td><strong>{inv.number}</strong></Td><Td>{inv.client_name}</Td><Td>{fmtDate(inv.date)}</Td><Td>{fmt(inv.total)}</Td>
                      <Td><Badge status={getStatus(inv, payments)} /></Td>
                      <Td><button className="btn btn-sm" onClick={() => setPage('invoices')}>View</button></Td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </Card>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 14 }}>Recent purchases</strong>
                <button className="btn btn-sm" onClick={() => setPage('purchases')}>View all</button>
              </div>
              {recentPurchases.length === 0 ? <Empty icon="ti-shopping-cart-off" msg="No purchases yet" /> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: '#E8D5A3' }}><Th>Date</Th><Th>Supplier</Th><Th>Category</Th><Th>Amount</Th><Th></Th></tr></thead>
                  <tbody>{recentPurchases.map(p => (
                    <tr key={p.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td>{fmtDate(p.date)}</Td>
                      <Td><strong>{p.supplier}</strong></Td>
                      <Td><span style={{ background: '#E8D5A3', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{p.category || 'Other'}</span></Td>
                      <Td style={{ fontWeight: 500 }}>{fmt(p.amount)}</Td>
                      <Td><button className="btn btn-sm" onClick={() => setPage('purchases')}>View</button></Td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </Card>
          </>
        )}
      </div>
    </>
  )
}

// ── Invoices ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════
// ExportModal - reusable export dialog with column selection
// ═══════════════════════════════════════════════════════════
function ExportModal({ title, columns, onExport, onClose }) {
  const [selected, setSelected] = useState(new Set(columns.map(c => c.key)))
  const [format, setFormat] = useState('excel')
  const toggle = (key) => setSelected(s => { const n = new Set(s); n.has(key) ? n.delete(key) : n.add(key); return n })
  const toggleAll = () => setSelected(selected.size === columns.length ? new Set() : new Set(columns.map(c => c.key)))

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 480, boxShadow: '0 8px 40px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#1A0D06,#3D2214,#5C3D0A)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' }}>Export</div>
            <div style={{ color: '#FFD700', fontSize: 16, fontWeight: 700, marginTop: 2 }}>{title}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', opacity: 0.7 }}>&times;</button>
        </div>

        <div style={{ padding: 20 }}>
          {/* Format selector */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Export format</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { key: 'excel', label: 'Excel / CSV', icon: 'ti-file-spreadsheet', color: '#1D6F42' },
                { key: 'pdf', label: 'PDF', icon: 'ti-file-type-pdf', color: '#A32D2D' },
              ].map(f => (
                <button key={f.key} onClick={() => setFormat(f.key)} style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: format === f.key ? `2px solid ${f.color}` : '1.5px solid #e0e0e0', background: format === f.key ? f.color + '10' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <i className={`ti ${f.icon}`} style={{ fontSize: 22, color: format === f.key ? f.color : '#aaa' }}></i>
                  <span style={{ fontSize: 12, fontWeight: 600, color: format === f.key ? f.color : '#888' }}>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column selector — only for Excel */}
          {format === 'excel' && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select columns</div>
                <button onClick={toggleAll} style={{ fontSize: 11, color: '#8B6914', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  {selected.size === columns.length ? 'Deselect all' : 'Select all'}
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {columns.map(col => (
                  <label key={col.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 7, border: selected.has(col.key) ? '1.5px solid #8B6914' : '1.5px solid #e0e0e0', background: selected.has(col.key) ? '#faf6ee' : '#fafafa', cursor: 'pointer', fontSize: 12 }}>
                    <input type="checkbox" checked={selected.has(col.key)} onChange={() => toggle(col.key)} style={{ accentColor: '#8B6914' }} />
                    <span style={{ fontWeight: selected.has(col.key) ? 600 : 400, color: selected.has(col.key) ? '#3D2214' : '#777' }}>{col.label}</span>
                  </label>
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 8 }}>{selected.size} of {columns.length} columns selected</div>
            </div>
          )}

          {format === 'pdf' && (
            <div style={{ background: '#faf6ee', border: '0.5px solid #E8D5A3', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#666', marginBottom: 18 }}>
              <i className="ti ti-info-circle" style={{ color: '#8B6914', marginRight: 6 }}></i>
              Opens a print-ready PDF preview. In the print dialog, choose <strong>"Save as PDF"</strong> as the printer destination.
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'flex-end', gap: 8, background: '#fafaf8' }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={format === 'excel' && selected.size === 0} onClick={() => { onExport(format, selected); onClose() }}>
            <i className={`ti ${format === 'excel' ? 'ti-download' : 'ti-printer'}`}></i>
            {format === 'excel' ? ' Download Excel' : ' Open PDF'}
          </button>
        </div>
      </div>
    </div>
  )
}


function Invoices({ invoices, payments, reload, setModal, setSelected }) {
  const [filterClient, setFilterClient] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterMonth, setFilterMonth] = useState('')
  const [search, setSearch] = useState('')
  const [sending, setSending] = useState(null)
  const [notice, setNotice] = useState('')
  const [reminderPreview, setReminderPreview] = useState(null) // { inv, subject, body }
  const searchRef = useRef(null)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') searchRef.current?.blur()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const allClients = [...new Set(invoices.map(i => i.client_name))].sort()
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthOptions = Array.from({length: 12}, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
    return { value: d.toISOString().slice(0,7), label: MONTHS[d.getMonth()] + ' ' + d.getFullYear() }
  }).reverse()

  let filtered = [...invoices].reverse()
  const q = search.toLowerCase().trim()
  if (q) filtered = filtered.filter(i =>
    i.number?.toLowerCase().includes(q) ||
    i.client_name?.toLowerCase().includes(q) ||
    String(i.total || '').includes(q) ||
    (i.date || '').includes(q) ||
    (i.due_date || '').includes(q) ||
    (i.notes || '').toLowerCase().includes(q) ||
    getStatus(i, payments).includes(q)
  )
  if (filterClient) filtered = filtered.filter(i => i.client_name === filterClient)
  if (filterStatus) filtered = filtered.filter(i => getStatus(i, payments) === filterStatus)
  if (filterMonth) filtered = filtered.filter(i => i.date?.startsWith(filterMonth))

  const totalFiltered = filtered.reduce((s, i) => s + Number(i.total), 0)
  const totalBalance = filtered.reduce((s, i) => s + getBalance(i, payments), 0)

  const clearFilters = () => { setFilterClient(''); setFilterStatus(''); setFilterMonth(''); setSearch('') }
  const hasFilters = filterClient || filterStatus || filterMonth || search

  const buildReminderEmail = (inv) => {
    const bal = getBalance(inv, payments)
    const subject = 'Payment Reminder — Invoice ' + inv.number
    const body = 'Dear ' + (inv.client_name || 'Client') + ',\n\n' +
      'This is a friendly reminder that the following invoice is outstanding and requires your attention:\n\n' +
      'Invoice Number: ' + inv.number + '\n' +
      'Invoice Date:   ' + fmtDate(inv.date) + '\n' +
      'Due Date:       ' + fmtDate(inv.due_date) + '\n' +
      'Invoice Total:  VT ' + Number(inv.total).toLocaleString() + '\n' +
      'Balance Due:    VT ' + Number(bal).toLocaleString() + '\n\n' +
      'Please arrange payment at your earliest convenience. If you have already made payment, please disregard this notice.\n\n' +
      'For payment enquiries please contact us:\n' +
      'Tel: +678 22712 | Mob: +678 7798712\n' +
      'Email: accounts@malakesa.vu\n\n' +
      'Thank you for your business.\n\n' +
      'Malakesa Transfer and Tour\n' +
      'Port Vila, Shefa Province, Vanuatu'
    return { subject, body, bal }
  }

  const sendReminder = (inv) => {
    const { subject, body, bal } = buildReminderEmail(inv)
    setReminderPreview({ inv, subject, body, bal })
  }

  const confirmSendReminder = async (inv, subject, body) => {
    setReminderPreview(null)
    setSending(inv.id)
    try {
      const res = await fetch('/api/send-reminder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: inv.id }) })
      if (res.ok) { setNotice('Reminder sent to ' + inv.client_name); setTimeout(() => setNotice(''), 5000); setSending(null); return }
    } catch(e) {}
    // mailto: must use location.href not window.open to trigger email app correctly
    const mailtoUrl = 'mailto:' + (inv.client_email || '') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
    window.location.href = mailtoUrl
    setNotice('Email app opened for ' + inv.client_name)
    setTimeout(() => setNotice(''), 5000)
    setSending(null)
  }

  const sendAllOverdueReminders = async () => {
    const overdue = filtered.filter(i => getStatus(i, payments) === 'overdue')
    if (overdue.length === 0) { alert('No overdue invoices found.'); return }

    // Group by client - one email per client listing ALL their overdue invoices
    const byClient = {}
    overdue.forEach(inv => {
      const key = inv.client_name || 'Unknown'
      if (!byClient[key]) byClient[key] = { email: inv.client_email || '', invoices: [] }
      byClient[key].invoices.push(inv)
    })

    const clients = Object.entries(byClient)
    const withEmail = clients.filter(([,c]) => c.email)
    const noEmail = clients.filter(([,c]) => !c.email).map(([name]) => name)

    if (withEmail.length === 0) {
      alert('No email addresses found.\nMissing: ' + noEmail.join(', ') + '\nAdd client emails in the Clients page.')
      return
    }

    let msg = 'Send ONE grouped reminder email per client?\n\n'
    withEmail.forEach(([name, c]) => {
      const total = c.invoices.reduce((s, i) => s + getBalance(i, payments), 0)
      msg += '- ' + name + ': ' + c.invoices.length + ' invoice(s), VT ' + Number(total).toLocaleString() + ' outstanding\n'
    })
    if (noEmail.length > 0) msg += '\nSkipped (no email): ' + noEmail.join(', ')
    if (!confirm(msg)) return

    for (const [clientName, c] of withEmail) {
      setSending(clientName)
      const totalOwed = c.invoices.reduce((s, i) => s + getBalance(i, payments), 0)
      const invoiceLines = c.invoices.map(inv => {
        const bal = getBalance(inv, payments)
        return '  - Invoice ' + inv.number + ': VT ' + Number(bal).toLocaleString() + ' (due ' + fmtDate(inv.due_date) + ')'
      }).join('\n')

      let sent = false
      try {
        const res = await fetch('/api/send-reminder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ invoiceIds: c.invoices.map(i => i.id), grouped: true })
        })
        if (res.ok) sent = true
      } catch(e) {}

      if (!sent) {
        const subject = encodeURIComponent('Payment Reminder — Outstanding Invoices')
        const bodyText = 'Dear ' + clientName + ',\n\n' +
          'This is a friendly reminder that the following invoices are overdue:\n\n' +
          invoiceLines + '\n\n' +
          'Total outstanding: VT ' + Number(totalOwed).toLocaleString() + '\n\n' +
          'Please arrange payment at your earliest convenience.\n\n' +
          'Thank you,\nMalakesa Transfer and Tour\nTel: +678 22712 | accounts@malakesa.vu'
        window.location.href = 'mailto:' + c.email + '?subject=' + subject + '&body=' + encodeURIComponent(bodyText)
      }

      setNotice('Reminder sent to ' + clientName + ' (' + c.invoices.length + ' invoice' + (c.invoices.length !== 1 ? 's' : '') + ')')
      setTimeout(() => setNotice(''), 5000)
    }
    setSending(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this invoice?')) return
    await fetch('/api/invoices/' + id, { method: 'DELETE' }); reload()
  }

  const selectStyle = { padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }

  // Export
  const [showExport, setShowExport] = useState(false)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const toggleSelect = (id) => setSelectedIds(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleAll = () => setSelectedIds(s => s.size === filtered.length ? new Set() : new Set(filtered.map(i => i.id)))
  const selectedInvoices = filtered.filter(i => selectedIds.has(i.id))
  const allSelected = filtered.length > 0 && selectedIds.size === filtered.length
  const someSelected = selectedIds.size > 0

  const bulkPrint = () => {
    const invs = selectedInvoices
    if (!invs.length) return
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups.'); return }
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    const rows = invs.map(inv => {
      const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
      const stColor = st === 'paid' ? '#3B6D11' : st === 'overdue' ? '#A32D2D' : '#D85A30'
      return `<tr><td>${inv.number}</td><td>${fmtDate(inv.date)}</td><td>${fmtDate(inv.due_date)}</td><td>${inv.client_name}</td><td style='text-align:right'>${fmt(inv.total)}</td><td style='text-align:right;color:${bal>0?'#D85A30':'#3B6D11'}'>${fmt(bal)}</td><td><span style='background:${stColor}20;color:${stColor};padding:2px 8px;border-radius:99px;font-size:11px;font-weight:600'>${st}</span></td></tr>`
    }).join('')
    const totalSel = invs.reduce((s,i)=>s+Number(i.total),0)
    const totalBal = invs.reduce((s,i)=>s+getBalance(i,payments),0)
    w.document.write(`<!DOCTYPE html><html><head><title>Bulk Invoice Print</title><style>
      body{font-family:Arial,sans-serif;color:#222;font-size:13px;margin:0}
      .rpt-hdr{display:none} @page{margin:18mm 14mm 20mm 14mm;size:A4}
      table{width:100%;border-collapse:collapse;font-size:12px}
      thead{display:table-header-group} th{background:#E8D5A3;padding:8px 10px;text-align:left;font-size:11px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      td{padding:8px 10px;border-bottom:0.5px solid #eee} h1{color:#8B6914;font-size:18px;margin:0 0 4px} .sub{color:#888;font-size:12px;margin-bottom:20px}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      @media print{.noprint{display:none}.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999} body{padding-top:42px}}
    </style></head><body>
    <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfer &amp; Tour — Selected Invoices (${invs.length})</span><span style='font-size:10px;color:#888'>${now}</span></div>
    <div class='noprint'><span>Bulk Print — ${invs.length} selected invoice(s)</span><button class='printbtn' onclick='window.print()'>🖨️ Print / Save PDF</button></div>
    <div style='padding:20px 40px'>
      <h1>Malakesa Transfer &amp; Tour</h1>
      <div class='sub'>Selected Invoices &nbsp;|&nbsp; ${invs.length} invoice(s) &nbsp;|&nbsp; ${now}<br>Total: VT ${Number(totalSel).toLocaleString()} &nbsp;|&nbsp; Outstanding: VT ${Number(totalBal).toLocaleString()}</div>
      <table><thead><tr><th>Invoice #</th><th>Issue Date</th><th>Due Date</th><th>Client</th><th style='text-align:right'>Total</th><th style='text-align:right'>Balance</th><th>Status</th></tr></thead>
      <tbody>${rows}</tbody>
      <tr style='background:#E8D5A3;font-weight:700'><td colspan='4' style='padding:9px 10px'>TOTAL (${invs.length} invoices)</td><td style='padding:9px 10px;text-align:right'>VT ${Number(totalSel).toLocaleString()}</td><td style='padding:9px 10px;text-align:right'>VT ${Number(totalBal).toLocaleString()}</td><td></td></tr>
      </table></div><script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const bulkEmailReminders = async () => {
    const invs = selectedInvoices.filter(i => getStatus(i, payments) !== 'paid')
    if (!invs.length) { alert('No unpaid invoices selected.'); return }
    // Group by client
    const byClient = {}
    invs.forEach(inv => {
      const key = inv.client_name
      if (!byClient[key]) byClient[key] = { email: inv.client_email || '', invoices: [] }
      byClient[key].invoices.push(inv)
    })
    const withEmail = Object.entries(byClient).filter(([,c]) => c.email)
    const noEmail = Object.entries(byClient).filter(([,c]) => !c.email).map(([n]) => n)
    if (!withEmail.length) { alert('No email addresses found for selected clients.\n\nMissing: ' + noEmail.join(', ')); return }
    let msg = `Send one reminder email per client for ${invs.length} selected invoice(s)?\n\n`
    withEmail.forEach(([name, c]) => {
      const total = c.invoices.reduce((s, i) => s + getBalance(i, payments), 0)
      msg += '- ' + name + ': ' + c.invoices.length + ' invoice(s), VT ' + Number(total).toLocaleString() + ' outstanding\n'
    })
    if (noEmail.length) msg += '\nSkipped (no email): ' + noEmail.join(', ')
    if (!confirm(msg)) return
    for (const [clientName, c] of withEmail) {
      const totalOwed = c.invoices.reduce((s, i) => s + getBalance(i, payments), 0)
      const invoiceLines = c.invoices.map(inv => {
        const bal = getBalance(inv, payments)
        return '  - Invoice ' + inv.number + ': VT ' + Number(bal).toLocaleString() + ' (due ' + fmtDate(inv.due_date) + ')'
      }).join('\n')
      let sent = false
      try {
        if (c.invoices.length === 1) {
          const res = await fetch('/api/send-reminder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: c.invoices[0].id }) })
          if (res.ok) sent = true
        }
      } catch(e) {}
      if (!sent) {
        const subject = encodeURIComponent('Payment Reminder — Outstanding Invoices')
        const bodyText = 'Dear ' + clientName + ',\n\nThis is a friendly reminder that the following invoice' + (c.invoices.length > 1 ? 's are' : ' is') + ' outstanding:\n\n' + invoiceLines + '\n\nTotal outstanding: VT ' + Number(totalOwed).toLocaleString() + '\n\nPlease arrange payment at your earliest convenience.\n\nThank you,\nMalakesa Transfer and Tour\nTel: +678 22712 | accounts@malakesa.vu'
        window.location.href = 'mailto:' + c.email + '?subject=' + subject + '&body=' + encodeURIComponent(bodyText)
      }
    }
    setNotice('Reminders sent to ' + withEmail.length + ' client(s)')
    setTimeout(() => setNotice(''), 5000)
  }

  const bulkExport = () => {
    const invs = selectedInvoices
    if (!invs.length) return
    const rows = [
      ['Malakesa Transfer and Tour - Selected Invoices'],
      ['Selected:', invs.length + ' invoices'],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      ['Invoice #', 'Issue Date', 'Due Date', 'Client', 'Subtotal (VT)', 'VAT (VT)', 'Total (VT)', 'Balance (VT)', 'Status'],
      ...invs.map(inv => [
        inv.number, inv.date, inv.due_date, inv.client_name,
        inv.subtotal || 0, inv.tax || 0, inv.total,
        getBalance(inv, payments), getStatus(inv, payments)
      ])
    ]
    downloadCSV('Malakesa_Selected_Invoices.csv', rows)
  }

  const bulkEmail = async () => {
    const invs = selectedInvoices
    if (!invs.length) return
    // Group by client so each client gets ONE email listing all their selected invoices
    const byClient = {}
    invs.forEach(inv => {
      const key = inv.client_name || 'Unknown'
      if (!byClient[key]) byClient[key] = { email: inv.client_email || '', invoices: [] }
      byClient[key].invoices.push(inv)
    })
    const clients = Object.entries(byClient)
    const withEmail = clients.filter(([,c]) => c.email)
    const noEmail = clients.filter(([,c]) => !c.email).map(([name]) => name)
    if (withEmail.length === 0) {
      alert('No email addresses found for selected clients.\nMissing: ' + noEmail.join(', ') + '\nAdd emails in the Clients page.')
      return
    }
    let msg = 'Send invoice email to ' + withEmail.length + ' client(s)?\n\n'
    withEmail.forEach(([name, c]) => { msg += '- ' + name + ': ' + c.invoices.length + ' invoice(s)\n' })
    if (noEmail.length > 0) msg += '\nSkipped (no email): ' + noEmail.join(', ')
    if (!confirm(msg)) return
    let sent = 0, failed = 0
    for (const [clientName, c] of withEmail) {
      for (const inv of c.invoices) {
        try {
          const res = await fetch('/api/send-invoice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: inv.id }) })
          if (res.ok) sent++
          else {
            // Fallback to mailto
            const bal = getBalance(inv, payments)
            const subject = encodeURIComponent('Invoice ' + inv.number + ' from Malakesa Transfer and Tour')
            const body = encodeURIComponent('Dear ' + clientName + ',\n\nPlease find attached invoice ' + inv.number + ' for VT ' + Number(inv.total).toLocaleString() + ', due ' + fmtDate(inv.due_date) + '.\n\nPlease arrange payment at your earliest convenience.\n\nThank you,\nMalakesa Transfer and Tour\nTel: +678 22712 | accounts@malakesa.vu')
            window.location.href = 'mailto:' + inv.client_email + '?subject=' + subject + '&body=' + body
            sent++
          }
        } catch(e) { failed++ }
      }
    }
    setNotice(sent + ' invoice email' + (sent !== 1 ? 's' : '') + ' sent' + (failed > 0 ? ', ' + failed + ' failed' : ''))
    setTimeout(() => setNotice(''), 6000)
  }

  const invoiceColumns = [
    { key: 'number', label: 'Invoice #' },
    { key: 'date', label: 'Issue Date' },
    { key: 'due_date', label: 'Due Date' },
    { key: 'client_name', label: 'Client' },
    { key: 'subtotal', label: 'Subtotal (VT)' },
    { key: 'tax', label: 'VAT (VT)' },
    { key: 'total', label: 'Total (VT)' },
    { key: 'balance', label: 'Balance (VT)' },
    { key: 'status', label: 'Status' },
    { key: 'notes', label: 'Notes' },
  ]
  const handleInvoiceExport = (format, selected) => {
    if (format === 'pdf') {
      const w = window.open('', '_blank')
      if (!w) { alert('Please allow popups.'); return }
      const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      const filterDesc = [filterClient && `Client: ${filterClient}`, filterStatus && `Status: ${filterStatus}`, filterMonth && `Month: ${filterMonth}`, search && `Search: ${search}`].filter(Boolean).join(' | ') || 'All invoices'
      const rows = filtered.map(inv => {
        const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
        const stColor = st === 'paid' ? '#3B6D11' : st === 'overdue' ? '#A32D2D' : '#D85A30'
        return `<tr><td>${inv.number}</td><td>${fmtDate(inv.date)}</td><td>${inv.client_name}</td><td style='text-align:right'>${fmt(inv.subtotal||0)}</td><td style='text-align:right'>${fmt(inv.tax||0)}</td><td style='text-align:right;font-weight:600'>${fmt(inv.total)}</td><td style='text-align:right;color:${bal>0?'#D85A30':'#3B6D11'}'>${fmt(bal)}</td><td><span style='background:${stColor}20;color:${stColor};padding:2px 8px;border-radius:99px;font-size:11px;font-weight:600'>${st}</span></td></tr>`
      }).join('')
      w.document.write(`<!DOCTYPE html><html><head><title>Invoices Export</title><style>
        body{font-family:Arial,sans-serif;color:#222;font-size:13px;margin:0}
        .rpt-hdr{display:none} @page{margin:18mm 14mm 20mm 14mm;size:A4}
        table{width:100%;border-collapse:collapse;font-size:12px}
        thead{display:table-header-group} th{background:#E8D5A3;padding:8px 10px;text-align:left;font-size:11px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
        td{padding:8px 10px;border-bottom:0.5px solid #eee} h1{color:#8B6914;font-size:18px;margin:0 0 4px} .sub{color:#888;font-size:12px;margin-bottom:20px}
        .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
        .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
        @media print{.noprint{display:none}.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999} body{padding-top:42px}}
      </style></head><body>
      <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfer &amp; Tour — Invoices Export — ${filterDesc}</span><span style='font-size:10px;color:#888'>${now}</span></div>
      <div class='noprint'><span>Invoices Export — ${filterDesc}</span><button class='printbtn' onclick='window.print()'>🖨️ Print / Save PDF</button></div>
      <div style='padding:20px 40px'><h1>Malakesa Transfer &amp; Tour</h1><div class='sub'>Invoices Export &nbsp;|&nbsp; ${filterDesc} &nbsp;|&nbsp; ${now}<br>${filtered.length} invoice(s) &nbsp;|&nbsp; Total: VT ${Number(totalFiltered).toLocaleString()} &nbsp;|&nbsp; Outstanding: VT ${Number(totalBalance).toLocaleString()}</div>
      <table><thead><tr><th>Invoice #</th><th>Issue Date</th><th>Client</th><th style='text-align:right'>Subtotal</th><th style='text-align:right'>VAT</th><th style='text-align:right'>Total</th><th style='text-align:right'>Balance</th><th>Status</th></tr></thead><tbody>${rows}</tbody>
      <tr style='background:#E8D5A3;font-weight:700'><td colspan='5' style='padding:9px 10px'>TOTAL (${filtered.length} invoices)</td><td style='padding:9px 10px;text-align:right'>VT ${Number(totalFiltered).toLocaleString()}</td><td style='padding:9px 10px;text-align:right'>VT ${Number(totalBalance).toLocaleString()} owing</td><td></td></tr>
      </table></div><script>window.onload=()=>window.print()<\/script></body></html>`)
      w.document.close()
      return
    }
    // Excel/CSV export
    const cols = invoiceColumns.filter(c => selected.has(c.key))
    const header = ['Malakesa Transfer and Tour - Invoice Export']
    const filterDesc = [filterClient && `Client: ${filterClient}`, filterStatus && `Status: ${filterStatus}`, filterMonth && `Month: ${filterMonth}`].filter(Boolean).join(' | ') || 'All'
    const rows = [
      header,
      ['Filters:', filterDesc],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      ['Total invoices:', filtered.length],
      [],
      cols.map(c => c.label),
      ...filtered.map(inv => cols.map(c => {
        if (c.key === 'balance') return getBalance(inv, payments)
        if (c.key === 'status') return getStatus(inv, payments)
        if (c.key === 'date' || c.key === 'due_date') return inv[c.key] || ''
        return inv[c.key] ?? ''
      }))
    ]
    const filterTag = filterDesc.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)
    downloadCSV(`Malakesa_Invoices_${filterTag}.csv`, rows)
  }

  return (
    <>
      <Topbar title="Invoices">
        <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={() => setShowExport(true)}><i className="ti ti-download"></i> Export</button>
        <button className="btn btn-primary" onClick={() => setModal('newInvoice')}><i className="ti ti-plus"></i> New Invoice</button>
      </Topbar>

      {/* Status tab bar */}
      <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.1)', display: 'flex', paddingLeft: 20, background: '#fff', overflowX: 'auto' }}>
        {[
          { key: '', label: 'All Invoices', count: invoices.length },
          { key: 'unpaid', label: 'Unpaid', count: invoices.filter(i => getStatus(i,payments)==='unpaid').length },
          { key: 'overdue', label: 'Overdue', count: invoices.filter(i => getStatus(i,payments)==='overdue').length },
          { key: 'partial', label: 'Partial', count: invoices.filter(i => getStatus(i,payments)==='partial').length },
          { key: 'paid', label: 'Paid', count: invoices.filter(i => getStatus(i,payments)==='paid').length },
        ].map(tab => {
          const isActive = filterStatus === tab.key
          const badgeColor = tab.key === 'overdue' ? '#A32D2D' : tab.key === 'unpaid' ? '#D85A30' : tab.key === 'partial' ? '#8B6914' : tab.key === 'paid' ? '#3B6D11' : '#666'
          return (
            <button key={tab.key} onClick={() => setFilterStatus(tab.key)} style={{ padding: '10px 16px', border: 'none', borderBottom: isActive ? '2.5px solid #8B6914' : '2.5px solid transparent', background: 'none', fontWeight: isActive ? 700 : 400, color: isActive ? '#8B6914' : '#555', cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
              {tab.label}
              {tab.count > 0 && <span style={{ background: isActive ? '#8B6914' : (tab.key === 'overdue' ? '#FCEBEB' : tab.key === 'unpaid' ? '#FEF3EB' : '#f0f0f0'), color: isActive ? '#fff' : badgeColor, borderRadius: 99, padding: '1px 7px', fontSize: 11, fontWeight: 600 }}>{tab.count}</span>}
            </button>
          )
        })}
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ background: '#fff', border: '0.5px solid rgba(139,105,20,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <i className="ti ti-search" style={{ position: 'absolute', left: 10, color: '#8B6914', fontSize: 15, pointerEvents: 'none' }}></i>
            <input
              type="text"
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search invoice #, client, amount, date, status... (press / to focus)"
              style={{ ...selectStyle, background: '#fff', color: '#1a1a1a', minWidth: 260, paddingLeft: 32, paddingRight: search ? 32 : 10 }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 16, lineHeight: 1, padding: 0 }}>&times;</button>
            )}
          </div>
          <select value={filterClient} onChange={e => setFilterClient(e.target.value)} style={selectStyle}>
            <option value="">All clients</option>
            {allClients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <MonthYearPicker value={filterMonth} onChange={setFilterMonth} accentColor="#8B6914" allowClear clearLabel="All months" />
          {hasFilters && <button className="btn btn-sm" onClick={clearFilters} style={{ color: '#A32D2D', borderColor: '#A32D2D' }}><i className="ti ti-x"></i> Clear</button>}
          <div style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>
            {filtered.length} invoice{filtered.length !== 1 ? 's' : ''} &nbsp;|&nbsp; {fmt(totalFiltered)} invoiced &nbsp;|&nbsp; <span style={{ color: totalBalance > 0 ? '#D85A30' : '#3B6D11' }}>{fmt(totalBalance)} outstanding</span>
          </div>
        </div>
        {/* Notice bar */}
        {notice && (
          <div style={{ background: '#EAF3DE', border: '0.5px solid #C0DD97', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#27500A', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="ti ti-check"></i> {notice}
          </div>
        )}

        {/* Overdue reminder bar */}
        {filterStatus === 'overdue' && filtered.length > 0 && (
          <div style={{ background: '#FCEBEB', border: '0.5px solid #F7C1C1', borderRadius: 8, padding: '10px 16px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 13, color: '#791F1F' }}>
              <i className="ti ti-alert-circle" style={{ marginRight: 6 }}></i>
              <strong>{filtered.length}</strong> overdue invoice{filtered.length !== 1 ? 's' : ''} &nbsp;|&nbsp; <strong style={{ color: '#A32D2D' }}>{fmt(filtered.reduce((s,i) => s+getBalance(i,payments), 0))}</strong> total outstanding
            </div>
            <button className="btn btn-sm" style={{ background: '#A32D2D', borderColor: '#7A1A1A', color: '#fff', fontWeight: 600 }} onClick={sendAllOverdueReminders}>
              <i className="ti ti-mail"></i> Email All Overdue Clients
            </button>
          </div>
        )}

        {/* Bulk action bar */}
        {someSelected && (
          <div style={{ background: 'linear-gradient(135deg,#1A0D06,#3D2214)', borderRadius: 10, padding: '12px 18px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#FFD700', fontWeight: 700, fontSize: 15 }}>{selectedIds.size}</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>invoice{selectedIds.size !== 1 ? 's' : ''} selected</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>|</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Total: <strong style={{ color: '#FFD700' }}>{fmt(selectedInvoices.reduce((s,i)=>s+Number(i.total),0))}</strong></span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="btn btn-sm" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 600 }} onClick={bulkPrint}><i className="ti ti-printer"></i> Print Selected</button>
              <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 600 }} onClick={bulkExport}><i className="ti ti-download"></i> Export Selected</button>
              <button className="btn btn-sm" style={{ background: '#2563A8', borderColor: '#1a4a8a', color: '#fff', fontWeight: 600 }} onClick={bulkEmail}><i className="ti ti-mail"></i> Email Selected</button>
              <button className="btn btn-sm" style={{ background: '#3D2214', borderColor: '#1A0D06', color: '#FFD700', fontWeight: 600 }} onClick={bulkEmailReminders}><i className="ti ti-mail"></i> Email Reminders</button>
              <button className="btn btn-sm" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)', background: 'none', fontSize: 11 }} onClick={() => setSelectedIds(new Set())}>Clear selection</button>
            </div>
          </div>
        )}

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
              <i className="ti ti-file-search" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
              <p>{search ? `No invoices found for "${search}"` : hasFilters ? 'No invoices match your filters.' : 'No invoices yet.'}</p>
              {hasFilters && <button className="btn btn-sm" onClick={clearFilters} style={{ marginTop: 10 }}>Clear filters</button>}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#E8D5A3' }}>
                <th style={{ padding: '9px 14px', width: 36 }}><input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ cursor: 'pointer', width: 15, height: 15, accentColor: '#8B6914' }} /></th>
                <Th>Invoice #</Th><Th>Client</Th><Th>Issue Date</Th><Th>Due Date</Th><Th>Amount</Th><Th>Balance</Th><Th>Status</Th><Th>Actions</Th>
              </tr></thead>
              <tbody>{filtered.map(inv => {
                const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
                return (
                  <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: selectedIds.has(inv.id) ? '#fdf8ec' : st === 'overdue' ? '#FFF8F8' : '#fff' }}>
                    <td style={{ padding: '9px 14px', width: 36 }}><input type="checkbox" checked={selectedIds.has(inv.id)} onChange={() => toggleSelect(inv.id)} onClick={e => e.stopPropagation()} style={{ cursor: 'pointer', width: 15, height: 15, accentColor: '#8B6914' }} /></td>
                    <Td><strong>{inv.number}</strong></Td>
                    <Td>{inv.client_name}</Td>
                    <Td>{fmtDate(inv.date)}</Td>
                    <Td style={st === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(inv.due_date)}</Td>
                    <Td>{fmt(inv.total)}</Td>
                    <Td style={{ color: bal > 0 ? '#D85A30' : '#3B6D11', fontWeight: 500 }}>{fmt(bal)}</Td>
                    <Td><Badge status={st} /></Td>
                    <Td><div style={{ display: 'flex', gap: 5 }}>
                      <button className="btn btn-sm" onClick={() => { setSelected(inv); setModal('viewInvoice') }} title="View"><i className="ti ti-eye"></i></button>
                      {bal > 0 && <button className="btn btn-sm" style={{ borderColor: '#3B6D11', color: '#3B6D11' }} onClick={() => { setSelected(inv); setModal('payment') }} title="Record payment"><i className="ti ti-cash"></i></button>}
                      {(st === 'overdue' || st === 'unpaid') && <button className="btn btn-sm" style={{ borderColor: '#8B6914', color: '#8B6914' }} onClick={() => sendReminder(inv)} disabled={sending === inv.id} title="Send reminder email"><i className="ti ti-mail"></i> {sending === inv.id ? '...' : 'Remind'}</button>}
                      <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(inv.id)} title="Delete"><i className="ti ti-trash"></i></button>
                    </div></Td>
                  </tr>
                )
              })}</tbody>
            </table>
          )}
        </Card>
      </div>
      {showExport && <ExportModal title="Invoices" columns={invoiceColumns} onExport={handleInvoiceExport} onClose={() => setShowExport(false)} />}
      {reminderPreview && (
        <ReminderPreviewModal
          inv={reminderPreview.inv}
          subject={reminderPreview.subject}
          body={reminderPreview.body}
          bal={reminderPreview.bal}
          onSend={(inv, subject, body) => confirmSendReminder(inv, subject, body)}
          onClose={() => setReminderPreview(null)}
          fmt={fmt}
          fmtDate={fmtDate}
        />
      )}
    </>
  )
}

function Payments({ payments, invoices, reload, setModal, setSelected }) {
  const total = payments.reduce((s, p) => s + Number(p.amount), 0)
  const thisMonth = payments.filter(p => p.date?.startsWith(new Date().toISOString().slice(0, 7))).reduce((s, p) => s + Number(p.amount), 0)
  const getInv = (id) => invoices.find(i => i.id === id) || {}
  const [receiptStatus, setReceiptStatus] = useState({})

  const printReceipt = (payment) => {
    const inv = getInv(payment.invoice_id)
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups to print receipts.'); return }
    const receiptNum = payment.receipt_number || `RCT-${(payment.id||'').slice(-4).toUpperCase()}`
    w.document.write(`<!DOCTYPE html><html><head><title>${receiptNum}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f0ebe0; }
    .page { max-width: 520px; margin: 20px auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #1A0D06 0%, #3D2214 50%, #5C3D0A 100%); padding: 24px 32px; text-align: center; }
    .rec-label { font-size: 10px; color: rgba(255,255,255,0.6); letter-spacing: 3px; margin-top: 10px; }
    .rec-num { font-size: 20px; font-weight: 700; color: #FFD700; margin-top: 2px; }
    .body { padding: 24px 32px; }
    .paid-stamp { text-align: center; margin: 16px 0; }
    .paid-box { display: inline-block; border: 3px solid #3B6D11; color: #3B6D11; font-size: 22px; font-weight: 900; letter-spacing: 6px; padding: 6px 24px; border-radius: 4px; transform: rotate(-3deg); }
    .section { margin: 16px 0; padding: 14px 16px; background: #faf6ee; border-radius: 6px; }
    .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f0ebe0; font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .label { color: #888; }
    .val { font-weight: 600; color: #222; }
    .amount-box { background: linear-gradient(135deg, #3D2214, #8B6914); border-radius: 6px; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; margin: 16px 0; }
    .thankyou { text-align: center; font-size: 13px; font-style: italic; color: #8B6914; margin: 16px 0 8px; }
    .footer { background: linear-gradient(135deg, #1A0D06, #5C3D0A); padding: 14px 32px; text-align: center; color: rgba(255,255,255,0.7); font-size: 10px; line-height: 1.9; }
    .noprint { background: #333; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
    .printbtn { background: #8B6914; color: #fff; border: none; padding: 7px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .rpt-hdr { display: none; }
    @page { margin: 12mm 10mm 16mm 10mm; size: A4; }
    @media print {
      .noprint { display: none; }
      body { background: #fff; }
      .page { box-shadow: none; margin: 0; max-width: 100%; border-radius: 0; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .rpt-hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #8B6914; padding-bottom: 5px; }
      .rpt-hdr { position: fixed; top: 0; left: 0; right: 0; background: #fff; z-index: 999; padding: 5px 32px; }
      .page { padding-top: 36px; }
    }
  </style></head><body>
  <div class="rpt-hdr">
    <span style="font-size:11px;font-weight:700;color:#3D2214">Malakesa Transfer &amp; Tour &nbsp;—&nbsp; Payment Receipt &nbsp;—&nbsp; ${receiptNum}</span>
    <span style="font-size:10px;color:#888">Page <span class="pgnum"></span></span>
  </div>
  <div class="noprint"><span>${receiptNum}</span><button class="printbtn" onclick="window.print()">Print / Save PDF</button></div>
  <div class="page">
    <div class="header">
      <img src="${MALAKESA_LOGO}" alt="Malakesa Transfer and Tour" style="width:200px;border-radius:6px;display:block;margin:0 auto" />
      <div class="rec-label">PAYMENT RECEIPT</div>
      <div class="rec-num">${receiptNum}</div>
    </div>
    <div class="body">
      <div class="paid-stamp"><div class="paid-box">PAID</div></div>
      <div class="section">
        <div class="row"><span class="label">Receipt No.</span><span class="val">${receiptNum}</span></div>
        <div class="row"><span class="label">Invoice No.</span><span class="val">${inv.number || '\u2014'}</span></div>
        <div class="row"><span class="label">Date paid</span><span class="val">${fmtDate(payment.date)}</span></div>
        <div class="row"><span class="label">Payment method</span><span class="val">${payment.method}</span></div>
        ${payment.note ? '<div class="row"><span class="label">Notes</span><span class="val">' + payment.note + '</span></div>' : ''}
      </div>
      <div class="section">
        <div class="row"><span class="label">Client</span><span class="val">${inv.client_name || '\u2014'}</span></div>
        <div class="row"><span class="label">Invoice total</span><span class="val">VT ${Number(inv.total||0).toLocaleString()}</span></div>
      </div>
      <div class="amount-box">
        <span style="color:#fff;font-weight:700;font-size:15px">AMOUNT RECEIVED</span>
        <span style="color:#FFD700;font-weight:700;font-size:22px">VT ${Number(payment.amount).toLocaleString()}</span>
      </div>
      <div class="thankyou">Tankiu Tumas \u2014 Thank you for your payment!</div>
    </div>
    <div class="footer">
      Malakesa Transfer and Tour | Port Vila, Shefa Province, Vanuatu<br>
      +678 22712 | +678 7798712 | accounts@malakesa.vu
    </div>
  </div>
  <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const emailReceipt = async (payment) => {
    const pid = payment.id || 'x'
    setReceiptStatus(s => ({ ...s, [pid]: 'sending' }))
    try {
      const res = await fetch('/api/send-receipt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: payment.invoice_id, paymentId: pid }) })
      const data = await res.json()
      if (res.ok) {
        setReceiptStatus(s => ({ ...s, [pid]: 'sent' }))
        setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 5000)
      } else {
        setReceiptStatus(s => ({ ...s, [pid]: 'error' }))
        setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 6000)
      }
    } catch (e) {
      setReceiptStatus(s => ({ ...s, [pid]: 'error' }))
      setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 6000)
    }
  }

  const unpaidInvoices = invoices.filter(i => ['unpaid','overdue','partial'].includes(getStatus(i, payments)))
  return (
    <>
      <Topbar title="Payments Received">
        <button className="btn btn-primary" onClick={() => {
          if (unpaidInvoices.length === 0) { alert('No unpaid invoices found. Create an invoice first.'); return }
          setSelected(unpaidInvoices[0])
          setModal('payment')
        }}><i className="ti ti-plus"></i> Record Payment</button>
      </Topbar>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Total collected" value={fmt(total)} color="#3B6D11" />
          <StatCard label="Payments recorded" value={payments.length} />
          <StatCard label="This month" value={fmt(thisMonth)} color="#3B6D11" />
        </div>
        {unpaidInvoices.length > 0 && (
          <div style={{ background: '#FAEEDA', border: '0.5px solid #FAC775', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#633806', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span><strong>{unpaidInvoices.length}</strong> unpaid invoice{unpaidInvoices.length > 1 ? 's' : ''} outstanding — select an invoice to record payment against:</span>
          </div>
        )}
        {unpaidInvoices.length > 0 && (
          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontWeight: 500, fontSize: 13 }}>Unpaid invoices — click to record payment</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#E8D5A3' }}><Th>Invoice #</Th><Th>Client</Th><Th>Due Date</Th><Th>Balance</Th><Th>Status</Th><Th></Th></tr></thead>
              <tbody>{unpaidInvoices.map(inv => (
                <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                  <Td><strong>{inv.number}</strong></Td>
                  <Td>{inv.client_name}</Td>
                  <Td>{fmtDate(inv.due_date)}</Td>
                  <Td style={{ fontWeight: 500 }}>{fmt(getBalance(inv, payments))}</Td>
                  <Td><Badge status={getStatus(inv, payments)} /></Td>
                  <Td><button className="btn btn-sm btn-primary" onClick={() => { setSelected(inv); setModal('payment') }}><i className="ti ti-cash"></i> Record Payment</button></Td>
                </tr>
              ))}</tbody>
            </table>
          </Card>
        )}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500, fontSize: 13 }}>Payment history</span>
            <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
              <span style={{ color: '#666' }}>Total collected: <strong style={{ color: '#3B6D11' }}>{fmt(payments.reduce((s, p) => s + Number(p.amount), 0))}</strong></span>
              <span style={{ color: '#666' }}>Payments: <strong>{payments.length}</strong></span>
              <span style={{ color: '#666' }}>Fully paid invoices: <strong style={{ color: '#3B6D11' }}>{invoices.filter(i => getBalance(i, payments) <= 0 && payments.some(p => p.invoice_id === i.id)).length}</strong></span>
              <span style={{ color: '#666' }}>Still owing: <strong style={{ color: '#D85A30' }}>{invoices.filter(i => getBalance(i, payments) > 0 && payments.some(p => p.invoice_id === i.id)).length} invoice{invoices.filter(i => getBalance(i, payments) > 0 && payments.some(p => p.invoice_id === i.id)).length !== 1 ? 's' : ''}</strong></span>
            </div>
          </div>
          {payments.length === 0 ? <Empty icon="ti-cash-off" msg="No payments recorded yet" /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#E8D5A3' }}><Th>Receipt #</Th><Th>Date</Th><Th>Invoice #</Th><Th>Client</Th><Th>Method</Th><Th>Amount</Th><Th>Inv. Total</Th><Th>Balance After</Th><Th>Note</Th><Th>Actions</Th></tr></thead>
              <tbody>{[...payments].reverse().map(p => {
                const inv = getInv(p.invoice_id)
                // Calculate balance remaining after this payment
                const invTotal = Number(inv?.total || 0)
                const allPaymentsForInv = payments.filter(x => x.invoice_id === p.invoice_id)
                const totalPaidForInv = allPaymentsForInv.reduce((s, x) => s + Number(x.amount || 0), 0)
                const balanceAfterAll = invTotal - totalPaidForInv
                const isPaidOff = balanceAfterAll <= 0
                return (
                  <tr key={p.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td style={{ color: '#8B6914', fontWeight: 500 }}>{p.receipt_number || '—'}</Td><Td>{fmtDate(p.date)}</Td><Td><strong>{inv?.number || '—'}</strong></Td><Td>{inv?.client_name || '—'}</Td>
                    <Td><span style={{ background: '#E8D5A3', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{p.method || 'Cash'}</span></Td>
                    <Td style={{ color: '#3B6D11', fontWeight: 500 }}>{fmt(p.amount)}</Td>
                    <Td style={{ color: '#666', fontSize: 12 }}>{inv?.total ? fmt(inv.total) : '—'}</Td>
                    <Td>
                      {!inv?.total ? <span style={{ color: '#ccc' }}>—</span> : isPaidOff ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#EAF3DE', color: '#3B6D11', borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
                          \u2713 Fully paid
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FEF3EB', color: '#D85A30', borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
                          {fmt(balanceAfterAll)} owing
                        </span>
                      )}
                    </Td>
                    <Td style={{ color: '#666' }}>{p.note || ''}</Td>
                    <Td>
                      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        <button className="btn btn-sm" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => printReceipt(p)}><i className="ti ti-printer"></i> Print</button>
                        <button className="btn btn-sm" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => emailReceipt(p)} disabled={receiptStatus[p.id] === 'sending'}><i className="ti ti-mail"></i> {receiptStatus[p.id] === 'sending' ? '...' : 'Email'}</button>
                        {receiptStatus[p.id] === 'sent' && <span style={{ fontSize: 11, color: '#3B6D11' }}>✓ Sent</span>}
                        {receiptStatus[p.id] === 'error' && <span style={{ fontSize: 11, color: '#D85A30' }}>Failed</span>}
                      </div>
                    </Td>
                  </tr>
                )
              })}</tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}

// ── Unpaid ────────────────────────────────────────────────
function Unpaid({ invoices, payments, reload, setModal, setSelected }) {
  const [filterClient, setFilterClient] = useState('')
  const [filterMonth, setFilterMonth] = useState('')
  const [sending, setSending] = useState(null)
  const [notice, setNotice] = useState('')

  const allUnpaid = invoices.filter(i => ['unpaid','overdue','partial'].includes(getStatus(i, payments)))
  const clients = [...new Set(allUnpaid.map(i => i.client_name))].sort()

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthOptions = Array.from({length: 6}, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    return { value: d.toISOString().slice(0,7), label: MONTHS[d.getMonth()] + ' ' + d.getFullYear() }
  }).reverse()

  let filtered = allUnpaid
  if (filterClient) filtered = filtered.filter(i => i.client_name === filterClient)
  if (filterMonth) filtered = filtered.filter(i => i.due_date?.startsWith(filterMonth))
  filtered = filtered.sort((a,b) => a.due_date > b.due_date ? 1 : -1)

  const overdue = filtered.filter(i => getStatus(i, payments) === 'overdue')
  const totalOut = filtered.reduce((s,i) => s + getBalance(i, payments), 0)

  const sendReminder = async (inv) => {
    setSending(inv.id)
    try {
      const res = await fetch('/api/send-reminder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: inv.id }) })
      if (res.ok) { setNotice('Reminder sent to ' + inv.client_name); setTimeout(() => setNotice(''), 4000); setSending(null); return }
    } catch(e) {}
    const bal = getBalance(inv, payments)
    const subject = encodeURIComponent('Payment Reminder — ' + inv.number)
    const body = encodeURIComponent('Dear ' + inv.client_name + ',\n\nThis is a friendly reminder that invoice ' + inv.number + ' has an outstanding balance of VT ' + Number(bal).toLocaleString() + ' due on ' + fmtDate(inv.due_date) + '.\n\nPlease arrange payment at your earliest convenience.\n\nThank you,\nMalakesa Transfer and Tour')
    window.open('mailto:' + (inv.client_email || '') + '?subject=' + subject + '&body=' + body, '_blank')
    setNotice('Email app opened for ' + inv.client_name)
    setTimeout(() => setNotice(''), 4000)
    setSending(null)
  }

  const sendAllReminders = async () => {
    const withEmail = filtered.filter(i => i.client_email)
    if (withEmail.length === 0) { alert('No email addresses found on these invoices.'); return }
    if (!confirm('Send reminders to ' + withEmail.length + ' client(s)?')) return
    for (const inv of withEmail) { await sendReminder(inv) }
  }

  const printReport = () => {
    const w = window.open('', '_blank')
    const title = 'Unpaid Invoices Report' + (filterClient ? ' — ' + filterClient : '') + (filterMonth ? ' — ' + filterMonth : '')
    w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>body{font-family:Arial,sans-serif;color:#222;font-size:13px}
    h1{font-size:20px;font-weight:bold;color:#8B6914;margin-bottom:4px}
    .sub{color:#888;font-size:12px;margin-bottom:24px}
    table{width:100%;border-collapse:collapse;margin-top:16px}
    thead{display:table-header-group}
    th{background:#f5f5f5;padding:8px 12px;text-align:left;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:0.4px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    td{padding:9px 12px;border-bottom:1px solid #eee;font-size:13px}
    .overdue{color:#A32D2D;font-weight:500}
    .total{margin-top:20px;text-align:right;font-size:15px;font-weight:bold}
    .badge{display:inline-block;padding:2px 8px;border-radius:99px;font-size:11px;font-weight:500}
    .unpaid{background:#FAECE7;color:#712B13}.overdue-b{background:#FCEBEB;color:#791F1F}.partial{background:#FAEEDA;color:#633806}
    .rpt-hdr{display:none}
    @page{margin:20mm 15mm 22mm 15mm;size:A4}
    @media print{
      .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 0 6px 0}
      .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999;padding:6px 40px}
      body{margin:0;padding-top:44px}
      .report-body{padding:0 40px 40px}
    }
    </style></head><body>
    <div class="rpt-hdr">
      <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfer &amp; Tour &nbsp;—&nbsp; Unpaid Invoices Report</span>
      <span style="font-size:10px;color:#888">Generated ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})}</span>
    </div>
    <div class="report-body">
    <div style="display:flex;justify-content:space-between;margin-top:20px">
      <div><h1>Malakesa Transfer &amp; Tour</h1><div class="sub">Unpaid Invoices Report — Generated ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})}</div></div>
      <div style="text-align:right;font-size:12px;color:#888">${filterClient ? 'Client: ' + filterClient + '<br>' : ''}${filterMonth ? 'Month: ' + filterMonth : ''}</div>
    </div>
    <table><thead><tr><th>Invoice #</th><th>Client</th><th>Due Date</th><th>Amount</th><th>Balance</th><th>Status</th></tr></thead>
    <tbody>${filtered.map(inv => {
      const st = getStatus(inv, payments); const bal = getBalance(inv, payments)
      return '<tr><td><strong>' + inv.number + '</strong></td><td>' + inv.client_name + '</td><td class="' + (st==='overdue'?'overdue':'') + '">' + fmtDate(inv.due_date) + '</td><td>VT ' + Number(inv.total).toLocaleString() + '</td><td style="font-weight:500">VT ' + Number(bal).toLocaleString() + '</td><td><span class="badge ' + (st==='overdue'?'overdue-b':st) + '">' + st + '</span></td></tr>'
    }).join('')}</tbody></table>
    <div class="total">Total outstanding: VT ${Number(totalOut).toLocaleString()}</div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  return (
    <>
      <Topbar title="Unpaid Invoices">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select value={filterClient} onChange={e => setFilterClient(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
            <option value="">All clients</option>
            {clients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <MonthYearPicker value={filterMonth} onChange={setFilterMonth} accentColor="#8B6914" allowClear clearLabel="All months" />
          <button className="btn btn-sm" style={{ background: "#8B6914", borderColor: "#6B5010", color: "#fff", fontWeight: 500 }} onClick={printReport}><i className="ti ti-printer"></i> Print</button>
          <button className="btn btn-sm" style={{ background: "#8B6914", borderColor: "#6B5010", color: "#fff", fontWeight: 500 }} onClick={sendAllReminders}><i className="ti ti-mail"></i> Email All</button>
        </div>
      </Topbar>
      <div style={{ padding: 20 }}>
        {notice && <div style={{ background: '#EAF3DE', color: '#27500A', border: '0.5px solid #C0DD97', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}><i className="ti ti-check"></i>{notice}</div>}
        {overdue.length > 0 && <div style={{ background: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F7C1C1', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}><i className="ti ti-alert-triangle"></i><strong>{overdue.length}</strong> invoice{overdue.length > 1 ? 's are' : ' is'} overdue.</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Total outstanding" value={fmt(totalOut)} color="#D85A30" />
          <StatCard label="Unpaid invoices" value={filtered.length} />
          <StatCard label="Overdue" value={overdue.length} color="#A32D2D" />
        </div>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {filtered.length === 0 ? <Empty icon="ti-circle-check" msg="All invoices are paid!" msgColor="#3B6D11" /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#E8D5A3' }}><Th>Invoice #</Th><Th>Client</Th><Th>Due Date</Th><Th>Balance</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
              <tbody>{filtered.map(inv => {
                const st = getStatus(inv, payments)
                return (
                  <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td><strong>{inv.number}</strong></Td>
                    <Td>{inv.client_name}</Td>
                    <Td style={st === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(inv.due_date)}</Td>
                    <Td style={{ fontWeight: 500 }}>{fmt(getBalance(inv, payments))}</Td>
                    <Td><Badge status={st} /></Td>
                    <Td><div style={{ display: 'flex', gap: 5 }}>
                      <button className="btn btn-sm" style={{ borderColor: '#3B6D11', color: '#3B6D11' }} onClick={() => { setSelected(inv); setModal('payment') }}><i className="ti ti-cash"></i> Pay</button>
                      <button className="btn btn-sm" onClick={() => sendReminder(inv)} disabled={sending === inv.id}><i className="ti ti-mail"></i> {sending === inv.id ? '...' : 'Remind'}</button>
                      <button className="btn btn-sm" onClick={() => { setSelected(inv); setModal('viewInvoice') }}><i className="ti ti-eye"></i></button>
                    </div></Td>
                  </tr>
                )
              })}</tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}

// ── Reports ───────────────────────────────────────────────
function Reports({ invoices, payments, purchases, salaryRecords }) {
  const [tab, setTab] = useState('revenue') // 'revenue' | 'suppliers' | 'cashflow'
  const [showExport, setShowExport] = useState(false)
  const [period, setPeriod] = useState('all')
  const [revenueMonth, setRevenueMonth] = useState(new Date().toISOString().slice(0, 7))
  const [filterClient, setFilterClient] = useState('')

  // VAT tab state — default to current month
  const nowD = new Date()
  const defaultVatMonth = nowD.toISOString().slice(0, 7)
  const [vatMonth, setVatMonth] = useState(defaultVatMonth)

  // Supplier report tab state
  const [supplierPeriod, setSupplierPeriod] = useState('all') // 'all' | 'month' | 'quarter' | 'year' | 'specific'
  const [supplierMonth, setSupplierMonth] = useState(nowD.toISOString().slice(0, 7))
  const [supplierSort, setSupplierSort] = useState('spend') // 'spend' | 'count' | 'name'

  const allClients = [...new Set(invoices.map(i => i.client_name))].sort()

  // Build month options for VAT selector (last 24 months)
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const vatMonthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1)
    return { value: d.toISOString().slice(0, 7), label: MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear() }
  })

  // ── Revenue tab logic ──
  const filterDate = (list, field) => {
    if (period === 'all') return list
    if (period === 'specific') return list.filter(i => i[field] && i[field].startsWith(revenueMonth))
    const now = new Date(); const start = new Date()
    if (period === 'month') start.setDate(1)
    if (period === 'quarter') start.setMonth(now.getMonth() - 2, 1)
    if (period === 'year') start.setMonth(0, 1)
    return list.filter(i => i[field] && new Date(i[field] + 'T00:00:00') >= start)
  }

  let fi = filterDate(invoices, 'date')
  let fp = filterDate(payments, 'date')
  if (filterClient) {
    fi = fi.filter(i => i.client_name === filterClient)
    const clientInvIds = new Set(fi.map(i => i.id))
    fp = fp.filter(p => clientInvIds.has(p.invoice_id))
  }

  const totalInv = fi.reduce((s, i) => s + Number(i.total), 0)
  const totalCol = fp.reduce((s, p) => s + Number(p.amount), 0)
  const outstanding = fi.reduce((s, i) => s + getBalance(i, payments), 0)
  const totalVat = fi.reduce((s, i) => s + Number(i.tax || 0), 0)
  const totalSubtotal = fi.reduce((s, i) => s + Number(i.subtotal || 0), 0)

  const byClient = {}
  fi.forEach(inv => {
    if (!byClient[inv.client_name]) byClient[inv.client_name] = { name: inv.client_name, total: 0, collected: 0, outstanding: 0, count: 0 }
    byClient[inv.client_name].total += Number(inv.total)
    byClient[inv.client_name].collected += Number(inv.total) - getBalance(inv, payments)
    byClient[inv.client_name].outstanding += getBalance(inv, payments)
    byClient[inv.client_name].count++
  })
  const clientRows = Object.values(byClient).sort((a, b) => b.total - a.total)

  const byService = {}
  fi.forEach(inv => { (inv.items || []).forEach(it => {
    const svc = it.description || 'Other'
    if (!byService[svc]) byService[svc] = { desc: svc, qty: 0, revenue: 0 }
    byService[svc].qty += Number(it.qty) || 0
    byService[svc].revenue += (Number(it.qty) || 0) * (Number(it.rate) || 0)
  })})
  const serviceRows = Object.values(byService).sort((a, b) => b.revenue - a.revenue).slice(0, 10)

  const byMethod = {}
  fp.forEach(p => { const m = p.method || 'Cash'; byMethod[m] = (byMethod[m] || 0) + Number(p.amount) })

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const monthData = Array.from({length: 6}, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const m = d.getMonth(); const y = d.getFullYear()
    const invs = fi.filter(inv => { const id = new Date(inv.date + 'T00:00:00'); return id.getMonth() === m && id.getFullYear() === y })
    const invoiced = invs.reduce((s, inv) => s + Number(inv.total), 0)
    const pmts = fp.filter(p => { const pd = new Date(p.date + 'T00:00:00'); return pd.getMonth() === m && pd.getFullYear() === y })
    const collected = pmts.reduce((s, p) => s + Number(p.amount), 0)
    return { label: MONTHS[m], invoiced, collected }
  })
  const maxAmt = Math.max(...monthData.map(m => Math.max(m.invoiced, m.collected)), 1)

  const periodLabel = period === 'specific'
    ? (vatMonthOptions.find(m => m.value === revenueMonth)?.label || revenueMonth)
    : { all: 'All time', month: 'This month', quarter: 'This quarter', year: 'This year' }[period]

  // ── VAT tab logic ──
  const vatInvoices = invoices.filter(i => i.date && i.date.startsWith(vatMonth)).sort((a, b) => a.date > b.date ? 1 : -1)
  const vatTotalInv = vatInvoices.reduce((s, i) => s + Number(i.total), 0)
  const vatTotalSubtotal = vatInvoices.reduce((s, i) => s + Number(i.subtotal || 0), 0)
  const vatTotalTax = vatInvoices.reduce((s, i) => s + Number(i.tax || 0), 0)
  const vatZeroRated = vatInvoices.filter(i => !i.tax || Number(i.tax) === 0)
  const vatStandard = vatInvoices.filter(i => Number(i.tax) > 0)
  const vatMonthLabel = vatMonthOptions.find(m => m.value === vatMonth)?.label || vatMonth

  // Purchases for VAT month
  const vatPurchases = (purchases || []).filter(p => p.date && p.date.startsWith(vatMonth)).sort((a, b) => a.date > b.date ? 1 : -1)
  const vatInputTax = vatPurchases.reduce((s, p) => s + Number(p.vat || 0), 0)
  const vatPurchasesTotal = vatPurchases.reduce((s, p) => s + Number(p.amount || 0), 0)
  const vatPurchasesExVat = vatPurchases.reduce((s, p) => s + Number(p.amount_ex_vat || 0), 0)
  const vatNetPayable = Math.max(0, vatTotalTax - vatInputTax)

  const printVatReturn = () => {
    const w = window.open('', '_blank')
    w.document.write(`<!DOCTYPE html><html><head><title>VAT Return — ${vatMonthLabel}</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:Arial,sans-serif;margin:0;color:#222;font-size:13px;background:#f0ebe0}
      .page{max-width:800px;margin:20px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.15)}
      .header{background:linear-gradient(135deg,#1A0D06 0%,#3D2214 50%,#5C3D0A 100%);padding:24px 40px;display:flex;justify-content:space-between;align-items:flex-start}
      .logo-contact{font-size:10px;color:rgba(255,255,255,0.7);margin-top:8px;line-height:1.8}
      .report-title{text-align:right;color:#fff}
      .report-name{font-size:20px;font-weight:700;color:#FFD700}
      .report-sub{font-size:11px;color:rgba(255,255,255,0.75);margin-top:4px;line-height:1.7}
      .body{padding:28px 40px}
      .vat-box{background:linear-gradient(135deg,#1A4D1A,#2E7D2E);border-radius:8px;padding:20px 28px;margin-bottom:24px;display:flex;gap:32px;flex-wrap:wrap}
      .vat-item{color:#fff}
      .vat-label{font-size:10px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
      .vat-value{font-size:22px;font-weight:700;color:#90EE90}
      .vat-sub{font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px}
      .tin-box{background:#FAEEDA;border:1px solid #FAC775;border-radius:6px;padding:10px 16px;margin-bottom:20px;font-size:12px;color:#633806}
      h2{font-size:13px;font-weight:700;margin:20px 0 8px;color:#3D2214;border-bottom:2px solid #8B6914;padding-bottom:4px;text-transform:uppercase;letter-spacing:0.5px}
      table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:12px}
      th{background:#E8D5A3;padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#3D2214;text-transform:uppercase;letter-spacing:0.5px}
      td{padding:8px 10px;border-bottom:1px solid #f0ebe0;vertical-align:top}
      tr:nth-child(even) td{background:#faf6ee}
      .right{text-align:right}
      .amt{font-weight:500}
      .vat-amt{color:#2E7D2E;font-weight:600}
      .zero{color:#888;font-style:italic}
      .summary-row{background:#E8D5A3!important;font-weight:700}
      .footer{background:linear-gradient(135deg,#1A0D06,#5C3D0A);padding:14px 40px;display:flex;justify-content:space-between;align-items:center;margin-top:0}
      .footer-l{color:rgba(255,255,255,0.8);font-size:10px;line-height:1.9}
      .footer-r{text-align:right;color:#FFD700;font-size:10px;line-height:1.9}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      thead{display:table-header-group}
      .rpt-hdr{display:none}
      .summary-row{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .header{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .footer{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .vat-box{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      @page{margin:18mm 14mm 22mm 14mm;size:A4}
      @media print{
        .noprint{display:none}
        body{background:#fff}
        .page{box-shadow:none;margin:0;border-radius:0}
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px}
        .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999}
        .page{padding-top:42px}
        .rpt-footer-bar{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #E8D5A3;padding:4px 40px;display:flex;justify-content:space-between;font-size:10px;color:#888;z-index:999}
      }
    </style></head><body>
    <div class="rpt-hdr">
      <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfer &amp; Tour &nbsp;—&nbsp; VAT Return &nbsp;—&nbsp; ${vatMonthLabel}</span>
      <span style="font-size:10px;color:#888">TIN: 445579 &nbsp;|&nbsp; Generated ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span>
    </div>
    <div class="rpt-footer-bar">
      <span>VAT Return — ${vatMonthLabel} &nbsp;|&nbsp; Malakesa Transfer &amp; Tour &nbsp;|&nbsp; TIN: 445579</span>
      <span>Computer generated — verify before filing</span>
    </div>
    <div class="noprint"><span>VAT Return — ${vatMonthLabel}</span><button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button></div>
    <div class="page">
      <div class="header">
        <div>
          <img src="${MALAKESA_LOGO}" alt="Malakesa Transfer and Tour" style="width:200px;border-radius:6px;display:block" />
          <div class="logo-contact">
            📍 Port Vila, Shefa Province, Vanuatu<br>
            📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
          </div>
        </div>
        <div class="report-title">
          <div class="report-name">VAT RETURN</div>
          <div class="report-sub">
            Period: <strong>${vatMonthLabel}</strong><br>
            TIN: <strong>445579</strong><br>
            Generated: ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'})}
          </div>
        </div>
      </div>
      <div class="body">
        <div class="tin-box">
          ⚠️ <strong>VAT Registration:</strong> TIN 445579 &nbsp;|&nbsp; Vanuatu Value Added Tax &nbsp;|&nbsp; Rate: 15% &nbsp;|&nbsp; Period: ${vatMonthLabel}
        </div>
        <div class="vat-box">
          <div class="vat-item">
            <div class="vat-label">VAT Output Tax</div>
            <div class="vat-value">VT ${Number(vatTotalTax).toLocaleString()}</div>
            <div class="vat-sub">Total VAT charged to clients</div>
          </div>
          <div class="vat-item">
            <div class="vat-label">Taxable Sales (ex-VAT)</div>
            <div class="vat-value" style="color:#FFD700">VT ${Number(vatTotalSubtotal).toLocaleString()}</div>
            <div class="vat-sub">${vatStandard.length} standard-rated invoice${vatStandard.length !== 1 ? 's' : ''}</div>
          </div>
          <div class="vat-item">
            <div class="vat-label">Zero-Rated Sales</div>
            <div class="vat-value" style="color:#aaa">VT ${Number(vatZeroRated.reduce((s,i) => s + Number(i.total), 0)).toLocaleString()}</div>
            <div class="vat-sub">${vatZeroRated.length} zero-rated invoice${vatZeroRated.length !== 1 ? 's' : ''}</div>
          </div>
          <div class="vat-item">
            <div class="vat-label">Total Invoiced</div>
            <div class="vat-value" style="color:#FFD700">VT ${Number(vatTotalInv).toLocaleString()}</div>
            <div class="vat-sub">${vatInvoices.length} invoice${vatInvoices.length !== 1 ? 's' : ''} total</div>
          </div>
        </div>

        <h2>Standard-Rated Invoices (15% VAT)</h2>
        ${vatStandard.length === 0 ? '<p style="color:#888;font-size:12px;margin-bottom:20px">No standard-rated invoices for this period.</p>' : `
        <table>
          <thead><tr><th>Invoice #</th><th>Date</th><th>Client</th><th class="right">Subtotal (ex-VAT)</th><th class="right">VAT (15%)</th><th class="right">Total</th></tr></thead>
          <tbody>
            ${vatStandard.map(inv => '<tr><td><strong>' + inv.number + '</strong></td><td>' + fmtDate(inv.date) + '</td><td>' + inv.client_name + '</td><td class="right amt">VT ' + Number(inv.subtotal||0).toLocaleString() + '</td><td class="right vat-amt">VT ' + Number(inv.tax||0).toLocaleString() + '</td><td class="right amt">VT ' + Number(inv.total).toLocaleString() + '</td></tr>').join('')}
            <tr class="summary-row"><td colspan="3">SUBTOTAL — Standard Rated</td><td class="right">VT ${Number(vatStandard.reduce((s,i)=>s+Number(i.subtotal||0),0)).toLocaleString()}</td><td class="right">VT ${Number(vatStandard.reduce((s,i)=>s+Number(i.tax||0),0)).toLocaleString()}</td><td class="right">VT ${Number(vatStandard.reduce((s,i)=>s+Number(i.total),0)).toLocaleString()}</td></tr>
          </tbody>
        </table>`}

        <h2>Zero-Rated Invoices (0% VAT)</h2>
        ${vatZeroRated.length === 0 ? '<p style="color:#888;font-size:12px;margin-bottom:20px">No zero-rated invoices for this period.</p>' : `
        <table>
          <thead><tr><th>Invoice #</th><th>Date</th><th>Client</th><th class="right">Amount</th><th class="right">VAT</th></tr></thead>
          <tbody>
            ${vatZeroRated.map(inv => '<tr><td><strong>' + inv.number + '</strong></td><td>' + fmtDate(inv.date) + '</td><td>' + inv.client_name + '</td><td class="right amt">VT ' + Number(inv.total).toLocaleString() + '</td><td class="right zero">Nil</td></tr>').join('')}
            <tr class="summary-row"><td colspan="3">SUBTOTAL — Zero Rated</td><td class="right">VT ${Number(vatZeroRated.reduce((s,i)=>s+Number(i.total),0)).toLocaleString()}</td><td class="right zero">Nil</td></tr>
          </tbody>
        </table>`}

        <h2>VAT Summary</h2>
        <table style="max-width:480px">
          <tbody>
            <tr><td>Total Sales (inc. VAT)</td><td class="right amt">VT ${Number(vatTotalInv).toLocaleString()}</td></tr>
            <tr><td>Taxable Sales (ex-VAT)</td><td class="right amt">VT ${Number(vatTotalSubtotal).toLocaleString()}</td></tr>
            <tr><td>Zero-Rated Sales</td><td class="right amt">VT ${Number(vatZeroRated.reduce((s,i)=>s+Number(i.total),0)).toLocaleString()}</td></tr>
            <tr style="background:#E8D5A3;font-weight:700"><td>VAT Output Tax (Box 1)</td><td class="right" style="color:#2E7D2E">VT ${Number(vatTotalTax).toLocaleString()}</td></tr>
            <tr style="background:#f9f9f9"><td>Total Purchases (inc. VAT)</td><td class="right amt">VT ${Number(vatPurchasesTotal).toLocaleString()}</td></tr>
            <tr style="background:#f9f9f9"><td>Purchases (ex-VAT)</td><td class="right amt">VT ${Number(vatPurchasesExVat).toLocaleString()}</td></tr>
            <tr style="background:#E8D5A3;font-weight:700"><td>VAT Input Tax (Box 2)</td><td class="right" style="color:#1A4D1A">VT ${Number(vatInputTax).toLocaleString()}</td></tr>
            <tr style="background:#FAEEDA;font-weight:700;font-size:14px"><td>NET VAT PAYABLE (Box 1 − Box 2)</td><td class="right" style="color:#D85A30">VT ${Number(vatNetPayable).toLocaleString()}</td></tr>
          </tbody>
        </table>

        ${vatPurchases.length > 0 ? `
        <h2>Purchases — Input VAT (${vatMonthLabel})</h2>
        <table>
          <thead><tr><th>Date</th><th>Supplier</th><th>Description</th><th>Category</th><th class="right">Ex-VAT</th><th class="right">Input VAT</th><th class="right">Total</th></tr></thead>
          <tbody>
            ${vatPurchases.map(p => '<tr><td>' + fmtDate(p.date) + '</td><td><strong>' + p.supplier + '</strong></td><td>' + (p.description||'—') + '</td><td>' + (p.category||'Other') + '</td><td class="right">VT ' + Number(p.amount_ex_vat||0).toLocaleString() + '</td><td class="right" style="color:#1A4D1A;font-weight:500">' + (Number(p.vat)>0 ? 'VT '+Number(p.vat).toLocaleString() : 'Nil') + '</td><td class="right">VT ' + Number(p.amount||0).toLocaleString() + '</td></tr>').join('')}
            <tr class="summary-row"><td colspan="4">SUBTOTAL</td><td class="right">VT ${Number(vatPurchasesExVat).toLocaleString()}</td><td class="right" style="color:#1A4D1A">VT ${Number(vatInputTax).toLocaleString()}</td><td class="right">VT ${Number(vatPurchasesTotal).toLocaleString()}</td></tr>
          </tbody>
        </table>` : '<p style="color:#888;font-size:12px;margin-bottom:20px">No purchases recorded for this period — add purchases in the Purchases section.</p>'}

        <p style="margin-top:16px;font-size:11px;color:#888">* Verify all figures before filing your VAT return with the Vanuatu Financial Services Commission. TIN: 445579.</p>
      </div>
      <div class="footer">
        <div class="footer-l">
          <div><strong style="color:#FFD700">Malakesa Transfer &amp; Tour</strong></div>
          <div>TIN: 445579 &nbsp;|&nbsp; Port Vila, Vanuatu</div>
          <div>VAT Period: ${vatMonthLabel}</div>
        </div>
        <div class="footer-r">
          <div>Output Tax: VT ${Number(vatTotalTax).toLocaleString()}</div>
          <div>Input Tax: VT ${Number(vatInputTax).toLocaleString()}</div>
          <div style="font-weight:700">Net Payable: VT ${Number(vatNetPayable).toLocaleString()}</div>
          <div style="font-size:10px;opacity:0.7">Computer generated — verify before filing</div>
        </div>
      </div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  // ── Suppliers tab logic ──
  const filterPurchaseDate = (list) => {
    if (supplierPeriod === 'all') return list
    if (supplierPeriod === 'specific') return list.filter(p => p.date && p.date.startsWith(supplierMonth))
    const now = new Date(); const start = new Date()
    if (supplierPeriod === 'month') start.setDate(1)
    if (supplierPeriod === 'quarter') start.setMonth(now.getMonth() - 2, 1)
    if (supplierPeriod === 'year') start.setMonth(0, 1)
    return list.filter(p => p.date && new Date(p.date + 'T00:00:00') >= start)
  }
  const fPurchases = filterPurchaseDate(purchases || [])

  const bySupplier = {}
  fPurchases.forEach(p => {
    const name = p.supplier || 'Unknown'
    if (!bySupplier[name]) bySupplier[name] = { name, category: p.category, count: 0, total: 0, exVat: 0, vat: 0 }
    bySupplier[name].count++
    bySupplier[name].total += Number(p.amount || 0)
    bySupplier[name].exVat += Number(p.amount_ex_vat || 0)
    bySupplier[name].vat += Number(p.vat || 0)
    if (!bySupplier[name].category && p.category) bySupplier[name].category = p.category
  })
  let supplierRows = Object.values(bySupplier)
  if (supplierSort === 'spend') supplierRows.sort((a, b) => b.total - a.total)
  if (supplierSort === 'count') supplierRows.sort((a, b) => b.count - a.count)
  if (supplierSort === 'name') supplierRows.sort((a, b) => a.name.localeCompare(b.name))

  const supplierTotalSpend = fPurchases.reduce((s, p) => s + Number(p.amount || 0), 0)
  const supplierTotalExVat = fPurchases.reduce((s, p) => s + Number(p.amount_ex_vat || 0), 0)
  const supplierTotalVat = fPurchases.reduce((s, p) => s + Number(p.vat || 0), 0)

  // Category breakdown
  const byCategory = {}
  fPurchases.forEach(p => {
    const cat = p.category || 'Other'
    byCategory[cat] = (byCategory[cat] || 0) + Number(p.amount || 0)
  })

  const supplierPeriodLabel = supplierPeriod === 'specific'
    ? (vatMonthOptions.find(m => m.value === supplierMonth)?.label || supplierMonth)
    : { all: 'All time', month: 'This month', quarter: 'This quarter', year: 'This year' }[supplierPeriod]

  const printSupplierReport = () => {
    const w = window.open('', '_blank')
    const title = 'Purchases by Supplier — ' + supplierPeriodLabel
    w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:Arial,sans-serif;margin:0;color:#222;font-size:13px;background:#f0ebe0}
      .page{max-width:800px;margin:20px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.15)}
      .header{background:linear-gradient(135deg,#1A0D06 0%,#3D2214 50%,#5C3D0A 100%);padding:24px 40px;display:flex;justify-content:space-between;align-items:flex-start}
      .logo-contact{font-size:10px;color:rgba(255,255,255,0.7);margin-top:8px;line-height:1.8}
      .report-title{text-align:right;color:#fff}
      .report-name{font-size:20px;font-weight:700;color:#FFD700}
      .report-sub{font-size:11px;color:rgba(255,255,255,0.75);margin-top:4px;line-height:1.7}
      .body{padding:28px 40px}
      .stats{display:flex;gap:20px;margin-bottom:24px;flex-wrap:wrap}
      .stat{background:#f5f5f5;border-radius:8px;padding:12px 18px;min-width:140px}
      .stat-label{font-size:11px;color:#666;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.4px}
      .stat-value{font-size:18px;font-weight:bold}
      h2{font-size:13px;font-weight:700;margin:20px 0 8px;color:#3D2214;border-bottom:2px solid #8B6914;padding-bottom:4px;text-transform:uppercase;letter-spacing:0.5px}
      table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:12px}
      th{background:#E8D5A3;padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#3D2214;text-transform:uppercase;letter-spacing:0.5px}
      td{padding:8px 10px;border-bottom:1px solid #f0ebe0}
      tr:nth-child(even) td{background:#faf6ee}
      .right{text-align:right}
      .green{color:#2E7D2E;font-weight:500}
      .summary-row{background:#E8D5A3!important;font-weight:700}
      .footer{background:linear-gradient(135deg,#1A0D06,#5C3D0A);padding:14px 40px;display:flex;justify-content:space-between;align-items:center}
      .footer-l{color:rgba(255,255,255,0.8);font-size:10px;line-height:1.9}
      .footer-r{text-align:right;color:#FFD700;font-size:10px;line-height:1.9}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      thead{display:table-header-group}
      .rpt-hdr{display:none}
      .summary-row{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .header{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .footer{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      @page{margin:18mm 14mm 22mm 14mm;size:A4}
      @media print{
        .noprint{display:none}
        body{background:#fff}
        .page{box-shadow:none;margin:0;border-radius:0}
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px}
        .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999}
        .page{padding-top:42px}
        .rpt-footer-bar{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #E8D5A3;padding:4px 40px;display:flex;justify-content:space-between;font-size:10px;color:#888;z-index:999}
      }
    </style></head><body>
    <div class="rpt-hdr">
      <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfer &amp; Tour &nbsp;—&nbsp; Purchases by Supplier &nbsp;—&nbsp; ${supplierPeriodLabel}</span>
      <span style="font-size:10px;color:#888">Generated ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span>
    </div>
    <div class="rpt-footer-bar">
      <span>Purchases by Supplier — ${supplierPeriodLabel} &nbsp;|&nbsp; Malakesa Transfer &amp; Tour</span>
      <span>Computer generated — confidential</span>
    </div>
    <div class="noprint"><span>Purchases by Supplier — ${supplierPeriodLabel}</span><button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button></div>
    <div class="page">
      <div class="header">
        <div>
          <img src="${MALAKESA_LOGO}" alt="Malakesa Transfer and Tour" style="width:200px;border-radius:6px;display:block" />
          <div class="logo-contact">
            📍 Port Vila, Shefa Province, Vanuatu<br>
            📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
          </div>
        </div>
        <div class="report-title">
          <div class="report-name">PURCHASES BY SUPPLIER</div>
          <div class="report-sub">
            Period: <strong>${supplierPeriodLabel}</strong><br>
            Generated: ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'})}
          </div>
        </div>
      </div>
      <div class="body">
        <div class="stats">
          <div class="stat"><div class="stat-label">Total Spend</div><div class="stat-value">VT ${Number(supplierTotalSpend).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Subtotal (ex-VAT)</div><div class="stat-value">VT ${Number(supplierTotalExVat).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Input VAT</div><div class="stat-value" style="color:#2E7D2E">VT ${Number(supplierTotalVat).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Suppliers</div><div class="stat-value">${supplierRows.length}</div></div>
        </div>

        <h2>Spend by Supplier</h2>
        <table>
          <thead><tr><th>Supplier</th><th>Category</th><th class="right">Purchases</th><th class="right">Ex-VAT</th><th class="right">VAT</th><th class="right">Total</th></tr></thead>
          <tbody>
            ${supplierRows.map(s => '<tr><td><strong>' + s.name + '</strong></td><td>' + (s.category||'Other') + '</td><td class="right">' + s.count + '</td><td class="right">VT ' + Number(s.exVat).toLocaleString() + '</td><td class="right green">VT ' + Number(s.vat).toLocaleString() + '</td><td class="right">VT ' + Number(s.total).toLocaleString() + '</td></tr>').join('')}
            <tr class="summary-row"><td colspan="2">TOTAL</td><td class="right">${fPurchases.length}</td><td class="right">VT ${Number(supplierTotalExVat).toLocaleString()}</td><td class="right">VT ${Number(supplierTotalVat).toLocaleString()}</td><td class="right">VT ${Number(supplierTotalSpend).toLocaleString()}</td></tr>
          </tbody>
        </table>

        <h2>Spend by Category</h2>
        <table>
          <thead><tr><th>Category</th><th class="right">Amount</th><th class="right">% of total</th></tr></thead>
          <tbody>
            ${Object.entries(byCategory).sort((a,b) => b[1]-a[1]).map(([cat, amt]) => '<tr><td>' + cat + '</td><td class="right">VT ' + Number(amt).toLocaleString() + '</td><td class="right">' + (supplierTotalSpend > 0 ? Math.round((amt/supplierTotalSpend)*100) : 0) + '%</td></tr>').join('')}
          </tbody>
        </table>
      </div>
      <div class="footer">
        <div class="footer-l">
          <div><strong style="color:#FFD700">Malakesa Transfer &amp; Tour</strong></div>
          <div>Port Vila, Vanuatu</div>
        </div>
        <div class="footer-r">
          <div>Total Spend: VT ${Number(supplierTotalSpend).toLocaleString()}</div>
          <div style="font-size:10px;opacity:0.7">This report is confidential</div>
        </div>
      </div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const printReport = () => {
    const w = window.open('', '_blank')
    const title = 'Revenue Report' + (filterClient ? ' — ' + filterClient : '') + ' — ' + periodLabel
    w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>
      body{font-family:Arial,sans-serif;color:#222;font-size:13px}
      h1{font-size:22px;font-weight:bold;color:#8B6914;margin-bottom:2px}
      .sub{color:#888;font-size:12px;margin-bottom:28px}
      .stats{display:flex;gap:20px;margin-bottom:28px;flex-wrap:wrap}
      .stat{background:#f5f5f5;border-radius:8px;padding:12px 18px;min-width:140px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .stat-label{font-size:11px;color:#666;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.4px}
      .stat-value{font-size:18px;font-weight:bold}
      h2{font-size:14px;font-weight:bold;margin:24px 0 8px;color:#333;border-bottom:1px solid #eee;padding-bottom:4px}
      table{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13px}
      thead{display:table-header-group}
      th{background:#f5f5f5;padding:8px 12px;text-align:left;font-size:11px;color:#666;text-transform:uppercase;letter-spacing:0.3px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      td{padding:9px 12px;border-bottom:1px solid #eee}
      .right{text-align:right}
      .green{color:#3B6D11;font-weight:500}
      .red{color:#A32D2D}
      .footer{margin-top:30px;padding-top:16px;border-top:1px solid #eee;font-size:11px;color:#999}
      .rpt-hdr{display:none}
      @page{margin:20mm 15mm 22mm 15mm;size:A4}
      @media print{
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px}
        .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999}
        body{padding-top:44px}
        .report-body{padding:0 0 40px}
        .rpt-footer-bar{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #E8D5A3;padding:4px 40px;display:flex;justify-content:space-between;font-size:10px;color:#888;z-index:999}
      }
    </style></head><body>
    <div class="rpt-hdr">
      <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfer &amp; Tour &nbsp;—&nbsp; Revenue Report &nbsp;—&nbsp; ${periodLabel}</span>
      <span style="font-size:10px;color:#888">Generated ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span>
    </div>
    <div class="rpt-footer-bar">
      <span>Revenue Report — ${periodLabel} &nbsp;|&nbsp; Malakesa Transfer &amp; Tour</span>
      <span>Computer generated — confidential</span>
    </div>
    <div class="report-body" style="padding:0 40px">
    <h1 style="margin-top:20px">Malakesa Transfer &amp; Tour</h1>
    <div class="sub">Revenue Report &nbsp;|&nbsp; ${periodLabel}${filterClient ? ' &nbsp;|&nbsp; Client: ' + filterClient : ''} &nbsp;|&nbsp; Generated ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'})}</div>
    <div class="stats">
      <div class="stat"><div class="stat-label">Total Invoiced</div><div class="stat-value">VT ${Number(totalInv).toLocaleString()}</div></div>
      <div class="stat"><div class="stat-label">Subtotal (ex-VAT)</div><div class="stat-value">VT ${Number(totalSubtotal).toLocaleString()}</div></div>
      <div class="stat"><div class="stat-label">VAT Collected</div><div class="stat-value">VT ${Number(totalVat).toLocaleString()}</div></div>
      <div class="stat"><div class="stat-label">Collected</div><div class="stat-value" style="color:#3B6D11">VT ${Number(totalCol).toLocaleString()}</div></div>
      <div class="stat"><div class="stat-label">Outstanding</div><div class="stat-value" style="color:#D85A30">VT ${Number(outstanding).toLocaleString()}</div></div>
    </div>
    <h2>Revenue by Client</h2>
    <table><thead><tr><th>Client</th><th>Invoices</th><th class="right">Total</th><th class="right">Collected</th><th class="right">Outstanding</th></tr></thead>
    <tbody>${clientRows.map(c => '<tr><td><strong>' + c.name + '</strong></td><td>' + c.count + '</td><td class="right">VT ' + Number(c.total).toLocaleString() + '</td><td class="right green">VT ' + Number(c.collected).toLocaleString() + '</td><td class="right ' + (c.outstanding > 0 ? 'red' : '') + '">VT ' + Number(c.outstanding).toLocaleString() + '</td></tr>').join('')}
    <tr style="font-weight:bold;background:#f9f9f9"><td>TOTAL</td><td>${fi.length}</td><td class="right">VT ${Number(totalInv).toLocaleString()}</td><td class="right green">VT ${Number(totalCol).toLocaleString()}</td><td class="right red">VT ${Number(outstanding).toLocaleString()}</td></tr>
    </tbody></table>
    <h2>Top Services</h2>
    <table><thead><tr><th>Service / Description</th><th class="right">Qty</th><th class="right">Revenue (ex-VAT)</th></tr></thead>
    <tbody>${serviceRows.map(s => '<tr><td>' + s.desc + '</td><td class="right">' + s.qty + '</td><td class="right green">VT ' + Number(s.revenue).toLocaleString() + '</td></tr>').join('')}</tbody></table>
    <h2>Payment Methods</h2>
    <table><thead><tr><th>Method</th><th class="right">Amount</th><th class="right">% of collected</th></tr></thead>
    <tbody>${Object.entries(byMethod).map(([m, a]) => '<tr><td>' + m + '</td><td class="right green">VT ' + Number(a).toLocaleString() + '</td><td class="right">' + (totalCol > 0 ? Math.round((a/totalCol)*100) : 0) + '%</td></tr>').join('')}</tbody></table>
    <div class="footer">Malakesa Transfer and Tour &nbsp;|&nbsp; Port Vila, Vanuatu &nbsp;|&nbsp; This report is confidential</div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const tabStyle = (active) => ({
    padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none',
    background: active ? '#8B6914' : 'transparent',
    color: active ? '#fff' : '#8B6914',
    outline: active ? 'none' : '1px solid #8B6914'
  })

  // Export helpers
  const downloadCSV = (filename, rows) => {
    const esc = v => { const s = String(v == null ? '' : v); return s.includes(',') || s.includes('"') || s.includes('\n') ? '"' + s.replace(/"/g, '""') + '"' : s }
    const csv = rows.map(r => r.map(esc).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  const exportRevenueExcel = () => {
    const rows = [
      ['Malakesa Transfer and Tour - Revenue Report'],
      ['Period:', periodLabel],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      ['SUMMARY'],
      ['Total Invoiced', totalInv],
      ['Total Collected', totalCol],
      ['Outstanding', outstanding],
      ['VAT Output', totalVat],
      [],
      ['REVENUE BY CLIENT'],
      ['Client', 'Invoices', 'Total (VT)', 'Collected (VT)', 'Outstanding (VT)'],
      ...clientRows.map(r => [r.name, r.count, r.total, r.collected, r.outstanding]),
      [],
      ['REVENUE BY SERVICE'],
      ['Service / Description', 'Qty', 'Revenue (VT)'],
      ...serviceRows.map(r => [r.desc, r.qty, r.revenue]),
      [],
      ['ALL INVOICES'],
      ['Invoice #', 'Date', 'Client', 'Subtotal (VT)', 'VAT (VT)', 'Total (VT)', 'Balance (VT)', 'Status'],
      ...fi.map(i => [i.number, i.date, i.client_name, i.subtotal || 0, i.tax || 0, i.total, getBalance(i, payments), getStatus(i, payments)]),
    ]
    downloadCSV('Malakesa_Revenue_' + periodLabel.replace(/\s/g, '_') + '.csv', rows)
  }

  const exportVatExcel = () => {
    const rows = [
      ['Malakesa Transfer and Tour - VAT Return'],
      ['Period:', vatMonthLabel],
      ['TIN:', '445579'],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      ['OUTPUT TAX (Sales)'],
      ['Invoice #', 'Date', 'Client', 'Subtotal (VT)', 'VAT 15% (VT)', 'Total (VT)', 'Rate'],
      ...vatInvoices.map(i => [i.number, i.date, i.client_name, i.subtotal || 0, i.tax || 0, i.total, Number(i.tax) > 0 ? '15%' : 'Zero-rated']),
      [],
      ['OUTPUT TAX SUMMARY'],
      ['Standard rated sales', vatTotalSubtotal],
      ['Output VAT (15%)', vatTotalTax],
      ['Zero-rated sales', vatZeroRated.reduce((s, i) => s + Number(i.total), 0)],
      [],
      ['INPUT TAX (Purchases)'],
      ['Date', 'Supplier', 'Description', 'Ex-VAT (VT)', 'Input VAT (VT)', 'Total (VT)'],
      ...vatPurchases.map(p => [p.date, p.supplier, p.description || '', p.amount_ex_vat || 0, p.vat || 0, p.amount]),
      [],
      ['INPUT TAX SUMMARY'],
      ['Total purchases', vatPurchasesTotal],
      ['Input VAT (claimable)', vatInputTax],
      [],
      ['NET VAT PAYABLE'],
      ['Output VAT', vatTotalTax],
      ['Less: Input VAT', vatInputTax],
      ['Net VAT payable', Math.max(0, vatTotalTax - vatInputTax)],
    ]
    downloadCSV('Malakesa_VAT_' + vatMonthLabel.replace(/\s/g, '_') + '.csv', rows)
  }

  const exportSupplierExcel = () => {
    const rows = [
      ['Malakesa Transfer and Tour - Purchases by Supplier'],
      ['Period:', supplierPeriodLabel],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      ['SUPPLIER SUMMARY'],
      ['Supplier', 'Purchases', 'Ex-VAT (VT)', 'Input VAT (VT)', 'Total Spend (VT)'],
      ...supplierRows.map(r => [r.name, r.count, r.exvat, r.vat, r.total]),
      [],
      ['ALL PURCHASES'],
      ['Date', 'Supplier', 'Description', 'Category', 'Ex-VAT (VT)', 'VAT (VT)', 'Total (VT)', 'Ref'],
      ...fPurchases.map(p => [p.date, p.supplier, p.description || '', p.category || 'Other', p.amount_ex_vat || 0, p.vat || 0, p.amount, p.ref || '']),
    ]
    downloadCSV('Malakesa_Purchases_' + supplierPeriodLabel.replace(/\s/g, '_') + '.csv', rows)
  }


  return (
    <>
      <Topbar title="Reports">
        <div style={{ display: 'flex', gap: 6, background: '#f5f0e8', borderRadius: 10, padding: 4 }}>
          <button style={tabStyle(tab === 'revenue')} onClick={() => setTab('revenue')}><i className="ti ti-chart-bar" style={{ marginRight: 5 }}></i>Revenue</button>
          <button style={tabStyle(tab === 'suppliers')} onClick={() => setTab('suppliers')}><i className="ti ti-truck" style={{ marginRight: 5 }}></i>By Supplier</button>
          <button style={tabStyle(tab === 'cashflow')} onClick={() => setTab('cashflow')}><i className="ti ti-arrows-exchange" style={{ marginRight: 5 }}></i>Cash Flow</button>
        </div>
      </Topbar>
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ background: '#fff', border: '0.5px solid rgba(139,105,20,0.2)', borderRadius: 12, padding: '10px 16px', marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {tab === 'revenue' && <>
            <select value={filterClient} onChange={e => setFilterClient(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
              <option value="">All clients</option>
              {allClients.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={period} onChange={e => setPeriod(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
              <option value="all">All time</option>
              <option value="month">This month</option>
              <option value="quarter">This quarter</option>
              <option value="year">This year</option>
              <option value="specific">Specific month...</option>
            </select>
            {period === 'specific' && (
              <MonthYearPicker value={revenueMonth} onChange={setRevenueMonth} accentColor="#8B6914" />
            )}
            <button className="btn btn-sm" style={{ marginLeft: 'auto', background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={() => setShowExport('revenue')}><i className="ti ti-download"></i> Export</button>
          </>}
          {tab === 'suppliers' && <>
            <select value={supplierPeriod} onChange={e => setSupplierPeriod(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
              <option value="all">All time</option>
              <option value="month">This month</option>
              <option value="quarter">This quarter</option>
              <option value="year">This year</option>
              <option value="specific">Specific month...</option>
            </select>
            {supplierPeriod === 'specific' && (
              <MonthYearPicker value={supplierMonth} onChange={setSupplierMonth} accentColor="#8B6914" />
            )}
            <select value={supplierSort} onChange={e => setSupplierSort(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>
              <option value="spend">Sort: Highest spend</option>
              <option value="count">Sort: Most purchases</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
            <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500, marginLeft: 'auto' }} onClick={() => setShowExport('suppliers')}><i className="ti ti-download"></i> Export</button>
          </>}
        </div>
      </div>

      <div style={{ padding: '0 20px 20px' }}>

        {/* ── Revenue Tab ── */}
        {tab === 'revenue' && <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
            <StatCard label="Total invoiced" value={fmt(totalInv)} />
            <StatCard label="Collected" value={fmt(totalCol)} color="#3B6D11" />
            <StatCard label="Outstanding" value={fmt(outstanding)} color="#D85A30" />
            <StatCard label="VAT collected" value={fmt(totalVat)} color="#8B6914" />
          </div>
          <Card>
            <div style={{ fontWeight: 500, marginBottom: 14 }}>Monthly trend</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#666', marginBottom: 10 }}>
                  <span style={{ width: 12, height: 12, background: '#8B6914', borderRadius: 2, display: 'inline-block' }}></span>Invoiced by month
                </div>
                <PieChart data={monthData.map(m => ({ label: m.label, value: m.invoiced }))} size={140} colors={['#8B6914','#A8841A','#C9A24A','#5C3D0A','#3B6D11','#2E7D2E']} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#666', marginBottom: 10 }}>
                  <span style={{ width: 12, height: 12, background: '#3B6D11', borderRadius: 2, display: 'inline-block' }}></span>Collected by month
                </div>
                <PieChart data={monthData.map(m => ({ label: m.label, value: m.collected }))} size={140} colors={['#3B6D11','#5A9425','#2E7D2E','#1A4D1A','#8B6914','#C9A24A']} />
              </div>
            </div>
          </Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Card>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>Revenue by client</div>
              {clientRows.length === 0 ? <div style={{ color: '#666', fontSize: 13 }}>No data yet</div> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr><Th>Client</Th><Th style={{ textAlign: 'right' }}>Total</Th><Th style={{ textAlign: 'right' }}>Collected</Th><Th style={{ textAlign: 'right' }}>Outstanding</Th></tr></thead>
                  <tbody>{clientRows.map(c => (
                    <tr key={c.name} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td>{c.name}<div style={{ fontSize: 11, color: '#999' }}>{c.count} invoice{c.count > 1 ? 's' : ''}</div></Td>
                      <Td style={{ textAlign: 'right' }}>{fmt(c.total)}</Td>
                      <Td style={{ textAlign: 'right', color: '#3B6D11' }}>{fmt(c.collected)}</Td>
                      <Td style={{ textAlign: 'right', color: c.outstanding > 0 ? '#D85A30' : '#3B6D11' }}>{fmt(c.outstanding)}</Td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </Card>
            <Card>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>Top services</div>
              {serviceRows.length === 0 ? <div style={{ color: '#666', fontSize: 13 }}>No data yet</div> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr><Th>Service</Th><Th style={{ textAlign: 'right' }}>Qty</Th><Th style={{ textAlign: 'right' }}>Revenue</Th></tr></thead>
                  <tbody>{serviceRows.map(s => (
                    <tr key={s.desc} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td>{s.desc}</Td>
                      <Td style={{ textAlign: 'right' }}>{s.qty}</Td>
                      <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(s.revenue)}</Td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </Card>
          </div>
          <Card style={{ marginTop: 0 }}>
            <div style={{ fontWeight: 500, marginBottom: 12 }}>Payment methods breakdown</div>
            {Object.keys(byMethod).length === 0 ? <div style={{ color: '#666', fontSize: 13 }}>No payments yet</div> : (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {Object.entries(byMethod).map(([m, a]) => (
                  <div key={m} style={{ background: '#E8D5A3', borderRadius: 8, padding: '14px 18px', minWidth: 150 }}>
                    <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{m}</div>
                    <div style={{ fontSize: 18, fontWeight: 500, color: '#3B6D11' }}>{fmt(a)}</div>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{totalCol > 0 ? Math.round((a / totalCol) * 100) : 0}% of collected</div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>}

      {/* ── By Supplier Tab ── */}
        {tab === 'suppliers' && <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
            <StatCard label="Total spend" value={fmt(supplierTotalSpend)} color="#A32D2D" sub={`${fPurchases.length} purchases`} />
            <StatCard label="Subtotal (ex-VAT)" value={fmt(supplierTotalExVat)} />
            <StatCard label="Input VAT" value={fmt(supplierTotalVat)} color="#2E7D2E" />
            <StatCard label="Suppliers used" value={supplierRows.length} />
          </div>

          {supplierRows.length === 0 ? (
            <Card><div style={{ textAlign: 'center', padding: '32px 20px', color: '#666' }}><i className="ti ti-truck-off" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i><p>No purchases recorded for {supplierPeriodLabel.toLowerCase()}</p></div></Card>
          ) : <>
            <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontWeight: 500, fontSize: 13 }}>
                Spend by Supplier — {supplierPeriodLabel}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr style={{ background: '#E8D5A3' }}>
                  <Th>Supplier</Th><Th>Category</Th>
                  <Th style={{ textAlign: 'center' }}>Purchases</Th>
                  <Th style={{ textAlign: 'right' }}>Ex-VAT</Th>
                  <Th style={{ textAlign: 'right' }}>VAT</Th>
                  <Th style={{ textAlign: 'right' }}>Total</Th>
                  <Th style={{ textAlign: 'right' }}>% of spend</Th>
                </tr></thead>
                <tbody>
                  {supplierRows.map(s => (
                    <tr key={s.name} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td><strong>{s.name}</strong></Td>
                      <Td><span style={{ background: '#E8D5A3', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{s.category || 'Other'}</span></Td>
                      <Td style={{ textAlign: 'center' }}>{s.count}</Td>
                      <Td style={{ textAlign: 'right' }}>{fmt(s.exVat)}</Td>
                      <Td style={{ textAlign: 'right', color: s.vat > 0 ? '#2E7D2E' : '#999', fontWeight: s.vat > 0 ? 500 : 400 }}>
                        {s.vat > 0 ? fmt(s.vat) : <span style={{ fontStyle: 'italic', fontSize: 11 }}>Nil</span>}
                      </Td>
                      <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(s.total)}</Td>
                      <Td style={{ textAlign: 'right', color: '#666' }}>{supplierTotalSpend > 0 ? Math.round((s.total / supplierTotalSpend) * 100) : 0}%</Td>
                    </tr>
                  ))}
                  <tr style={{ background: '#E8D5A3', fontWeight: 700 }}>
                    <td colSpan={2} style={{ padding: '9px 14px', fontSize: 13 }}>TOTAL</td>
                    <td style={{ padding: '9px 14px', textAlign: 'center', fontSize: 13 }}>{fPurchases.length}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(supplierTotalExVat)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#2E7D2E' }}>{fmt(supplierTotalVat)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(supplierTotalSpend)}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>100%</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card>
              <div style={{ fontWeight: 500, marginBottom: 14 }}>Spend by Category</div>
              <PieChart
                data={Object.entries(byCategory).sort((a,b) => b[1]-a[1]).map(([cat, amt]) => ({ label: cat, value: amt }))}
                size={170}
                colors={['#A32D2D','#8B6914','#D85A30','#5C3D0A','#633806','#C9744A','#3B6D11','#1A4D1A']}
              />
            </Card>
          </>}
        </>}

        {tab === 'cashflow' && (() => {
          // Build last 12 months list
          const now = new Date()
          const months = Array.from({ length: 12 }, (_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
            return {
              key: d.toISOString().slice(0, 7),
              label: d.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })
            }
          })

          // Money IN: payments received per month
          const moneyIn = months.map(m => ({
            ...m,
            value: payments.filter(p => (p.date || '').startsWith(m.key)).reduce((s, p) => s + Number(p.amount || 0), 0)
          }))

          // Money OUT: purchases + salaries net paid per month
          const moneyOut = months.map(m => {
            const purTotal = (purchases || []).filter(p => (p.date || '').startsWith(m.key)).reduce((s, p) => s + Number(p.amount || 0), 0)
            const salTotal = (salaryRecords || []).filter(r => r.month === m.key).reduce((s, r) => s + Number(r.net_pay || 0), 0)
            return { ...m, purchases: purTotal, salaries: salTotal, value: purTotal + salTotal }
          })

          // Net cash flow per month
          const cashFlow = months.map((m, i) => ({
            ...m,
            in: moneyIn[i].value,
            out: moneyOut[i].value,
            purchases: moneyOut[i].purchases,
            salaries: moneyOut[i].salaries,
            net: moneyIn[i].value - moneyOut[i].value
          }))

          const totalIn = cashFlow.reduce((s, m) => s + m.in, 0)
          const totalOut = cashFlow.reduce((s, m) => s + m.out, 0)
          const totalNet = totalIn - totalOut
          const totalPurchases = cashFlow.reduce((s, m) => s + m.purchases, 0)
          const totalSalaries = cashFlow.reduce((s, m) => s + m.salaries, 0)
          const maxVal = Math.max(...cashFlow.map(m => Math.max(m.in, m.out)), 1)

          const printCashFlow = () => {
            const w = window.open('', '_blank')
            if (!w) return
            const dateStr = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })
            const rows = cashFlow.map(m => `
              <tr style='border-bottom:0.5px solid #eee'>
                <td style='padding:8px 12px;font-weight:500'>${m.label}</td>
                <td style='padding:8px 12px;text-align:right;color:#3B6D11'>VT ${Number(m.in).toLocaleString()}</td>
                <td style='padding:8px 12px;text-align:right;color:#666'>VT ${Number(m.purchases).toLocaleString()}</td>
                <td style='padding:8px 12px;text-align:right;color:#666'>VT ${Number(m.salaries).toLocaleString()}</td>
                <td style='padding:8px 12px;text-align:right;color:#A32D2D'>VT ${Number(m.out).toLocaleString()}</td>
                <td style='padding:8px 12px;text-align:right;font-weight:700;color:${m.net >= 0 ? '#3B6D11' : '#A32D2D'}'>VT ${Number(m.net).toLocaleString()}</td>
              </tr>`).join('')
            w.document.write(`<!DOCTYPE html><html><head><title>Cash Flow Report</title><style>
              body{font-family:Arial,sans-serif;color:#222;font-size:13px}
              h1{color:#8B6914;font-size:20px;margin:0 0 4px} .sub{color:#888;font-size:12px;margin-bottom:20px}
              table{width:100%;border-collapse:collapse} thead{display:table-header-group}
              th{background:#E8D5A3;padding:9px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.4px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
              .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
              .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
              .rpt-hdr{display:none} @page{margin:18mm 14mm 20mm 14mm;size:A4}
              @media print{.noprint{display:none}.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999} body{padding-top:42px 0 0 40px}}
            </style></head><body>
            <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfer &amp; Tour — Cash Flow Report — Last 12 Months</span><span style='font-size:10px;color:#888'>${dateStr}</span></div>
            <div class='noprint'><span>Cash Flow Report — Last 12 Months</span><button class='printbtn' onclick='window.print()'>🖨️ Print / Save PDF</button></div>
            <div style='padding:20px 40px'>
              <h1>Malakesa Transfer &amp; Tour</h1>
              <div class='sub'>Cash Flow Report — Last 12 Months &nbsp;|&nbsp; Generated ${dateStr}</div>
              <div style='display:flex;gap:24px;margin-bottom:20px;flex-wrap:wrap'>
                <div style='background:#EAF3DE;padding:12px 18px;border-radius:6px'><div style='font-size:11px;color:#555;margin-bottom:4px'>Total Money In</div><div style='font-size:18px;font-weight:700;color:#3B6D11'>VT ${Number(totalIn).toLocaleString()}</div></div>
                <div style='background:#FCEBEB;padding:12px 18px;border-radius:6px'><div style='font-size:11px;color:#555;margin-bottom:4px'>Total Money Out</div><div style='font-size:18px;font-weight:700;color:#A32D2D'>VT ${Number(totalOut).toLocaleString()}</div></div>
                <div style='background:${totalNet>=0?'#EAF3DE':'#FCEBEB'};padding:12px 18px;border-radius:6px'><div style='font-size:11px;color:#555;margin-bottom:4px'>Net Cash Flow</div><div style='font-size:18px;font-weight:700;color:${totalNet>=0?'#3B6D11':'#A32D2D'}'>VT ${Number(totalNet).toLocaleString()}</div></div>
              </div>
              <table><thead><tr>
                <th>Month</th><th style='text-align:right'>Money In (Receipts)</th><th style='text-align:right'>Purchases</th><th style='text-align:right'>Salaries</th><th style='text-align:right'>Total Out</th><th style='text-align:right'>Net Cash Flow</th>
              </tr></thead><tbody>${rows}
              <tr style='background:#E8D5A3;font-weight:700'>
                <td style='padding:9px 12px'>TOTAL (12 months)</td>
                <td style='padding:9px 12px;text-align:right;color:#3B6D11'>VT ${Number(totalIn).toLocaleString()}</td>
                <td style='padding:9px 12px;text-align:right'>VT ${Number(totalPurchases).toLocaleString()}</td>
                <td style='padding:9px 12px;text-align:right'>VT ${Number(totalSalaries).toLocaleString()}</td>
                <td style='padding:9px 12px;text-align:right;color:#A32D2D'>VT ${Number(totalOut).toLocaleString()}</td>
                <td style='padding:9px 12px;text-align:right;color:${totalNet>=0?'#3B6D11':'#A32D2D'}'>VT ${Number(totalNet).toLocaleString()}</td>
              </tr></tbody></table></div>
              <script>window.onload=()=>window.print()<\/script></body></html>`)
            w.document.close()
          }

          const exportCashFlow = () => {
            const rows = [
              ['Malakesa Transfer and Tour - Cash Flow Report'],
              ['Period: Last 12 months'],
              ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
              [],
              ['Month', 'Money In (VT)', 'Purchases (VT)', 'Salaries (VT)', 'Total Out (VT)', 'Net Cash Flow (VT)'],
              ...cashFlow.map(m => [m.label, m.in, m.purchases, m.salaries, m.out, m.net]),
              [],
              ['TOTAL', totalIn, totalPurchases, totalSalaries, totalOut, totalNet]
            ]
            downloadCSV('Malakesa_CashFlow_12months.csv', rows)
          }

          return (
            <div>
              {/* Summary cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
                <StatCard label="Total money in" value={fmt(totalIn)} color="#3B6D11" sub="Payments received" />
                <StatCard label="Total purchases" value={fmt(totalPurchases)} color="#A32D2D" sub="12 months" />
                <StatCard label="Total salaries" value={fmt(totalSalaries)} color="#A32D2D" sub="Net pay" />
                <StatCard label="Net cash flow" value={fmt(totalNet)} color={totalNet >= 0 ? '#3B6D11' : '#A32D2D'} sub={totalNet >= 0 ? 'Cash positive' : 'Cash negative'} />
              </div>

              {/* Visual bar chart */}
              <Card style={{ padding: '20px 20px 16px', marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 16 }}>Monthly cash flow — last 12 months</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 160, borderBottom: '1px solid #E8D5A3', paddingBottom: 8 }}>
                  {cashFlow.map(m => {
                    const inH = Math.round((m.in / maxVal) * 140)
                    const outH = Math.round((m.out / maxVal) * 140)
                    const net = m.net
                    return (
                      <div key={m.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <div style={{ width: '100%', display: 'flex', gap: 2, alignItems: 'flex-end', height: 140 }}>
                          <div style={{ flex: 1, background: '#3B6D11', borderRadius: '3px 3px 0 0', height: inH + 'px', minHeight: m.in > 0 ? 3 : 0, title: 'In: ' + fmt(m.in) }} title={`In: ${fmt(m.in)}`}></div>
                          <div style={{ flex: 1, background: '#A32D2D', borderRadius: '3px 3px 0 0', height: outH + 'px', minHeight: m.out > 0 ? 3 : 0 }} title={`Out: ${fmt(m.out)}`}></div>
                        </div>
                        <div style={{ fontSize: 9, color: '#888', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>{m.label.split(' ')[0]}</div>
                        <div style={{ fontSize: 9, fontWeight: 600, color: net >= 0 ? '#3B6D11' : '#A32D2D' }}>{net >= 0 ? '+' : ''}{Math.round(net/1000)}k</div>
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: '#666' }}>
                  <span><span style={{ display: 'inline-block', width: 12, height: 12, background: '#3B6D11', borderRadius: 2, marginRight: 5, verticalAlign: 'middle' }}></span>Money in (payments received)</span>
                  <span><span style={{ display: 'inline-block', width: 12, height: 12, background: '#A32D2D', borderRadius: 2, marginRight: 5, verticalAlign: 'middle' }}></span>Money out (purchases + salaries)</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: '#aaa' }}>numbers show net VT (thousands)</span>
                </div>
              </Card>

              {/* Detailed monthly table */}
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Month by month breakdown</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-sm" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 500 }} onClick={printCashFlow}><i className="ti ti-printer"></i> PDF</button>
                    <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={exportCashFlow}><i className="ti ti-download"></i> Export</button>
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: '#E8D5A3' }}>
                    <Th>Month</Th>
                    <Th style={{ textAlign: 'right', color: '#3B6D11' }}>Money In</Th>
                    <Th style={{ textAlign: 'right' }}>Purchases</Th>
                    <Th style={{ textAlign: 'right' }}>Salaries</Th>
                    <Th style={{ textAlign: 'right', color: '#A32D2D' }}>Total Out</Th>
                    <Th style={{ textAlign: 'right' }}>Net Cash Flow</Th>
                  </tr></thead>
                  <tbody>
                    {cashFlow.map(m => (
                      <tr key={m.key} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)', background: m.net < 0 ? '#FFF8F8' : '#fff' }}>
                        <Td style={{ fontWeight: 500 }}>{m.label}</Td>
                        <Td style={{ textAlign: 'right', color: '#3B6D11', fontWeight: m.in > 0 ? 500 : 400 }}>{m.in > 0 ? fmt(m.in) : <span style={{ color: '#ccc' }}>—</span>}</Td>
                        <Td style={{ textAlign: 'right', color: '#666' }}>{m.purchases > 0 ? fmt(m.purchases) : <span style={{ color: '#ccc' }}>—</span>}</Td>
                        <Td style={{ textAlign: 'right', color: '#666' }}>{m.salaries > 0 ? fmt(m.salaries) : <span style={{ color: '#ccc' }}>—</span>}</Td>
                        <Td style={{ textAlign: 'right', color: '#A32D2D', fontWeight: m.out > 0 ? 500 : 400 }}>{m.out > 0 ? fmt(m.out) : <span style={{ color: '#ccc' }}>—</span>}</Td>
                        <Td style={{ textAlign: 'right' }}>
                          <span style={{ fontWeight: 700, color: m.net >= 0 ? '#3B6D11' : '#A32D2D', background: m.net >= 0 ? '#EAF3DE' : '#FCEBEB', padding: '2px 8px', borderRadius: 99, fontSize: 12 }}>
                            {m.net >= 0 ? '+' : ''}{fmt(m.net)}
                          </span>
                        </Td>
                      </tr>
                    ))}
                    <tr style={{ background: '#E8D5A3', fontWeight: 700 }}>
                      <td style={{ padding: '9px 14px', fontSize: 13 }}>TOTAL (12 months)</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#3B6D11' }}>{fmt(totalIn)}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(totalPurchases)}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(totalSalaries)}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#A32D2D' }}>{fmt(totalOut)}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>
                        <span style={{ fontWeight: 700, color: totalNet >= 0 ? '#3B6D11' : '#A32D2D', background: totalNet >= 0 ? '#EAF3DE' : '#FCEBEB', padding: '2px 8px', borderRadius: 99, fontSize: 12 }}>
                          {totalNet >= 0 ? '+' : ''}{fmt(totalNet)}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )
        })()}

      </div>

      {/* Reports Export Modal */}
      {showExport && (() => {
        const revenueColumns = [
          { key: 'number', label: 'Invoice #' }, { key: 'date', label: 'Issue Date' },
          { key: 'client_name', label: 'Client' }, { key: 'subtotal', label: 'Subtotal (VT)' },
          { key: 'tax', label: 'VAT (VT)' }, { key: 'total', label: 'Total (VT)' },
          { key: 'balance', label: 'Balance (VT)' }, { key: 'status', label: 'Status' },
        ]
        const vatColumns = [
          { key: 'number', label: 'Invoice #' }, { key: 'date', label: 'Date' },
          { key: 'client_name', label: 'Client' }, { key: 'subtotal', label: 'Subtotal (VT)' },
          { key: 'tax', label: 'VAT 15% (VT)' }, { key: 'total', label: 'Total (VT)' },
          { key: 'rate', label: 'VAT Rate' },
        ]
        const supplierColumns = [
          { key: 'date', label: 'Date' }, { key: 'supplier', label: 'Supplier' },
          { key: 'description', label: 'Description' }, { key: 'category', label: 'Category' },
          { key: 'amount_ex_vat', label: 'Ex-VAT (VT)' }, { key: 'vat', label: 'Input VAT (VT)' },
          { key: 'amount', label: 'Total (VT)' }, { key: 'ref', label: 'Reference' },
        ]
        const configs = {
          revenue: {
            title: `Revenue Report — ${periodLabel}`, columns: revenueColumns,
            onExport: (fmt, sel) => {
              if (fmt === 'pdf') { printReport(); return }
              const cols = revenueColumns.filter(c => sel.has(c.key))
              const dlRows = [
                ['Malakesa Transfer and Tour - Revenue Report'],
                ['Period:', periodLabel, 'Total Invoiced:', totalInv, 'Collected:', totalCol, 'Outstanding:', outstanding],
                [], cols.map(c => c.label),
                ...fi.map(inv => cols.map(c => {
                  if (c.key === 'balance') return getBalance(inv, payments)
                  if (c.key === 'status') return getStatus(inv, payments)
                  return inv[c.key] ?? ''
                }))
              ]
              downloadCSV('Malakesa_Revenue_' + periodLabel.replace(/\s/g,'_') + '.csv', dlRows)
            }
          },
          vat: {
            title: `VAT Return — ${vatMonthLabel}`, columns: vatColumns,
            onExport: (fmt, sel) => {
              if (fmt === 'pdf') { printVatReturn(); return }
              const cols = vatColumns.filter(c => sel.has(c.key))
              const dlRows = [
                ['Malakesa Transfer and Tour - VAT Return'],
                ['Period:', vatMonthLabel, 'TIN:', '445579', 'Net VAT Payable:', Math.max(0, vatTotalTax - vatInputTax)],
                [], ['OUTPUT TAX - INVOICES'], cols.map(c => c.label),
                ...vatInvoices.map(inv => cols.map(c => {
                  if (c.key === 'rate') return Number(inv.tax) > 0 ? '15%' : 'Zero-rated'
                  return inv[c.key] ?? ''
                })),
                [], ['INPUT TAX - PURCHASES'],
                ['Date','Supplier','Description','Ex-VAT','Input VAT','Total'],
                ...vatPurchases.map(p => [p.date,p.supplier,p.description||'',p.amount_ex_vat||0,p.vat||0,p.amount])
              ]
              downloadCSV('Malakesa_VAT_' + vatMonthLabel.replace(/\s/g,'_') + '.csv', dlRows)
            }
          },
          suppliers: {
            title: `Purchases by Supplier — ${supplierPeriodLabel}`, columns: supplierColumns,
            onExport: (fmt, sel) => {
              if (fmt === 'pdf') { printSupplierReport(); return }
              const cols = supplierColumns.filter(c => sel.has(c.key))
              const dlRows = [
                ['Malakesa Transfer and Tour - Purchases by Supplier'],
                ['Period:', supplierPeriodLabel, 'Suppliers:', supplierRows.length, 'Total spend:', supplierRows.reduce((s,r)=>s+r.total,0)],
                [], ['SUPPLIER SUMMARY'],
                ['Supplier','Purchases','Ex-VAT (VT)','Input VAT (VT)','Total (VT)'],
                ...supplierRows.map(r => [r.name,r.count,r.exvat,r.vat,r.total]),
                [], ['ALL PURCHASES'], cols.map(c => c.label),
                ...fPurchases.map(p => cols.map(c => p[c.key] ?? ''))
              ]
              downloadCSV('Malakesa_Purchases_' + supplierPeriodLabel.replace(/\s/g,'_') + '.csv', dlRows)
            }
          },
        }
        const cfg = configs[showExport]
        if (!cfg) return null
        return <ExportModal title={cfg.title} columns={cfg.columns} onExport={cfg.onExport} onClose={() => setShowExport(false)} />
      })()}
    </>
  )
}

// ── Purchases ─────────────────────────────────────────────
const PURCHASE_CATEGORIES = ['Fuel', 'Vehicle Maintenance', 'Insurance', 'Office Supplies', 'Utilities', 'Staff Costs', 'Marketing', 'Equipment', 'Accommodation', 'Food & Beverages', 'Professional Services', 'Bank Charges', 'Other']


// ── VAT Return Page (standalone) ──
function VatPage({ invoices, payments, purchases }) {
  const nowD = new Date()
  const defaultVatMonth = nowD.toISOString().slice(0, 7)
  const [vatMonth, setVatMonth] = useState(defaultVatMonth)
  const [showExport, setShowExport] = useState(false)

  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const vatParts = vatMonth.split('-')
  const vatMonthLabel = (MONTHS_LONG[parseInt(vatParts[1])-1] || '') + ' ' + vatParts[0]

  const vatInvoices = invoices.filter(i => i.date?.startsWith(vatMonth))
  const vatStandard = vatInvoices.filter(i => Number(i.tax) > 0)
  const vatZeroRated = vatInvoices.filter(i => !Number(i.tax))
  const vatTotalTax = vatStandard.reduce((s,i) => s + Number(i.tax||0), 0)
  const vatTotalSubtotal = vatStandard.reduce((s,i) => s + Number(i.subtotal||0), 0)
  const vatTotalInv = vatInvoices.reduce((s,i) => s + Number(i.total), 0)
  const vatPurchases = (purchases || []).filter(p => p.date?.startsWith(vatMonth) && (Number(p.vat) > 0 || p.vat_treatment === 'vat_inclusive' || p.vat_treatment === 'vat_exclusive'))
  const vatPurchasesTotal = vatPurchases.reduce((s,p) => s + Number(p.amount||0), 0)
  const vatPurchasesExVat = vatPurchases.reduce((s,p) => s + Number(p.amount_ex_vat||0), 0)
  const vatInputTax = vatPurchases.reduce((s,p) => s + Number(p.vat||0), 0)
  const vatNetPayable = Math.max(0, vatTotalTax - vatInputTax)

  const printVatReturn = () => {
    const w = window.open('', '_blank')
    if (!w) return
    const stdRows = vatStandard.map(i => `<tr><td><strong>${i.number}</strong></td><td>${fmtDate(i.date)}</td><td>${i.client_name}</td><td style='text-align:right'>${fmt(i.subtotal||0)}</td><td style='text-align:right;color:#2E7D2E'>${fmt(i.tax||0)}</td><td style='text-align:right'>${fmt(i.total)}</td></tr>`).join('')
    const purRows = vatPurchases.map(p => `<tr><td>${fmtDate(p.date)}</td><td>${p.supplier||''}</td><td>${p.description||''}</td><td style='text-align:right'>${fmt(p.amount_ex_vat||0)}</td><td style='text-align:right;color:#1A4D1A'>${fmt(p.vat||0)}</td><td style='text-align:right'>${fmt(p.amount)}</td></tr>`).join('')
    w.document.write(`<!DOCTYPE html><html><head><title>VAT Return — ${vatMonthLabel}</title>
    <style>
      body{font-family:Arial,sans-serif;color:#222;font-size:13px}
      .page{max-width:800px;margin:20px auto;background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.15)}
      .header{background:linear-gradient(135deg,#1A0D06,#3D2214,#5C3D0A);padding:20px 32px;display:flex;justify-content:space-between;align-items:flex-start}
      .body{padding:24px 32px}
      h2{font-size:14px;font-weight:700;color:#8B6914;border-bottom:2px solid #E8D5A3;padding-bottom:4px;margin:20px 0 10px}
      table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:16px}
      thead{display:table-header-group}
      th{background:#E8D5A3;padding:7px 10px;text-align:left;font-size:11px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      td{padding:7px 10px;border-bottom:.5px solid #eee}
      .summary{background:#f9f6f0;border-radius:8px;padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
      .sum-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:.5px solid #eee;font-size:13px}
      .net{display:flex;justify-content:space-between;padding:10px 0;font-size:16px;font-weight:700;color:#D85A30;border-top:2px solid #D85A30;margin-top:4px}
      .footer{background:linear-gradient(135deg,#1A0D06,#5C3D0A);padding:12px 32px;color:rgba(255,255,255,.7);font-size:10px;display:flex;justify-content:space-between}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      .rpt-hdr{display:none}
      @page{margin:18mm 14mm 22mm 14mm;size:A4}
      @media print{
        .noprint{display:none}body{background:#fff}.page{box-shadow:none;margin:0;border-radius:0}
        .header{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .footer{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 40px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999}
        .page{padding-top:42px}
      }
    </style></head><body>
    <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfer &amp; Tour — VAT Return — ${vatMonthLabel}</span><span style='font-size:10px;color:#888'>TIN: 445579</span></div>
    <div class='noprint'><span>VAT Return — ${vatMonthLabel}</span><button class='printbtn' onclick='window.print()'>Print / Save PDF</button></div>
    <div class='page'>
      <div class='header'>
        <div>
          <img src='${MALAKESA_LOGO}' style='width:180px;border-radius:4px;display:block'/>
          <div style='color:rgba(255,255,255,.7);font-size:11px;margin-top:8px'>TIN: 445579 | Port Vila, Vanuatu</div>
        </div>
        <div style='text-align:right;color:#fff'>
          <div style='font-size:10px;letter-spacing:3px;color:rgba(255,255,255,.6);text-transform:uppercase'>VAT Return</div>
          <div style='font-size:20px;font-weight:700;color:#FFD700;margin-top:2px'>${vatMonthLabel}</div>
          <div style='font-size:11px;color:rgba(255,255,255,.7);margin-top:4px'>Filed: ${new Date().toLocaleDateString('en-AU',{day:'2-digit',month:'short',year:'numeric'})}</div>
        </div>
      </div>
      <div class='body'>
        <h2>Output Tax — Standard-Rated Sales (15%)</h2>
        <table><thead><tr><th>Invoice #</th><th>Date</th><th>Client</th><th style='text-align:right'>Ex-VAT</th><th style='text-align:right'>VAT 15%</th><th style='text-align:right'>Total</th></tr></thead><tbody>${stdRows || '<tr><td colspan=6 style=text-align:center;color:#999>No standard-rated invoices</td></tr>'}</tbody></table>
        <h2>Input Tax — Purchases</h2>
        <table><thead><tr><th>Date</th><th>Supplier</th><th>Description</th><th style='text-align:right'>Ex-VAT</th><th style='text-align:right'>Input VAT</th><th style='text-align:right'>Total</th></tr></thead><tbody>${purRows || '<tr><td colspan=6 style=text-align:center;color:#999>No VAT purchases recorded</td></tr>'}</tbody></table>
        <div class='summary'>
          <div>
            <div class='sum-row'><span>Box 1 — Output VAT</span><strong style='color:#2E7D2E'>${fmt(vatTotalTax)}</strong></div>
            <div class='sum-row'><span>Box 2 — Input VAT</span><strong style='color:#1A4D1A'>${fmt(vatInputTax)}</strong></div>
            <div class='net'><span>NET VAT PAYABLE</span><span>${fmt(vatNetPayable)}</span></div>
          </div>
          <div style='font-size:12px;color:#555;line-height:1.9'>
            <div>Total invoiced: <strong>${fmt(vatTotalInv)}</strong></div>
            <div>Taxable sales (ex-VAT): <strong>${fmt(vatTotalSubtotal)}</strong></div>
            <div>Zero-rated sales: <strong>${fmt(vatZeroRated.reduce((s,i)=>s+Number(i.total),0))}</strong></div>
            <div>Total purchases: <strong>${fmt(vatPurchasesTotal)}</strong></div>
          </div>
        </div>
      </div>
      <div class='footer'><span>Malakesa Transfer &amp; Tour | TIN: 445579 | VAT Return ${vatMonthLabel}</span><span>Computer generated — verify before filing</span></div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const exportVatExcel = () => {
    const esc = v => { const s = String(v == null ? '' : v); return s.includes(',') || s.includes('"') ? '"' + s.replace(/"/g, '""') + '"' : s }
    const dlRows = [
      ['Malakesa Transfer and Tour - VAT Return'],
      ['Period:', vatMonthLabel, 'TIN:', '445579'],
      ['Output VAT:', vatTotalTax, 'Input VAT:', vatInputTax, 'Net Payable:', vatNetPayable],
      [],
      ['OUTPUT TAX - INVOICES'],
      ['Invoice #','Date','Client','Subtotal (VT)','VAT 15% (VT)','Total (VT)','Rate'],
      ...vatInvoices.map(i => [i.number, i.date, i.client_name, i.subtotal||0, i.tax||0, i.total, Number(i.tax)>0?'15%':'Zero-rated']),
      [],
      ['INPUT TAX - PURCHASES'],
      ['Date','Supplier','Description','Ex-VAT','Input VAT','Total'],
      ...vatPurchases.map(p => [p.date, p.supplier, p.description||'', p.amount_ex_vat||0, p.vat||0, p.amount])
    ]
    const csv = dlRows.map(r => r.map(esc).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'Malakesa_VAT_' + vatMonthLabel.replace(/\s/g,'_') + '.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const vatColumns = [
    { key: 'number', label: 'Invoice #' }, { key: 'date', label: 'Date' },
    { key: 'client_name', label: 'Client' }, { key: 'subtotal', label: 'Subtotal (VT)' },
    { key: 'tax', label: 'VAT 15% (VT)' }, { key: 'total', label: 'Total (VT)' },
    { key: 'rate', label: 'VAT Rate' },
  ]

  return (
    <>
      <Topbar title="VAT Return">
        <MonthYearPicker value={vatMonth} onChange={setVatMonth} accentColor="#8B6914" />
        <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={() => setShowExport(true)}><i className="ti ti-download"></i> Export</button>
        <button className="btn btn-sm" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 500 }} onClick={printVatReturn}><i className="ti ti-printer"></i> PDF</button>
      </Topbar>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Output VAT (sales)" value={fmt(vatTotalTax)} color="#2E7D2E" />
          <StatCard label="Input VAT (purchases)" value={fmt(vatInputTax)} color="#1A4D1A" />
          <StatCard label="Net VAT payable" value={fmt(vatNetPayable)} color="#D85A30" sub="output − input" />
          <StatCard label="Total invoiced" value={fmt(vatTotalInv)} sub={`${vatInvoices.length} invoice${vatInvoices.length!==1?'s':''}`} />
        </div>

        <div style={{ background: '#EAF3DE', border: '0.5px solid #C0DD97', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#27500A', display: 'flex', alignItems: 'center', gap: 10 }}>
          <i className="ti ti-receipt-tax" style={{ fontSize: 18 }}></i>
          <span><strong>VAT Period: {vatMonthLabel}</strong> &nbsp;|&nbsp; TIN: 445579 &nbsp;|&nbsp; Rate: 15% &nbsp;|&nbsp; Output VAT to declare: <strong>{fmt(vatTotalTax)}</strong></span>
        </div>

        {vatInvoices.length === 0 ? (
          <Card><div style={{ textAlign: 'center', padding: '32px 20px', color: '#666' }}><i className="ti ti-receipt-off" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i><p>No invoices for {vatMonthLabel}</p></div></Card>
        ) : <>
          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 14 }}>Standard-Rated Invoices (15% VAT)</strong>
              <span style={{ fontSize: 12, color: '#2E7D2E', fontWeight: 600 }}>{vatStandard.length} invoice{vatStandard.length!==1?'s':''} &nbsp;|&nbsp; VAT: {fmt(vatStandard.reduce((s,i)=>s+Number(i.tax||0),0))}</span>
            </div>
            {vatStandard.length === 0 ? <div style={{ padding: 20, color: '#999', fontSize: 13, textAlign: 'center' }}>No standard-rated invoices this month</div> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr style={{ background: '#E8D5A3' }}><Th>Invoice #</Th><Th>Date</Th><Th>Client</Th><Th style={{ textAlign: 'right' }}>Subtotal (ex-VAT)</Th><Th style={{ textAlign: 'right' }}>VAT 15%</Th><Th style={{ textAlign: 'right' }}>Total</Th></tr></thead>
                <tbody>
                  {vatStandard.map(inv => (
                    <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td><strong>{inv.number}</strong></Td><Td>{fmtDate(inv.date)}</Td><Td>{inv.client_name}</Td>
                      <Td style={{ textAlign: 'right' }}>{fmt(inv.subtotal||0)}</Td>
                      <Td style={{ textAlign: 'right', color: '#2E7D2E', fontWeight: 500 }}>{fmt(inv.tax||0)}</Td>
                      <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(inv.total)}</Td>
                    </tr>
                  ))}
                  <tr style={{ background: '#E8D5A3', fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: '9px 14px', fontSize: 13 }}>SUBTOTAL</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(vatStandard.reduce((s,i)=>s+Number(i.subtotal||0),0))}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#2E7D2E' }}>{fmt(vatStandard.reduce((s,i)=>s+Number(i.tax||0),0))}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(vatStandard.reduce((s,i)=>s+Number(i.total),0))}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Card>

          <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 14 }}>Zero-Rated Invoices (0% VAT)</strong>
              <span style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{vatZeroRated.length} invoice{vatZeroRated.length!==1?'s':''} &nbsp;|&nbsp; VAT: Nil</span>
            </div>
            {vatZeroRated.length === 0 ? <div style={{ padding: 20, color: '#999', fontSize: 13, textAlign: 'center' }}>No zero-rated invoices this month</div> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr style={{ background: '#E8D5A3' }}><Th>Invoice #</Th><Th>Date</Th><Th>Client</Th><Th style={{ textAlign: 'right' }}>Amount</Th><Th style={{ textAlign: 'right' }}>VAT</Th></tr></thead>
                <tbody>
                  {vatZeroRated.map(inv => (
                    <tr key={inv.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <Td><strong>{inv.number}</strong></Td><Td>{fmtDate(inv.date)}</Td><Td>{inv.client_name}</Td>
                      <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(inv.total)}</Td>
                      <Td style={{ textAlign: 'right', color: '#999', fontStyle: 'italic' }}>Nil</Td>
                    </tr>
                  ))}
                  <tr style={{ background: '#E8D5A3', fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: '9px 14px', fontSize: 13 }}>SUBTOTAL</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(vatZeroRated.reduce((s,i)=>s+Number(i.total),0))}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#999', fontStyle: 'italic' }}>Nil</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Card>

          <Card>
            <div style={{ fontWeight: 500, marginBottom: 14, fontSize: 14 }}>VAT Return Summary — {vatMonthLabel}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                {[['Total Sales (inc. VAT)', fmt(vatTotalInv), '#1a1a1a'],['Taxable Sales (ex-VAT)', fmt(vatTotalSubtotal), '#8B6914'],['Zero-Rated Sales', fmt(vatZeroRated.reduce((s,i)=>s+Number(i.total),0)), '#666'],['VAT Output Tax (Box 1)', fmt(vatTotalTax), '#2E7D2E']].map(([label, value, color]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}>
                    <span style={{ color: '#666' }}>{label}</span>
                    <span style={{ fontWeight: label.includes('Box') ? 700 : 500, color }}>{value}</span>
                  </div>
                ))}
                <div style={{ marginTop: 8 }}>
                  {[['Total Purchases (inc. VAT)', fmt(vatPurchasesTotal), '#1a1a1a'],['VAT Input Tax (Box 2)', fmt(vatInputTax), '#1A4D1A']].map(([label, value, color]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}>
                      <span style={{ color: '#666' }}>{label}</span>
                      <span style={{ fontWeight: label.includes('Box') ? 700 : 500, color }}>{value}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 15, fontWeight: 700, color: '#D85A30', borderTop: '2px solid #D85A30', marginTop: 4 }}>
                    <span>NET VAT PAYABLE</span><span>{fmt(vatNetPayable)}</span>
                  </div>
                </div>
              </div>
              <div style={{ background: '#f9f6f0', borderRadius: 8, padding: '14px 16px', fontSize: 12, color: '#555', lineHeight: 1.9 }}>
                <div style={{ fontWeight: 600, color: '#3D2214', marginBottom: 8 }}>📋 Filing Summary</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(0,0,0,0.09)', paddingBottom: 6, marginBottom: 6 }}><span>Box 1 — Output Tax</span><strong style={{ color: '#2E7D2E' }}>{fmt(vatTotalTax)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(0,0,0,0.09)', paddingBottom: 6, marginBottom: 6 }}><span>Box 2 — Input Tax</span><strong style={{ color: '#1A4D1A' }}>{fmt(vatInputTax)}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 6, marginBottom: 10 }}><span style={{ fontWeight: 700 }}>Net Payable to Customs and Inland Revenue Department</span><strong style={{ color: '#D85A30', fontSize: 14 }}>{fmt(vatNetPayable)}</strong></div>
                {vatPurchases.length === 0 && <div style={{ background: '#FAEEDA', border: '0.5px solid #FAC775', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: '#633806' }}>⚠️ No purchases recorded. Add purchases to claim input VAT.</div>}
              </div>
            </div>
          </Card>
        </>}

        {showExport && <ExportModal title={`VAT Return — ${vatMonthLabel}`} columns={vatColumns}
          onExport={(fmt2, sel) => {
            if (fmt2 === 'pdf') { printVatReturn(); return }
            const cols = vatColumns.filter(c => sel.has(c.key))
            const dlRows = [
              ['Malakesa Transfer and Tour - VAT Return'],
              ['Period:', vatMonthLabel, 'TIN:', '445579', 'Net VAT Payable:', vatNetPayable],
              [], ['OUTPUT TAX'], cols.map(c => c.label),
              ...vatInvoices.map(inv => cols.map(c => { if (c.key==='rate') return Number(inv.tax)>0?'15%':'Zero-rated'; return inv[c.key]??'' })),
              [], ['INPUT TAX'],
              ['Date','Supplier','Description','Ex-VAT','Input VAT','Total'],
              ...vatPurchases.map(p => [p.date,p.supplier,p.description||'',p.amount_ex_vat||0,p.vat||0,p.amount])
            ]
            const esc = v => { const s = String(v??''); return s.includes(',')||s.includes('"')?'"'+s.replace(/"/g,'""')+'"':s }
            const csv = dlRows.map(r=>r.map(esc).join(',')).join('\n')
            const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'})
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a'); a.href=url; a.download='Malakesa_VAT_'+vatMonthLabel.replace(/\s/g,'_')+'.csv'; a.click()
            URL.revokeObjectURL(url)
          }}
          onClose={() => setShowExport(false)} />}
      </div>
    </>
  )
}

function Purchases({ purchases, suppliers, customCategories, reload, setModal }) {
  const [filterMonth, setFilterMonth] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [search, setSearch] = useState('')

  const allCategories = [...PURCHASE_CATEGORIES.slice(0, -1), ...(customCategories || []).map(c => c.name), 'Other']

  const now = new Date()
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const monthOptions = Array.from({length: 12}, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
    return { value: d.toISOString().slice(0,7), label: MONTHS[d.getMonth()] + ' ' + d.getFullYear() }
  }).reverse()

  let filtered = [...purchases].sort((a,b) => b.date > a.date ? 1 : -1)
  if (search) filtered = filtered.filter(p => p.supplier?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase()))
  if (filterMonth) filtered = filtered.filter(p => p.date?.startsWith(filterMonth))
  if (filterCategory) filtered = filtered.filter(p => p.category === filterCategory)

  const totalAmount = filtered.reduce((s,p) => s + Number(p.amount || 0), 0)
  const totalVat = filtered.reduce((s,p) => s + Number(p.vat || 0), 0)
  const totalExVat = filtered.reduce((s,p) => s + Number(p.amount_ex_vat || 0), 0)

  const hasFilters = search || filterMonth || filterCategory
  const clearFilters = () => { setSearch(''); setFilterMonth(''); setFilterCategory('') }

  const handleDelete = async (id) => {
    if (!confirm('Delete this purchase?')) return
    await fetch('/api/purchases/' + id, { method: 'DELETE' }); reload()
  }

  const selectStyle = { padding: '6px 10px', borderRadius: 8, border: '0.5px solid #8B6914', fontSize: 13, fontFamily: 'inherit', background: '#8B6914', color: '#fff', fontWeight: 500, cursor: 'pointer' }

  // Export
  const [showExport, setShowExport] = useState(false)
  const purchaseColumns = [
    { key: 'date', label: 'Date' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'description', label: 'Description' },
    { key: 'category', label: 'Category' },
    { key: 'amount_ex_vat', label: 'Ex-VAT (VT)' },
    { key: 'vat', label: 'VAT (VT)' },
    { key: 'amount', label: 'Total (VT)' },
    { key: 'ref', label: 'Ref / PO #' },
  ]
  const handlePurchaseExport = (format, selected) => {
    const filterDesc = [filterCategory && `Category: ${filterCategory}`, filterMonth && `Month: ${filterMonth}`, search && `Search: ${search}`].filter(Boolean).join(' | ') || 'All purchases'
    if (format === 'pdf') {
      const w = window.open('', '_blank')
      if (!w) { alert('Please allow popups.'); return }
      const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      const rows = filtered.map(p =>
        `<tr><td>${fmtDate(p.date)}</td><td><strong>${p.supplier}</strong></td><td style='color:#555'>${p.description||'—'}</td><td><span style='background:#E8D5A320;padding:2px 7px;border-radius:99px;font-size:11px'>${p.category||'Other'}</span></td><td style='text-align:right'>${fmt(p.amount_ex_vat||0)}</td><td style='text-align:right;color:#2E7D2E'>${Number(p.vat)>0?fmt(p.vat):'Nil'}</td><td style='text-align:right;font-weight:600'>${fmt(p.amount)}</td><td style='color:#999;font-size:12px'>${p.ref||'—'}</td></tr>`
      ).join('')
      w.document.write(`<!DOCTYPE html><html><head><title>Purchases Export</title><style>
        body{font-family:Arial,sans-serif;color:#222;font-size:12px;margin:0}
        .rpt-hdr{display:none} @page{margin:15mm 10mm 18mm 10mm;size:A4 landscape}
        table{width:100%;border-collapse:collapse} thead{display:table-header-group}
        th{background:#E8D5A3;padding:7px 8px;text-align:left;font-size:10px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
        td{padding:7px 8px;border-bottom:0.5px solid #eee;font-size:11px}
        h1{color:#8B6914;font-size:18px;margin:0 0 4px} .sub{color:#888;font-size:12px;margin-bottom:20px}
        .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
        .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
        @media print{.noprint{display:none}.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding:6px 30px;position:fixed;top:0;left:0;right:0;background:#fff;z-index:999} body{padding-top:42px}}
      </style></head><body>
      <div class='rpt-hdr'><span style='font-size:12px;font-weight:700;color:#3D2214'>Malakesa Transfer &amp; Tour — Purchases — ${filterDesc}</span><span style='font-size:10px;color:#888'>${now}</span></div>
      <div class='noprint'><span>Purchases Export — ${filterDesc}</span><button class='printbtn' onclick='window.print()'>🖨️ Print / Save PDF</button></div>
      <div style='padding:20px 30px'><h1>Malakesa Transfer &amp; Tour</h1>
      <div class='sub'>Purchases Export &nbsp;|&nbsp; ${filterDesc} &nbsp;|&nbsp; ${now}<br>${filtered.length} purchase(s) &nbsp;|&nbsp; Total: VT ${Number(totalAmount).toLocaleString()} &nbsp;|&nbsp; Input VAT: VT ${Number(totalVat).toLocaleString()}</div>
      <table><thead><tr><th>Date</th><th>Supplier</th><th>Description</th><th>Category</th><th style='text-align:right'>Ex-VAT</th><th style='text-align:right'>VAT</th><th style='text-align:right'>Total</th><th>Ref</th></tr></thead><tbody>${rows}</tbody>
      <tr style='background:#E8D5A3;font-weight:700'><td colspan='4' style='padding:8px'>TOTAL (${filtered.length})</td><td style='padding:8px;text-align:right'>VT ${Number(totalExVat).toLocaleString()}</td><td style='padding:8px;text-align:right;color:#2E7D2E'>VT ${Number(totalVat).toLocaleString()}</td><td style='padding:8px;text-align:right'>VT ${Number(totalAmount).toLocaleString()}</td><td></td></tr>
      </table></div><script>window.onload=()=>window.print()<\/script></body></html>`)
      w.document.close()
      return
    }
    const cols = purchaseColumns.filter(c => selected.has(c.key))
    const rows = [
      ['Malakesa Transfer and Tour - Purchases Export'],
      ['Filters:', filterDesc],
      ['Generated:', new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })],
      [],
      cols.map(c => c.label),
      ...filtered.map(p => cols.map(c => p[c.key] ?? '')),
      [],
      ['TOTALS', '', '', '', totalExVat, totalVat, totalAmount, ''],
    ]
    downloadCSV(`Malakesa_Purchases_${(filterDesc).replace(/[^a-zA-Z0-9]/g,'_').slice(0,30)}.csv`, rows)
  }

  return (
    <>
      <Topbar title="Purchases">
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-sm" style={{ background: '#1D6F42', borderColor: '#155233', color: '#fff', fontWeight: 500 }} onClick={() => setShowExport(true)}><i className="ti ti-download"></i> Export</button>
          <button className="btn" style={{ background: '#fff', borderColor: 'rgba(139,105,20,0.4)', color: '#8B6914', fontWeight: 500 }} onClick={() => setModal('manageCategories')}><i className="ti ti-category-plus"></i> Manage Categories</button>
          <button className="btn btn-primary" onClick={() => setModal('newPurchase')}><i className="ti ti-plus"></i> Add Purchase</button>
        </div>
      </Topbar>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
          <StatCard label="Total spent" value={fmt(totalAmount)} color="#A32D2D" sub={`${filtered.length} purchases`} />
          <StatCard label="Subtotal (ex-VAT)" value={fmt(totalExVat)} />
          <StatCard label="Input VAT (claimable)" value={fmt(totalVat)} color="#2E7D2E" />
        </div>

        {/* Budget Tracker */}
        {(() => {
          const now3 = new Date()
          const thisMonthStr = now3.toISOString().slice(0, 7)
          const thisQStart = new Date(now3.getFullYear(), Math.floor(now3.getMonth() / 3) * 3, 1)
          const thisYearStr = String(now3.getFullYear())
          const catsWithBudget = (customCategories || []).filter(c => c.budget && Number(c.budget) > 0)
          if (catsWithBudget.length === 0) return null
          const getSpend = (catName, period) => purchases.filter(p => {
            if ((p.category || 'Other') !== catName || !p.date) return false
            if (period === 'monthly') return p.date.startsWith(thisMonthStr)
            if (period === 'quarterly') return new Date(p.date + 'T00:00:00') >= thisQStart
            if (period === 'yearly') return p.date.startsWith(thisYearStr)
            return false
          }).reduce((s, p) => s + Number(p.amount || 0), 0)
          return (
            <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="ti ti-chart-bar" style={{ color: '#8B6914' }}></i> Budget Tracker
                </div>
                <button className="btn btn-sm" style={{ fontSize: 11 }} onClick={() => setModal('manageCategories')}>Edit budgets</button>
              </div>
              <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {catsWithBudget.map(cat => {
                  const period = cat.budget_period || 'monthly'
                  const budget = Number(cat.budget)
                  const spent = getSpend(cat.name, period)
                  const pct = Math.min(100, budget > 0 ? Math.round((spent / budget) * 100) : 0)
                  const remaining = budget - spent
                  const isOver = spent > budget
                  const isWarn = pct >= 80 && !isOver
                  const barColor = isOver ? '#A32D2D' : isWarn ? '#D85A30' : '#3B6D11'
                  const periodLabel = { monthly: 'This month', quarterly: 'This quarter', yearly: 'This year' }[period] || 'This month'
                  return (
                    <div key={cat.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#3D2214' }}>{cat.name}</span>
                        <span style={{ fontSize: 11, color: '#888' }}>{periodLabel}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                        <span style={{ color: barColor, fontWeight: 600 }}>{fmt(spent)} spent</span>
                        <span style={{ color: '#999' }}>of {fmt(budget)}</span>
                      </div>
                      <div style={{ height: 10, background: '#f0ebe0', borderRadius: 99, overflow: 'hidden', marginBottom: 6 }}>
                        <div style={{ height: '100%', width: pct + '%', background: isOver ? 'linear-gradient(90deg,#A32D2D,#D85A30)' : isWarn ? '#D85A30' : 'linear-gradient(90deg,#3B6D11,#5A9A1A)', borderRadius: 99, transition: 'width 0.4s ease' }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                        <span style={{ color: barColor, fontWeight: 500 }}>
                          {isOver ? `⚠️ Over by ${fmt(Math.abs(remaining))}` : isWarn ? `⚡ ${fmt(remaining)} left` : `✓ ${fmt(remaining)} remaining`}
                        </span>
                        <span style={{ color: '#aaa', fontWeight: 500 }}>{pct}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          )
        })()}

        {/* Filter bar */}
        <div style={{ background: '#fff', border: '0.5px solid rgba(139,105,20,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search supplier or description..." style={{ ...selectStyle, background: '#fff', color: '#1a1a1a', minWidth: 220 }} />
          <MonthYearPicker value={filterMonth} onChange={setFilterMonth} accentColor="#8B6914" allowClear clearLabel="All months" />
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={selectStyle}>
            <option value="">All categories</option>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {hasFilters && <button className="btn btn-sm" onClick={clearFilters} style={{ color: '#A32D2D', borderColor: '#A32D2D' }}><i className="ti ti-x"></i> Clear</button>}
          <div style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>
            {filtered.length} purchase{filtered.length !== 1 ? 's' : ''} &nbsp;|&nbsp; {fmt(totalAmount)} total &nbsp;|&nbsp; <span style={{ color: '#2E7D2E' }}>{fmt(totalVat)} VAT</span>
          </div>
        </div>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
              <i className="ti ti-shopping-cart-off" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
              <p>{hasFilters ? 'No purchases match your filters.' : 'No purchases recorded yet.'}</p>
              {!hasFilters && <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => setModal('newPurchase')}>Add first purchase</button>}
              {hasFilters && <button className="btn btn-sm" onClick={clearFilters} style={{ marginTop: 10 }}>Clear filters</button>}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead><tr style={{ background: '#E8D5A3' }}>
                <Th>Date</Th><Th>Supplier</Th><Th>Description</Th><Th>Category</Th>
                <Th style={{ textAlign: 'right' }}>Ex-VAT</Th>
                <Th style={{ textAlign: 'right' }}>VAT</Th>
                <Th style={{ textAlign: 'right' }}>Total</Th>
                <Th>Ref</Th><Th></Th>
              </tr></thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                    <Td>{fmtDate(p.date)}</Td>
                    <Td><strong>{p.supplier}</strong></Td>
                    <Td style={{ color: '#555' }}>{p.description || '—'}</Td>
                    <Td><span style={{ background: '#E8D5A3', padding: '2px 8px', borderRadius: 99, fontSize: 11, whiteSpace: 'nowrap' }}>{p.category || 'Other'}</span></Td>
                    <Td style={{ textAlign: 'right' }}>{fmt(p.amount_ex_vat || 0)}</Td>
                    <Td style={{ textAlign: 'right', color: Number(p.vat) > 0 ? '#2E7D2E' : '#999', fontWeight: Number(p.vat) > 0 ? 500 : 400 }}>
                      {Number(p.vat) > 0 ? fmt(p.vat) : <span style={{ fontStyle: 'italic', fontSize: 11 }}>Nil</span>}
                    </Td>
                    <Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(p.amount)}</Td>
                    <Td style={{ color: '#999', fontSize: 12 }}>{p.ref || '—'}</Td>
                    <Td>
                      <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(p.id)} title="Delete"><i className="ti ti-trash"></i></button>
                    </Td>
                  </tr>
                ))}
                <tr style={{ background: '#E8D5A3', fontWeight: 700 }}>
                  <td colSpan={4} style={{ padding: '9px 14px', fontSize: 13 }}>TOTAL ({filtered.length} purchases)</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(totalExVat)}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#2E7D2E' }}>{fmt(totalVat)}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(totalAmount)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          )}
        </Card>
      </div>
      {showExport && <ExportModal title="Purchases" columns={purchaseColumns} onExport={handlePurchaseExport} onClose={() => setShowExport(false)} />}
    </>
  )
}

function NewPurchaseModal({ suppliers, customCategories, onClose, onSave }) {
  const allCategories = [...PURCHASE_CATEGORIES.slice(0, -1), ...(customCategories || []).map(c => c.name), 'Other']
  const [form, setForm] = useState({
    date: todayStr(), supplier_id: '', supplier: '', description: '', category: 'Other',
    amount: '', vat: '', ref: ''
  })
  const [vatMode, setVatMode] = useState('calc15')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Inline add-supplier state
  const [showAddSupplier, setShowAddSupplier] = useState(false)
  const [newSupplier, setNewSupplier] = useState({ name: '', category: 'Other', phone: '', email: '' })
  const [savingSupplier, setSavingSupplier] = useState(false)
  const [supplierList, setSupplierList] = useState(suppliers)

  const amount = parseFloat(form.amount) || 0
  const vat = vatMode === 'calc15' ? Math.round(amount * 15 / 115 * 100) / 100
             : vatMode === 'none' ? 0
             : parseFloat(form.vat) || 0
  const amountExVat = vatMode === 'calc15' ? Math.round((amount - vat) * 100) / 100
                    : vatMode === 'none' ? amount
                    : Math.round((amount - vat) * 100) / 100

  const handleSupplierSelect = (e) => {
    const sup = supplierList.find(s => s.id === e.target.value)
    setForm(f => ({ ...f, supplier_id: e.target.value, supplier: sup?.name || '', category: sup?.category || f.category }))
  }

  const handleQuickAddSupplier = async () => {
    if (!newSupplier.name.trim()) return
    setSavingSupplier(true)
    try {
      const res = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplier)
      })
      if (res.ok) {
        const saved = await res.json()
        const updated = [...supplierList, saved]
        setSupplierList(updated)
        setForm(f => ({ ...f, supplier_id: saved.id, supplier: saved.name, category: saved.category || f.category }))
        setShowAddSupplier(false)
        setNewSupplier({ name: '', category: 'Other', phone: '', email: '' })
      }
    } catch(e) {}
    setSavingSupplier(false)
  }

  const handleSave = async () => {
    setError('')
    if (!form.supplier.trim()) { setError('Please select or enter a supplier'); return }
    if (!form.amount || amount <= 0) { setError('Amount is required'); return }
    if (!form.date) { setError('Date is required'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount, vat, amount_ex_vat: amountExVat })
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save'); setSaving(false); return }
      onSave()
    } catch(e) { setError('Network error — please try again'); setSaving(false) }
  }

  return (
    <Modal title="Add Purchase" onClose={onClose} wide>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <Field label="Date *"><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Category">
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        {/* Supplier field + quick-add button */}
        <div style={{ gridColumn: '1/-1' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <Field label="Supplier *" style={{ flex: 1 }}>
              {supplierList.length > 0 ? (
                <select value={form.supplier_id} onChange={handleSupplierSelect} style={inputStyle}>
                  <option value="">— Select supplier —</option>
                  {supplierList.map(s => <option key={s.id} value={s.id}>{s.name}{s.category ? ` (${s.category})` : ''}</option>)}
                  <option value="__manual__">✏️ Type manually...</option>
                </select>
              ) : (
                <input type="text" value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} style={inputStyle} placeholder="e.g. Shell Vanuatu" />
              )}
            </Field>
            <button
              className="btn btn-sm"
              onClick={() => setShowAddSupplier(v => !v)}
              style={{ background: showAddSupplier ? '#A32D2D' : '#8B6914', borderColor: showAddSupplier ? '#7a1f1f' : '#6B5010', color: '#fff', whiteSpace: 'nowrap', marginBottom: 1 }}
            >
              <i className={`ti ${showAddSupplier ? 'ti-x' : 'ti-plus'}`}></i> {showAddSupplier ? 'Cancel' : 'New Supplier'}
            </button>
          </div>

          {/* Inline quick-add supplier form */}
          {showAddSupplier && (
            <div style={{ marginTop: 10, background: '#f5f0e8', border: '1px solid rgba(139,105,20,0.25)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#3D2214', marginBottom: 10 }}>
                <i className="ti ti-truck"></i> Add New Supplier
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="Supplier name *">
                  <input type="text" value={newSupplier.name} onChange={e => setNewSupplier(s => ({ ...s, name: e.target.value }))} style={inputStyle} placeholder="e.g. Shell Vanuatu" autoFocus />
                </Field>
                <Field label="Category">
                  <select value={newSupplier.category} onChange={e => setNewSupplier(s => ({ ...s, category: e.target.value }))} style={inputStyle}>
                    {SUPPLIER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Phone (optional)">
                  <input type="tel" value={newSupplier.phone} onChange={e => setNewSupplier(s => ({ ...s, phone: e.target.value }))} style={inputStyle} placeholder="+678 ..." />
                </Field>
                <Field label="Email (optional)">
                  <input type="email" value={newSupplier.email} onChange={e => setNewSupplier(s => ({ ...s, email: e.target.value }))} style={inputStyle} placeholder="supplier@email.com" />
                </Field>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button className="btn btn-primary" onClick={handleQuickAddSupplier} disabled={savingSupplier || !newSupplier.name.trim()}>
                  <i className="ti ti-check"></i> {savingSupplier ? 'Saving...' : 'Save & Select Supplier'}
                </button>
              </div>
            </div>
          )}

          {form.supplier_id === '__manual__' && (
            <div style={{ marginTop: 8 }}>
              <input type="text" value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} style={inputStyle} placeholder="Enter supplier name..." autoFocus />
            </div>
          )}
        </div>

        <Field label="Receipt / Reference"><input type="text" value={form.ref} onChange={e => setForm(f => ({ ...f, ref: e.target.value }))} style={inputStyle} placeholder="Receipt #, invoice ref..." /></Field>
        <Field label="Description" style={{ gridColumn: '1/-1' }}><input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={inputStyle} placeholder="What was purchased..." /></Field>
        <Field label="Total Amount (VT inc. VAT) *"><input type="number" value={form.amount} min="0" onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} style={inputStyle} placeholder="0" /></Field>
        <Field label="VAT Treatment">
          <select value={vatMode} onChange={e => setVatMode(e.target.value)} style={inputStyle}>
            <option value="calc15">Calculate VAT at 15% (from inc. price)</option>
            <option value="manual">Enter VAT amount manually</option>
            <option value="none">No VAT / exempt</option>
          </select>
        </Field>
        {vatMode === 'manual' && (
          <Field label="VAT Amount (VT)" style={{ gridColumn: '1/-1' }}>
            <input type="number" value={form.vat} min="0" onChange={e => setForm(f => ({ ...f, vat: e.target.value }))} style={inputStyle} placeholder="0" />
          </Field>
        )}
      </div>

      {/* Live totals preview */}
      {amount > 0 && (
        <div style={{ background: '#f5f0e8', borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
          <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 8, color: '#3D2214' }}>Summary</div>
          {[
            ['Amount (ex-VAT)', fmt(amountExVat)],
            [vatMode === 'none' ? 'VAT' : 'Input VAT (claimable)', vatMode === 'none' ? 'Nil' : fmt(vat)],
            ['Total paid', fmt(amount)],
          ].map(([l, v], i) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.09)' : 'none', fontSize: 13 }}>
              <span style={{ color: '#666' }}>{l}</span>
              <span style={{ fontWeight: i === 2 ? 600 : 400, color: l.includes('VAT') && vatMode !== 'none' ? '#2E7D2E' : '#1a1a1a' }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <div style={{ fontSize: 12, color: '#8B6914' }}>
          <i className="ti ti-info-circle"></i> Manage suppliers in the <strong>Suppliers</strong> menu
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Save Purchase'}</button>
        </div>
      </div>
    </Modal>
  )
}

function ManageCategoriesModal({ customCategories, onClose, onSave }) {
  const [list, setList] = useState(customCategories || [])
  const [newCat, setNewCat] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const builtIns = PURCHASE_CATEGORIES.slice(0, -1) // exclude 'Other'

  const handleAdd = async () => {
    setError('')
    const trimmed = newCat.trim()
    if (!trimmed) return
    if (builtIns.includes(trimmed) || list.some(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('That category already exists')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/purchase-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed })
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to add'); setSaving(false); return }
      const saved = await res.json()
      setList(l => [...l, saved])
      setNewCat('')
    } catch (e) { setError('Network error — please try again') }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this category? Existing purchases will keep their category label.')) return
    await fetch('/api/purchase-categories/' + id, { method: 'DELETE' })
    setList(l => l.filter(c => c.id !== id))
  }

  const handleUpdateBudget = async (id, budget, budget_period) => {
    const budgetVal = budget === '' || budget === null ? null : Number(budget)
    await fetch('/api/purchase-categories/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ budget: budgetVal, budget_period: budget_period || 'monthly' })
    })
    setList(l => l.map(c => c.id === id ? { ...c, budget: budgetVal, budget_period: budget_period || 'monthly' } : c))
  }

  return (
    <Modal title="Manage Purchase Categories" onClose={() => { onSave(); onClose() }}>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#666', fontWeight: 500, marginBottom: 8 }}>Built-in categories</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {builtIns.map(c => (
            <span key={c} style={{ background: '#E8D5A3', padding: '4px 10px', borderRadius: 99, fontSize: 12, color: '#3D2214' }}>{c}</span>
          ))}
          <span style={{ background: '#f1f1f1', padding: '4px 10px', borderRadius: 99, fontSize: 12, color: '#888' }}>Other</span>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#666', fontWeight: 500, marginBottom: 8 }}>Your custom categories</div>
        {list.length === 0 ? (
          <div style={{ fontSize: 13, color: '#999', fontStyle: 'italic' }}>No custom categories yet — add one below.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {list.map(c => (
              <div key={c.id} style={{ background: '#f5f0e8', padding: '10px 12px', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#3D2214', fontWeight: 600 }}>{c.name}</span>
                  <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D', padding: '2px 8px' }} onClick={() => handleDelete(c.id)}><i className="ti ti-trash"></i></button>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <label style={{ fontSize: 11, color: '#666', whiteSpace: 'nowrap' }}>Budget (VT):</label>
                  <input type="number" placeholder="No budget" defaultValue={c.budget || ''} onBlur={e => handleUpdateBudget(c.id, e.target.value, c.budget_period || 'monthly')} style={{ ...inputStyle, width: 120, fontSize: 12 }} />
                  <select defaultValue={c.budget_period || 'monthly'} onChange={e => handleUpdateBudget(c.id, c.budget, e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: '4px 8px' }}>
                    <option value="monthly">per month</option>
                    <option value="quarterly">per quarter</option>
                    <option value="yearly">per year</option>
                  </select>
                  {c.budget && <span style={{ fontSize: 11, color: '#8B6914', fontWeight: 500 }}>Budget: {fmt(c.budget)}/{(c.budget_period||'monthly').slice(0,2)}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Field label="Add new category">
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd() } }}
            style={{ ...inputStyle, flex: 1 }}
            placeholder="e.g. Tour Guide Fees"
          />
          <button className="btn btn-primary" onClick={handleAdd} disabled={saving || !newCat.trim()}><i className="ti ti-plus"></i> {saving ? 'Adding...' : 'Add'}</button>
        </div>
      </Field>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <button className="btn btn-primary" onClick={() => { onSave(); onClose() }}>Done</button>
      </div>
    </Modal>
  )
}

// ── Suppliers ─────────────────────────────────────────────
const SUPPLIER_CATEGORIES = ['Fuel Supplier', 'Vehicle Maintenance', 'Insurance', 'Office & Stationery', 'Utilities', 'Bank & Finance', 'Food & Beverages', 'Equipment & Tools', 'Professional Services', 'Marketing & Advertising', 'Accommodation', 'Other']

function Suppliers({ suppliers, purchases, reload, setModal }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const handleDelete = async (id) => {
    if (!confirm('Delete this supplier? Their purchases will remain.')) return
    await fetch('/api/suppliers/' + id, { method: 'DELETE' }); reload()
  }

  const startEdit = (s) => {
    setEditingId(s.id)
    setEditForm({ name: s.name, phone: s.phone || '', email: s.email || '', address: s.address || '', category: s.category || 'Other' })
  }

  const cancelEdit = () => { setEditingId(null); setEditForm({}) }

  const saveEdit = async (id) => {
    if (!editForm.name.trim()) return
    setSaving(true)
    await fetch('/api/suppliers/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    })
    setSaving(false); setEditingId(null); reload()
  }

  const inputStyle2 = { padding: '5px 8px', borderRadius: 6, border: '0.5px solid rgba(0,0,0,0.2)', fontSize: 13, fontFamily: 'inherit', width: '100%', background: '#fffef8' }

  // Purchase count and spend per supplier
  const supStats = {}
  suppliers.forEach(s => { supStats[s.id] = { count: 0, total: 0 } })
  purchases.forEach(p => { if (p.supplier_id && supStats[p.supplier_id]) { supStats[p.supplier_id].count++; supStats[p.supplier_id].total += Number(p.amount || 0) } })

  return (
    <>
      <Topbar title="Suppliers">
        <button className="btn btn-primary" onClick={() => setModal('newSupplier')}><i className="ti ti-plus"></i> Add Supplier</button>
      </Topbar>
      <div style={{ padding: 20 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {suppliers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
              <i className="ti ti-truck" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
              <p style={{ marginBottom: 14 }}>No suppliers yet</p>
              <button className="btn btn-primary" onClick={() => setModal('newSupplier')}>Add first supplier</button>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#E8D5A3' }}>
                  <Th>Name</Th><Th>Category</Th><Th>Phone</Th><Th>Email</Th><Th>Address</Th>
                  <Th style={{ textAlign: 'center' }}>Purchases</Th>
                  <Th style={{ textAlign: 'right' }}>Total Spent</Th>
                  <Th style={{ textAlign: 'center' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(s => (
                  editingId === s.id ? (
                    <tr key={s.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: '#fffef8' }}>
                      <td style={{ padding: '8px 10px' }}>
                        <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} style={{ ...inputStyle2, fontWeight: 600 }} placeholder="Supplier name *" />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <select value={editForm.category} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))} style={inputStyle2}>
                          {SUPPLIER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="tel" value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle2} placeholder="+678 ..." />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} style={inputStyle2} placeholder="supplier@email.com" />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="text" value={editForm.address} onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))} style={inputStyle2} placeholder="Address" />
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>{supStats[s.id]?.count || 0}</td>
                      <td style={{ padding: '8px 10px', textAlign: 'right' }}>{fmt(supStats[s.id]?.total || 0)}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                          <button className="btn btn-sm btn-primary" onClick={() => saveEdit(s.id)} disabled={saving}><i className="ti ti-check"></i> {saving ? '...' : 'Save'}</button>
                          <button className="btn btn-sm" onClick={cancelEdit}><i className="ti ti-x"></i></button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={s.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <td style={{ padding: '11px 14px' }}><strong>{s.name}</strong></td>
                      <td style={{ padding: '11px 14px' }}><span style={{ background: '#E8D5A3', padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>{s.category || 'Other'}</span></td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{s.phone || '—'}</td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{s.email || '—'}</td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{s.address || '—'}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'center' }}>{supStats[s.id]?.count || 0}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 500 }}>{fmt(supStats[s.id]?.total || 0)}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                          <button className="btn btn-sm" onClick={() => startEdit(s)}><i className="ti ti-pencil"></i> Edit</button>
                          <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(s.id)}><i className="ti ti-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}

function NewSupplierModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', category: 'Other' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Supplier name is required'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to save'); setSaving(false); return }
      onSave()
    } catch(e) { setError('Network error — please try again'); setSaving(false) }
  }

  return (
    <Modal title="Add Supplier" onClose={onClose}>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Supplier name *">
          <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="e.g. Shell Vanuatu" />
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
            {SUPPLIER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Phone">
          <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} placeholder="+678 ..." />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} placeholder="supplier@email.com" />
        </Field>
        <Field label="Address">
          <input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} style={inputStyle} placeholder="Port Vila, Vanuatu" />
        </Field>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Save Supplier'}</button>
      </div>
    </Modal>
  )
}

// ── VNPF ──────────────────────────────────────────────────
const VNPF_EMPLOYEE_RATE = 0.06
const VNPF_EMPLOYER_RATE = 0.06

function VNPF({ employees, salaryRecords, reload, setModal, setSelected }) {
  const [vnpfTab, setVnpfTab] = useState('contributions')
  const nowD = new Date()
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1)
    return { value: d.toISOString().slice(0, 7), label: MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear() }
  })
  const [vnpfMonth, setVnpfMonth] = useState(nowD.toISOString().slice(0, 7))
  const [emailStatus, setEmailStatus] = useState('')

  const activeEmployees = employees.filter(e => e.active !== false)

  const calc = (salary) => {
    const s = Number(salary || 0)
    const employee = Math.round(s * VNPF_EMPLOYEE_RATE)
    const employer = Math.round(s * VNPF_EMPLOYER_RATE)
    return { employee, employer, total: employee + employer }
  }

  const rows = activeEmployees.map(e => ({ ...e, ...calc(e.salary) }))
  const totalSalary = rows.reduce((s, r) => s + Number(r.salary || 0), 0)
  const totalEmployee = rows.reduce((s, r) => s + r.employee, 0)
  const totalEmployer = rows.reduce((s, r) => s + r.employer, 0)
  const totalContribution = totalEmployee + totalEmployer

  const monthLabel = monthOptions.find(m => m.value === vnpfMonth)?.label || vnpfMonth

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return
    await fetch('/api/employees/' + id, { method: 'DELETE' }); reload()
  }

  const buildScheduleHtml = () => `<!DOCTYPE html><html><head><title>VNPF Contribution Schedule — ${monthLabel}</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:Arial,sans-serif;margin:0;color:#222;font-size:13px;background:#f0ebe0}
      .page{max-width:850px;margin:20px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.15)}
      .header{background:linear-gradient(135deg,#1A0D06 0%,#3D2214 50%,#5C3D0A 100%);padding:24px 40px;display:flex;justify-content:space-between;align-items:flex-start}
      .logo-contact{font-size:10px;color:rgba(255,255,255,0.7);margin-top:8px;line-height:1.8}
      .report-title{text-align:right;color:#fff}
      .report-name{font-size:20px;font-weight:700;color:#FFD700}
      .report-sub{font-size:11px;color:rgba(255,255,255,0.75);margin-top:4px;line-height:1.7}
      .body{padding:28px 40px}
      .info-box{background:#FAEEDA;border:1px solid #FAC775;border-radius:6px;padding:10px 16px;margin-bottom:20px;font-size:12px;color:#633806}
      .stats{display:flex;gap:16px;margin-bottom:24px;flex-wrap:wrap}
      .stat{background:#f5f5f5;border-radius:8px;padding:12px 18px;min-width:140px}
      .stat-label{font-size:11px;color:#666;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.4px}
      .stat-value{font-size:18px;font-weight:bold}
      table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:12px}
      th{background:#E8D5A3;padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#3D2214;text-transform:uppercase;letter-spacing:0.5px}
      td{padding:9px 10px;border-bottom:1px solid #f0ebe0}
      tr:nth-child(even) td{background:#faf6ee}
      .right{text-align:right}
      .green{color:#2E7D2E;font-weight:500}
      .summary-row{background:#E8D5A3!important;font-weight:700}
      .footer{background:linear-gradient(135deg,#1A0D06,#5C3D0A);padding:14px 40px;display:flex;justify-content:space-between;align-items:center}
      .footer-l{color:rgba(255,255,255,0.8);font-size:10px;line-height:1.9}
      .footer-r{text-align:right;color:#FFD700;font-size:10px;line-height:1.9}
      .noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
      .printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
      thead{display:table-header-group}
      .rpt-hdr{display:none}
      @page{margin:18mm 14mm 22mm 14mm;size:A4}
      @page{counter-increment:page;}
      body{counter-reset:page}
      .pgnum,.pgnum2{font-size:10px;color:#888}
      .pgnum::after,.pgnum2::after{content:counter(page)}
      @media print{
        .noprint{display:none}
        body{background:#fff}
        .page{box-shadow:none;margin:0;border-radius:0}
        .header{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .footer{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .summary-row{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8B6914;padding-bottom:6px}
        .rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999;padding:6px 40px}
        .page{padding-top:42px}
        .rpt-footer{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #E8D5A3;padding:4px 40px;display:flex;justify-content:space-between;font-size:10px;color:#888;z-index:999}
        .page-body{padding-bottom:28px}
      }
    </style></head><body>
    <div class="rpt-hdr">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:12px;font-weight:700;color:#3D2214">Malakesa Transfer &amp; Tour</span>
        <span style="font-size:11px;color:#8B6914;font-weight:600">VNPF Contribution Schedule — ${monthLabel}</span>
      </div>
      <span style="font-size:10px;color:#888">TIN: 445579 &nbsp;|&nbsp; Page <span class="pgnum"></span></span>
    </div>
    <div class="rpt-footer">
      <span>VNPF Schedule — ${monthLabel} &nbsp;|&nbsp; Malakesa Transfer &amp; Tour &nbsp;|&nbsp; TIN: 445579</span>
      <span>Page <span class="pgnum2"></span> &nbsp;|&nbsp; Computer generated — verify before filing</span>
    </div>
    <div class="noprint"><span>VNPF Contribution Schedule — ${monthLabel}</span><button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button></div>
    <div class="page">
      <div class="header">
        <div>
          <img src="${MALAKESA_LOGO}" alt="Malakesa Transfer and Tour" style="width:200px;border-radius:6px;display:block" />
          <div class="logo-contact">
            📍 Port Vila, Shefa Province, Vanuatu<br>
            📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
          </div>
        </div>
        <div class="report-title">
          <div class="report-name">VNPF CONTRIBUTION SCHEDULE</div>
          <div class="report-sub">
            Period: <strong>${monthLabel}</strong><br>
            TIN: <strong>445579</strong><br>
            Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>
      <div class="body">
        <div class="info-box">
          ⚠️ <strong>Employer:</strong> Malakesa Transfer and Tour &nbsp;|&nbsp; TIN 445579 &nbsp;|&nbsp; Employee rate: 6% &nbsp;|&nbsp; Employer rate: 6% &nbsp;|&nbsp; Period: ${monthLabel}
        </div>
        <div class="stats">
          <div class="stat"><div class="stat-label">Total Gross Salaries</div><div class="stat-value">VT ${Number(totalSalary).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Employee Contributions (6%)</div><div class="stat-value">VT ${Number(totalEmployee).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Employer Contributions (6%)</div><div class="stat-value">VT ${Number(totalEmployer).toLocaleString()}</div></div>
          <div class="stat"><div class="stat-label">Total Payable to VNPF</div><div class="stat-value" style="color:#2E7D2E">VT ${Number(totalContribution).toLocaleString()}</div></div>
        </div>
        <table>
          <thead><tr>
            <th>Employee Name</th><th>Job Title</th><th>VNPF Number</th>
            <th class="right">Gross Salary</th>
            <th class="right">Employee 6%</th>
            <th class="right">Employer 6%</th>
            <th class="right">Total Contribution</th>
          </tr></thead>
          <tbody>
            ${rows.map(r => '<tr><td><strong>' + r.name + '</strong></td><td>' + (r.job_title || '—') + '</td><td>' + (r.vnpf_number || '—') + '</td><td class="right">VT ' + Number(r.salary || 0).toLocaleString() + '</td><td class="right">VT ' + Number(r.employee).toLocaleString() + '</td><td class="right">VT ' + Number(r.employer).toLocaleString() + '</td><td class="right green">VT ' + Number(r.total).toLocaleString() + '</td></tr>').join('')}
            <tr class="summary-row"><td colspan="2">TOTAL (${rows.length} employees)</td><td class="right">VT ${Number(totalSalary).toLocaleString()}</td><td class="right">VT ${Number(totalEmployee).toLocaleString()}</td><td class="right">VT ${Number(totalEmployer).toLocaleString()}</td><td class="right">VT ${Number(totalContribution).toLocaleString()}</td></tr>
          </tbody>
        </table>
        <p style="margin-top:16px;font-size:11px;color:#888">* Please verify all figures before submitting to the Vanuatu National Provident Fund. This schedule is computer generated.</p>
      </div>
      <div class="footer">
        <div class="footer-l">
          <div><strong style="color:#FFD700">Malakesa Transfer &amp; Tour</strong></div>
          <div>TIN: 445579 &nbsp;|&nbsp; Port Vila, Vanuatu</div>
          <div>Period: ${monthLabel}</div>
        </div>
        <div class="footer-r">
          <div>Employees: ${rows.length}</div>
          <div>Total Payable: VT ${Number(totalContribution).toLocaleString()}</div>
          <div style="font-size:10px;opacity:0.7">Computer generated — verify before filing</div>
        </div>
      </div>
    </div>
    <script>
    window.onload=()=>{
      // Show page number in fixed headers using CSS counter
      document.querySelectorAll('.pgnum,.pgnum2').forEach(el=>{
        el.style.cssText='display:inline'
      })
      window.print()
    }
    <\/script></body></html>`

  const printSchedule = () => {
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups to print the schedule.'); return }
    w.document.write(buildScheduleHtml())
    w.document.close()
  }

  const emailSchedule = async () => {
    setEmailStatus('sending')
    try {
      const res = await fetch('/api/send-vnpf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: vnpfMonth,
          monthLabel,
          rows: rows.map(r => ({ name: r.name, vnpf_number: r.vnpf_number, salary: r.salary, employee: r.employee, employer: r.employer, total: r.total })),
          totals: { totalSalary, totalEmployee, totalEmployer, totalContribution }
        })
      })
      const data = await res.json()
      if (res.ok) {
        setEmailStatus('Sent to ' + (data.sentTo || []).join(', '))
        setTimeout(() => setEmailStatus(''), 5000)
        return
      }
      setEmailStatus('error: ' + (data.error || 'Failed to send'))
      setTimeout(() => setEmailStatus(''), 6000)
    } catch (e) {
      setEmailStatus('error: ' + e.message)
      setTimeout(() => setEmailStatus(''), 6000)
    }
  }

  const tabStyle = (active) => ({ padding: '7px 18px', border: 'none', borderBottom: active ? '3px solid #8B6914' : '3px solid transparent', background: 'none', fontWeight: active ? 600 : 400, color: active ? '#8B6914' : '#666', cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap' })

  return (
    <>
      <Topbar title="Salaries & VNPF">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {vnpfTab === 'contributions' && <>
            <MonthYearPicker value={vnpfMonth} onChange={setVnpfMonth} accentColor="#8B6914" />
            <button className="btn btn-sm" style={{ background: '#2E7D2E', borderColor: '#1A4D1A', color: '#fff', fontWeight: 500 }} onClick={printSchedule}><i className="ti ti-printer"></i> Print Schedule</button>
            <button className="btn btn-sm" style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff', fontWeight: 500 }} onClick={emailSchedule} disabled={emailStatus === 'sending' || rows.length === 0}>
              <i className="ti ti-mail"></i> {emailStatus === 'sending' ? 'Sending...' : 'Email VNPF Schedule'}
            </button>
          </>}
          <button className="btn btn-primary" onClick={() => setModal('newEmployee')}><i className="ti ti-plus"></i> Add Employee</button>
        </div>
      </Topbar>
      <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.1)', display: 'flex', paddingLeft: 20, background: '#fff' }}>
        <button style={tabStyle(vnpfTab === 'contributions')} onClick={() => setVnpfTab('contributions')}><i className="ti ti-building-bank" style={{ marginRight: 5 }}></i>VNPF Contributions</button>
        <button style={tabStyle(vnpfTab === 'salaries')} onClick={() => setVnpfTab('salaries')}><i className="ti ti-cash" style={{ marginRight: 5 }}></i>Salaries & Payslips</button>
      </div>
      {vnpfTab === 'contributions' && <VNPFContributions
        rows={rows} totalSalary={totalSalary} totalEmployee={totalEmployee} totalEmployer={totalEmployer}
        totalContribution={totalContribution} monthLabel={monthLabel} vnpfMonth={vnpfMonth}
        salaryRecords={salaryRecords}
        emailStatus={emailStatus} setModal={setModal} setSelected={setSelected}
        handleDelete={handleDelete} fmt={fmt}
      />}
      {vnpfTab === 'salaries' && <SalariesTab employees={employees} salaryRecords={salaryRecords} reload={reload} fmt={fmt} />}
    </>
  )
}

function VNPFContributions({ rows, totalSalary, totalEmployee, totalEmployer, totalContribution, monthLabel, vnpfMonth, salaryRecords, emailStatus, setModal, setSelected, handleDelete, fmt }) {
  // Salary records for this month - accumulate processed pay runs
  const monthRecords = (salaryRecords || []).filter(r => {
    if (!r.month || !vnpfMonth) return false
    // Normalize both to YYYY-MM format for comparison
    const rMonth = String(r.month).slice(0, 7)
    const vMonth = String(vnpfMonth).slice(0, 7)
    return rMonth === vMonth
  })
  const hasProcessed = monthRecords.length > 0

  // Build per-employee processed totals for the month
  const processedByEmp = {}
  monthRecords.forEach(r => {
    if (!processedByEmp[r.employee_id]) processedByEmp[r.employee_id] = { gross: 0, vnpf: 0, runs: 0 }
    processedByEmp[r.employee_id].gross += Number(r.gross || 0)
    processedByEmp[r.employee_id].vnpf += Number(r.vnpf_employee || 0)
    processedByEmp[r.employee_id].runs += 1
  })

  // Use processed data if available, else fall back to employee base salary
  const scheduleRows = rows.map(r => {
    const proc = processedByEmp[r.id]
    if (proc) {
      const empVnpf = proc.vnpf
      const emplVnpf = Math.round(proc.gross * 0.06)
      return { ...r, gross: proc.gross, employee: empVnpf, employer: emplVnpf, total: empVnpf + emplVnpf, runs: proc.runs, processed: true }
    }
    return { ...r, runs: 0, processed: false }
  })
  const schedTotalSalary = scheduleRows.reduce((s, r) => s + Number(r.gross || 0), 0)
  const schedTotalEmp = scheduleRows.reduce((s, r) => s + r.employee, 0)
  const schedTotalEr = scheduleRows.reduce((s, r) => s + r.employer, 0)
  const schedTotal = schedTotalEmp + schedTotalEr

  return (
    <div style={{ padding: 20 }}>
      {emailStatus && emailStatus !== 'sending' && (
        <div style={{ background: emailStatus.startsWith('error') ? '#FCEBEB' : '#EAF3DE', color: emailStatus.startsWith('error') ? '#791F1F' : '#27500A', border: '0.5px solid ' + (emailStatus.startsWith('error') ? '#F7C1C1' : '#C0DD97'), padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className={`ti ${emailStatus.startsWith('error') ? 'ti-alert-circle' : 'ti-check'}`}></i>
          {emailStatus.startsWith('error') ? emailStatus.replace('error: ', 'Failed: ') : emailStatus}
        </div>
      )}
      {(salaryRecords || []).length > 0 && (() => {
        const allMonths = [...new Set((salaryRecords||[]).map(r => r.month))].sort().reverse()
        const monthsNotCurrent = allMonths.filter(m => m !== vnpfMonth)
        return monthsNotCurrent.length > 0 ? (
          <div style={{ background: '#FFF8E1', border: '0.5px solid #FFD700', borderRadius: 8, padding: '8px 14px', marginBottom: 12, fontSize: 12, color: '#8B6914', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="ti ti-info-circle"></i>
            <span>Pay runs also exist for: {monthsNotCurrent.join(', ')}. Use the month picker above to view those schedules.</span>
          </div>
        ) : null
      })()}
      <div style={{ background: '#EAF3DE', border: '0.5px solid #C0DD97', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#27500A', display: 'flex', alignItems: 'center', gap: 10 }}>
        <i className="ti ti-building-bank" style={{ fontSize: 18 }}></i>
        <span><strong>VNPF Period: {monthLabel}</strong> &nbsp;|&nbsp; Employee rate: 6% &nbsp;|&nbsp; Employer rate: 6% &nbsp;|&nbsp; Total payable: <strong>{fmt(hasProcessed ? schedTotal : totalContribution)}</strong> &nbsp;|&nbsp; {hasProcessed ? <span style={{color:'#27500A',fontWeight:600}}>{monthRecords.length} pay run(s) processed</span> : <span style={{color:'#8B6914'}}>No pay runs processed yet</span>}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
        <StatCard label="Total gross salaries" value={fmt(hasProcessed ? schedTotalSalary : totalSalary)} sub={hasProcessed ? `${monthRecords.length} pay run(s)` : `${rows.length} employees (estimate)`} />
        <StatCard label="Employee contributions (6%)" value={fmt(hasProcessed ? schedTotalEmp : totalEmployee)} color="#8B6914" sub={hasProcessed ? 'From processed payroll' : 'Estimate'} />
        <StatCard label="Employer contributions (6%)" value={fmt(hasProcessed ? schedTotalEr : totalEmployer)} color="#8B6914" sub={hasProcessed ? 'From processed payroll' : 'Estimate'} />
        <StatCard label="Total payable to VNPF" value={fmt(hasProcessed ? schedTotal : totalContribution)} color="#2E7D2E" sub={hasProcessed ? 'Confirmed' : 'Estimate'} />
      </div>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontWeight: 500, fontSize: 13 }}>Contribution Schedule — {monthLabel}</div>
        {rows.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
            <i className="ti ti-users-plus" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
            <p style={{ marginBottom: 14 }}>No employees added yet</p>
            <button className="btn btn-primary" onClick={() => setModal('newEmployee')}>Add first employee</button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr style={{ background: '#E8D5A3' }}>
              <Th>Name</Th><Th>Job Title</Th><Th>VNPF Number</Th>
              <Th style={{ textAlign: 'center' }}>Pay Runs</Th>
              <Th style={{ textAlign: 'right' }}>Gross Salary</Th>
              <Th style={{ textAlign: 'right' }}>Employee 6%</Th>
              <Th style={{ textAlign: 'right' }}>Employer 6%</Th>
              <Th style={{ textAlign: 'right' }}>Total</Th>
              <Th style={{ textAlign: 'center' }}>Actions</Th>
            </tr></thead>
            <tbody>
              {scheduleRows.map(r => (
                <tr key={r.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: r.processed ? '#f6fbf0' : '#fff' }}>
                  <Td><strong>{r.name}</strong></Td>
                  <Td style={{ color: '#666' }}>{r.job_title || '—'}</Td>
                  <Td style={{ color: '#666' }}>{r.vnpf_number || '—'}</Td>
                  <Td style={{ textAlign: 'center' }}>
                    {r.processed ? <span style={{ background: '#EAF3DE', color: '#27500A', borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>{r.runs} run{r.runs !== 1 ? 's' : ''}</span> : <span style={{ color: '#ccc', fontSize: 12 }}>none</span>}
                  </Td>
                  <Td style={{ textAlign: 'right' }}>{fmt(r.gross || r.salary)}</Td>
                  <Td style={{ textAlign: 'right' }}>{fmt(r.employee)}</Td>
                  <Td style={{ textAlign: 'right' }}>{fmt(r.employer)}</Td>
                  <Td style={{ textAlign: 'right', fontWeight: 500, color: '#2E7D2E' }}>{fmt(r.total)}</Td>
                  <Td>
                    <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                      <button className="btn btn-sm" onClick={() => { setSelected(r); setModal('editEmployee') }}><i className="ti ti-pencil"></i></button>
                      <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(r.id)}><i className="ti ti-trash"></i></button>
                    </div>
                  </Td>
                </tr>
              ))}
              <tr style={{ background: '#E8D5A3', fontWeight: 700 }}>
                <td colSpan={4} style={{ padding: '9px 14px', fontSize: 13 }}>TOTAL {hasProcessed ? '(from processed payroll)' : '(estimated)'}</td>
                <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(hasProcessed ? schedTotalSalary : totalSalary)}</td>
                <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(hasProcessed ? schedTotalEmp : totalEmployee)}</td>
                <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13 }}>{fmt(hasProcessed ? schedTotalEr : totalEmployer)}</td>
                <td style={{ padding: '9px 14px', textAlign: 'right', fontSize: 13, color: '#2E7D2E' }}>{fmt(hasProcessed ? schedTotal : totalContribution)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

function SalariesTab({ employees, salaryRecords, reload, fmt }) {
  const nowD = new Date()
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1)
    return { value: d.toISOString().slice(0, 7), label: MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear() }
  })
  const [salaryMonth, setSalaryMonth] = useState(nowD.toISOString().slice(0, 7))
  const monthLabel = monthOptions.find(m => m.value === salaryMonth)?.label || salaryMonth
  const activeEmployees = employees.filter(e => e.active !== false)
  const [payRunModal, setPayRunModal] = useState(null) // emp object when open

  const deletePayRun = async (id) => {
    if (!confirm('Delete this pay run? This will also remove it from the VNPF schedule.')) return
    const res = await fetch('/api/salary-records', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) reload()
    else alert('Failed to delete pay run')
  }


  // Records for selected month
  const monthRecords = (salaryRecords || []).filter(r => r.month === salaryMonth)

  // Per-employee summary for this month
  const printPayslip = (emp, rec) => {
    // rec = specific pay run record (or null for summary of all this month)
    const monthRecs = (salaryRecords || []).filter(r => r.month === salaryMonth && r.employee_id === emp.id)
    const recs = rec ? [rec] : monthRecs
    const totalGross = recs.reduce((s, r) => s + Number(r.gross || 0), 0)
    const totalAllowances = recs.reduce((s, r) => s + (r.allowances || []).reduce((a, x) => a + Number(x.amount || 0), 0), 0)
    const totalVnpf = recs.reduce((s, r) => s + Number(r.vnpf_employee || 0), 0)
    const totalOtherDed = recs.reduce((s, r) => s + (r.deductions || []).reduce((a, d) => a + Number(d.amount || 0), 0), 0)
    const totalNet = recs.reduce((s, r) => s + Number(r.net_pay || 0), 0)
    const MONTHS_LONG2 = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const useMonth = rec ? rec.month : salaryMonth
    const mParts = useMonth.split('-')
    const mLabel = (MONTHS_LONG2[parseInt(mParts[1])-1] || '') + ' ' + mParts[0]
    const issued = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups to print payslips.'); return }

    const earningRows = [
      `<div class='row'><span class='lbl'>Basic / Gross Salary</span><span class='amt grn'>VT ${Number(totalGross).toLocaleString()}</span></div>`,
      ...recs.flatMap(r => (r.allowances||[]).filter(a=>a.label||a.amount).map(a => `<div class='row'><span class='lbl'>${a.label||'Allowance'}</span><span class='amt grn'>VT ${Number(a.amount||0).toLocaleString()}</span></div>`))
    ].join('')

    const deductionRows = [
      `<div class='row'><span class='lbl'>VNPF Employee Contribution (6%)</span><span class='amt red'>VT ${Number(totalVnpf).toLocaleString()}</span></div>`,
      ...recs.flatMap(r => (r.deductions||[]).filter(d=>d.label||d.amount).map(d => `<div class='row'><span class='lbl'>${d.label||'Deduction'}</span><span class='amt red'>VT ${Number(d.amount||0).toLocaleString()}</span></div>`))
    ].join('')

    const payRunsInfo = recs.length > 1
      ? `<div style='font-size:11px;color:rgba(255,255,255,0.6);margin-top:4px'>${recs.length} pay runs accumulated</div>`
      : rec?.pay_date ? `<div style='font-size:11px;color:rgba(255,255,255,0.6);margin-top:4px'>Pay date: ${rec.pay_date}</div>` : ''

    const notesHtml = recs.filter(r=>r.notes).map(r=>`<div class='notes'><strong>Notes:</strong> ${r.notes}</div>`).join('')

    w.document.write(`<!DOCTYPE html><html><head><title>Payslip - ${emp.name} - ${mLabel}</title><style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:#f0ebe0;color:#222;font-size:13px}
.page{max-width:680px;margin:20px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.15)}
.hdr{background:linear-gradient(135deg,#1A0D06 0%,#3D2214 50%,#5C3D0A 100%);padding:24px 36px;display:flex;justify-content:space-between;align-items:flex-start}
.hdr-r{text-align:right;color:#fff}
.ps-title{font-size:10px;letter-spacing:3px;color:rgba(255,255,255,.6);text-transform:uppercase;margin-top:10px}
.ps-period{font-size:18px;font-weight:700;color:#FFD700;margin-top:3px}
.ps-date{font-size:11px;color:rgba(255,255,255,.7);margin-top:4px}
.emp-bar{background:#3D2214;padding:12px 36px;display:flex;justify-content:space-between;align-items:center}
.emp-name{color:#FFD700;font-weight:700;font-size:16px}
.emp-det{color:rgba(255,255,255,.75);font-size:11px;margin-top:3px}
.emp-r{text-align:right;color:rgba(255,255,255,.75);font-size:11px}
.body{padding:24px 36px}
.sec{font-size:10px;font-weight:800;color:#8B6914;text-transform:uppercase;letter-spacing:2px;border-bottom:2px solid #E8D5A3;padding-bottom:4px;margin:20px 0 10px}
.row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:.5px solid #f0ebe0;font-size:13px}
.row:last-child{border-bottom:none}
.lbl{color:#555}
.amt{font-weight:500}
.grn{color:#2E7D2E}
.red{color:#A32D2D}
.bold{font-weight:700}
.net-box{background:linear-gradient(135deg,#1A0D06,#3D2214);border-radius:8px;padding:16px 24px;margin:20px 0;display:flex;justify-content:space-between;align-items:center}
.net-lbl{color:rgba(255,255,255,.8);font-size:13px;font-weight:600}
.net-amt{color:#FFD700;font-size:26px;font-weight:900}
.notes{background:#faf6ee;border-left:4px solid #8B6914;padding:10px 14px;border-radius:0 6px 6px 0;font-size:12px;color:#555;margin-top:8px}
.sigs{display:flex;justify-content:space-between;margin-top:32px;gap:40px}
.sig{flex:1;border-top:1px solid #ccc;padding-top:6px;font-size:11px;color:#888;text-align:center}
.ftr{background:linear-gradient(135deg,#1A0D06,#5C3D0A);padding:14px 36px;display:flex;justify-content:space-between;color:rgba(255,255,255,.7);font-size:10px;line-height:1.9}
.noprint{background:#333;color:#fff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;font-size:13px}
.printbtn{background:#8B6914;color:#fff;border:none;padding:7px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
.rpt-hdr{display:none}
@page{margin:16mm 14mm 20mm 14mm;size:A4}
@media print{
.noprint{display:none}
body{background:#fff}
.page{box-shadow:none;margin:0;max-width:100%;border-radius:0}
.hdr{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.emp-bar{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.net-box{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.ftr{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.rpt-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #8B6914;padding-bottom:5px}
.rpt-hdr{position:fixed;top:0;left:0;right:0;background:#fff;z-index:999;padding:5px 36px}
.page{padding-top:36px}
}
</style></head><body>
<div class='rpt-hdr'>
  <span style='font-size:11px;font-weight:700;color:#3D2214'>Malakesa Transfer &amp; Tour &nbsp;—&nbsp; Payslip &nbsp;—&nbsp; ${emp.name} &nbsp;—&nbsp; ${mLabel}</span>
  <span style='font-size:10px;color:#888'>Page <span class='pgnum'></span></span>
</div>
<div class='noprint'><span>Payslip — ${emp.name} — ${mLabel}</span><button class='printbtn' onclick='window.print()'>Print / Save PDF</button></div>
<div class='page'>
  <div class='hdr'>
    <div>
      <img src='${MALAKESA_LOGO}' alt='Malakesa' style='width:200px;border-radius:6px;display:block'/>
      <div class='ps-date' style='margin-top:8px'>Port Vila, Shefa Province, Vanuatu | TIN: 445579</div>
    </div>
    <div class='hdr-r'>
      <div class='ps-title'>Pay Slip</div>
      <div class='ps-period'>${mLabel}</div>
      <div class='ps-date'>Issued: ${issued}</div>
      ${payRunsInfo}
    </div>
  </div>
  <div class='emp-bar'>
    <div>
      <div class='emp-name'>${emp.name}</div>
      <div class='emp-det'>${emp.job_title || 'Employee'} | VNPF: ${emp.vnpf_number || 'N/A'}</div>
    </div>
    <div class='emp-r'>
      <div>Pay Period: <strong style='color:#FFD700'>${mLabel}</strong></div>
      <div>Pay Date: ${issued}</div>
    </div>
  </div>
  <div class='body'>
    <div class='sec'>Earnings</div>
    ${earningRows}
    <div class='row bold'><span>Total Earnings</span><span class='amt grn'>VT ${Number(totalGross + totalAllowances).toLocaleString()}</span></div>
    <div class='sec'>Deductions</div>
    ${deductionRows}
    <div class='row bold'><span>Total Deductions</span><span class='amt red'>VT ${Number(totalVnpf + totalOtherDed).toLocaleString()}</span></div>
    <div class='net-box'>
      <div class='net-lbl'>NET PAY — ${mLabel}</div>
      <div class='net-amt'>VT ${Number(totalNet).toLocaleString()}</div>
    </div>
    ${notesHtml}
    <div class='sigs'>
      <div class='sig'>Employee Signature &amp; Date</div>
      <div class='sig'>Prepared by &amp; Date</div>
      <div class='sig'>Authorised by &amp; Date</div>
    </div>
  </div>
  <div class='ftr'>
    <div><strong style='color:#FFD700'>Malakesa Transfer &amp; Tour</strong><br>Port Vila, Shefa Province, Vanuatu<br>TIN: 445579 | PO Box 823</div>
    <div style='text-align:right'>Tel: +678 22712 | Mob: +678 7798712<br>Email: accounts@malakesa.vu<br><span style='opacity:.6'>Computer generated payslip</span></div>
  </div>
</div>
<script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const empSummary = (id) => {
    const recs = monthRecords.filter(r => r.employee_id === id)
    const totalGross = recs.reduce((s, r) => s + Number(r.gross || 0), 0)
    const totalAllowances = recs.reduce((s, r) => s + (r.allowances || []).reduce((a, x) => a + Number(x.amount || 0), 0), 0)
    const totalVnpf = recs.reduce((s, r) => s + Number(r.vnpf_employee || 0), 0)
    const totalNet = recs.reduce((s, r) => s + Number(r.net_pay || 0), 0)
    return { runs: recs.length, totalGross, totalAllowances, totalVnpf, totalNet, records: recs }
  }

  const totalNetAll = activeEmployees.reduce((s, e) => s + empSummary(e.id).totalNet, 0)
  const totalGrossAll = activeEmployees.reduce((s, e) => s + empSummary(e.id).totalGross, 0)
  const totalVnpfAll = activeEmployees.reduce((s, e) => s + empSummary(e.id).totalVnpf, 0)

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <MonthYearPicker value={salaryMonth} onChange={setSalaryMonth} accentColor="#8B6914" />
        <span style={{ fontSize: 13, color: '#666' }}>Pay period: <strong>{monthLabel}</strong></span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
        <StatCard label="Total Gross Paid" value={fmt(monthRecords.length > 0 ? totalGrossAll : activeEmployees.reduce((s,e)=>s+Number(e.salary||0),0))} sub={monthRecords.length > 0 ? `${monthRecords.length} pay run(s) this month` : `${activeEmployees.length} employees (not yet processed)`} />
        <StatCard label="Total VNPF (Employee 6%)" value={fmt(totalVnpfAll)} color="#8B6914" sub={monthRecords.length > 0 ? 'Accumulated from pay runs' : 'Process pay runs to calculate'} />
        <StatCard label="Total Net Pay" value={fmt(totalNetAll)} color="#2E7D2E" sub={monthRecords.length > 0 ? 'Confirmed net pay' : 'Process pay runs to calculate'} />
      </div>

      {activeEmployees.length === 0 ? (
        <Card><div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}><i className="ti ti-users" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i><p>No employees yet. Add employees in the VNPF Contributions tab.</p></div></Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activeEmployees.map(emp => {
            const sum = empSummary(emp.id)
            return (
              <Card key={emp.id} style={{ padding: 0, overflow: 'hidden' }}>
                {/* Employee header row */}
                <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: sum.runs > 0 ? '#f6fbf0' : '#fff', borderBottom: sum.runs > 0 ? '0.5px solid #C0DD97' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#3D2214,#8B6914)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD700', fontWeight: 700, fontSize: 16 }}>{emp.name?.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{emp.name}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{emp.job_title || 'Employee'}{emp.vnpf_number ? ` | VNPF: ${emp.vnpf_number}` : ''}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>Base salary: {fmt(emp.salary)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {sum.runs > 0 ? (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, color: '#27500A', fontWeight: 600 }}>{sum.runs} pay run{sum.runs !== 1 ? 's' : ''} this month</div>
                        <div style={{ fontSize: 12, color: '#666' }}>Gross: {fmt(sum.totalGross)} | VNPF: {fmt(sum.totalVnpf)}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#2E7D2E' }}>Net: {fmt(sum.totalNet)}</div>
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: '#aaa', textAlign: 'right' }}>No pay runs<br/>for {monthLabel}</div>
                    )}
                    {sum.runs > 0 && (
                      <button className="btn btn-sm" style={{ background: '#3B6D11', borderColor: '#2A5009', color: '#fff', whiteSpace: 'nowrap' }} onClick={() => printPayslip(emp, null)}>
                        <i className="ti ti-printer"></i> Print Payslip
                      </button>
                    )}
                    <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }} onClick={() => setPayRunModal(emp)}>
                      <i className="ti ti-plus"></i> New Pay Run
                    </button>
                  </div>
                </div>

                {/* Pay run history for this month */}
                {sum.runs > 0 && (
                  <div style={{ padding: '0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ background: '#E8D5A3' }}>
                          <Th style={{ fontSize: 11 }}>Pay Date</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>Gross</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>Allowances</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>VNPF 6%</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>Other Deductions</Th>
                          <Th style={{ fontSize: 11, textAlign: 'right' }}>Net Pay</Th>
                          <Th style={{ fontSize: 11 }}>Notes</Th>
                          <Th style={{ fontSize: 11 }}></Th>
                        </tr>
                      </thead>
                      <tbody>
                        {sum.records.map((rec, i) => {
                          const recAllowances = (rec.allowances || []).reduce((s, a) => s + Number(a.amount || 0), 0)
                          const recOtherDeductions = (rec.deductions || []).reduce((s, d) => s + Number(d.amount || 0), 0)
                          return (
                            <tr key={rec.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)', background: i % 2 === 0 ? '#fff' : '#fafaf8' }}>
                              <Td style={{ fontSize: 12 }}>{rec.pay_date ? fmtDate(rec.pay_date) : rec.month}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12 }}>{fmt(rec.gross)}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12, color: '#2E7D2E' }}>{recAllowances > 0 ? '+' + fmt(recAllowances) : '—'}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12, color: '#A32D2D' }}>{fmt(rec.vnpf_employee)}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12, color: '#A32D2D' }}>{recOtherDeductions > 0 ? fmt(recOtherDeductions) : '—'}</Td>
                              <Td style={{ textAlign: 'right', fontSize: 12, fontWeight: 600, color: '#2E7D2E' }}>{fmt(rec.net_pay)}</Td>
                              <Td style={{ fontSize: 11, color: '#888' }}>{rec.notes || '—'}</Td>
                              <Td>
                                <div style={{ display: 'flex', gap: 4 }}>
                                  <button className="btn btn-sm" style={{ background: '#3B6D11', borderColor: '#2A5009', color: '#fff', padding: '2px 8px', fontSize: 11 }} onClick={() => printPayslip(emp, rec)} title="Print this pay run"><i className="ti ti-printer"></i></button>
                                  <button className="btn btn-sm" style={{ color: '#A32D2D', borderColor: '#A32D2D', padding: '2px 8px', fontSize: 11 }} onClick={() => deletePayRun(rec.id)} title="Delete this pay run"><i className="ti ti-trash"></i></button>
                                </div>
                              </Td>
                            </tr>
                          )
                        })}
                        <tr style={{ background: '#f0ebe0', fontWeight: 700, fontSize: 12 }}>
                          <td style={{ padding: '7px 14px' }}>TOTAL ({sum.runs} run{sum.runs!==1?'s':''})</td>
                          <td style={{ padding: '7px 14px', textAlign: 'right' }}>{fmt(sum.totalGross)}</td>
                          <td style={{ padding: '7px 14px', textAlign: 'right', color: '#2E7D2E' }}>{fmt(sum.totalAllowances)}</td>
                          <td style={{ padding: '7px 14px', textAlign: 'right', color: '#A32D2D' }}>{fmt(sum.totalVnpf)}</td>
                          <td style={{ padding: '7px 14px', textAlign: 'right' }}></td>
                          <td style={{ padding: '7px 14px', textAlign: 'right', color: '#2E7D2E' }}>{fmt(sum.totalNet)}</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {payRunModal && (
        <PayRunModal
          emp={payRunModal}
          defaultMonth={salaryMonth}
          onClose={() => setPayRunModal(null)}
          onSave={() => { setPayRunModal(null); reload() }}
          fmt={fmt}
        />
      )}
    </div>
  )
}

function PayRunModal({ emp, defaultMonth, onClose, onSave, fmt }) {
  const nowD = new Date()
  const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1)
    return { value: d.toISOString().slice(0, 7), label: MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear() }
  })

  const [form, setForm] = useState({
    month: defaultMonth,
    pay_date: nowD.toISOString().slice(0, 10),
    days_worked: '',
    gross: emp.salary || '',
    allowances: [],
    deductions: [],
    notes: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const setF = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const gross = Number(form.gross || 0)
  const totalAllowances = form.allowances.reduce((s, a) => s + Number(a.amount || 0), 0)
  const vnpfDeduction = Math.round(gross * 0.06)
  const otherDeductions = form.deductions.reduce((s, d) => s + Number(d.amount || 0), 0)
  const totalDeductions = vnpfDeduction + otherDeductions
  const netPay = gross + totalAllowances - totalDeductions

  const handleSave = async () => {
    setError('')
    if (!form.gross || gross <= 0) { setError('Gross salary is required'); return }
    if (!form.pay_date) { setError('Pay date is required'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/salary-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: emp.id,
          month: form.month,
          pay_date: form.pay_date,
          days_worked: form.days_worked ? Number(form.days_worked) : null,
          gross,
          allowances: form.allowances,
          deductions: form.deductions,
          vnpf_employee: vnpfDeduction,
          net_pay: netPay,
          notes: form.notes || null
        })
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save'); setSaving(false); return }
      onSave()
    } catch(e) { setError('Network error: ' + e.message); setSaving(false) }
  }

  const addAllowance = () => setF('allowances', [...form.allowances, { label: '', amount: '' }])
  const addDeduction = () => setF('deductions', [...form.deductions, { label: '', amount: '' }])
  const updateAllowance = (i, key, val) => { const arr = [...form.allowances]; arr[i] = { ...arr[i], [key]: val }; setF('allowances', arr) }
  const updateDeduction = (i, key, val) => { const arr = [...form.deductions]; arr[i] = { ...arr[i], [key]: val }; setF('deductions', arr) }
  const removeAllowance = (i) => setF('allowances', form.allowances.filter((_,j) => j !== i))
  const removeDeduction = (i) => setF('deductions', form.deductions.filter((_,j) => j !== i))

  const monthLabel = monthOptions.find(m => m.value === form.month)?.label || form.month

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 660, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}>

        {/* Modal Header */}
        <div style={{ background: 'linear-gradient(135deg,#1A0D06,#3D2214,#5C3D0A)', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>New Pay Run</div>
            <div style={{ color: '#FFD700', fontSize: 18, fontWeight: 700, marginTop: 2 }}>{emp.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>{emp.job_title || 'Employee'} | Base salary: {fmt(emp.salary)}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', opacity: 0.7 }}>&times;</button>
        </div>

        {/* Modal Body */}
        <div style={{ overflow: 'auto', padding: 24, flex: 1 }}>
          {error && <Alert type="danger">{error}</Alert>}

          {/* Pay Period & Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 18 }}>
            <Field label="Pay period (month)">
              <select value={form.month} onChange={e => setF('month', e.target.value)} style={inputStyle}>
                {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </Field>
            <Field label="Pay date *">
              <input type="date" value={form.pay_date} onChange={e => setF('pay_date', e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Days worked (optional)">
              <input type="number" value={form.days_worked} onChange={e => setF('days_worked', e.target.value)} placeholder="e.g. 22" min="0" max="31" style={inputStyle} />
            </Field>
          </div>

          {/* Gross Salary */}
          <div style={{ background: '#faf6ee', border: '1.5px solid #E8D5A3', borderRadius: 8, padding: '14px 16px', marginBottom: 18 }}>
            <Field label={`Gross salary for this pay run (VT) * — base: ${fmt(emp.salary)}`}>
              <input type="number" value={form.gross} onChange={e => setF('gross', e.target.value)} placeholder={String(emp.salary || 0)} style={{ ...inputStyle, fontSize: 16, fontWeight: 600 }} />
            </Field>
          </div>

          {/* Allowances & Deductions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 18 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#2E7D2E', marginBottom: 10 }}>+ Allowances / Extra Pay</div>
              {form.allowances.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <input type="text" placeholder="e.g. Overtime" value={a.label} onChange={e => updateAllowance(i, 'label', e.target.value)} style={{ ...inputStyle, flex: 2, fontSize: 12 }} />
                  <input type="number" placeholder="Amount" value={a.amount} onChange={e => updateAllowance(i, 'amount', e.target.value)} style={{ ...inputStyle, flex: 1, fontSize: 12 }} />
                  <button className="btn btn-sm" style={{ color: '#A32D2D', borderColor: '#A32D2D', padding: '2px 6px' }} onClick={() => removeAllowance(i)}><i className="ti ti-x"></i></button>
                </div>
              ))}
              <button className="btn btn-sm" onClick={addAllowance} style={{ fontSize: 11, marginTop: 2 }}><i className="ti ti-plus"></i> Add Allowance</button>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#A32D2D', marginBottom: 10 }}>— Deductions</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, borderBottom: '0.5px solid #f0ebe0', marginBottom: 6 }}>
                <span style={{ color: '#555' }}>VNPF Employee Contribution (6%)</span>
                <span style={{ fontWeight: 600, color: '#A32D2D' }}>{fmt(vnpfDeduction)}</span>
              </div>
              {form.deductions.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <input type="text" placeholder="e.g. Loan repayment" value={d.label} onChange={e => updateDeduction(i, 'label', e.target.value)} style={{ ...inputStyle, flex: 2, fontSize: 12 }} />
                  <input type="number" placeholder="Amount" value={d.amount} onChange={e => updateDeduction(i, 'amount', e.target.value)} style={{ ...inputStyle, flex: 1, fontSize: 12 }} />
                  <button className="btn btn-sm" style={{ color: '#A32D2D', borderColor: '#A32D2D', padding: '2px 6px' }} onClick={() => removeDeduction(i)}><i className="ti ti-x"></i></button>
                </div>
              ))}
              <button className="btn btn-sm" onClick={addDeduction} style={{ fontSize: 11, marginTop: 2 }}><i className="ti ti-plus"></i> Add Deduction</button>
            </div>
          </div>

          {/* Notes */}
          <Field label="Notes / Remarks">
            <input type="text" value={form.notes} onChange={e => setF('notes', e.target.value)} placeholder="e.g. Weekly pay run 1 of 4, includes overtime" style={inputStyle} />
          </Field>

          {/* Live Pay Summary */}
          <div style={{ background: 'linear-gradient(135deg,#1A0D06,#3D2214)', borderRadius: 10, padding: '16px 20px', marginTop: 18 }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Pay Summary — {monthLabel}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                ['Gross', fmt(gross), '#fff'],
                ['+ Allowances', fmt(totalAllowances), '#86d86a'],
                ['— Deductions', fmt(totalDeductions), '#ff8a8a'],
                ['Net Pay', fmt(netPay), '#FFD700'],
              ].map(([label, value, color]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 4 }}>{label}</div>
                  <div style={{ color, fontWeight: 700, fontSize: label === 'Net Pay' ? 20 : 15 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 6, fontSize: 12, color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
              <span>VNPF Employee (6%): <strong style={{ color: '#ff8a8a' }}>{fmt(vnpfDeduction)}</strong></span>
              <span>VNPF Employer (6%): <strong style={{ color: '#ff8a8a' }}>{fmt(Math.round(gross * 0.06))}</strong></span>
              <span>Total VNPF contribution: <strong style={{ color: '#FFD700' }}>{fmt(Math.round(gross * 0.12))}</strong></span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '14px 24px', borderTop: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'flex-end', gap: 10, background: '#fafaf8' }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            <i className="ti ti-check"></i> {saving ? 'Processing...' : 'Process Pay Run'}
          </button>
        </div>
      </div>
    </div>
  )
}


function ReminderPreviewModal({ inv, subject, body, bal, onSend, onClose, fmt, fmtDate }) {
  const [editSubject, setEditSubject] = useState(subject)
  const [editBody, setEditBody] = useState(body)
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 640, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}>
        <div style={{ background: 'linear-gradient(135deg,#1A0D06,#3D2214,#5C3D0A)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Payment Reminder Preview</div>
            <div style={{ color: '#FFD700', fontSize: 16, fontWeight: 700, marginTop: 2 }}>{inv.client_name} — {inv.number}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', opacity: 0.7 }}>&times;</button>
        </div>
        <div style={{ overflow: 'auto', padding: 24, flex: 1 }}>
          <div style={{ background: '#FCEBEB', border: '0.5px solid #F7C1C1', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#791F1F', display: 'flex', gap: 10, alignItems: 'center' }}>
            <i className="ti ti-alert-circle"></i>
            <span>Balance due: <strong>{fmt(bal)}</strong> &nbsp;|&nbsp; Due date: <strong>{fmtDate(inv.due_date)}</strong> &nbsp;|&nbsp; To: <strong>{inv.client_email || 'No email on file'}</strong></span>
          </div>
          <Field label="Subject">
            <input type="text" value={editSubject} onChange={e => setEditSubject(e.target.value)} style={{ ...inputStyle, width: '100%' }} />
          </Field>
          <Field label="Message body (editable)">
            <textarea value={editBody} onChange={e => setEditBody(e.target.value)} rows={14} style={{ ...inputStyle, width: '100%', fontFamily: 'monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }} />
          </Field>
        </div>
        <div style={{ padding: '14px 24px', borderTop: '0.5px solid rgba(0,0,0,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, background: '#fafaf8' }}>
          <span style={{ fontSize: 12, color: '#888' }}>{inv.client_email ? 'Will send via API or open in your email app' : '⚠ No email address on file for this client'}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={() => onSend(inv, editSubject, editBody)} disabled={!inv.client_email}>
              <i className="ti ti-mail"></i> Send Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewEmployeeModal({ employee, onClose, onSave }) {
  const isEdit = !!employee
  const [form, setForm] = useState({
    name: employee?.name || '',
    salary: employee?.salary || '',
    vnpf_number: employee?.vnpf_number || '',
    email: employee?.email || ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const salary = parseFloat(form.salary) || 0
  const employeeContrib = Math.round(salary * VNPF_EMPLOYEE_RATE)
  const employerContrib = Math.round(salary * VNPF_EMPLOYER_RATE)

  const handleSave = async () => {
    setError('')
    if (!form.name.trim()) { setError('Employee name is required'); return }
    if (!form.salary || salary <= 0) { setError('Salary is required'); return }
    setSaving(true)
    try {
      const url = isEdit ? '/api/employees/' + employee.id : '/api/employees'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, salary })
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save'); setSaving(false); return }
      onSave()
    } catch (e) { setError('Network error — please try again'); setSaving(false) }
  }

  return (
    <Modal title={isEdit ? 'Edit Employee' : 'Add Employee'} onClose={onClose}>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Employee name *">
          <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="e.g. John Tarileo" />
        </Field>
        <Field label="Job title">
          <input type="text" value={form.job_title} onChange={e => setForm(f => ({ ...f, job_title: e.target.value }))} style={inputStyle} placeholder="e.g. Driver" />
        </Field>
        <Field label="VNPF member number">
         <input type="text" value={form.vnpf_number} onChange={e => setForm(f => ({ ...f, vnpf_number: e.target.value }))} style={inputStyle} placeholder="e.g. VN-12345" />
        </Field>
        <Field label="Monthly gross salary (VT) *">
          <input type="number" value={form.salary} min="0" onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} style={inputStyle} placeholder="0" />
        </Field>
      </div>

      {salary > 0 && (
        <div style={{ background: '#f5f0e8', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 8, color: '#3D2214' }}>VNPF Contribution Preview</div>
          {[
            ['Employee contribution (6%)', fmt(employeeContrib)],
            ['Employer contribution (6%)', fmt(employerContrib)],
            ['Total monthly contribution', fmt(employeeContrib + employerContrib)],
          ].map(([l, v], i) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.09)' : 'none', fontSize: 13 }}>
              <span style={{ color: '#666' }}>{l}</span>
              <span style={{ fontWeight: i === 2 ? 600 : 400, color: i === 2 ? '#2E7D2E' : '#1a1a1a' }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Save Employee'}</button>
      </div>
    </Modal>
  )
}

// ── Clients ───────────────────────────────────────────────
function Clients({ clients, invoices, reload, setModal }) {
  const [editingClient, setEditingClient] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const handleDelete = async (id) => {
    if (!confirm('Delete this client? Their invoices will remain.')) return
    await fetch('/api/clients/' + id, { method: 'DELETE' }); reload()
  }

  const startEdit = (client) => {
    setEditingClient(client.id)
    setEditForm({ name: client.name, email: client.email || '', email2: client.email2 || '', email3: client.email3 || '', phone: client.phone || '', address: client.address || '' })
  }

  const cancelEdit = () => { setEditingClient(null); setEditForm({}) }

  const saveEdit = async (id) => {
    if (!editForm.name.trim()) return
    setSaving(true)
    await fetch('/api/clients/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, all_emails: [editForm.email, editForm.email2, editForm.email3].filter(Boolean).join(', ') })
    })
    setSaving(false)
    setEditingClient(null)
    reload()
  }

  const inputStyle2 = { padding: '5px 8px', borderRadius: 6, border: '0.5px solid rgba(0,0,0,0.2)', fontSize: 13, fontFamily: 'inherit', width: '100%', background: '#fffef8' }

  return (
    <>
      <Topbar title="Clients">
        <button className="btn btn-primary" onClick={() => setModal('newClient')}><i className="ti ti-plus"></i> Add Client</button>
      </Topbar>
      <div style={{ padding: 20 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {clients.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#666' }}>
              <i className="ti ti-users" style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i>
              <p style={{ marginBottom: 14 }}>No clients yet</p>
              <button className="btn btn-primary" onClick={() => setModal('newClient')}>Add first client</button>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#E8D5A3' }}>
                  <Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>Address</Th><Th style={{ textAlign: 'center' }}>Invoices</Th><Th style={{ textAlign: 'center' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {clients.map(c => (
                  editingClient === c.id ? (
                    <tr key={c.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)', background: '#fffef8' }}>
                      <td style={{ padding: '8px 10px' }}>
                        <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} style={{ ...inputStyle2, fontWeight: 600 }} placeholder="Client name *" />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} style={{ ...inputStyle2, marginBottom: 3 }} placeholder="Primary email" />
                        <input type="email" value={editForm.email2 || ''} onChange={e => setEditForm(f => ({ ...f, email2: e.target.value }))} style={{ ...inputStyle2, marginBottom: 3 }} placeholder="Email 2 (optional)" />
                        <input type="email" value={editForm.email3 || ''} onChange={e => setEditForm(f => ({ ...f, email3: e.target.value }))} style={inputStyle2} placeholder="Email 3 (optional)" />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="tel" value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle2} placeholder="+678 ..." />
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <input type="text" value={editForm.address} onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))} style={inputStyle2} placeholder="Address" />
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>{invoices.filter(i => i.client_id === c.id).length}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                          <button className="btn btn-sm btn-primary" onClick={() => saveEdit(c.id)} disabled={saving}><i className="ti ti-check"></i> {saving ? '...' : 'Save'}</button>
                          <button className="btn btn-sm" onClick={cancelEdit}><i className="ti ti-x"></i> Cancel</button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={c.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}>
                      <td style={{ padding: '11px 14px' }}><strong>{c.name}</strong></td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{[c.email, c.email2, c.email3].filter(Boolean).join(', ') || '—'}</td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{c.phone || '—'}</td>
                      <td style={{ padding: '11px 14px', color: '#666' }}>{c.address || '—'}</td>
                      <td style={{ padding: '11px 14px', textAlign: 'center' }}>{invoices.filter(i => i.client_id === c.id).length}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
                          <button className="btn btn-sm" onClick={() => startEdit(c)}><i className="ti ti-pencil"></i> Edit</button>
                          <button className="btn btn-sm" style={{ borderColor: '#A32D2D', color: '#A32D2D' }} onClick={() => handleDelete(c.id)}><i className="ti ti-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}


function previewInvoice(inv) {
  const w = window.open('', '_blank')
  if (!w) { alert('Please allow popups for this site to preview invoices.'); return }
  w.document.write(`<!DOCTYPE html><html><head><title>Invoice Preview</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; color: #222; font-size: 13px; background: #f0ebe0; }
    .page { max-width: 800px; margin: 20px auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #1A0D06 0%, #3D2214 50%, #5C3D0A 100%); padding: 28px 40px; display: flex; justify-content: space-between; align-items: flex-start; }
    .logo-contact { font-size: 10px; color: rgba(255,255,255,0.7); margin-top: 10px; line-height: 1.8; }
    .inv-meta { text-align: right; color: #fff; }
    .inv-num { font-size: 26px; font-weight: 700; color: #FFD700; }
    .inv-date { font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 5px; line-height: 1.8; }
    .draft-badge { display: inline-block; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: #FFD700; padding: 3px 12px; border-radius: 99px; font-size: 10px; font-weight: 700; letter-spacing: 1px; margin-top: 8px; }
    .body { padding: 32px 40px; }
    .bill-row { display: flex; justify-content: space-between; margin-bottom: 28px; gap: 20px; }
    .bill-label { font-size: 9px; font-weight: 800; color: #8B6914; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #8B6914; padding-bottom: 3px; margin-bottom: 8px; display: inline-block; }
    .bill-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
    .bill-detail { font-size: 12px; color: #555; line-height: 1.7; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    thead tr { background: linear-gradient(135deg, #3D2214, #8B6914); }
    th { padding: 10px 14px; text-align: left; font-size: 10px; font-weight: 700; color: #FFD700; letter-spacing: 1px; text-transform: uppercase; }
    td { padding: 11px 14px; border-bottom: 1px solid #f0ebe0; font-size: 13px; }
    tr:nth-child(even) td { background: #faf6ee; }
    .text-right { text-align: right; }
    .totals { margin-left: auto; width: 280px; margin-top: 12px; }
    .trow { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #555; }
    .trow.grand { border-bottom: none; font-size: 17px; font-weight: 800; color: #3D2214; padding-top: 12px; }
    .notes { background: #faf6ee; border-left: 4px solid #8B6914; padding: 12px 16px; border-radius: 0 6px 6px 0; margin-top: 20px; font-size: 12px; color: #555; }
    .thankyou { text-align: center; font-size: 14px; font-weight: 600; color: #8B6914; margin: 24px 0 16px; font-style: italic; }
    .footer { background: linear-gradient(135deg, #1A0D06, #5C3D0A); padding: 18px 40px; display: flex; justify-content: space-between; align-items: center; }
    .footer-l { color: rgba(255,255,255,0.85); font-size: 11px; line-height: 1.9; }
    .footer-r { text-align: right; color: #FFD700; font-size: 11px; line-height: 1.9; }
    .noprint { background: #333; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
    .printbtn { background: #8B6914; color: #fff; border: none; padding: 7px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .rpt-hdr { display: none; }
    @page { margin: 18mm 15mm 22mm 15mm; size: A4; }
    @media print {
      .noprint { display: none; }
      body { background: #fff; }
      .page { box-shadow: none; margin: 0; border-radius: 0; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      thead { display: table-header-group; }
      .pgnum::after { content: counter(page); }
      body { counter-reset: page; }
      .rpt-hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #8B6914; padding-bottom: 6px; }
      .rpt-hdr { position: fixed; top: 0; left: 0; right: 0; background: #fff; z-index: 999; padding: 6px 40px; }
      .page { padding-top: 40px; }
    }
  </style></head><body>
  <div class="rpt-hdr">
    <span style="font-size:11px;font-weight:700;color:#3D2214">Malakesa Transfer &amp; Tour &nbsp;—&nbsp; DRAFT PREVIEW</span>
    <span style="font-size:10px;color:#888">Page <span class="pgnum"></span></span>
  </div>
  <div class="noprint">
    <span>⚠️ DRAFT PREVIEW — Invoice not saved yet</span>
    <button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button>
  </div>
  <div class="page">
    <div class="header">
      <div>
        <img src="${MALAKESA_LOGO}" alt="Malakesa Transfer and Tour" style="width:220px;border-radius:6px;display:block" />
        <div class="logo-contact">
          📍 Port Vila, Shefa Province, Vanuatu<br>
          📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
        </div>
      </div>
      <div class="inv-meta">
        <div class="inv-num">${inv.number || 'DRAFT'}</div>
        <div class="inv-date">
          Issue date: <strong>${inv.date || ''}</strong><br>
          Due date: <strong>${inv.due_date || ''}</strong>
        </div>
        <div class="draft-badge">PREVIEW</div>
      </div>
    </div>
    <div class="body">
      <div class="bill-row">
        <div>
          <div class="bill-label">Bill to</div>
          <div class="bill-name">${inv.client_name || '—'}</div>
          <div class="bill-detail">${inv.client_email || ''}</div>
        </div>
        <div style="text-align:right">
          <div class="bill-label">Invoice details</div>
          <div class="bill-detail">Invoice #: <strong>${inv.number || 'DRAFT'}</strong></div>
          <div class="bill-detail">Issue: <strong>${inv.date || ''}</strong></div>
          <div class="bill-detail">Due: <strong>${inv.due_date || ''}</strong></div>
        </div>
      </div>
      <table>
        <thead><tr><th>Description</th><th class="text-right">Qty</th><th class="text-right">Rate (VT)</th><th class="text-right">Amount (VT)</th></tr></thead>
        <tbody>${(inv.items || []).map(it => '<tr><td>' + (it.description || '') + '</td><td class="text-right">' + (it.qty || 0) + '</td><td class="text-right">VT ' + Number(it.rate || 0).toLocaleString() + '</td><td class="text-right">VT ' + Number(it.total || 0).toLocaleString() + '</td></tr>').join('')}</tbody>
      </table>
      <div class="totals">
        <div class="trow"><span>Subtotal</span><span>VT ${Number(inv.subtotal || 0).toLocaleString()}</span></div>
        <div class="trow"><span>${inv.tax > 0 ? 'VAT (15%)' : 'VAT'}</span><span>${inv.tax > 0 ? 'VT ' + Number(inv.tax).toLocaleString() : 'Not applicable'}</span></div>
        <div class="trow grand"><span>TOTAL DUE</span><span>VT ${Number(inv.total || 0).toLocaleString()}</span></div>
      </div>
      ${inv.notes ? '<div class="notes"><strong>Notes:</strong> ' + inv.notes + '</div>' : ''}
      <div class="thankyou">Tankiu Tumas — Thank you for choosing Malakesa Transfer &amp; Tour!</div>
    </div>
    <div class="footer">
      <div class="footer-l">
        <div><strong style="color:#FFD700">Malakesa Transfer &amp; Tour</strong></div>
        <div>Port Vila, Shefa Province, Vanuatu</div>
        <div>📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu</div>
      </div>
      <div class="footer-r">
        <div>Payment due: ${inv.due_date || ''}</div>
        <div>Cash | Bank Transfer | Mobile Money</div>
        <div style="font-size:10px;color:rgba(255,215,0,0.6);margin-top:4px">Computer generated invoice</div>
      </div>
    </div>
  </div>
  <script>window.document.close()<\/script>
  </body></html>`)
}


function NewInvoiceModal({ clients, onClose, onSave }) {
  const [form, setForm] = useState({ client_id: '', client_name: '', client_email: '', date: todayStr(), due_date: addDays(todayStr(), 14), notes: '' })
  const [items, setItems] = useState([{ id: uid(), description: '', qty: 1, rate: '', total: 0 }, { id: uid(), description: '', qty: 1, rate: '', total: 0 }])
  const [applyVat, setApplyVat] = useState(true)
  const vatInclusive = true // Rates are always VAT-inclusive at Malakesa
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateItem = (id, field, value) => setItems(items => items.map(item => {
    if (item.id !== id) return item
    const u = { ...item, [field]: value }
    u.total = (parseFloat(u.qty) || 0) * (parseFloat(u.rate) || 0)
    return u
  }))
  const lineTotal = items.reduce((s, i) => s + (i.total || 0), 0)
  // VAT-inclusive: rate entered includes VAT, so we extract it
  // VAT-exclusive: rate is pre-VAT, we add VAT on top
  const subtotal = applyVat && vatInclusive ? Math.round(lineTotal / 1.15) : lineTotal
  const tax = applyVat ? Math.round(subtotal * 0.15) : 0
  const total = applyVat && vatInclusive ? lineTotal : subtotal + tax

  const handleSave = async () => {
    setError('')
    if (!form.client_id) { setError('Please select a client'); return }
    const validItems = items.filter(i => i.description.trim())
    if (!validItems.length) { setError('Add at least one line item'); return }
    setSaving(true)
    const res = await fetch('/api/invoices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, items: validItems.map(({ id, ...r }) => r), subtotal, tax, total, vat_applied: applyVat }) })
    if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save'); setSaving(false); return }
    onSave()
  }

  return (
    <Modal title="New Invoice" onClose={onClose} wide>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <Field label="Client *">
          <select value={form.client_id} onChange={e => { const c = clients.find(x => x.id === e.target.value); setForm(f => ({ ...f, client_id: e.target.value, client_name: c?.name || '', client_email: c?.email || '' })) }} style={inputStyle}>
            <option value="">— Select client —</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Client email"><input type="email" value={form.client_email} onChange={e => setForm(f => ({ ...f, client_email: e.target.value }))} style={inputStyle} placeholder="client@email.com" /></Field>
        <Field label="Invoice date"><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Due date"><input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Notes / trip details" style={{ gridColumn: '1/-1' }}><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} placeholder="Route, pickup time, special instructions..." /></Field>
        <div style={{ gridColumn: '1/-1', background: '#faf6ee', borderRadius: 8, border: '0.5px solid #E8D5A3', padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: applyVat ? 10 : 0 }}>
            <input type="checkbox" id="vatcheck" checked={applyVat} onChange={e => setApplyVat(e.target.checked)} style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#8B6914' }} />
            <label htmlFor="vatcheck" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 600, color: applyVat ? '#27500A' : '#666', userSelect: 'none' }}>
              {applyVat ? '✓ Rates are VAT-inclusive — VAT is extracted for reporting' : 'No VAT — zero rated invoice'}
            </label>
          </div>
          {applyVat && (
            <div style={{ fontSize: 12, color: '#27500A', background: '#EAF3DE', borderRadius: 6, padding: '7px 12px', marginTop: 2 }}>
              <i className="ti ti-info-circle" style={{ marginRight: 5 }}></i>
              Rates are <strong>VAT-inclusive (15%)</strong>. VAT is automatically extracted from the total for reporting.
            </div>
          )}
        </div>
      </div>
      <div style={{ fontWeight: 500, marginBottom: 10 }}>Line items</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
        <thead><tr style={{ background: '#E8D5A3' }}><Th style={{ width: '42%' }}>Description</Th><Th style={{ width: '12%' }}>Qty</Th><Th style={{ width: '20%' }}>{applyVat ? 'Rate (VT incl. VAT)' : 'Rate (VT)'}</Th><Th style={{ width: '18%' }}>Total</Th><Th style={{ width: '8%' }}></Th></tr></thead>
        <tbody>{items.map(item => (
          <tr key={item.id}>
            <td style={{ padding: '4px 4px' }}><input type="text" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} style={inputStyle} placeholder="e.g. Airport transfer..." /></td>
            <td style={{ padding: '4px 4px' }}><input type="number" value={item.qty} min="0" step="0.5" onChange={e => updateItem(item.id, 'qty', e.target.value)} style={inputStyle} /></td>
            <td style={{ padding: '4px 4px' }}><input type="number" value={item.rate} min="0" onChange={e => updateItem(item.id, 'rate', e.target.value)} style={inputStyle} placeholder="0" /></td>
            <td style={{ padding: '4px 10px', fontWeight: 500 }}>{fmt(item.total)}</td>
            <td style={{ padding: '4px 4px' }}><button className="btn btn-sm" onClick={() => setItems(i => i.filter(x => x.id !== item.id))}><i className="ti ti-x"></i></button></td>
          </tr>
        ))}</tbody>
      </table>
      <button className="btn btn-sm" onClick={() => setItems(i => [...i, { id: uid(), description: '', qty: 1, rate: '', total: 0 }])}><i className="ti ti-plus"></i> Add item</button>
      <div style={{ marginLeft: 'auto', width: 280, marginTop: 12 }}>
        {applyVat ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}><span style={{ color: '#666' }}>Subtotal (ex-VAT)</span><span>{fmt(subtotal)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}><span style={{ color: '#666' }}>VAT (15% extracted)</span><span style={{ color: '#8B6914' }}>{fmt(tax)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 15, fontWeight: 600 }}><span>Total (VAT inclusive)</span><span>{fmt(total)}</span></div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}><span style={{ color: '#666' }}>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13 }}><span style={{ color: '#666' }}>VAT</span><span>Not applicable</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 15, fontWeight: 600 }}><span>Total</span><span>{fmt(total)}</span></div>
          </>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <button className="btn" onClick={() => previewInvoice({ ...form, items: items.filter(i => i.description.trim()), subtotal, tax, total })}>
          <i className="ti ti-eye"></i> Preview Invoice
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Save Invoice'}</button>
        </div>
      </div>
    </Modal>
  )
}

function PaymentModal({ invoice, payments, onClose, onSave }) {
  const balance = getBalance(invoice, payments)
  const [form, setForm] = useState({ amount: balance, method: 'Cash', date: todayStr(), note: '' })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.amount || form.amount <= 0) return
    setSaving(true)
    await fetch('/api/payments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoice_id: invoice.id, ...form, amount: parseFloat(form.amount) }) })
    onSave()
  }

  return (
    <Modal title="Record Payment" onClose={onClose}>
      <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>{invoice.number} — {invoice.client_name}</div>
      <Alert type="warning">Balance due: <strong>{fmt(balance)}</strong></Alert>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
        <Field label="Amount (VT)"><input type="number" value={form.amount} min="0" onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Payment method">
          <select value={form.method} onChange={e => setForm(f => ({ ...f, method: e.target.value }))} style={inputStyle}>
            <option>Cash</option><option>Bank transfer</option><option>Mobile money</option><option>Cheque</option><option>Other</option>
          </select>
        </Field>
        <Field label="Date"><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} /></Field>
        <Field label="Reference / note (optional)"><input type="text" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} style={inputStyle} placeholder="Bank ref, receipt number..." /></Field>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Confirm Payment'}</button>
      </div>
    </Modal>
  )
}


function ViewInvoiceModal({ invoice, payments, onClose, onPay }) {
  const invPayments = payments.filter(p => p.invoice_id === invoice.id)
  const balance = getBalance(invoice, payments)
  const status = getStatus(invoice, payments)

  const printInvoice = () => {
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups for this site to print invoices.'); return }
    const statusColors = { paid: '#27500A', unpaid: '#712B13', overdue: '#791F1F', partial: '#633806', draft: '#444441' }
    const statusBg = { paid: '#E3F2DE', unpaid: '#FAECE7', overdue: '#FCEBEB', partial: '#FAEEDA', draft: '#F1EFE8' }
    w.document.write(`<!DOCTYPE html><html><head><title>${invoice.number}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; color: #222; font-size: 13px; background: #f0ebe0; }
    .page { max-width: 800px; margin: 20px auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #1A0D06 0%, #3D2214 50%, #5C3D0A 100%); padding: 28px 40px; display: flex; justify-content: space-between; align-items: flex-start; }
    .logo-contact { font-size: 10px; color: rgba(255,255,255,0.7); margin-top: 10px; line-height: 1.8; }
    .inv-meta { text-align: right; color: #fff; }
    .inv-num { font-size: 26px; font-weight: 700; color: #FFD700; }
    .inv-date { font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 5px; line-height: 1.8; }
    .status-badge { display: inline-block; padding: 3px 12px; border-radius: 99px; font-size: 10px; font-weight: 700; letter-spacing: 1px; margin-top: 8px; text-transform: uppercase; }
    .body { padding: 32px 40px; }
    .bill-row { display: flex; justify-content: space-between; margin-bottom: 28px; gap: 20px; }
    .bill-label { font-size: 9px; font-weight: 800; color: #8B6914; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #8B6914; padding-bottom: 3px; margin-bottom: 8px; display: inline-block; }
    .bill-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
    .bill-detail { font-size: 12px; color: #555; line-height: 1.7; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    thead tr { background: linear-gradient(135deg, #3D2214, #8B6914); }
    th { padding: 10px 14px; text-align: left; font-size: 10px; font-weight: 700; color: #FFD700; letter-spacing: 1px; text-transform: uppercase; }
    td { padding: 11px 14px; border-bottom: 1px solid #f0ebe0; font-size: 13px; }
    tr:nth-child(even) td { background: #faf6ee; }
    .text-right { text-align: right; }
    .totals { margin-left: auto; width: 280px; margin-top: 12px; }
    .trow { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #555; }
    .trow.grand { border-bottom: none; font-size: 17px; font-weight: 800; color: #3D2214; padding-top: 12px; }
    .trow.balance { font-weight: 700; }
    .notes { background: #faf6ee; border-left: 4px solid #8B6914; padding: 12px 16px; border-radius: 0 6px 6px 0; margin-top: 20px; font-size: 12px; color: #555; }
    .payments { margin-top: 20px; }
    .payments-title { font-size: 12px; font-weight: 700; color: #3D2214; margin-bottom: 6px; }
    .payrow { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f0ebe0; font-size: 12px; }
    .thankyou { text-align: center; font-size: 14px; font-weight: 600; color: #8B6914; margin: 24px 0 16px; font-style: italic; }
    .footer { background: linear-gradient(135deg, #1A0D06, #5C3D0A); padding: 18px 40px; display: flex; justify-content: space-between; align-items: center; }
    .footer-l { color: rgba(255,255,255,0.85); font-size: 11px; line-height: 1.9; }
    .footer-r { text-align: right; color: #FFD700; font-size: 11px; line-height: 1.9; }
    .noprint { background: #333; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
    .printbtn { background: #8B6914; color: #fff; border: none; padding: 7px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .rpt-hdr { display: none; }
    @page { margin: 18mm 15mm 22mm 15mm; size: A4; }
    @media print {
      .noprint { display: none; }
      body { background: #fff; }
      .page { box-shadow: none; margin: 0; border-radius: 0; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      thead { display: table-header-group; }
      .pgnum::after { content: counter(page); }
      body { counter-reset: page; }
      .rpt-hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #8B6914; padding-bottom: 6px; margin-bottom: 4px; }
      .rpt-hdr { position: fixed; top: 0; left: 0; right: 0; background: #fff; z-index: 999; padding: 6px 40px; }
      .page { padding-top: 40px; }
      .page .header { margin-top: 0; }
    }
  </style></head><body>
  <div class="rpt-hdr">
    <span style="font-size:11px;font-weight:700;color:#3D2214">Malakesa Transfer &amp; Tour &nbsp;—&nbsp; Invoice ${invoice.number} &nbsp;—&nbsp; ${invoice.client_name || ''}</span>
    <span style="font-size:10px;color:#888">Page <span class="pgnum"></span></span>
  </div>
  <div class="noprint">
    <span>Invoice ${invoice.number}</span>
    <button class="printbtn" onclick="window.print()">🖨️ Print / Save PDF</button>
  </div>
  <div class="page">
    <div class="header">
      <div>
        <img src="${MALAKESA_LOGO}" alt="Malakesa Transfer and Tour" style="width:220px;border-radius:6px;display:block" />
        <div class="logo-contact">
          📍 Port Vila, Shefa Province, Vanuatu<br>
          📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu
        </div>
      </div>
      <div class="inv-meta">
        <div class="inv-num">${invoice.number}</div>
        <div class="inv-date">
          Issue date: <strong>${fmtDate(invoice.date)}</strong><br>
          Due date: <strong>${fmtDate(invoice.due_date)}</strong>
        </div>
        <div class="status-badge" style="background:${statusBg[status] || '#F1EFE8'};color:${statusColors[status] || '#444441'}">${status}</div>
      </div>
    </div>
    <div class="body">
      <div class="bill-row">
        <div>
          <div class="bill-label">Bill to</div>
          <div class="bill-name">${invoice.client_name || '—'}</div>
          <div class="bill-detail">${invoice.client_email || ''}</div>
        </div>
        <div style="text-align:right">
          <div class="bill-label">Invoice details</div>
          <div class="bill-detail">Invoice #: <strong>${invoice.number}</strong></div>
          <div class="bill-detail">Issue: <strong>${fmtDate(invoice.date)}</strong></div>
          <div class="bill-detail">Due: <strong>${fmtDate(invoice.due_date)}</strong></div>
        </div>
      </div>
      <table>
        <thead><tr><th>Description</th><th class="text-right">Qty</th><th class="text-right">Rate (VT)</th><th class="text-right">Amount (VT)</th></tr></thead>
        <tbody>${(invoice.items || []).map(it => '<tr><td>' + (it.description || '') + '</td><td class="text-right">' + (it.qty || 0) + '</td><td class="text-right">VT ' + Number(it.rate || 0).toLocaleString() + '</td><td class="text-right">VT ' + Number(it.total || 0).toLocaleString() + '</td></tr>').join('')}</tbody>
      </table>
      <div class="totals">
        <div class="trow"><span>Subtotal</span><span>VT ${Number(invoice.subtotal || 0).toLocaleString()}</span></div>
        <div class="trow"><span>${invoice.tax > 0 ? 'VAT (15%)' : 'VAT'}</span><span>${invoice.tax > 0 ? 'VT ' + Number(invoice.tax).toLocaleString() : 'Not applicable'}</span></div>
        <div class="trow grand"><span>TOTAL DUE</span><span>VT ${Number(invoice.total || 0).toLocaleString()}</span></div>
        <div class="trow balance" style="color:${balance > 0 ? '#D85A30' : '#3B6D11'}"><span>Balance due</span><span>VT ${Number(balance).toLocaleString()}</span></div>
      </div>
      ${invPayments.length > 0 ? `<div class="payments"><div class="payments-title">Payments received</div>${invPayments.map(p => `<div class="payrow"><span>${fmtDate(p.date)} — ${p.method}</span><span style="color:#3B6D11;font-weight:bold">VT ${Number(p.amount).toLocaleString()}</span></div>`).join('')}</div>` : ''}
      ${invoice.notes ? '<div class="notes"><strong>Notes:</strong> ' + invoice.notes + '</div>' : ''}
      <div class="thankyou">Tankiu Tumas — Thank you for choosing Malakesa Transfer &amp; Tour!</div>
    </div>
    <div class="footer">
      <div class="footer-l">
        <div><strong style="color:#FFD700">Malakesa Transfer &amp; Tour</strong></div>
        <div>Port Vila, Shefa Province, Vanuatu</div>
        <div>📞 +678 22712 &nbsp;|&nbsp; 📱 +678 7798712 &nbsp;|&nbsp; ✉️ accounts@malakesa.vu</div>
      </div>
      <div class="footer-r">
        <div>Payment due: ${fmtDate(invoice.due_date)}</div>
        <div>Cash | Bank Transfer | Mobile Money</div>
        <div style="opacity:0.7">Computer generated invoice</div>
      </div>
    </div>
  </div>
  <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const printReceipt = (payment) => {
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow popups to print receipts.'); return }
    const receiptNum = payment.receipt_number || `RCT-${(payment.id||'').slice(-4).toUpperCase()}`
    w.document.write(`<!DOCTYPE html><html><head><title>${receiptNum}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f0ebe0; }
    .page { max-width: 520px; margin: 20px auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #1A0D06 0%, #3D2214 50%, #5C3D0A 100%); padding: 24px 32px; text-align: center; }
    .rec-label { font-size: 10px; color: rgba(255,255,255,0.6); letter-spacing: 3px; margin-top: 10px; }
    .rec-num { font-size: 20px; font-weight: 700; color: #FFD700; margin-top: 2px; }
    .body { padding: 24px 32px; }
    .paid-stamp { text-align: center; margin: 16px 0; }
    .paid-box { display: inline-block; border: 3px solid #3B6D11; color: #3B6D11; font-size: 22px; font-weight: 900; letter-spacing: 6px; padding: 6px 24px; border-radius: 4px; transform: rotate(-3deg); }
    .section { margin: 16px 0; padding: 14px 16px; background: #faf6ee; border-radius: 6px; }
    .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f0ebe0; font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .label { color: #888; }
    .val { font-weight: 600; color: #222; }
    .amount-box { background: linear-gradient(135deg, #3D2214, #8B6914); border-radius: 6px; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; margin: 16px 0; }
    .thankyou { text-align: center; font-size: 13px; font-style: italic; color: #8B6914; margin: 16px 0 8px; }
    .footer { background: linear-gradient(135deg, #1A0D06, #5C3D0A); padding: 14px 32px; text-align: center; color: rgba(255,255,255,0.7); font-size: 10px; line-height: 1.9; }
    .noprint { background: #333; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
    .printbtn { background: #8B6914; color: #fff; border: none; padding: 7px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .rpt-hdr { display: none; }
    @page { margin: 12mm 10mm 16mm 10mm; size: A4; }
    @media print {
      .noprint { display: none; }
      body { background: #fff; }
      .page { box-shadow: none; margin: 0; max-width: 100%; border-radius: 0; }
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .rpt-hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #8B6914; padding-bottom: 5px; }
      .rpt-hdr { position: fixed; top: 0; left: 0; right: 0; background: #fff; z-index: 999; padding: 5px 32px; }
      .page { padding-top: 36px; }
    }
  </style></head><body>
  <div class="rpt-hdr">
    <span style="font-size:11px;font-weight:700;color:#3D2214">Malakesa Transfer &amp; Tour &nbsp;—&nbsp; Payment Receipt &nbsp;—&nbsp; ${receiptNum}</span>
    <span style="font-size:10px;color:#888">Page <span class="pgnum"></span></span>
  </div>
  <div class="noprint"><span>${receiptNum}</span><button class="printbtn" onclick="window.print()">Print / Save PDF</button></div>
  <div class="page">
    <div class="header">
      <img src="${MALAKESA_LOGO}" alt="Malakesa Transfer and Tour" style="width:200px;border-radius:6px;display:block;margin:0 auto" />
      <div class="rec-label">PAYMENT RECEIPT</div>
      <div class="rec-num">${receiptNum}</div>
    </div>
    <div class="body">
      <div class="paid-stamp"><div class="paid-box">PAID</div></div>
      <div class="section">
        <div class="row"><span class="label">Receipt No.</span><span class="val">${receiptNum}</span></div>
        <div class="row"><span class="label">Invoice No.</span><span class="val">${invoice.number}</span></div>
        <div class="row"><span class="label">Date paid</span><span class="val">${fmtDate(payment.date)}</span></div>
        <div class="row"><span class="label">Payment method</span><span class="val">${payment.method}</span></div>
        ${payment.notes ? '<div class="row"><span class="label">Notes</span><span class="val">' + payment.notes + '</span></div>' : ''}
      </div>
      <div class="section">
        <div class="row"><span class="label">Client</span><span class="val">${invoice.client_name}</span></div>
        <div class="row"><span class="label">Invoice total</span><span class="val">VT ${Number(invoice.total).toLocaleString()}</span></div>
      </div>
      <div class="amount-box">
        <span style="color:#fff;font-weight:700;font-size:15px">AMOUNT RECEIVED</span>
        <span style="color:#FFD700;font-weight:700;font-size:22px">VT ${Number(payment.amount).toLocaleString()}</span>
      </div>
      <div class="thankyou">Tankiu Tumas — Thank you for your payment!</div>
    </div>
    <div class="footer">
      Malakesa Transfer and Tour | Port Vila, Shefa Province, Vanuatu<br>
      +678 22712 | +678 7798712 | accounts@malakesa.vu
    </div>
  </div>
  <script>window.onload=()=>window.print()<\/script></body></html>`)
    w.document.close()
  }

  const [receiptStatus, setReceiptStatus] = useState({})

  const emailReceipt = async (payment) => {
    const pid = payment.id || 'x'
    setReceiptStatus(s => ({ ...s, [pid]: 'sending' }))
    try {
      const res = await fetch('/api/send-receipt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: invoice.id, paymentId: pid }) })
      const data = await res.json()
      if (res.ok) {
        setReceiptStatus(s => ({ ...s, [pid]: 'Sent to ' + (data.sentTo || []).join(', ') }))
        setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 5000)
      } else {
        setReceiptStatus(s => ({ ...s, [pid]: 'error: ' + (data.error || 'Failed') }))
        setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 6000)
      }
    } catch (e) {
      setReceiptStatus(s => ({ ...s, [pid]: 'error: ' + e.message }))
      setTimeout(() => setReceiptStatus(s => ({ ...s, [pid]: '' })), 6000)
    }
  }

  const [emailStatus, setEmailStatus] = useState('')

  const emailInvoice = async () => {
    setEmailStatus('sending')
    try {
      const res = await fetch('/api/send-invoice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invoiceId: invoice.id }) })
      const data = await res.json()
      if (res.ok) { setEmailStatus('Sent to ' + (data.sentTo || []).join(', ')); setTimeout(() => setEmailStatus(''), 5000); return }
      setEmailStatus('error: ' + (data.error || 'Failed to send'))
      setTimeout(() => setEmailStatus(''), 6000)
    } catch (e) { setEmailStatus('error: ' + e.message); setTimeout(() => setEmailStatus(''), 6000) }
  }

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.number} from Malakesa Transfer and Tour`)
    const body = encodeURIComponent(`Dear ${invoice.client_name},\n\nPlease find your invoice ${invoice.number} for ${fmt(invoice.total)}, due ${fmtDate(invoice.due_date)}.\n\nTotal: ${fmt(invoice.total)}\nBalance due: ${fmt(balance)}\n\nThank you,\nMalakesa Transfer and Tour`)
    window.open(`mailto:${invoice.client_email || ''}?subject=${subject}&body=${body}`, '_blank')
  }

  return (
    <Modal title={invoice.number} onClose={onClose} wide>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Badge status={status} />
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-sm" onClick={printInvoice}><i className="ti ti-printer"></i> Print</button>
          <button className="btn btn-sm" onClick={emailInvoice} disabled={emailStatus === 'sending'}><i className="ti ti-mail"></i> {emailStatus === 'sending' ? 'Sending...' : 'Email'}</button>
          {emailStatus && emailStatus !== 'sending' && (
            <span style={{ fontSize: 12, color: emailStatus.startsWith('error') ? '#D85A30' : '#3B6D11', display: 'flex', alignItems: 'center', gap: 6 }}>
              {emailStatus.startsWith('error') ? emailStatus.replace('error: ', '') : emailStatus}
              {emailStatus.startsWith('error') && <button className="btn btn-sm" onClick={mailtoFallback} style={{ fontSize: 11 }}>Open in mail app</button>}
            </span>
          )}
          {balance > 0 && <button className="btn btn-sm" style={{ borderColor: '#3B6D11', color: '#3B6D11' }} onClick={onPay}><i className="ti ti-cash"></i> Record payment</button>}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div><div style={{ fontSize: 12, color: '#666' }}>Bill to</div><div style={{ fontWeight: 500 }}>{invoice.client_name}</div><div style={{ fontSize: 12, color: '#666' }}>{invoice.client_email}</div></div>
        <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, color: '#666' }}>Issue date</div><div>{fmtDate(invoice.date)}</div><div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Due date</div><div style={status === 'overdue' ? { color: '#A32D2D', fontWeight: 500 } : {}}>{fmtDate(invoice.due_date)}</div></div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 12 }}>
        <thead><tr style={{ background: '#E8D5A3' }}><Th>Description</Th><Th style={{ textAlign: 'center' }}>Qty</Th><Th style={{ textAlign: 'right' }}>Rate</Th><Th style={{ textAlign: 'right' }}>Total</Th></tr></thead>
        <tbody>{(invoice.items || []).map((it, i) => <tr key={i} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.09)' }}><Td>{it.description}</Td><Td style={{ textAlign: 'center' }}>{it.qty}</Td><Td style={{ textAlign: 'right' }}>{fmt(it.rate)}</Td><Td style={{ textAlign: 'right', fontWeight: 500 }}>{fmt(it.total)}</Td></tr>)}</tbody>
      </table>
      <div style={{ marginLeft: 'auto', width: 260 }}>
        {[['Subtotal', fmt(invoice.subtotal)], ['VAT (15%)', fmt(Math.round(Number(invoice.subtotal)*0.15))], ['Total', fmt(invoice.total)]].map(([l, v], i) => <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.09)' : 'none', fontWeight: i === 2 ? 500 : 400 }}><span style={{ color: i < 2 ? '#666' : 'inherit' }}>{l}</span><span>{v}</span></div>)}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontWeight: 500, color: balance > 0 ? '#D85A30' : '#3B6D11' }}><span>Balance due</span><span>{fmt(balance)}</span></div>
      </div>
      {invoice.notes && <div style={{ marginTop: 12, padding: '10px 14px', background: '#E8D5A3', borderRadius: 8, fontSize: 13, color: '#666' }}>{invoice.notes}</div>}
      {invPayments.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>Payments received</div>
          {invPayments.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '0.5px solid rgba(0,0,0,0.09)', fontSize: 13, gap: 8 }}>
              <span><span style={{ color: '#8B6914', fontWeight: 600, marginRight: 6 }}>{p.receipt_number || '—'}</span>{fmtDate(p.date)} — <span style={{ background: '#E8D5A3', padding: '1px 8px', borderRadius: 99, fontSize: 11 }}>{p.method}</span>{p.note ? ` · ${p.note}` : ''}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#3B6D11', fontWeight: 500 }}>{fmt(p.amount)}</span>
                <button className="btn btn-sm" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => printReceipt(p)}><i className="ti ti-printer"></i> Receipt</button>
                <button className="btn btn-sm" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => emailReceipt(p)} disabled={receiptStatus[p.id] === 'sending'}><i className="ti ti-mail"></i> {receiptStatus[p.id] === 'sending' ? '...' : 'Receipt'}</button>
                {receiptStatus[p.id] && receiptStatus[p.id] !== 'sending' && <span style={{ fontSize: 11, color: receiptStatus[p.id].startsWith('error') ? '#D85A30' : '#3B6D11' }}>{receiptStatus[p.id].startsWith('error') ? 'Failed' : '✓ Sent'}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}

function NewClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [emails, setEmails] = useState([''])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const addEmail = () => setEmails(e => [...e, ''])
  const removeEmail = (idx) => setEmails(e => e.filter((_, i) => i !== idx))
  const updateEmail = (idx, val) => setEmails(e => e.map((em, i) => i === idx ? val : em))

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required'); return }
    const validEmails = emails.filter(e => e.trim())
    setSaving(true)
    try {
      const res = await fetch('/api/clients', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, email: validEmails[0] || '', email2: validEmails[1] || null, email3: validEmails[2] || null, all_emails: validEmails.join(', ') })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to save client'); setSaving(false); return }
      onSave()
    } catch(e) { setError('Network error — please try again'); setSaving(false) }
  }

  return (
    <Modal title="Add Client" onClose={onClose}>
      {error && <Alert type="danger">{error}</Alert>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Business / client name *">
          <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="e.g. Blue Lagoon Resorts" />
        </Field>
        <div>
          <label style={{ fontSize: 12, color: '#666', fontWeight: 500, marginBottom: 6, display: 'block' }}>
            Email address(es) <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 8 }}>— invoices & reminders sent to all</span>
          </label>
          {emails.map((em, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <input type="email" value={em} onChange={e => updateEmail(idx, e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder={idx === 0 ? 'primary@client.vu' : `additional${idx + 1}@client.vu`} />
              {idx === 0
                ? <button className="btn btn-sm" onClick={addEmail} style={{ background: '#8B6914', borderColor: '#6B5010', color: '#fff' }}><i className="ti ti-plus"></i></button>
                : <button className="btn btn-sm btn-danger" onClick={() => removeEmail(idx)}><i className="ti ti-x"></i></button>
              }
            </div>
          ))}
          {emails.length > 1 && <div style={{ fontSize: 11, color: '#8B6914', marginTop: 2 }}>✓ Emails & reminders will be sent to all {emails.filter(e=>e.trim()).length} addresses</div>}
        </div>
        <Field label="Phone"><input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} placeholder="+678 ..." /></Field>
        <Field label="Address"><input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} style={inputStyle} placeholder="Port Vila, Vanuatu" /></Field>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="ti ti-check"></i> {saving ? 'Saving...' : 'Save Client'}</button>
      </div>
    </Modal>
  )
}

// ── Reusable components ───────────────────────────────────
const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '0.5px solid rgba(0,0,0,0.15)', background: '#fff', color: '#1a1a1a', fontSize: 13, fontFamily: 'inherit', width: '100%' }

function Topbar({ title, children }) {
  return (
    <div style={{ background: '#fff', borderBottom: '0.5px solid rgba(0,0,0,0.09)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
      <h1 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>{title}</h1>
      <div>{children}</div>
    </div>
  )
}

function Card({ children, style }) {
  return <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.09)', borderRadius: 12, padding: '16px 20px', marginBottom: 16, ...style }}>{children}</div>
}

function StatCard({ label, value, sub, color, style }) {
  return (
    <div style={{ background: '#E8D5A3', borderRadius: 8, padding: '14px 16px', ...style }}>
      <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 500, color: color || '#1a1a1a' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, width: '95%', maxWidth: wide ? 680 : 480, maxHeight: '90vh', overflowY: 'auto', border: '0.5px solid rgba(0,0,0,0.09)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 500 }}>{title}</span>
          <button className="btn btn-sm" onClick={onClose}><i className="ti ti-x"></i></button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Alert({ type, children }) {
  const styles = { success: { background: '#EAF3DE', color: '#27500A', border: '0.5px solid #C0DD97' }, danger: { background: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F7C1C1' }, warning: { background: '#FAEEDA', color: '#633806', border: '0.5px solid #FAC775' } }
  return <div style={{ padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, ...styles[type] }}>{children}</div>
}

function Field({ label, children, style }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}><label style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>{label}</label>{children}</div>
}

function Empty({ icon, msg, msgColor }) {
  return <div style={{ textAlign: 'center', padding: '48px 20px', color: msgColor || '#666' }}><i className={`ti ${icon}`} style={{ fontSize: 36, display: 'block', marginBottom: 10 }}></i><p>{msg}</p></div>
}

function Th({ children, style }) { return <th style={{ textAlign: 'left', padding: '9px 14px', fontSize: 11, fontWeight: 500, color: '#666', textTransform: 'uppercase', letterSpacing: '0.4px', ...style }}>{children}</th> }
function Td({ children, style }) { return <td style={{ padding: '11px 14px', ...style }}>{children}</td> }
