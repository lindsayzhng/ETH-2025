import {
  replaceEqualDeep,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from "./chunk-3PSK63DX.js";
import {
  AccountNotFoundError,
  AccountTypeNotSupportedError,
  assertCurrentChain,
  blobsToCommitments,
  blobsToProofs,
  commitmentsToVersionedHashes,
  formatBlock,
  formatLog,
  formatTransaction,
  formatTransactionReceipt,
  getTransactionType,
  receiptStatuses,
  toBlobSidecars,
  toRlp
} from "./chunk-VFTTC5PT.js";
import "./chunk-32NEGIXE.js";
import {
  secp256k1
} from "./chunk-YBJSYXHM.js";
import {
  Chi,
  HashMD,
  Maj
} from "./chunk-GLTI7J6V.js";
import {
  BaseError as BaseError2,
  Hash,
  IntegerOutOfRangeError,
  abytes,
  addressResolverAbi,
  aexists,
  anumber,
  aoutput,
  call,
  clean as clean2,
  concat as concat2,
  createBatchScheduler,
  createHasher as createHasher2,
  createView,
  createXOFer,
  decodeFunctionResult,
  deploylessCallViaBytecodeBytecode,
  encodeDeployData,
  encodeFunctionData,
  from,
  fromBoolean,
  fromBytes,
  fromNumber,
  fromString,
  fromString2,
  isAddressEqual,
  localBatchGatewayUrl,
  multicall3Abi,
  padLeft,
  padRight,
  rotl as rotl2,
  rotr,
  serializeStateOverride,
  size as size2,
  slice,
  swap32IfBE,
  textResolverAbi,
  toBytes as toBytes2,
  toRpc,
  u32,
  universalResolverResolveAbi,
  universalResolverReverseAbi,
  universalSignatureValidatorAbi,
  universalSignatureValidatorByteCode,
  validate,
  withResolvers
} from "./chunk-BR2DDTUP.js";
import {
  AbiDecodingDataSizeTooSmallError,
  AbiDecodingZeroDataError,
  AbiEventNotFoundError,
  AbiEventSignatureEmptyTopicsError,
  AbiEventSignatureNotFoundError,
  AtomicReadyWalletRejectedUpgradeError,
  AtomicityNotSupportedError,
  BaseError,
  BundleTooLargeError,
  BytesSizeMismatchError,
  CallExecutionError,
  ChainDisconnectedError,
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
  ContractFunctionZeroDataError,
  DecodeLogDataMismatch,
  DecodeLogTopicsMismatch,
  DuplicateIdError,
  ExecutionRevertedError,
  HttpRequestError,
  InternalRpcError,
  InvalidAddressError,
  InvalidInputRpcError,
  InvalidParamsRpcError,
  InvalidRequestRpcError,
  JsonRpcVersionUnsupportedError,
  LimitExceededRpcError,
  LruMap,
  MethodNotFoundRpcError,
  MethodNotSupportedRpcError,
  ParseRpcError,
  PositionOutOfBoundsError,
  ProviderDisconnectedError,
  RawContractError,
  ResourceNotFoundRpcError,
  ResourceUnavailableRpcError,
  RpcRequestError,
  SocketClosedError,
  SwitchChainError,
  TimeoutError,
  TransactionExecutionError,
  TransactionNotFoundError,
  TransactionReceiptNotFoundError,
  TransactionRejectedRpcError,
  UnauthorizedProviderError,
  UnknownBundleIdError,
  UnknownNodeError,
  UnknownRpcError,
  UnsupportedChainIdError,
  UnsupportedNonOptionalCapabilityError,
  UnsupportedProviderMethodError,
  UserRejectedRequestError,
  WaitForTransactionReceiptTimeoutError,
  WebSocketRequestError,
  assertRequest,
  bytesRegex,
  bytesToHex,
  checksumAddress,
  concat,
  concatHex,
  decodeAbiParameters,
  encodeAbiParameters,
  extract,
  formatAbiItem,
  formatAbiItem2,
  formatEther,
  formatGwei,
  formatTransactionRequest,
  formatUnits,
  fromHex,
  getAbiItem,
  getAddress,
  getCallError,
  getChainContractAddress,
  getNodeError,
  hexToBigInt,
  hexToBool,
  hexToBytes,
  hexToNumber,
  hexToString,
  integerRegex,
  isAddress,
  isHex,
  keccak256,
  numberToHex,
  panicReasons,
  parseAbiItem,
  parseAccount,
  prettyPrint,
  size,
  sliceHex,
  stringToBytes,
  stringToHex,
  stringify,
  toBytes,
  toEventSelector,
  toHex,
  trim,
  weiUnits
} from "./chunk-55X54YMU.js";
import {
  clean,
  createHasher,
  rotl
} from "./chunk-XRGHWNRL.js";
import {
  require_react
} from "./chunk-65KY755N.js";
import {
  __commonJS,
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/wagmi/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/wagmi/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    (function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect10(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect10 = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/wagmi/node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/wagmi/node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/wagmi/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/wagmi/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    (function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React = require_react(), shim = require_shim(), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore5 = shim.useSyncExternalStore, useRef5 = React.useRef, useEffect10 = React.useEffect, useMemo3 = React.useMemo, useDebugValue = React.useDebugValue;
      exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef5(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo3(
          function() {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return memoizedSelection = currentSelection;
                }
                return memoizedSelection = nextSnapshot;
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot))
                return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
                return memoizedSnapshot = nextSnapshot, currentSelection;
              memoizedSnapshot = nextSnapshot;
              return memoizedSelection = nextSelection;
            }
            var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function() {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot ? void 0 : function() {
                return memoizedSelector(maybeGetServerSnapshot());
              }
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual]
        );
        var value = useSyncExternalStore5(subscribe, instRef[0], instRef[1]);
        useEffect10(
          function() {
            inst.hasValue = true;
            inst.value = value;
          },
          [value]
        );
        useDebugValue(value);
        return value;
      };
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/wagmi/node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/wagmi/node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// node_modules/wagmi/dist/esm/context.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/viem/_esm/actions/wallet/addChain.js
async function addChain(client, { chain }) {
  const { id, name, nativeCurrency, rpcUrls, blockExplorers } = chain;
  await client.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: numberToHex(id),
        chainName: name,
        nativeCurrency,
        rpcUrls: rpcUrls.default.http,
        blockExplorerUrls: blockExplorers ? Object.values(blockExplorers).map(({ url }) => url) : void 0
      }
    ]
  }, { dedupe: true, retryCount: 0 });
}

// node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
function publicKeyToAddress(publicKey) {
  const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address}`);
}

// node_modules/viem/_esm/utils/signature/recoverPublicKey.js
async function recoverPublicKey({ hash, signature }) {
  const hashHex = isHex(hash) ? hash : toHex(hash);
  const { secp256k1: secp256k12 } = await import("./secp256k1-DCBTJ5AF.js");
  const signature_ = (() => {
    if (typeof signature === "object" && "r" in signature && "s" in signature) {
      const { r, s, v, yParity } = signature;
      const yParityOrV2 = Number(yParity ?? v);
      const recoveryBit2 = toRecoveryBit(yParityOrV2);
      return new secp256k12.Signature(hexToBigInt(r), hexToBigInt(s)).addRecoveryBit(recoveryBit2);
    }
    const signatureHex = isHex(signature) ? signature : toHex(signature);
    if (size(signatureHex) !== 65)
      throw new Error("invalid signature length");
    const yParityOrV = hexToNumber(`0x${signatureHex.slice(130)}`);
    const recoveryBit = toRecoveryBit(yParityOrV);
    return secp256k12.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
  })();
  const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
  return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
  if (yParityOrV === 0 || yParityOrV === 1)
    return yParityOrV;
  if (yParityOrV === 27)
    return 0;
  if (yParityOrV === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}

// node_modules/viem/_esm/utils/signature/recoverAddress.js
async function recoverAddress({ hash, signature }) {
  return publicKeyToAddress(await recoverPublicKey({ hash, signature }));
}

// node_modules/viem/_esm/utils/authorization/hashAuthorization.js
function hashAuthorization(parameters) {
  const { chainId, nonce, to } = parameters;
  const address = parameters.contractAddress ?? parameters.address;
  const hash = keccak256(concatHex([
    "0x05",
    toRlp([
      chainId ? numberToHex(chainId) : "0x",
      address,
      nonce ? numberToHex(nonce) : "0x"
    ])
  ]));
  if (to === "bytes")
    return hexToBytes(hash);
  return hash;
}

// node_modules/viem/_esm/utils/authorization/recoverAuthorizationAddress.js
async function recoverAuthorizationAddress(parameters) {
  const { authorization, signature } = parameters;
  return recoverAddress({
    hash: hashAuthorization(authorization),
    signature: signature ?? authorization
  });
}

// node_modules/viem/_esm/utils/errors/getTransactionError.js
function getTransactionError(err, { docsPath: docsPath3, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new TransactionExecutionError(cause, {
    docsPath: docsPath3,
    ...args
  });
}

// node_modules/viem/_esm/utils/getAction.js
function getAction(client, actionFn, name) {
  const action_implicit = client[actionFn.name];
  if (typeof action_implicit === "function")
    return action_implicit;
  const action_explicit = client[name];
  if (typeof action_explicit === "function")
    return action_explicit;
  return (params) => actionFn(client, params);
}

// node_modules/viem/_esm/actions/public/getChainId.js
async function getChainId(client) {
  const chainIdHex = await client.request({
    method: "eth_chainId"
  }, { dedupe: true });
  return hexToNumber(chainIdHex);
}

// node_modules/viem/_esm/errors/fee.js
var BaseFeeScalarError = class extends BaseError {
  constructor() {
    super("`baseFeeMultiplier` must be greater than 1.", {
      name: "BaseFeeScalarError"
    });
  }
};
var Eip1559FeesNotSupportedError = class extends BaseError {
  constructor() {
    super("Chain does not support EIP-1559 fees.", {
      name: "Eip1559FeesNotSupportedError"
    });
  }
};
var MaxFeePerGasTooLowError = class extends BaseError {
  constructor({ maxPriorityFeePerGas }) {
    super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei(maxPriorityFeePerGas)} gwei).`, { name: "MaxFeePerGasTooLowError" });
  }
};

// node_modules/viem/_esm/errors/block.js
var BlockNotFoundError = class extends BaseError {
  constructor({ blockHash, blockNumber }) {
    let identifier = "Block";
    if (blockHash)
      identifier = `Block at hash "${blockHash}"`;
    if (blockNumber)
      identifier = `Block at number "${blockNumber}"`;
    super(`${identifier} could not be found.`, { name: "BlockNotFoundError" });
  }
};

// node_modules/viem/_esm/actions/public/getBlock.js
async function getBlock(client, { blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", includeTransactions: includeTransactions_ } = {}) {
  const includeTransactions = includeTransactions_ ?? false;
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let block = null;
  if (blockHash) {
    block = await client.request({
      method: "eth_getBlockByHash",
      params: [blockHash, includeTransactions]
    }, { dedupe: true });
  } else {
    block = await client.request({
      method: "eth_getBlockByNumber",
      params: [blockNumberHex || blockTag, includeTransactions]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  if (!block)
    throw new BlockNotFoundError({ blockHash, blockNumber });
  const format = client.chain?.formatters?.block?.format || formatBlock;
  return format(block);
}

// node_modules/viem/_esm/actions/public/getGasPrice.js
async function getGasPrice(client) {
  const gasPrice = await client.request({
    method: "eth_gasPrice"
  });
  return BigInt(gasPrice);
}

// node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
async function estimateMaxPriorityFeePerGas(client, args) {
  return internal_estimateMaxPriorityFeePerGas(client, args);
}
async function internal_estimateMaxPriorityFeePerGas(client, args) {
  const { block: block_, chain = client.chain, request } = args || {};
  try {
    const maxPriorityFeePerGas = chain?.fees?.maxPriorityFeePerGas ?? chain?.fees?.defaultPriorityFee;
    if (typeof maxPriorityFeePerGas === "function") {
      const block = block_ || await getAction(client, getBlock, "getBlock")({});
      const maxPriorityFeePerGas_ = await maxPriorityFeePerGas({
        block,
        client,
        request
      });
      if (maxPriorityFeePerGas_ === null)
        throw new Error();
      return maxPriorityFeePerGas_;
    }
    if (typeof maxPriorityFeePerGas !== "undefined")
      return maxPriorityFeePerGas;
    const maxPriorityFeePerGasHex = await client.request({
      method: "eth_maxPriorityFeePerGas"
    });
    return hexToBigInt(maxPriorityFeePerGasHex);
  } catch {
    const [block, gasPrice] = await Promise.all([
      block_ ? Promise.resolve(block_) : getAction(client, getBlock, "getBlock")({}),
      getAction(client, getGasPrice, "getGasPrice")({})
    ]);
    if (typeof block.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError();
    const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas;
    if (maxPriorityFeePerGas < 0n)
      return 0n;
    return maxPriorityFeePerGas;
  }
}

// node_modules/viem/_esm/actions/public/estimateFeesPerGas.js
async function estimateFeesPerGas(client, args) {
  return internal_estimateFeesPerGas(client, args);
}
async function internal_estimateFeesPerGas(client, args) {
  const { block: block_, chain = client.chain, request, type = "eip1559" } = args || {};
  const baseFeeMultiplier = await (async () => {
    if (typeof chain?.fees?.baseFeeMultiplier === "function")
      return chain.fees.baseFeeMultiplier({
        block: block_,
        client,
        request
      });
    return chain?.fees?.baseFeeMultiplier ?? 1.2;
  })();
  if (baseFeeMultiplier < 1)
    throw new BaseFeeScalarError();
  const decimals = baseFeeMultiplier.toString().split(".")[1]?.length ?? 0;
  const denominator = 10 ** decimals;
  const multiply = (base) => base * BigInt(Math.ceil(baseFeeMultiplier * denominator)) / BigInt(denominator);
  const block = block_ ? block_ : await getAction(client, getBlock, "getBlock")({});
  if (typeof chain?.fees?.estimateFeesPerGas === "function") {
    const fees = await chain.fees.estimateFeesPerGas({
      block: block_,
      client,
      multiply,
      request,
      type
    });
    if (fees !== null)
      return fees;
  }
  if (type === "eip1559") {
    if (typeof block.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError();
    const maxPriorityFeePerGas = typeof request?.maxPriorityFeePerGas === "bigint" ? request.maxPriorityFeePerGas : await internal_estimateMaxPriorityFeePerGas(client, {
      block,
      chain,
      request
    });
    const baseFeePerGas = multiply(block.baseFeePerGas);
    const maxFeePerGas = request?.maxFeePerGas ?? baseFeePerGas + maxPriorityFeePerGas;
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  }
  const gasPrice = request?.gasPrice ?? multiply(await getAction(client, getGasPrice, "getGasPrice")({}));
  return {
    gasPrice
  };
}

// node_modules/viem/_esm/errors/estimateGas.js
var EstimateGasExecutionError = class extends BaseError {
  constructor(cause, { account, docsPath: docsPath3, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
    const prettyArgs = prettyPrint({
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath3,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Estimate Gas Arguments:",
        prettyArgs
      ].filter(Boolean),
      name: "EstimateGasExecutionError"
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cause = cause;
  }
};

// node_modules/viem/_esm/utils/errors/getEstimateGasError.js
function getEstimateGasError(err, { docsPath: docsPath3, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new EstimateGasExecutionError(cause, {
    docsPath: docsPath3,
    ...args
  });
}

// node_modules/viem/_esm/actions/public/getBalance.js
async function getBalance(client, { address, blockNumber, blockTag = client.experimental_blockTag ?? "latest" }) {
  const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
  const balance = await client.request({
    method: "eth_getBalance",
    params: [address, blockNumberHex || blockTag]
  });
  return BigInt(balance);
}

// node_modules/viem/_esm/actions/public/estimateGas.js
async function estimateGas(client, args) {
  const { account: account_ = client.account } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  try {
    let estimateGas_rpc = function(parameters) {
      const { block: block2, request: request2, rpcStateOverride: rpcStateOverride2 } = parameters;
      return client.request({
        method: "eth_estimateGas",
        params: rpcStateOverride2 ? [
          request2,
          block2 ?? client.experimental_blockTag ?? "latest",
          rpcStateOverride2
        ] : block2 ? [request2, block2] : [request2]
      });
    };
    const { accessList, authorizationList, blobs, blobVersionedHashes, blockNumber, blockTag, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, stateOverride, ...rest } = await prepareTransactionRequest(client, {
      ...args,
      parameters: (
        // Some RPC Providers do not compute versioned hashes from blobs. We will need
        // to compute them.
        account?.type === "local" ? void 0 : ["blobVersionedHashes"]
      )
    });
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const rpcStateOverride = serializeStateOverride(stateOverride);
    const to = await (async () => {
      if (rest.to)
        return rest.to;
      if (authorizationList && authorizationList.length > 0)
        return await recoverAuthorizationAddress({
          authorization: authorizationList[0]
        }).catch(() => {
          throw new BaseError("`to` is required. Could not infer from `authorizationList`");
        });
      return void 0;
    })();
    assertRequest(args);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format: chainFormat }),
      from: account?.address,
      accessList,
      authorizationList,
      blobs,
      blobVersionedHashes,
      data,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    });
    let estimate = BigInt(await estimateGas_rpc({ block, request, rpcStateOverride }));
    if (authorizationList) {
      const value2 = await getBalance(client, { address: request.from });
      const estimates = await Promise.all(authorizationList.map(async (authorization) => {
        const { address } = authorization;
        const estimate2 = await estimateGas_rpc({
          block,
          request: {
            authorizationList: void 0,
            data,
            from: account?.address,
            to: address,
            value: numberToHex(value2)
          },
          rpcStateOverride
        }).catch(() => 100000n);
        return 2n * BigInt(estimate2);
      }));
      estimate += estimates.reduce((acc, curr) => acc + curr, 0n);
    }
    return estimate;
  } catch (err) {
    throw getEstimateGasError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}

// node_modules/viem/_esm/actions/public/getTransactionCount.js
async function getTransactionCount(client, { address, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [
      address,
      typeof blockNumber === "bigint" ? numberToHex(blockNumber) : blockTag
    ]
  }, {
    dedupe: Boolean(blockNumber)
  });
  return hexToNumber(count);
}

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
var defaultParameters = [
  "blobVersionedHashes",
  "chainId",
  "fees",
  "gas",
  "nonce",
  "type"
];
var eip1559NetworkCache = /* @__PURE__ */ new Map();
async function prepareTransactionRequest(client, args) {
  const { account: account_ = client.account, blobs, chain, gas, kzg, nonce, nonceManager: nonceManager2, parameters = defaultParameters, type } = args;
  const account = account_ ? parseAccount(account_) : account_;
  const request = { ...args, ...account ? { from: account?.address } : {} };
  let block;
  async function getBlock3() {
    if (block)
      return block;
    block = await getAction(client, getBlock, "getBlock")({ blockTag: "latest" });
    return block;
  }
  let chainId;
  async function getChainId3() {
    if (chainId)
      return chainId;
    if (chain)
      return chain.id;
    if (typeof args.chainId !== "undefined")
      return args.chainId;
    const chainId_ = await getAction(client, getChainId, "getChainId")({});
    chainId = chainId_;
    return chainId;
  }
  if (parameters.includes("nonce") && typeof nonce === "undefined" && account) {
    if (nonceManager2) {
      const chainId2 = await getChainId3();
      request.nonce = await nonceManager2.consume({
        address: account.address,
        chainId: chainId2,
        client
      });
    } else {
      request.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
        address: account.address,
        blockTag: "pending"
      });
    }
  }
  if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && blobs && kzg) {
    const commitments = blobsToCommitments({ blobs, kzg });
    if (parameters.includes("blobVersionedHashes")) {
      const versionedHashes = commitmentsToVersionedHashes({
        commitments,
        to: "hex"
      });
      request.blobVersionedHashes = versionedHashes;
    }
    if (parameters.includes("sidecars")) {
      const proofs = blobsToProofs({ blobs, commitments, kzg });
      const sidecars = toBlobSidecars({
        blobs,
        commitments,
        proofs,
        to: "hex"
      });
      request.sidecars = sidecars;
    }
  }
  if (parameters.includes("chainId"))
    request.chainId = await getChainId3();
  if ((parameters.includes("fees") || parameters.includes("type")) && typeof type === "undefined") {
    try {
      request.type = getTransactionType(request);
    } catch {
      let isEip1559Network = eip1559NetworkCache.get(client.uid);
      if (typeof isEip1559Network === "undefined") {
        const block2 = await getBlock3();
        isEip1559Network = typeof block2?.baseFeePerGas === "bigint";
        eip1559NetworkCache.set(client.uid, isEip1559Network);
      }
      request.type = isEip1559Network ? "eip1559" : "legacy";
    }
  }
  if (parameters.includes("fees")) {
    if (request.type !== "legacy" && request.type !== "eip2930") {
      if (typeof request.maxFeePerGas === "undefined" || typeof request.maxPriorityFeePerGas === "undefined") {
        const block2 = await getBlock3();
        const { maxFeePerGas, maxPriorityFeePerGas } = await internal_estimateFeesPerGas(client, {
          block: block2,
          chain,
          request
        });
        if (typeof args.maxPriorityFeePerGas === "undefined" && args.maxFeePerGas && args.maxFeePerGas < maxPriorityFeePerGas)
          throw new MaxFeePerGasTooLowError({
            maxPriorityFeePerGas
          });
        request.maxPriorityFeePerGas = maxPriorityFeePerGas;
        request.maxFeePerGas = maxFeePerGas;
      }
    } else {
      if (typeof args.maxFeePerGas !== "undefined" || typeof args.maxPriorityFeePerGas !== "undefined")
        throw new Eip1559FeesNotSupportedError();
      if (typeof args.gasPrice === "undefined") {
        const block2 = await getBlock3();
        const { gasPrice: gasPrice_ } = await internal_estimateFeesPerGas(client, {
          block: block2,
          chain,
          request,
          type: "legacy"
        });
        request.gasPrice = gasPrice_;
      }
    }
  }
  if (parameters.includes("gas") && typeof gas === "undefined")
    request.gas = await getAction(client, estimateGas, "estimateGas")({
      ...request,
      account: account ? { address: account.address, type: "json-rpc" } : account
    });
  assertRequest(request);
  delete request.parameters;
  return request;
}

// node_modules/viem/_esm/actions/wallet/sendRawTransaction.js
async function sendRawTransaction(client, { serializedTransaction }) {
  return client.request({
    method: "eth_sendRawTransaction",
    params: [serializedTransaction]
  }, { retryCount: 0 });
}

// node_modules/viem/_esm/actions/wallet/sendTransaction.js
var supportsWalletNamespace = new LruMap(128);
async function sendTransaction(client, parameters) {
  const { account: account_ = client.account, chain = client.chain, accessList, authorizationList, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, type, value, ...rest } = parameters;
  if (typeof account_ === "undefined")
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  const account = account_ ? parseAccount(account_) : null;
  try {
    assertRequest(parameters);
    const to = await (async () => {
      if (parameters.to)
        return parameters.to;
      if (parameters.to === null)
        return void 0;
      if (authorizationList && authorizationList.length > 0)
        return await recoverAuthorizationAddress({
          authorization: authorizationList[0]
        }).catch(() => {
          throw new BaseError("`to` is required. Could not infer from `authorizationList`.");
        });
      return void 0;
    })();
    if (account?.type === "json-rpc" || account === null) {
      let chainId;
      if (chain !== null) {
        chainId = await getAction(client, getChainId, "getChainId")({});
        assertCurrentChain({
          currentChainId: chainId,
          chain
        });
      }
      const chainFormat = client.chain?.formatters?.transactionRequest?.format;
      const format = chainFormat || formatTransactionRequest;
      const request = format({
        // Pick out extra data that might exist on the chain's transaction request type.
        ...extract(rest, { format: chainFormat }),
        accessList,
        authorizationList,
        blobs,
        chainId,
        data,
        from: account?.address,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to,
        type,
        value
      });
      const isWalletNamespaceSupported = supportsWalletNamespace.get(client.uid);
      const method = isWalletNamespaceSupported ? "wallet_sendTransaction" : "eth_sendTransaction";
      try {
        return await client.request({
          method,
          params: [request]
        }, { retryCount: 0 });
      } catch (e) {
        if (isWalletNamespaceSupported === false)
          throw e;
        const error = e;
        if (error.name === "InvalidInputRpcError" || error.name === "InvalidParamsRpcError" || error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError") {
          return await client.request({
            method: "wallet_sendTransaction",
            params: [request]
          }, { retryCount: 0 }).then((hash) => {
            supportsWalletNamespace.set(client.uid, true);
            return hash;
          }).catch((e2) => {
            const walletNamespaceError = e2;
            if (walletNamespaceError.name === "MethodNotFoundRpcError" || walletNamespaceError.name === "MethodNotSupportedRpcError") {
              supportsWalletNamespace.set(client.uid, false);
              throw error;
            }
            throw walletNamespaceError;
          });
        }
        throw error;
      }
    }
    if (account?.type === "local") {
      const request = await getAction(client, prepareTransactionRequest, "prepareTransactionRequest")({
        account,
        accessList,
        authorizationList,
        blobs,
        chain,
        data,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        nonceManager: account.nonceManager,
        parameters: [...defaultParameters, "sidecars"],
        type,
        value,
        ...rest,
        to
      });
      const serializer = chain?.serializers?.transaction;
      const serializedTransaction = await account.signTransaction(request, {
        serializer
      });
      return await getAction(client, sendRawTransaction, "sendRawTransaction")({
        serializedTransaction
      });
    }
    if (account?.type === "smart")
      throw new AccountTypeNotSupportedError({
        metaMessages: [
          "Consider using the `sendUserOperation` Action instead."
        ],
        docsPath: "/docs/actions/bundler/sendUserOperation",
        type: "smart"
      });
    throw new AccountTypeNotSupportedError({
      docsPath: "/docs/actions/wallet/sendTransaction",
      type: account?.type
    });
  } catch (err) {
    if (err instanceof AccountTypeNotSupportedError)
      throw err;
    throw getTransactionError(err, {
      ...parameters,
      account,
      chain: parameters.chain || void 0
    });
  }
}

// node_modules/viem/_esm/actions/wallet/deployContract.js
function deployContract(walletClient, parameters) {
  const { abi: abi2, args, bytecode, ...request } = parameters;
  const calldata = encodeDeployData({ abi: abi2, args, bytecode });
  return sendTransaction(walletClient, {
    ...request,
    ...request.authorizationList ? { to: null } : {},
    data: calldata
  });
}

// node_modules/viem/_esm/utils/ens/errors.js
function isNullUniversalResolverError(err, callType) {
  if (!(err instanceof BaseError))
    return false;
  const cause = err.walk((e) => e instanceof ContractFunctionRevertedError);
  if (!(cause instanceof ContractFunctionRevertedError))
    return false;
  if (cause.data?.errorName === "ResolverNotFound")
    return true;
  if (cause.data?.errorName === "ResolverWildcardNotSupported")
    return true;
  if (cause.data?.errorName === "ResolverNotContract")
    return true;
  if (cause.data?.errorName === "ResolverError")
    return true;
  if (cause.data?.errorName === "HttpError")
    return true;
  if (cause.reason?.includes("Wildcard on non-extended resolvers is not supported"))
    return true;
  if (callType === "reverse" && cause.reason === panicReasons[50])
    return true;
  return false;
}

// node_modules/viem/_esm/utils/ens/encodedLabelToLabelhash.js
function encodedLabelToLabelhash(label) {
  if (label.length !== 66)
    return null;
  if (label.indexOf("[") !== 0)
    return null;
  if (label.indexOf("]") !== 65)
    return null;
  const hash = `0x${label.slice(1, 65)}`;
  if (!isHex(hash))
    return null;
  return hash;
}

// node_modules/viem/_esm/utils/ens/namehash.js
function namehash(name) {
  let result = new Uint8Array(32).fill(0);
  if (!name)
    return bytesToHex(result);
  const labels = name.split(".");
  for (let i = labels.length - 1; i >= 0; i -= 1) {
    const hashFromEncodedLabel = encodedLabelToLabelhash(labels[i]);
    const hashed = hashFromEncodedLabel ? toBytes(hashFromEncodedLabel) : keccak256(stringToBytes(labels[i]), "bytes");
    result = keccak256(concat([result, hashed]), "bytes");
  }
  return bytesToHex(result);
}

// node_modules/viem/_esm/utils/ens/encodeLabelhash.js
function encodeLabelhash(hash) {
  return `[${hash.slice(2)}]`;
}

// node_modules/viem/_esm/utils/ens/labelhash.js
function labelhash(label) {
  const result = new Uint8Array(32).fill(0);
  if (!label)
    return bytesToHex(result);
  return encodedLabelToLabelhash(label) || keccak256(stringToBytes(label));
}

// node_modules/viem/_esm/utils/ens/packetToBytes.js
function packetToBytes(packet) {
  const value = packet.replace(/^\.|\.$/gm, "");
  if (value.length === 0)
    return new Uint8Array(1);
  const bytes = new Uint8Array(stringToBytes(value).byteLength + 2);
  let offset = 0;
  const list = value.split(".");
  for (let i = 0; i < list.length; i++) {
    let encoded = stringToBytes(list[i]);
    if (encoded.byteLength > 255)
      encoded = stringToBytes(encodeLabelhash(labelhash(list[i])));
    bytes[offset] = encoded.length;
    bytes.set(encoded, offset + 1);
    offset += encoded.length + 1;
  }
  if (bytes.byteLength !== offset + 1)
    return bytes.slice(0, offset + 1);
  return bytes;
}

// node_modules/viem/_esm/utils/errors/getContractError.js
var EXECUTION_REVERTED_ERROR_CODE = 3;
function getContractError(err, { abi: abi2, address, args, docsPath: docsPath3, functionName, sender }) {
  const error = err instanceof RawContractError ? err : err instanceof BaseError ? err.walk((err2) => "data" in err2) || err.walk() : {};
  const { code, data, details, message, shortMessage } = error;
  const cause = (() => {
    if (err instanceof AbiDecodingZeroDataError)
      return new ContractFunctionZeroDataError({ functionName });
    if ([EXECUTION_REVERTED_ERROR_CODE, InternalRpcError.code].includes(code) && (data || details || message || shortMessage)) {
      return new ContractFunctionRevertedError({
        abi: abi2,
        data: typeof data === "object" ? data.data : data,
        functionName,
        message: error instanceof RpcRequestError ? details : shortMessage ?? message
      });
    }
    return err;
  })();
  return new ContractFunctionExecutionError(cause, {
    abi: abi2,
    args,
    contractAddress: address,
    docsPath: docsPath3,
    functionName,
    sender
  });
}

// node_modules/viem/_esm/actions/public/readContract.js
async function readContract(client, parameters) {
  const { abi: abi2, address, args, functionName, ...rest } = parameters;
  const calldata = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    const { data } = await getAction(client, call, "call")({
      ...rest,
      data: calldata,
      to: address
    });
    return decodeFunctionResult({
      abi: abi2,
      args,
      functionName,
      data: data || "0x"
    });
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/readContract",
      functionName
    });
  }
}

// node_modules/viem/_esm/actions/ens/getEnsAddress.js
async function getEnsAddress(client, parameters) {
  const { blockNumber, blockTag, coinType, name, gatewayUrls, strict } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  const tlds = chain?.ensTlds;
  if (tlds && !tlds.some((tld) => name.endsWith(tld)))
    return null;
  try {
    const functionData = encodeFunctionData({
      abi: addressResolverAbi,
      functionName: "addr",
      ...coinType != null ? { args: [namehash(name), BigInt(coinType)] } : { args: [namehash(name)] }
    });
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolve",
      args: [
        toHex(packetToBytes(name)),
        functionData,
        gatewayUrls ?? [localBatchGatewayUrl]
      ],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const address = decodeFunctionResult({
      abi: addressResolverAbi,
      args: coinType != null ? [namehash(name), BigInt(coinType)] : void 0,
      functionName: "addr",
      data: res[0]
    });
    if (address === "0x")
      return null;
    if (trim(address) === "0x00")
      return null;
    return address;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err, "resolve"))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/errors/ens.js
var EnsAvatarInvalidMetadataError = class extends BaseError {
  constructor({ data }) {
    super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
      metaMessages: [
        "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
        "",
        `Provided data: ${JSON.stringify(data)}`
      ],
      name: "EnsAvatarInvalidMetadataError"
    });
  }
};
var EnsAvatarInvalidNftUriError = class extends BaseError {
  constructor({ reason }) {
    super(`ENS NFT avatar URI is invalid. ${reason}`, {
      name: "EnsAvatarInvalidNftUriError"
    });
  }
};
var EnsAvatarUriResolutionError = class extends BaseError {
  constructor({ uri }) {
    super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`, { name: "EnsAvatarUriResolutionError" });
  }
};
var EnsAvatarUnsupportedNamespaceError = class extends BaseError {
  constructor({ namespace }) {
    super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`, { name: "EnsAvatarUnsupportedNamespaceError" });
  }
};

// node_modules/viem/_esm/utils/ens/avatar/utils.js
var networkRegex = /(?<protocol>https?:\/\/[^\/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/;
var ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/;
var base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
var dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
async function isImageUri(uri) {
  try {
    const res = await fetch(uri, { method: "HEAD" });
    if (res.status === 200) {
      const contentType = res.headers.get("content-type");
      return contentType?.startsWith("image/");
    }
    return false;
  } catch (error) {
    if (typeof error === "object" && typeof error.response !== "undefined") {
      return false;
    }
    if (!globalThis.hasOwnProperty("Image"))
      return false;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = uri;
    });
  }
}
function getGateway(custom2, defaultGateway) {
  if (!custom2)
    return defaultGateway;
  if (custom2.endsWith("/"))
    return custom2.slice(0, -1);
  return custom2;
}
function resolveAvatarUri({ uri, gatewayUrls }) {
  const isEncoded = base64Regex.test(uri);
  if (isEncoded)
    return { uri, isOnChain: true, isEncoded };
  const ipfsGateway = getGateway(gatewayUrls?.ipfs, "https://ipfs.io");
  const arweaveGateway = getGateway(gatewayUrls?.arweave, "https://arweave.net");
  const networkRegexMatch = uri.match(networkRegex);
  const { protocol, subpath, target, subtarget = "" } = networkRegexMatch?.groups || {};
  const isIPNS = protocol === "ipns:/" || subpath === "ipns/";
  const isIPFS = protocol === "ipfs:/" || subpath === "ipfs/" || ipfsHashRegex.test(uri);
  if (uri.startsWith("http") && !isIPNS && !isIPFS) {
    let replacedUri = uri;
    if (gatewayUrls?.arweave)
      replacedUri = uri.replace(/https:\/\/arweave.net/g, gatewayUrls?.arweave);
    return { uri: replacedUri, isOnChain: false, isEncoded: false };
  }
  if ((isIPNS || isIPFS) && target) {
    return {
      uri: `${ipfsGateway}/${isIPNS ? "ipns" : "ipfs"}/${target}${subtarget}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  if (protocol === "ar:/" && target) {
    return {
      uri: `${arweaveGateway}/${target}${subtarget || ""}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  let parsedUri = uri.replace(dataURIRegex, "");
  if (parsedUri.startsWith("<svg")) {
    parsedUri = `data:image/svg+xml;base64,${btoa(parsedUri)}`;
  }
  if (parsedUri.startsWith("data:") || parsedUri.startsWith("{")) {
    return {
      uri: parsedUri,
      isOnChain: true,
      isEncoded: false
    };
  }
  throw new EnsAvatarUriResolutionError({ uri });
}
function getJsonImage(data) {
  if (typeof data !== "object" || !("image" in data) && !("image_url" in data) && !("image_data" in data)) {
    throw new EnsAvatarInvalidMetadataError({ data });
  }
  return data.image || data.image_url || data.image_data;
}
async function getMetadataAvatarUri({ gatewayUrls, uri }) {
  try {
    const res = await fetch(uri).then((res2) => res2.json());
    const image = await parseAvatarUri({
      gatewayUrls,
      uri: getJsonImage(res)
    });
    return image;
  } catch {
    throw new EnsAvatarUriResolutionError({ uri });
  }
}
async function parseAvatarUri({ gatewayUrls, uri }) {
  const { uri: resolvedURI, isOnChain } = resolveAvatarUri({ uri, gatewayUrls });
  if (isOnChain)
    return resolvedURI;
  const isImage = await isImageUri(resolvedURI);
  if (isImage)
    return resolvedURI;
  throw new EnsAvatarUriResolutionError({ uri });
}
function parseNftUri(uri_) {
  let uri = uri_;
  if (uri.startsWith("did:nft:")) {
    uri = uri.replace("did:nft:", "").replace(/_/g, "/");
  }
  const [reference, asset_namespace, tokenID] = uri.split("/");
  const [eip_namespace, chainID] = reference.split(":");
  const [erc_namespace, contractAddress] = asset_namespace.split(":");
  if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155")
    throw new EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
  if (!chainID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
  if (!contractAddress)
    throw new EnsAvatarInvalidNftUriError({
      reason: "Contract address not found"
    });
  if (!tokenID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
  if (!erc_namespace)
    throw new EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
  return {
    chainID: Number.parseInt(chainID),
    namespace: erc_namespace.toLowerCase(),
    contractAddress,
    tokenID
  };
}
async function getNftTokenUri(client, { nft }) {
  if (nft.namespace === "erc721") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "tokenURI",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "tokenURI",
      args: [BigInt(nft.tokenID)]
    });
  }
  if (nft.namespace === "erc1155") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "uri",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_id", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "uri",
      args: [BigInt(nft.tokenID)]
    });
  }
  throw new EnsAvatarUnsupportedNamespaceError({ namespace: nft.namespace });
}

// node_modules/viem/_esm/utils/ens/avatar/parseAvatarRecord.js
async function parseAvatarRecord(client, { gatewayUrls, record }) {
  if (/eip155:/i.test(record))
    return parseNftAvatarUri(client, { gatewayUrls, record });
  return parseAvatarUri({ uri: record, gatewayUrls });
}
async function parseNftAvatarUri(client, { gatewayUrls, record }) {
  const nft = parseNftUri(record);
  const nftUri = await getNftTokenUri(client, { nft });
  const { uri: resolvedNftUri, isOnChain, isEncoded } = resolveAvatarUri({ uri: nftUri, gatewayUrls });
  if (isOnChain && (resolvedNftUri.includes("data:application/json;base64,") || resolvedNftUri.startsWith("{"))) {
    const encodedJson = isEncoded ? (
      // if it is encoded, decode it
      atob(resolvedNftUri.replace("data:application/json;base64,", ""))
    ) : (
      // if it isn't encoded assume it is a JSON string, but it could be anything (it will error if it is)
      resolvedNftUri
    );
    const decoded = JSON.parse(encodedJson);
    return parseAvatarUri({ uri: getJsonImage(decoded), gatewayUrls });
  }
  let uriTokenId = nft.tokenID;
  if (nft.namespace === "erc1155")
    uriTokenId = uriTokenId.replace("0x", "").padStart(64, "0");
  return getMetadataAvatarUri({
    gatewayUrls,
    uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId)
  });
}

// node_modules/viem/_esm/actions/ens/getEnsText.js
async function getEnsText(client, parameters) {
  const { blockNumber, blockTag, key, name, gatewayUrls, strict } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  const tlds = chain?.ensTlds;
  if (tlds && !tlds.some((tld) => name.endsWith(tld)))
    return null;
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolve",
      args: [
        toHex(packetToBytes(name)),
        encodeFunctionData({
          abi: textResolverAbi,
          functionName: "text",
          args: [namehash(name), key]
        }),
        gatewayUrls ?? [localBatchGatewayUrl]
      ],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const record = decodeFunctionResult({
      abi: textResolverAbi,
      functionName: "text",
      data: res[0]
    });
    return record === "" ? null : record;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err, "resolve"))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsAvatar.js
async function getEnsAvatar(client, { blockNumber, blockTag, assetGatewayUrls, name, gatewayUrls, strict, universalResolverAddress }) {
  const record = await getAction(client, getEnsText, "getEnsText")({
    blockNumber,
    blockTag,
    key: "avatar",
    name,
    universalResolverAddress,
    gatewayUrls,
    strict
  });
  if (!record)
    return null;
  try {
    return await parseAvatarRecord(client, {
      record,
      gatewayUrls: assetGatewayUrls
    });
  } catch {
    return null;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsName.js
async function getEnsName(client, { address, blockNumber, blockTag, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  const reverseNode = `${address.toLowerCase().substring(2)}.addr.reverse`;
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverReverseAbi,
      functionName: "reverse",
      args: [toHex(packetToBytes(reverseNode))],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const [name, resolvedAddress] = gatewayUrls ? await readContractAction({
      ...readContractParameters,
      args: [...readContractParameters.args, gatewayUrls]
    }) : await readContractAction(readContractParameters);
    if (address.toLowerCase() !== resolvedAddress.toLowerCase())
      return null;
    return name;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err, "reverse"))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsResolver.js
async function getEnsResolver(client, parameters) {
  const { blockNumber, blockTag, name } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  const tlds = chain?.ensTlds;
  if (tlds && !tlds.some((tld) => name.endsWith(tld)))
    throw new Error(`${name} is not a valid ENS TLD (${tlds?.join(", ")}) for chain "${chain.name}" (id: ${chain.id}).`);
  const [resolverAddress] = await getAction(client, readContract, "readContract")({
    address: universalResolverAddress,
    abi: [
      {
        inputs: [{ type: "bytes" }],
        name: "findResolver",
        outputs: [{ type: "address" }, { type: "bytes32" }],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "findResolver",
    args: [toHex(packetToBytes(name))],
    blockNumber,
    blockTag
  });
  return resolverAddress;
}

// node_modules/viem/_esm/actions/public/createAccessList.js
async function createAccessList(client, args) {
  const { account: account_ = client.account, blockNumber, blockTag = "latest", blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, to, value, ...rest } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  try {
    assertRequest(args);
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format: chainFormat }),
      from: account?.address,
      blobs,
      data,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      to,
      value
    });
    const response = await client.request({
      method: "eth_createAccessList",
      params: [request, block]
    });
    return {
      accessList: response.accessList,
      gasUsed: BigInt(response.gasUsed)
    };
  } catch (err) {
    throw getCallError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}

// node_modules/viem/_esm/utils/filters/createFilterRequestScope.js
function createFilterRequestScope(client, { method }) {
  const requestMap = {};
  if (client.transport.type === "fallback")
    client.transport.onResponse?.(({ method: method_, response: id, status, transport }) => {
      if (status === "success" && method === method_)
        requestMap[id] = transport.request;
    });
  return ((id) => requestMap[id] || client.request);
}

// node_modules/viem/_esm/actions/public/createBlockFilter.js
async function createBlockFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newBlockFilter"
  });
  const id = await client.request({
    method: "eth_newBlockFilter"
  });
  return { id, request: getRequest(id), type: "block" };
}

// node_modules/viem/_esm/errors/log.js
var FilterTypeNotSupportedError = class extends BaseError {
  constructor(type) {
    super(`Filter type "${type}" is not supported.`, {
      name: "FilterTypeNotSupportedError"
    });
  }
};

// node_modules/viem/_esm/utils/abi/encodeEventTopics.js
var docsPath = "/docs/contract/encodeEventTopics";
function encodeEventTopics(parameters) {
  const { abi: abi2, eventName, args } = parameters;
  let abiItem = abi2[0];
  if (eventName) {
    const item = getAbiItem({ abi: abi2, name: eventName });
    if (!item)
      throw new AbiEventNotFoundError(eventName, { docsPath });
    abiItem = item;
  }
  if (abiItem.type !== "event")
    throw new AbiEventNotFoundError(void 0, { docsPath });
  const definition = formatAbiItem(abiItem);
  const signature = toEventSelector(definition);
  let topics = [];
  if (args && "inputs" in abiItem) {
    const indexedInputs = abiItem.inputs?.filter((param) => "indexed" in param && param.indexed);
    const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x) => args[x.name]) ?? [] : [];
    if (args_.length > 0) {
      topics = indexedInputs?.map((param, i) => {
        if (Array.isArray(args_[i]))
          return args_[i].map((_, j) => encodeArg({ param, value: args_[i][j] }));
        return typeof args_[i] !== "undefined" && args_[i] !== null ? encodeArg({ param, value: args_[i] }) : null;
      }) ?? [];
    }
  }
  return [signature, ...topics];
}
function encodeArg({ param, value }) {
  if (param.type === "string" || param.type === "bytes")
    return keccak256(toBytes(value));
  if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    throw new FilterTypeNotSupportedError(param.type);
  return encodeAbiParameters([param], [value]);
}

// node_modules/viem/_esm/actions/public/createContractEventFilter.js
async function createContractEventFilter(client, parameters) {
  const { address, abi: abi2, args, eventName, fromBlock, strict, toBlock } = parameters;
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  const topics = eventName ? encodeEventTopics({
    abi: abi2,
    args,
    eventName
  }) : void 0;
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        topics
      }
    ]
  });
  return {
    abi: abi2,
    args,
    eventName,
    id,
    request: getRequest(id),
    strict: Boolean(strict),
    type: "event"
  };
}

// node_modules/viem/_esm/actions/public/createEventFilter.js
async function createEventFilter(client, { address, args, event, events: events_, fromBlock, strict, toBlock } = {}) {
  const events = events_ ?? (event ? [event] : void 0);
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  let topics = [];
  if (events) {
    const encoded = events.flatMap((event2) => encodeEventTopics({
      abi: [event2],
      eventName: event2.name,
      args
    }));
    topics = [encoded];
    if (event)
      topics = topics[0];
  }
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        ...topics.length ? { topics } : {}
      }
    ]
  });
  return {
    abi: events,
    args,
    eventName: event ? event.name : void 0,
    fromBlock,
    id,
    request: getRequest(id),
    strict: Boolean(strict),
    toBlock,
    type: "event"
  };
}

// node_modules/viem/_esm/actions/public/createPendingTransactionFilter.js
async function createPendingTransactionFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newPendingTransactionFilter"
  });
  const id = await client.request({
    method: "eth_newPendingTransactionFilter"
  });
  return { id, request: getRequest(id), type: "transaction" };
}

// node_modules/viem/_esm/actions/public/estimateContractGas.js
async function estimateContractGas(client, parameters) {
  const { abi: abi2, address, args, functionName, dataSuffix, ...request } = parameters;
  const data = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    const gas = await getAction(client, estimateGas, "estimateGas")({
      data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      ...request
    });
    return gas;
  } catch (error) {
    const account = request.account ? parseAccount(request.account) : void 0;
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/estimateContractGas",
      functionName,
      sender: account?.address
    });
  }
}

// node_modules/viem/_esm/actions/public/getBlobBaseFee.js
async function getBlobBaseFee(client) {
  const baseFee = await client.request({
    method: "eth_blobBaseFee"
  });
  return BigInt(baseFee);
}

// node_modules/viem/_esm/utils/promise/withCache.js
var promiseCache = /* @__PURE__ */ new Map();
var responseCache = /* @__PURE__ */ new Map();
function getCache(cacheKey2) {
  const buildCache = (cacheKey3, cache) => ({
    clear: () => cache.delete(cacheKey3),
    get: () => cache.get(cacheKey3),
    set: (data) => cache.set(cacheKey3, data)
  });
  const promise = buildCache(cacheKey2, promiseCache);
  const response = buildCache(cacheKey2, responseCache);
  return {
    clear: () => {
      promise.clear();
      response.clear();
    },
    promise,
    response
  };
}
async function withCache(fn, { cacheKey: cacheKey2, cacheTime = Number.POSITIVE_INFINITY }) {
  const cache = getCache(cacheKey2);
  const response = cache.response.get();
  if (response && cacheTime > 0) {
    const age = (/* @__PURE__ */ new Date()).getTime() - response.created.getTime();
    if (age < cacheTime)
      return response.data;
  }
  let promise = cache.promise.get();
  if (!promise) {
    promise = fn();
    cache.promise.set(promise);
  }
  try {
    const data = await promise;
    cache.response.set({ created: /* @__PURE__ */ new Date(), data });
    return data;
  } finally {
    cache.promise.clear();
  }
}

// node_modules/viem/_esm/actions/public/getBlockNumber.js
var cacheKey = (id) => `blockNumber.${id}`;
async function getBlockNumber(client, { cacheTime = client.cacheTime } = {}) {
  const blockNumberHex = await withCache(() => client.request({
    method: "eth_blockNumber"
  }), { cacheKey: cacheKey(client.uid), cacheTime });
  return BigInt(blockNumberHex);
}

// node_modules/viem/_esm/actions/public/getBlockTransactionCount.js
async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = "latest" } = {}) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let count;
  if (blockHash) {
    count = await client.request({
      method: "eth_getBlockTransactionCountByHash",
      params: [blockHash]
    }, { dedupe: true });
  } else {
    count = await client.request({
      method: "eth_getBlockTransactionCountByNumber",
      params: [blockNumberHex || blockTag]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  return hexToNumber(count);
}

// node_modules/viem/_esm/actions/public/getCode.js
async function getCode(client, { address, blockNumber, blockTag = "latest" }) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const hex = await client.request({
    method: "eth_getCode",
    params: [address, blockNumberHex || blockTag]
  }, { dedupe: Boolean(blockNumberHex) });
  if (hex === "0x")
    return void 0;
  return hex;
}

// node_modules/viem/_esm/utils/abi/decodeEventLog.js
var docsPath2 = "/docs/contract/decodeEventLog";
function decodeEventLog(parameters) {
  const { abi: abi2, data, strict: strict_, topics } = parameters;
  const strict = strict_ ?? true;
  const [signature, ...argTopics] = topics;
  if (!signature)
    throw new AbiEventSignatureEmptyTopicsError({ docsPath: docsPath2 });
  const abiItem = abi2.find((x) => x.type === "event" && signature === toEventSelector(formatAbiItem(x)));
  if (!(abiItem && "name" in abiItem) || abiItem.type !== "event")
    throw new AbiEventSignatureNotFoundError(signature, { docsPath: docsPath2 });
  const { name, inputs } = abiItem;
  const isUnnamed = inputs?.some((x) => !("name" in x && x.name));
  const args = isUnnamed ? [] : {};
  const indexedInputs = inputs.map((x, i) => [x, i]).filter(([x]) => "indexed" in x && x.indexed);
  for (let i = 0; i < indexedInputs.length; i++) {
    const [param, argIndex] = indexedInputs[i];
    const topic = argTopics[i];
    if (!topic)
      throw new DecodeLogTopicsMismatch({
        abiItem,
        param
      });
    args[isUnnamed ? argIndex : param.name || argIndex] = decodeTopic({
      param,
      value: topic
    });
  }
  const nonIndexedInputs = inputs.filter((x) => !("indexed" in x && x.indexed));
  if (nonIndexedInputs.length > 0) {
    if (data && data !== "0x") {
      try {
        const decodedData = decodeAbiParameters(nonIndexedInputs, data);
        if (decodedData) {
          if (isUnnamed)
            for (let i = 0; i < inputs.length; i++)
              args[i] = args[i] ?? decodedData.shift();
          else
            for (let i = 0; i < nonIndexedInputs.length; i++)
              args[nonIndexedInputs[i].name] = decodedData[i];
        }
      } catch (err) {
        if (strict) {
          if (err instanceof AbiDecodingDataSizeTooSmallError || err instanceof PositionOutOfBoundsError)
            throw new DecodeLogDataMismatch({
              abiItem,
              data,
              params: nonIndexedInputs,
              size: size(data)
            });
          throw err;
        }
      }
    } else if (strict) {
      throw new DecodeLogDataMismatch({
        abiItem,
        data: "0x",
        params: nonIndexedInputs,
        size: 0
      });
    }
  }
  return {
    eventName: name,
    args: Object.values(args).length > 0 ? args : void 0
  };
}
function decodeTopic({ param, value }) {
  if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    return value;
  const decodedArg = decodeAbiParameters([param], value) || [];
  return decodedArg[0];
}

// node_modules/viem/_esm/utils/abi/parseEventLogs.js
function parseEventLogs(parameters) {
  const { abi: abi2, args, logs, strict = true } = parameters;
  const eventName = (() => {
    if (!parameters.eventName)
      return void 0;
    if (Array.isArray(parameters.eventName))
      return parameters.eventName;
    return [parameters.eventName];
  })();
  return logs.map((log) => {
    try {
      const abiItem = abi2.find((abiItem2) => abiItem2.type === "event" && log.topics[0] === toEventSelector(abiItem2));
      if (!abiItem)
        return null;
      const event = decodeEventLog({
        ...log,
        abi: [abiItem],
        strict
      });
      if (eventName && !eventName.includes(event.eventName))
        return null;
      if (!includesArgs({
        args: event.args,
        inputs: abiItem.inputs,
        matchArgs: args
      }))
        return null;
      return { ...event, ...log };
    } catch (err) {
      let eventName2;
      let isUnnamed;
      if (err instanceof AbiEventSignatureNotFoundError)
        return null;
      if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
        if (strict)
          return null;
        eventName2 = err.abiItem.name;
        isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
      }
      return { ...log, args: isUnnamed ? [] : {}, eventName: eventName2 };
    }
  }).filter(Boolean);
}
function includesArgs(parameters) {
  const { args, inputs, matchArgs } = parameters;
  if (!matchArgs)
    return true;
  if (!args)
    return false;
  function isEqual(input, value, arg) {
    try {
      if (input.type === "address")
        return isAddressEqual(value, arg);
      if (input.type === "string" || input.type === "bytes")
        return keccak256(toBytes(value)) === arg;
      return value === arg;
    } catch {
      return false;
    }
  }
  if (Array.isArray(args) && Array.isArray(matchArgs)) {
    return matchArgs.every((value, index3) => {
      if (value === null || value === void 0)
        return true;
      const input = inputs[index3];
      if (!input)
        return false;
      const value_ = Array.isArray(value) ? value : [value];
      return value_.some((value2) => isEqual(input, value2, args[index3]));
    });
  }
  if (typeof args === "object" && !Array.isArray(args) && typeof matchArgs === "object" && !Array.isArray(matchArgs))
    return Object.entries(matchArgs).every(([key, value]) => {
      if (value === null || value === void 0)
        return true;
      const input = inputs.find((input2) => input2.name === key);
      if (!input)
        return false;
      const value_ = Array.isArray(value) ? value : [value];
      return value_.some((value2) => isEqual(input, value2, args[key]));
    });
  return false;
}

// node_modules/viem/_esm/actions/public/getLogs.js
async function getLogs(client, { address, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_ } = {}) {
  const strict = strict_ ?? false;
  const events = events_ ?? (event ? [event] : void 0);
  let topics = [];
  if (events) {
    const encoded = events.flatMap((event2) => encodeEventTopics({
      abi: [event2],
      eventName: event2.name,
      args: events_ ? void 0 : args
    }));
    topics = [encoded];
    if (event)
      topics = topics[0];
  }
  let logs;
  if (blockHash) {
    logs = await client.request({
      method: "eth_getLogs",
      params: [{ address, topics, blockHash }]
    });
  } else {
    logs = await client.request({
      method: "eth_getLogs",
      params: [
        {
          address,
          topics,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock
        }
      ]
    });
  }
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!events)
    return formattedLogs;
  return parseEventLogs({
    abi: events,
    args,
    logs: formattedLogs,
    strict
  });
}

// node_modules/viem/_esm/actions/public/getContractEvents.js
async function getContractEvents(client, parameters) {
  const { abi: abi2, address, args, blockHash, eventName, fromBlock, toBlock, strict } = parameters;
  const event = eventName ? getAbiItem({ abi: abi2, name: eventName }) : void 0;
  const events = !event ? abi2.filter((x) => x.type === "event") : void 0;
  return getAction(client, getLogs, "getLogs")({
    address,
    args,
    blockHash,
    event,
    events,
    fromBlock,
    toBlock,
    strict
  });
}

// node_modules/viem/_esm/errors/eip712.js
var Eip712DomainNotFoundError = class extends BaseError {
  constructor({ address }) {
    super(`No EIP-712 domain found on contract "${address}".`, {
      metaMessages: [
        "Ensure that:",
        `- The contract is deployed at the address "${address}".`,
        "- `eip712Domain()` function exists on the contract.",
        "- `eip712Domain()` function matches signature to ERC-5267 specification."
      ],
      name: "Eip712DomainNotFoundError"
    });
  }
};

// node_modules/viem/_esm/actions/public/getEip712Domain.js
async function getEip712Domain(client, parameters) {
  const { address, factory, factoryData } = parameters;
  try {
    const [fields, name, version3, chainId, verifyingContract, salt, extensions] = await getAction(client, readContract, "readContract")({
      abi,
      address,
      functionName: "eip712Domain",
      factory,
      factoryData
    });
    return {
      domain: {
        name,
        version: version3,
        chainId: Number(chainId),
        verifyingContract,
        salt
      },
      extensions,
      fields
    };
  } catch (e) {
    const error = e;
    if (error.name === "ContractFunctionExecutionError" && error.cause.name === "ContractFunctionZeroDataError") {
      throw new Eip712DomainNotFoundError({ address });
    }
    throw error;
  }
}
var abi = [
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", type: "bytes1" },
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
      { name: "extensions", type: "uint256[]" }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// node_modules/viem/_esm/utils/formatters/feeHistory.js
function formatFeeHistory(feeHistory) {
  return {
    baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
    gasUsedRatio: feeHistory.gasUsedRatio,
    oldestBlock: BigInt(feeHistory.oldestBlock),
    reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value)))
  };
}

// node_modules/viem/_esm/actions/public/getFeeHistory.js
async function getFeeHistory(client, { blockCount, blockNumber, blockTag = "latest", rewardPercentiles }) {
  const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
  const feeHistory = await client.request({
    method: "eth_feeHistory",
    params: [
      numberToHex(blockCount),
      blockNumberHex || blockTag,
      rewardPercentiles
    ]
  }, { dedupe: Boolean(blockNumberHex) });
  return formatFeeHistory(feeHistory);
}

// node_modules/viem/_esm/actions/public/getFilterChanges.js
async function getFilterChanges(_client, { filter }) {
  const strict = "strict" in filter && filter.strict;
  const logs = await filter.request({
    method: "eth_getFilterChanges",
    params: [filter.id]
  });
  if (typeof logs[0] === "string")
    return logs;
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!("abi" in filter) || !filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}

// node_modules/viem/_esm/actions/public/getFilterLogs.js
async function getFilterLogs(_client, { filter }) {
  const strict = filter.strict ?? false;
  const logs = await filter.request({
    method: "eth_getFilterLogs",
    params: [filter.id]
  });
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}

// node_modules/viem/_esm/actions/public/getStorageAt.js
async function getStorageAt(client, { address, blockNumber, blockTag = "latest", slot }) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const data = await client.request({
    method: "eth_getStorageAt",
    params: [address, slot, blockNumberHex || blockTag]
  });
  return data;
}

// node_modules/viem/_esm/actions/public/getTransaction.js
async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash, index: index3 }) {
  const blockTag = blockTag_ || "latest";
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let transaction = null;
  if (hash) {
    transaction = await client.request({
      method: "eth_getTransactionByHash",
      params: [hash]
    }, { dedupe: true });
  } else if (blockHash) {
    transaction = await client.request({
      method: "eth_getTransactionByBlockHashAndIndex",
      params: [blockHash, numberToHex(index3)]
    }, { dedupe: true });
  } else if (blockNumberHex || blockTag) {
    transaction = await client.request({
      method: "eth_getTransactionByBlockNumberAndIndex",
      params: [blockNumberHex || blockTag, numberToHex(index3)]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  if (!transaction)
    throw new TransactionNotFoundError({
      blockHash,
      blockNumber,
      blockTag,
      hash,
      index: index3
    });
  const format = client.chain?.formatters?.transaction?.format || formatTransaction;
  return format(transaction);
}

// node_modules/viem/_esm/actions/public/getTransactionConfirmations.js
async function getTransactionConfirmations(client, { hash, transactionReceipt }) {
  const [blockNumber, transaction] = await Promise.all([
    getAction(client, getBlockNumber, "getBlockNumber")({}),
    hash ? getAction(client, getTransaction, "getTransaction")({ hash }) : void 0
  ]);
  const transactionBlockNumber = transactionReceipt?.blockNumber || transaction?.blockNumber;
  if (!transactionBlockNumber)
    return 0n;
  return blockNumber - transactionBlockNumber + 1n;
}

// node_modules/viem/_esm/actions/public/getTransactionReceipt.js
async function getTransactionReceipt(client, { hash }) {
  const receipt = await client.request({
    method: "eth_getTransactionReceipt",
    params: [hash]
  }, { dedupe: true });
  if (!receipt)
    throw new TransactionReceiptNotFoundError({ hash });
  const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  return format(receipt);
}

// node_modules/viem/_esm/actions/public/multicall.js
async function multicall(client, parameters) {
  const { account, allowFailure = true, batchSize: batchSize_, blockNumber, blockTag, multicallAddress: multicallAddress_, stateOverride } = parameters;
  const contracts = parameters.contracts;
  const batchSize = batchSize_ ?? (typeof client.batch?.multicall === "object" && client.batch.multicall.batchSize || 1024);
  let multicallAddress = multicallAddress_;
  if (!multicallAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. multicallAddress is required.");
    multicallAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "multicall3"
    });
  }
  const chunkedCalls = [[]];
  let currentChunk = 0;
  let currentChunkSize = 0;
  for (let i = 0; i < contracts.length; i++) {
    const { abi: abi2, address, args, functionName } = contracts[i];
    try {
      const callData = encodeFunctionData({ abi: abi2, args, functionName });
      currentChunkSize += (callData.length - 2) / 2;
      if (
        // Check if batching is enabled.
        batchSize > 0 && // Check if the current size of the batch exceeds the size limit.
        currentChunkSize > batchSize && // Check if the current chunk is not already empty.
        chunkedCalls[currentChunk].length > 0
      ) {
        currentChunk++;
        currentChunkSize = (callData.length - 2) / 2;
        chunkedCalls[currentChunk] = [];
      }
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData,
          target: address
        }
      ];
    } catch (err) {
      const error = getContractError(err, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/multicall",
        functionName,
        sender: account
      });
      if (!allowFailure)
        throw error;
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData: "0x",
          target: address
        }
      ];
    }
  }
  const aggregate3Results = await Promise.allSettled(chunkedCalls.map((calls) => getAction(client, readContract, "readContract")({
    abi: multicall3Abi,
    account,
    address: multicallAddress,
    args: [calls],
    blockNumber,
    blockTag,
    functionName: "aggregate3",
    stateOverride
  })));
  const results = [];
  for (let i = 0; i < aggregate3Results.length; i++) {
    const result = aggregate3Results[i];
    if (result.status === "rejected") {
      if (!allowFailure)
        throw result.reason;
      for (let j = 0; j < chunkedCalls[i].length; j++) {
        results.push({
          status: "failure",
          error: result.reason,
          result: void 0
        });
      }
      continue;
    }
    const aggregate3Result = result.value;
    for (let j = 0; j < aggregate3Result.length; j++) {
      const { returnData, success } = aggregate3Result[j];
      const { callData } = chunkedCalls[i][j];
      const { abi: abi2, address, functionName, args } = contracts[results.length];
      try {
        if (callData === "0x")
          throw new AbiDecodingZeroDataError();
        if (!success)
          throw new RawContractError({ data: returnData });
        const result2 = decodeFunctionResult({
          abi: abi2,
          args,
          data: returnData,
          functionName
        });
        results.push(allowFailure ? { result: result2, status: "success" } : result2);
      } catch (err) {
        const error = getContractError(err, {
          abi: abi2,
          address,
          args,
          docsPath: "/docs/contract/multicall",
          functionName
        });
        if (!allowFailure)
          throw error;
        results.push({ error, result: void 0, status: "failure" });
      }
    }
  }
  if (results.length !== contracts.length)
    throw new BaseError("multicall results mismatch");
  return results;
}

// node_modules/viem/_esm/actions/public/simulateBlocks.js
async function simulateBlocks(client, parameters) {
  const { blockNumber, blockTag = client.experimental_blockTag ?? "latest", blocks, returnFullTransactions, traceTransfers, validation } = parameters;
  try {
    const blockStateCalls = [];
    for (const block2 of blocks) {
      const blockOverrides = block2.blockOverrides ? toRpc(block2.blockOverrides) : void 0;
      const calls = block2.calls.map((call_) => {
        const call3 = call_;
        const account = call3.account ? parseAccount(call3.account) : void 0;
        const data = call3.abi ? encodeFunctionData(call3) : call3.data;
        const request = {
          ...call3,
          data: call3.dataSuffix ? concat([data || "0x", call3.dataSuffix]) : data,
          from: call3.from ?? account?.address
        };
        assertRequest(request);
        return formatTransactionRequest(request);
      });
      const stateOverrides = block2.stateOverrides ? serializeStateOverride(block2.stateOverrides) : void 0;
      blockStateCalls.push({
        blockOverrides,
        calls,
        stateOverrides
      });
    }
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const result = await client.request({
      method: "eth_simulateV1",
      params: [
        { blockStateCalls, returnFullTransactions, traceTransfers, validation },
        block
      ]
    });
    return result.map((block2, i) => ({
      ...formatBlock(block2),
      calls: block2.calls.map((call3, j) => {
        const { abi: abi2, args, functionName, to } = blocks[i].calls[j];
        const data = call3.error?.data ?? call3.returnData;
        const gasUsed = BigInt(call3.gasUsed);
        const logs = call3.logs?.map((log) => formatLog(log));
        const status = call3.status === "0x1" ? "success" : "failure";
        const result2 = abi2 && status === "success" && data !== "0x" ? decodeFunctionResult({
          abi: abi2,
          data,
          functionName
        }) : null;
        const error = (() => {
          if (status === "success")
            return void 0;
          let error2 = void 0;
          if (call3.error?.data === "0x")
            error2 = new AbiDecodingZeroDataError();
          else if (call3.error)
            error2 = new RawContractError(call3.error);
          if (!error2)
            return void 0;
          return getContractError(error2, {
            abi: abi2 ?? [],
            address: to ?? "0x",
            args,
            functionName: functionName ?? "<unknown>"
          });
        })();
        return {
          data,
          gasUsed,
          logs,
          status,
          ...status === "success" ? {
            result: result2
          } : {
            error
          }
        };
      })
    }));
  } catch (e) {
    const cause = e;
    const error = getNodeError(cause, {});
    if (error instanceof UnknownNodeError)
      throw cause;
    throw error;
  }
}

// node_modules/ox/node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE ? 4 : 0;
  const l = isLE ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE);
  view.setUint32(byteOffset + l, wl, isLE);
}
function Chi2(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj2(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD2 = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes2(data);
    abytes(data);
    const { view, buffer: buffer3, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer3.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer: buffer3, view, blockLen, isLE } = this;
    let { pos } = this;
    buffer3[pos++] = 128;
    clean2(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer3[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE);
  }
  digest() {
    const { buffer: buffer3, outputLen } = this;
    this.digestInto(buffer3);
    const res = buffer3.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer: buffer3, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer3);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA224_IV = Uint32Array.from([
  3238371032,
  914150663,
  812702999,
  4144912697,
  4290775857,
  1750603025,
  1694076839,
  3204075428
]);
var SHA384_IV = Uint32Array.from([
  3418070365,
  3238371032,
  1654270250,
  914150663,
  2438529370,
  812702999,
  355462360,
  4144912697,
  1731405415,
  4290775857,
  2394180231,
  1750603025,
  3675008525,
  1694076839,
  1203062813,
  3204075428
]);
var SHA512_IV = Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]);

// node_modules/ox/node_modules/@noble/hashes/esm/legacy.js
var SHA1_IV = Uint32Array.from([
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
]);
var SHA1_W = new Uint32Array(80);
var SHA1 = class extends HashMD2 {
  constructor() {
    super(64, 20, 8, false);
    this.A = SHA1_IV[0] | 0;
    this.B = SHA1_IV[1] | 0;
    this.C = SHA1_IV[2] | 0;
    this.D = SHA1_IV[3] | 0;
    this.E = SHA1_IV[4] | 0;
  }
  get() {
    const { A, B, C, D, E } = this;
    return [A, B, C, D, E];
  }
  set(A, B, C, D, E) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA1_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 80; i++)
      SHA1_W[i] = rotl2(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
    let { A, B, C, D, E } = this;
    for (let i = 0; i < 80; i++) {
      let F, K3;
      if (i < 20) {
        F = Chi2(B, C, D);
        K3 = 1518500249;
      } else if (i < 40) {
        F = B ^ C ^ D;
        K3 = 1859775393;
      } else if (i < 60) {
        F = Maj2(B, C, D);
        K3 = 2400959708;
      } else {
        F = B ^ C ^ D;
        K3 = 3395469782;
      }
      const T = rotl2(A, 5) + F + E + K3 + SHA1_W[i] | 0;
      E = D;
      D = C;
      C = rotl2(B, 30);
      B = A;
      A = T;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    this.set(A, B, C, D, E);
  }
  roundClean() {
    clean2(SHA1_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0);
    clean2(this.buffer);
  }
};
var sha1 = createHasher2(() => new SHA1());
var p32 = Math.pow(2, 32);
var K = Array.from({ length: 64 }, (_, i) => Math.floor(p32 * Math.abs(Math.sin(i + 1))));
var MD5_IV = SHA1_IV.slice(0, 4);
var MD5_W = new Uint32Array(16);
var MD5 = class extends HashMD2 {
  constructor() {
    super(64, 16, 8, true);
    this.A = MD5_IV[0] | 0;
    this.B = MD5_IV[1] | 0;
    this.C = MD5_IV[2] | 0;
    this.D = MD5_IV[3] | 0;
  }
  get() {
    const { A, B, C, D } = this;
    return [A, B, C, D];
  }
  set(A, B, C, D) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      MD5_W[i] = view.getUint32(offset, true);
    let { A, B, C, D } = this;
    for (let i = 0; i < 64; i++) {
      let F, g, s;
      if (i < 16) {
        F = Chi2(B, C, D);
        g = i;
        s = [7, 12, 17, 22];
      } else if (i < 32) {
        F = Chi2(D, B, C);
        g = (5 * i + 1) % 16;
        s = [5, 9, 14, 20];
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
        s = [4, 11, 16, 23];
      } else {
        F = C ^ (B | ~D);
        g = 7 * i % 16;
        s = [6, 10, 15, 21];
      }
      F = F + A + K[i] + MD5_W[g];
      A = D;
      D = C;
      C = B;
      B = B + rotl2(F, s[i % 4]);
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    this.set(A, B, C, D);
  }
  roundClean() {
    clean2(MD5_W);
  }
  destroy() {
    this.set(0, 0, 0, 0);
    clean2(this.buffer);
  }
};
var md5 = createHasher2(() => new MD5());
var Rho160 = Uint8Array.from([
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8
]);
var Id160 = (() => Uint8Array.from(new Array(16).fill(0).map((_, i) => i)))();
var Pi160 = (() => Id160.map((i) => (9 * i + 5) % 16))();
var idxLR = (() => {
  const L = [Id160];
  const R = [Pi160];
  const res = [L, R];
  for (let i = 0; i < 4; i++)
    for (let j of res)
      j.push(j[i].map((k) => Rho160[k]));
  return res;
})();
var idxL = (() => idxLR[0])();
var idxR = (() => idxLR[1])();
var shifts160 = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i) => Uint8Array.from(i));
var shiftsL160 = idxL.map((idx, i) => idx.map((j) => shifts160[i][j]));
var shiftsR160 = idxR.map((idx, i) => idx.map((j) => shifts160[i][j]));
var Kl160 = Uint32Array.from([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
var Kr160 = Uint32Array.from([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function ripemd_f(group, x, y, z) {
  if (group === 0)
    return x ^ y ^ z;
  if (group === 1)
    return x & y | ~x & z;
  if (group === 2)
    return (x | ~y) ^ z;
  if (group === 3)
    return x & z | y & ~z;
  return x ^ (y | ~z);
}
var BUF_160 = new Uint32Array(16);
var RIPEMD160 = class extends HashMD2 {
  constructor() {
    super(64, 20, 8, true);
    this.h0 = 1732584193 | 0;
    this.h1 = 4023233417 | 0;
    this.h2 = 2562383102 | 0;
    this.h3 = 271733878 | 0;
    this.h4 = 3285377520 | 0;
  }
  get() {
    const { h0, h1, h2, h3, h4 } = this;
    return [h0, h1, h2, h3, h4];
  }
  set(h0, h1, h2, h3, h4) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h2 | 0;
    this.h3 = h3 | 0;
    this.h4 = h4 | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      BUF_160[i] = view.getUint32(offset, true);
    let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl160[group], hbr = Kr160[group];
      const rl = idxL[group], rr = idxR[group];
      const sl = shiftsL160[group], sr = shiftsR160[group];
      for (let i = 0; i < 16; i++) {
        const tl = rotl2(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i]] + hbl, sl[i]) + el | 0;
        al = el, el = dl, dl = rotl2(cl, 10) | 0, cl = bl, bl = tl;
      }
      for (let i = 0; i < 16; i++) {
        const tr = rotl2(ar + ripemd_f(rGroup, br, cr, dr) + BUF_160[rr[i]] + hbr, sr[i]) + er | 0;
        ar = er, er = dr, dr = rotl2(cr, 10) | 0, cr = br, br = tr;
      }
    }
    this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
  }
  roundClean() {
    clean2(BUF_160);
  }
  destroy() {
    this.destroyed = true;
    clean2(this.buffer);
    this.set(0, 0, 0, 0, 0);
  }
};
var ripemd160 = createHasher2(() => new RIPEMD160());

// node_modules/ox/node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = BigInt(2 ** 32 - 1);
var _32n = BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var shrSH = (h, _l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;

// node_modules/ox/node_modules/@noble/hashes/esm/sha3.js
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var IOTAS = split(_SHA3_IOTA, true);
var SHA3_IOTA_H = IOTAS[0];
var SHA3_IOTA_L = IOTAS[1];
var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean2(B);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen);
    if (!(0 < blockLen && blockLen < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    data = toBytes2(data);
    abytes(data);
    const { blockLen, state } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    clean2(this.state);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
var gen = (suffix, blockLen, outputLen) => createHasher2(() => new Keccak(blockLen, suffix, outputLen));
var sha3_224 = (() => gen(6, 144, 224 / 8))();
var sha3_256 = (() => gen(6, 136, 256 / 8))();
var sha3_384 = (() => gen(6, 104, 384 / 8))();
var sha3_512 = (() => gen(6, 72, 512 / 8))();
var keccak_224 = (() => gen(1, 144, 224 / 8))();
var keccak_256 = (() => gen(1, 136, 256 / 8))();
var keccak_384 = (() => gen(1, 104, 384 / 8))();
var keccak_512 = (() => gen(1, 72, 512 / 8))();
var genShake = (suffix, blockLen, outputLen) => createXOFer((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
var shake128 = (() => genShake(31, 168, 128 / 8))();
var shake256 = (() => genShake(31, 136, 256 / 8))();

// node_modules/ox/node_modules/@noble/hashes/esm/sha2.js
var SHA256_K = Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = new Uint32Array(64);
var SHA256 = class extends HashMD2 {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi2(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj2(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean2(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean2(this.buffer);
  }
};
var SHA224 = class extends SHA256 {
  constructor() {
    super(28);
    this.A = SHA224_IV[0] | 0;
    this.B = SHA224_IV[1] | 0;
    this.C = SHA224_IV[2] | 0;
    this.D = SHA224_IV[3] | 0;
    this.E = SHA224_IV[4] | 0;
    this.F = SHA224_IV[5] | 0;
    this.G = SHA224_IV[6] | 0;
    this.H = SHA224_IV[7] | 0;
  }
};
var K512 = (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
var SHA512_Kh = (() => K512[0])();
var SHA512_Kl = (() => K512[1])();
var SHA512_W_H = new Uint32Array(80);
var SHA512_W_L = new Uint32Array(80);
var SHA512 = class extends HashMD2 {
  constructor(outputLen = 64) {
    super(128, outputLen, 16, false);
    this.Ah = SHA512_IV[0] | 0;
    this.Al = SHA512_IV[1] | 0;
    this.Bh = SHA512_IV[2] | 0;
    this.Bl = SHA512_IV[3] | 0;
    this.Ch = SHA512_IV[4] | 0;
    this.Cl = SHA512_IV[5] | 0;
    this.Dh = SHA512_IV[6] | 0;
    this.Dl = SHA512_IV[7] | 0;
    this.Eh = SHA512_IV[8] | 0;
    this.El = SHA512_IV[9] | 0;
    this.Fh = SHA512_IV[10] | 0;
    this.Fl = SHA512_IV[11] | 0;
    this.Gh = SHA512_IV[12] | 0;
    this.Gl = SHA512_IV[13] | 0;
    this.Hh = SHA512_IV[14] | 0;
    this.Hl = SHA512_IV[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) {
      SHA512_W_H[i] = view.getUint32(offset);
      SHA512_W_L[i] = view.getUint32(offset += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean2(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    clean2(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var SHA384 = class extends SHA512 {
  constructor() {
    super(48);
    this.Ah = SHA384_IV[0] | 0;
    this.Al = SHA384_IV[1] | 0;
    this.Bh = SHA384_IV[2] | 0;
    this.Bl = SHA384_IV[3] | 0;
    this.Ch = SHA384_IV[4] | 0;
    this.Cl = SHA384_IV[5] | 0;
    this.Dh = SHA384_IV[6] | 0;
    this.Dl = SHA384_IV[7] | 0;
    this.Eh = SHA384_IV[8] | 0;
    this.El = SHA384_IV[9] | 0;
    this.Fh = SHA384_IV[10] | 0;
    this.Fl = SHA384_IV[11] | 0;
    this.Gh = SHA384_IV[12] | 0;
    this.Gl = SHA384_IV[13] | 0;
    this.Hh = SHA384_IV[14] | 0;
    this.Hl = SHA384_IV[15] | 0;
  }
};
var T224_IV = Uint32Array.from([
  2352822216,
  424955298,
  1944164710,
  2312950998,
  502970286,
  855612546,
  1738396948,
  1479516111,
  258812777,
  2077511080,
  2011393907,
  79989058,
  1067287976,
  1780299464,
  286451373,
  2446758561
]);
var T256_IV = Uint32Array.from([
  573645204,
  4230739756,
  2673172387,
  3360449730,
  596883563,
  1867755857,
  2520282905,
  1497426621,
  2519219938,
  2827943907,
  3193839141,
  1401305490,
  721525244,
  746961066,
  246885852,
  2177182882
]);
var SHA512_224 = class extends SHA512 {
  constructor() {
    super(28);
    this.Ah = T224_IV[0] | 0;
    this.Al = T224_IV[1] | 0;
    this.Bh = T224_IV[2] | 0;
    this.Bl = T224_IV[3] | 0;
    this.Ch = T224_IV[4] | 0;
    this.Cl = T224_IV[5] | 0;
    this.Dh = T224_IV[6] | 0;
    this.Dl = T224_IV[7] | 0;
    this.Eh = T224_IV[8] | 0;
    this.El = T224_IV[9] | 0;
    this.Fh = T224_IV[10] | 0;
    this.Fl = T224_IV[11] | 0;
    this.Gh = T224_IV[12] | 0;
    this.Gl = T224_IV[13] | 0;
    this.Hh = T224_IV[14] | 0;
    this.Hl = T224_IV[15] | 0;
  }
};
var SHA512_256 = class extends SHA512 {
  constructor() {
    super(32);
    this.Ah = T256_IV[0] | 0;
    this.Al = T256_IV[1] | 0;
    this.Bh = T256_IV[2] | 0;
    this.Bl = T256_IV[3] | 0;
    this.Ch = T256_IV[4] | 0;
    this.Cl = T256_IV[5] | 0;
    this.Dh = T256_IV[6] | 0;
    this.Dl = T256_IV[7] | 0;
    this.Eh = T256_IV[8] | 0;
    this.El = T256_IV[9] | 0;
    this.Fh = T256_IV[10] | 0;
    this.Fl = T256_IV[11] | 0;
    this.Gh = T256_IV[12] | 0;
    this.Gl = T256_IV[13] | 0;
    this.Hh = T256_IV[14] | 0;
    this.Hl = T256_IV[15] | 0;
  }
};
var sha256 = createHasher2(() => new SHA256());
var sha224 = createHasher2(() => new SHA224());
var sha512 = createHasher2(() => new SHA512());
var sha384 = createHasher2(() => new SHA384());
var sha512_256 = createHasher2(() => new SHA512_256());
var sha512_224 = createHasher2(() => new SHA512_224());

// node_modules/ox/_esm/core/Hash.js
function keccak2562(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from(value));
  if (as === "Bytes")
    return bytes;
  return fromBytes(bytes);
}

// node_modules/ox/_esm/core/internal/lru.js
var LruMap2 = class extends Map {
  constructor(size6) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size6;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/ox/_esm/core/Caches.js
var caches = {
  checksum: new LruMap2(8192)
};
var checksum = caches.checksum;

// node_modules/ox/_esm/core/Address.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError2({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum2(value) !== value)
      throw new InvalidAddressError2({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum2(address) {
  if (checksum.has(address))
    return checksum.get(address);
  assert(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash = keccak2562(fromString(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash[i >> 1] >> 4 >= 8 && characters[i]) {
      characters[i] = characters[i].toUpperCase();
    }
    if ((hash[i >> 1] & 15) >= 8 && characters[i + 1]) {
      characters[i + 1] = characters[i + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum.set(address, result);
  return result;
}
function validate3(address, options = {}) {
  const { strict = true } = options ?? {};
  try {
    assert(address, { strict });
    return true;
  } catch {
    return false;
  }
}
var InvalidAddressError2 = class extends BaseError2 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
};
var InvalidInputError = class extends BaseError2 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
};
var InvalidChecksumError = class extends BaseError2 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
};

// node_modules/ox/_esm/core/internal/abiItem.js
function normalizeSignature(signature) {
  let active = true;
  let current = "";
  let level = 0;
  let result = "";
  let valid = false;
  for (let i = 0; i < signature.length; i++) {
    const char = signature[i];
    if (["(", ")", ","].includes(char))
      active = true;
    if (char === "(")
      level++;
    if (char === ")")
      level--;
    if (!active)
      continue;
    if (level === 0) {
      if (char === " " && ["event", "function", "error", ""].includes(result))
        result = "";
      else {
        result += char;
        if (char === ")") {
          valid = true;
          break;
        }
      }
      continue;
    }
    if (char === " ") {
      if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
        current = "";
        active = false;
      }
      continue;
    }
    result += char;
    current += char;
  }
  if (!valid)
    throw new BaseError2("Unable to normalize signature.");
  return result;
}
function isArgOfType(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return validate3(arg, { strict: false });
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && "components" in abiParameter)
        return Object.values(abiParameter.components).every((component, index3) => {
          return isArgOfType(Object.values(arg)[index3], component);
        });
      if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
        return argType === "number" || argType === "bigint";
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === "string" || arg instanceof Uint8Array;
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
          ...abiParameter,
          // Pop off `[]` or `[M]` from end of type
          type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
        }));
      }
      return false;
    }
  }
}
function getAmbiguousTypes(sourceParameters, targetParameters, args) {
  for (const parameterIndex in sourceParameters) {
    const sourceParameter = sourceParameters[parameterIndex];
    const targetParameter = targetParameters[parameterIndex];
    if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
      return getAmbiguousTypes(sourceParameter.components, targetParameter.components, args[parameterIndex]);
    const types = [sourceParameter.type, targetParameter.type];
    const ambiguous = (() => {
      if (types.includes("address") && types.includes("bytes20"))
        return true;
      if (types.includes("address") && types.includes("string"))
        return validate3(args[parameterIndex], {
          strict: false
        });
      if (types.includes("address") && types.includes("bytes"))
        return validate3(args[parameterIndex], {
          strict: false
        });
      return false;
    })();
    if (ambiguous)
      return types;
  }
  return;
}

// node_modules/ox/_esm/core/AbiItem.js
function from3(abiItem, options = {}) {
  const { prepare = true } = options;
  const item = (() => {
    if (Array.isArray(abiItem))
      return parseAbiItem(abiItem);
    if (typeof abiItem === "string")
      return parseAbiItem(abiItem);
    return abiItem;
  })();
  return {
    ...item,
    ...prepare ? { hash: getSignatureHash(item) } : {}
  };
}
function fromAbi(abi2, name, options) {
  const { args = [], prepare = true } = options ?? {};
  const isSelector = validate(name, { strict: false });
  const abiItems = abi2.filter((abiItem2) => {
    if (isSelector) {
      if (abiItem2.type === "function" || abiItem2.type === "error")
        return getSelector(abiItem2) === slice(name, 0, 4);
      if (abiItem2.type === "event")
        return getSignatureHash(abiItem2) === name;
      return false;
    }
    return "name" in abiItem2 && abiItem2.name === name;
  });
  if (abiItems.length === 0)
    throw new NotFoundError({ name });
  if (abiItems.length === 1)
    return {
      ...abiItems[0],
      ...prepare ? { hash: getSignatureHash(abiItems[0]) } : {}
    };
  let matchedAbiItem = void 0;
  for (const abiItem2 of abiItems) {
    if (!("inputs" in abiItem2))
      continue;
    if (!args || args.length === 0) {
      if (!abiItem2.inputs || abiItem2.inputs.length === 0)
        return {
          ...abiItem2,
          ...prepare ? { hash: getSignatureHash(abiItem2) } : {}
        };
      continue;
    }
    if (!abiItem2.inputs)
      continue;
    if (abiItem2.inputs.length === 0)
      continue;
    if (abiItem2.inputs.length !== args.length)
      continue;
    const matched = args.every((arg, index3) => {
      const abiParameter = "inputs" in abiItem2 && abiItem2.inputs[index3];
      if (!abiParameter)
        return false;
      return isArgOfType(arg, abiParameter);
    });
    if (matched) {
      if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
        const ambiguousTypes = getAmbiguousTypes(abiItem2.inputs, matchedAbiItem.inputs, args);
        if (ambiguousTypes)
          throw new AmbiguityError({
            abiItem: abiItem2,
            type: ambiguousTypes[0]
          }, {
            abiItem: matchedAbiItem,
            type: ambiguousTypes[1]
          });
      }
      matchedAbiItem = abiItem2;
    }
  }
  const abiItem = (() => {
    if (matchedAbiItem)
      return matchedAbiItem;
    const [abiItem2, ...overloads] = abiItems;
    return { ...abiItem2, overloads };
  })();
  if (!abiItem)
    throw new NotFoundError({ name });
  return {
    ...abiItem,
    ...prepare ? { hash: getSignatureHash(abiItem) } : {}
  };
}
function getSelector(abiItem) {
  return slice(getSignatureHash(abiItem), 0, 4);
}
function getSignature(abiItem) {
  const signature = (() => {
    if (typeof abiItem === "string")
      return abiItem;
    return formatAbiItem2(abiItem);
  })();
  return normalizeSignature(signature);
}
function getSignatureHash(abiItem) {
  if (typeof abiItem !== "string" && "hash" in abiItem && abiItem.hash)
    return abiItem.hash;
  return keccak2562(fromString2(getSignature(abiItem)));
}
var AmbiguityError = class extends BaseError2 {
  constructor(x, y) {
    super("Found ambiguous types in overloaded ABI Items.", {
      metaMessages: [
        // TODO: abitype to add support for signature-formatted ABI items.
        `\`${x.type}\` in \`${normalizeSignature(formatAbiItem2(x.abiItem))}\`, and`,
        `\`${y.type}\` in \`${normalizeSignature(formatAbiItem2(y.abiItem))}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.AmbiguityError"
    });
  }
};
var NotFoundError = class extends BaseError2 {
  constructor({ name, data, type = "item" }) {
    const selector = (() => {
      if (name)
        return ` with name "${name}"`;
      if (data)
        return ` with data "${data}"`;
      return "";
    })();
    super(`ABI ${type}${selector} not found.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.NotFoundError"
    });
  }
};

// node_modules/ox/_esm/core/Solidity.js
var arrayRegex = /^(.*)\[([0-9]*)\]$/;
var bytesRegex2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex2 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var maxInt8 = 2n ** (8n - 1n) - 1n;
var maxInt16 = 2n ** (16n - 1n) - 1n;
var maxInt24 = 2n ** (24n - 1n) - 1n;
var maxInt32 = 2n ** (32n - 1n) - 1n;
var maxInt40 = 2n ** (40n - 1n) - 1n;
var maxInt48 = 2n ** (48n - 1n) - 1n;
var maxInt56 = 2n ** (56n - 1n) - 1n;
var maxInt64 = 2n ** (64n - 1n) - 1n;
var maxInt72 = 2n ** (72n - 1n) - 1n;
var maxInt80 = 2n ** (80n - 1n) - 1n;
var maxInt88 = 2n ** (88n - 1n) - 1n;
var maxInt96 = 2n ** (96n - 1n) - 1n;
var maxInt104 = 2n ** (104n - 1n) - 1n;
var maxInt112 = 2n ** (112n - 1n) - 1n;
var maxInt120 = 2n ** (120n - 1n) - 1n;
var maxInt128 = 2n ** (128n - 1n) - 1n;
var maxInt136 = 2n ** (136n - 1n) - 1n;
var maxInt144 = 2n ** (144n - 1n) - 1n;
var maxInt152 = 2n ** (152n - 1n) - 1n;
var maxInt160 = 2n ** (160n - 1n) - 1n;
var maxInt168 = 2n ** (168n - 1n) - 1n;
var maxInt176 = 2n ** (176n - 1n) - 1n;
var maxInt184 = 2n ** (184n - 1n) - 1n;
var maxInt192 = 2n ** (192n - 1n) - 1n;
var maxInt200 = 2n ** (200n - 1n) - 1n;
var maxInt208 = 2n ** (208n - 1n) - 1n;
var maxInt216 = 2n ** (216n - 1n) - 1n;
var maxInt224 = 2n ** (224n - 1n) - 1n;
var maxInt232 = 2n ** (232n - 1n) - 1n;
var maxInt240 = 2n ** (240n - 1n) - 1n;
var maxInt248 = 2n ** (248n - 1n) - 1n;
var maxInt256 = 2n ** (256n - 1n) - 1n;
var minInt8 = -(2n ** (8n - 1n));
var minInt16 = -(2n ** (16n - 1n));
var minInt24 = -(2n ** (24n - 1n));
var minInt32 = -(2n ** (32n - 1n));
var minInt40 = -(2n ** (40n - 1n));
var minInt48 = -(2n ** (48n - 1n));
var minInt56 = -(2n ** (56n - 1n));
var minInt64 = -(2n ** (64n - 1n));
var minInt72 = -(2n ** (72n - 1n));
var minInt80 = -(2n ** (80n - 1n));
var minInt88 = -(2n ** (88n - 1n));
var minInt96 = -(2n ** (96n - 1n));
var minInt104 = -(2n ** (104n - 1n));
var minInt112 = -(2n ** (112n - 1n));
var minInt120 = -(2n ** (120n - 1n));
var minInt128 = -(2n ** (128n - 1n));
var minInt136 = -(2n ** (136n - 1n));
var minInt144 = -(2n ** (144n - 1n));
var minInt152 = -(2n ** (152n - 1n));
var minInt160 = -(2n ** (160n - 1n));
var minInt168 = -(2n ** (168n - 1n));
var minInt176 = -(2n ** (176n - 1n));
var minInt184 = -(2n ** (184n - 1n));
var minInt192 = -(2n ** (192n - 1n));
var minInt200 = -(2n ** (200n - 1n));
var minInt208 = -(2n ** (208n - 1n));
var minInt216 = -(2n ** (216n - 1n));
var minInt224 = -(2n ** (224n - 1n));
var minInt232 = -(2n ** (232n - 1n));
var minInt240 = -(2n ** (240n - 1n));
var minInt248 = -(2n ** (248n - 1n));
var minInt256 = -(2n ** (256n - 1n));
var maxUint8 = 2n ** 8n - 1n;
var maxUint16 = 2n ** 16n - 1n;
var maxUint24 = 2n ** 24n - 1n;
var maxUint32 = 2n ** 32n - 1n;
var maxUint40 = 2n ** 40n - 1n;
var maxUint48 = 2n ** 48n - 1n;
var maxUint56 = 2n ** 56n - 1n;
var maxUint64 = 2n ** 64n - 1n;
var maxUint72 = 2n ** 72n - 1n;
var maxUint80 = 2n ** 80n - 1n;
var maxUint88 = 2n ** 88n - 1n;
var maxUint96 = 2n ** 96n - 1n;
var maxUint104 = 2n ** 104n - 1n;
var maxUint112 = 2n ** 112n - 1n;
var maxUint120 = 2n ** 120n - 1n;
var maxUint128 = 2n ** 128n - 1n;
var maxUint136 = 2n ** 136n - 1n;
var maxUint144 = 2n ** 144n - 1n;
var maxUint152 = 2n ** 152n - 1n;
var maxUint160 = 2n ** 160n - 1n;
var maxUint168 = 2n ** 168n - 1n;
var maxUint176 = 2n ** 176n - 1n;
var maxUint184 = 2n ** 184n - 1n;
var maxUint192 = 2n ** 192n - 1n;
var maxUint200 = 2n ** 200n - 1n;
var maxUint208 = 2n ** 208n - 1n;
var maxUint216 = 2n ** 216n - 1n;
var maxUint224 = 2n ** 224n - 1n;
var maxUint232 = 2n ** 232n - 1n;
var maxUint240 = 2n ** 240n - 1n;
var maxUint248 = 2n ** 248n - 1n;
var maxUint256 = 2n ** 256n - 1n;

// node_modules/ox/_esm/core/internal/abiParameters.js
function prepareParameters({ checksumAddress: checksumAddress2, parameters, values }) {
  const preparedParameters = [];
  for (let i = 0; i < parameters.length; i++) {
    preparedParameters.push(prepareParameter({
      checksumAddress: checksumAddress2,
      parameter: parameters[i],
      value: values[i]
    }));
  }
  return preparedParameters;
}
function prepareParameter({ checksumAddress: checksumAddress2 = false, parameter: parameter_, value }) {
  const parameter = parameter_;
  const arrayComponents = getArrayComponents(parameter.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return encodeArray(value, {
      checksumAddress: checksumAddress2,
      length,
      parameter: {
        ...parameter,
        type
      }
    });
  }
  if (parameter.type === "tuple") {
    return encodeTuple(value, {
      checksumAddress: checksumAddress2,
      parameter
    });
  }
  if (parameter.type === "address") {
    return encodeAddress(value, {
      checksum: checksumAddress2
    });
  }
  if (parameter.type === "bool") {
    return encodeBoolean(value);
  }
  if (parameter.type.startsWith("uint") || parameter.type.startsWith("int")) {
    const signed = parameter.type.startsWith("int");
    const [, , size6 = "256"] = integerRegex2.exec(parameter.type) ?? [];
    return encodeNumber(value, {
      signed,
      size: Number(size6)
    });
  }
  if (parameter.type.startsWith("bytes")) {
    return encodeBytes(value, { type: parameter.type });
  }
  if (parameter.type === "string") {
    return encodeString(value);
  }
  throw new InvalidTypeError(parameter.type);
}
function encode(preparedParameters) {
  let staticSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic)
      staticSize += 32;
    else
      staticSize += size2(encoded);
  }
  const staticParameters = [];
  const dynamicParameters = [];
  let dynamicSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic) {
      staticParameters.push(fromNumber(staticSize + dynamicSize, { size: 32 }));
      dynamicParameters.push(encoded);
      dynamicSize += size2(encoded);
    } else {
      staticParameters.push(encoded);
    }
  }
  return concat2(...staticParameters, ...dynamicParameters);
}
function encodeAddress(value, options) {
  const { checksum: checksum3 = false } = options;
  assert(value, { strict: checksum3 });
  return {
    dynamic: false,
    encoded: padLeft(value.toLowerCase())
  };
}
function encodeArray(value, options) {
  const { checksumAddress: checksumAddress2, length, parameter } = options;
  const dynamic = length === null;
  if (!Array.isArray(value))
    throw new InvalidArrayError(value);
  if (!dynamic && value.length !== length)
    throw new ArrayLengthMismatchError({
      expectedLength: length,
      givenLength: value.length,
      type: `${parameter.type}[${length}]`
    });
  let dynamicChild = false;
  const preparedParameters = [];
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParameter({
      checksumAddress: checksumAddress2,
      parameter,
      value: value[i]
    });
    if (preparedParam.dynamic)
      dynamicChild = true;
    preparedParameters.push(preparedParam);
  }
  if (dynamic || dynamicChild) {
    const data = encode(preparedParameters);
    if (dynamic) {
      const length2 = fromNumber(preparedParameters.length, { size: 32 });
      return {
        dynamic: true,
        encoded: preparedParameters.length > 0 ? concat2(length2, data) : length2
      };
    }
    if (dynamicChild)
      return { dynamic: true, encoded: data };
  }
  return {
    dynamic: false,
    encoded: concat2(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function encodeBytes(value, { type }) {
  const [, parametersize] = type.split("bytes");
  const bytesSize = size2(value);
  if (!parametersize) {
    let value_ = value;
    if (bytesSize % 32 !== 0)
      value_ = padRight(value_, Math.ceil((value.length - 2) / 2 / 32) * 32);
    return {
      dynamic: true,
      encoded: concat2(padLeft(fromNumber(bytesSize, { size: 32 })), value_)
    };
  }
  if (bytesSize !== Number.parseInt(parametersize))
    throw new BytesSizeMismatchError2({
      expectedSize: Number.parseInt(parametersize),
      value
    });
  return { dynamic: false, encoded: padRight(value) };
}
function encodeBoolean(value) {
  if (typeof value !== "boolean")
    throw new BaseError2(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
  return { dynamic: false, encoded: padLeft(fromBoolean(value)) };
}
function encodeNumber(value, { signed, size: size6 }) {
  if (typeof size6 === "number") {
    const max = 2n ** (BigInt(size6) - (signed ? 1n : 0n)) - 1n;
    const min = signed ? -max - 1n : 0n;
    if (value > max || value < min)
      throw new IntegerOutOfRangeError({
        max: max.toString(),
        min: min.toString(),
        signed,
        size: size6 / 8,
        value: value.toString()
      });
  }
  return {
    dynamic: false,
    encoded: fromNumber(value, {
      size: 32,
      signed
    })
  };
}
function encodeString(value) {
  const hexValue = fromString2(value);
  const partsLength = Math.ceil(size2(hexValue) / 32);
  const parts = [];
  for (let i = 0; i < partsLength; i++) {
    parts.push(padRight(slice(hexValue, i * 32, (i + 1) * 32)));
  }
  return {
    dynamic: true,
    encoded: concat2(padRight(fromNumber(size2(hexValue), { size: 32 })), ...parts)
  };
}
function encodeTuple(value, options) {
  const { checksumAddress: checksumAddress2, parameter } = options;
  let dynamic = false;
  const preparedParameters = [];
  for (let i = 0; i < parameter.components.length; i++) {
    const param_ = parameter.components[i];
    const index3 = Array.isArray(value) ? i : param_.name;
    const preparedParam = prepareParameter({
      checksumAddress: checksumAddress2,
      parameter: param_,
      value: value[index3]
    });
    preparedParameters.push(preparedParam);
    if (preparedParam.dynamic)
      dynamic = true;
  }
  return {
    dynamic,
    encoded: dynamic ? encode(preparedParameters) : concat2(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function getArrayComponents(type) {
  const matches = type.match(/^(.*)\[(\d+)?\]$/);
  return matches ? (
    // Return `null` if the array is dynamic.
    [matches[2] ? Number(matches[2]) : null, matches[1]]
  ) : void 0;
}

// node_modules/ox/_esm/core/internal/cursor.js
var staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError2({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length - 1);
    return this.bytes.subarray(position, position + length);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & ~4294967040);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length, size6) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length);
    this.position += size6 ?? length;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
var NegativeOffsetError = class extends BaseError2 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
};
var PositionOutOfBoundsError2 = class extends BaseError2 {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
};
var RecursiveReadLimitExceededError = class extends BaseError2 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
};

// node_modules/ox/_esm/core/AbiParameters.js
function encode2(parameters, values, options) {
  const { checksumAddress: checksumAddress2 = false } = options ?? {};
  if (parameters.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: parameters.length,
      givenLength: values.length
    });
  const preparedParameters = prepareParameters({
    checksumAddress: checksumAddress2,
    parameters,
    values
  });
  const data = encode(preparedParameters);
  if (data.length === 0)
    return "0x";
  return data;
}
function encodePacked(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const value = values[i];
    data.push(encodePacked.encode(type, value));
  }
  return concat2(...data);
}
(function(encodePacked3) {
  function encode4(type, value, isArray = false) {
    if (type === "address") {
      const address = value;
      assert(address);
      return padLeft(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type === "string")
      return fromString2(value);
    if (type === "bytes")
      return value;
    if (type === "bool")
      return padLeft(fromBoolean(value), isArray ? 32 : 1);
    const intMatch = type.match(integerRegex2);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size6 = Number.parseInt(bits) / 8;
      return fromNumber(value, {
        size: isArray ? 32 : size6,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type.match(bytesRegex2);
    if (bytesMatch) {
      const [_type, size6] = bytesMatch;
      if (Number.parseInt(size6) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError2({
          expectedSize: Number.parseInt(size6),
          value
        });
      return padRight(value, isArray ? 32 : 0);
    }
    const arrayMatch = type.match(arrayRegex);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i = 0; i < value.length; i++) {
        data.push(encode4(childType, value[i], true));
      }
      if (data.length === 0)
        return "0x";
      return concat2(...data);
    }
    throw new InvalidTypeError(type);
  }
  encodePacked3.encode = encode4;
})(encodePacked || (encodePacked = {}));
var ArrayLengthMismatchError = class extends BaseError2 {
  constructor({ expectedLength, givenLength, type }) {
    super(`Array length mismatch for type \`${type}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.ArrayLengthMismatchError"
    });
  }
};
var BytesSizeMismatchError2 = class extends BaseError2 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size2(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
};
var LengthMismatchError = class extends BaseError2 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
};
var InvalidArrayError = class extends BaseError2 {
  constructor(value) {
    super(`Value \`${value}\` is not a valid array.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidArrayError"
    });
  }
};
var InvalidTypeError = class extends BaseError2 {
  constructor(type) {
    super(`Type \`${type}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
};

// node_modules/ox/_esm/core/AbiConstructor.js
function encode3(abiConstructor, options) {
  const { bytecode, args } = options;
  return concat2(bytecode, abiConstructor.inputs?.length && args?.length ? encode2(abiConstructor.inputs, args) : "0x");
}
function from4(abiConstructor) {
  return from3(abiConstructor);
}

// node_modules/ox/_esm/core/AbiFunction.js
function encodeData(abiFunction, ...args) {
  const { overloads } = abiFunction;
  const item = overloads ? fromAbi2([abiFunction, ...overloads], abiFunction.name, {
    args: args[0]
  }) : abiFunction;
  const selector = getSelector2(item);
  const data = args.length > 0 ? encode2(item.inputs, args[0]) : void 0;
  return data ? concat2(selector, data) : selector;
}
function from5(abiFunction, options = {}) {
  return from3(abiFunction, options);
}
function fromAbi2(abi2, name, options) {
  const item = fromAbi(abi2, name, options);
  if (item.type !== "function")
    throw new NotFoundError({ name, type: "function" });
  return item;
}
function getSelector2(abiItem) {
  return getSelector(abiItem);
}

// node_modules/viem/_esm/constants/address.js
var ethAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
var zeroAddress = "0x0000000000000000000000000000000000000000";

// node_modules/viem/_esm/utils/promise/withDedupe.js
var promiseCache2 = new LruMap(8192);
function withDedupe(fn, { enabled = true, id }) {
  if (!enabled || !id)
    return fn();
  if (promiseCache2.get(id))
    return promiseCache2.get(id);
  const promise = fn().finally(() => promiseCache2.delete(id));
  promiseCache2.set(id, promise);
  return promise;
}

// node_modules/viem/_esm/utils/wait.js
async function wait(time) {
  return new Promise((res) => setTimeout(res, time));
}

// node_modules/viem/_esm/utils/promise/withRetry.js
function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry: shouldRetry2 = () => true } = {}) {
  return new Promise((resolve, reject) => {
    const attemptRetry = async ({ count = 0 } = {}) => {
      const retry = async ({ error }) => {
        const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
        if (delay)
          await wait(delay);
        attemptRetry({ count: count + 1 });
      };
      try {
        const data = await fn();
        resolve(data);
      } catch (err) {
        if (count < retryCount && await shouldRetry2({ count, error: err }))
          return retry({ error: err });
        reject(err);
      }
    };
    attemptRetry();
  });
}

// node_modules/viem/_esm/utils/buildRequest.js
function buildRequest(request, options = {}) {
  return async (args, overrideOptions = {}) => {
    const { dedupe = false, methods, retryDelay = 150, retryCount = 3, uid: uid3 } = {
      ...options,
      ...overrideOptions
    };
    const { method } = args;
    if (methods?.exclude?.includes(method))
      throw new MethodNotSupportedRpcError(new Error("method not supported"), {
        method
      });
    if (methods?.include && !methods.include.includes(method))
      throw new MethodNotSupportedRpcError(new Error("method not supported"), {
        method
      });
    const requestId = dedupe ? stringToHex(`${uid3}.${stringify(args)}`) : void 0;
    return withDedupe(() => withRetry(async () => {
      try {
        return await request(args);
      } catch (err_) {
        const err = err_;
        switch (err.code) {
          // -32700
          case ParseRpcError.code:
            throw new ParseRpcError(err);
          // -32600
          case InvalidRequestRpcError.code:
            throw new InvalidRequestRpcError(err);
          // -32601
          case MethodNotFoundRpcError.code:
            throw new MethodNotFoundRpcError(err, { method: args.method });
          // -32602
          case InvalidParamsRpcError.code:
            throw new InvalidParamsRpcError(err);
          // -32603
          case InternalRpcError.code:
            throw new InternalRpcError(err);
          // -32000
          case InvalidInputRpcError.code:
            throw new InvalidInputRpcError(err);
          // -32001
          case ResourceNotFoundRpcError.code:
            throw new ResourceNotFoundRpcError(err);
          // -32002
          case ResourceUnavailableRpcError.code:
            throw new ResourceUnavailableRpcError(err);
          // -32003
          case TransactionRejectedRpcError.code:
            throw new TransactionRejectedRpcError(err);
          // -32004
          case MethodNotSupportedRpcError.code:
            throw new MethodNotSupportedRpcError(err, {
              method: args.method
            });
          // -32005
          case LimitExceededRpcError.code:
            throw new LimitExceededRpcError(err);
          // -32006
          case JsonRpcVersionUnsupportedError.code:
            throw new JsonRpcVersionUnsupportedError(err);
          // 4001
          case UserRejectedRequestError.code:
            throw new UserRejectedRequestError(err);
          // 4100
          case UnauthorizedProviderError.code:
            throw new UnauthorizedProviderError(err);
          // 4200
          case UnsupportedProviderMethodError.code:
            throw new UnsupportedProviderMethodError(err);
          // 4900
          case ProviderDisconnectedError.code:
            throw new ProviderDisconnectedError(err);
          // 4901
          case ChainDisconnectedError.code:
            throw new ChainDisconnectedError(err);
          // 4902
          case SwitchChainError.code:
            throw new SwitchChainError(err);
          // 5700
          case UnsupportedNonOptionalCapabilityError.code:
            throw new UnsupportedNonOptionalCapabilityError(err);
          // 5710
          case UnsupportedChainIdError.code:
            throw new UnsupportedChainIdError(err);
          // 5720
          case DuplicateIdError.code:
            throw new DuplicateIdError(err);
          // 5730
          case UnknownBundleIdError.code:
            throw new UnknownBundleIdError(err);
          // 5740
          case BundleTooLargeError.code:
            throw new BundleTooLargeError(err);
          // 5750
          case AtomicReadyWalletRejectedUpgradeError.code:
            throw new AtomicReadyWalletRejectedUpgradeError(err);
          // 5760
          case AtomicityNotSupportedError.code:
            throw new AtomicityNotSupportedError(err);
          // CAIP-25: User Rejected Error
          // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
          case 5e3:
            throw new UserRejectedRequestError(err);
          default:
            if (err_ instanceof BaseError)
              throw err_;
            throw new UnknownRpcError(err);
        }
      }
    }, {
      delay: ({ count, error }) => {
        if (error && error instanceof HttpRequestError) {
          const retryAfter = error?.headers?.get("Retry-After");
          if (retryAfter?.match(/\d/))
            return Number.parseInt(retryAfter) * 1e3;
        }
        return ~~(1 << count) * retryDelay;
      },
      retryCount,
      shouldRetry: ({ error }) => shouldRetry(error)
    }), { enabled: dedupe, id: requestId });
  };
}
function shouldRetry(error) {
  if ("code" in error && typeof error.code === "number") {
    if (error.code === -1)
      return true;
    if (error.code === LimitExceededRpcError.code)
      return true;
    if (error.code === InternalRpcError.code)
      return true;
    return false;
  }
  if (error instanceof HttpRequestError && error.status) {
    if (error.status === 403)
      return true;
    if (error.status === 408)
      return true;
    if (error.status === 413)
      return true;
    if (error.status === 429)
      return true;
    if (error.status === 500)
      return true;
    if (error.status === 502)
      return true;
    if (error.status === 503)
      return true;
    if (error.status === 504)
      return true;
    return false;
  }
  return true;
}

// node_modules/viem/_esm/utils/promise/withTimeout.js
function withTimeout(fn, { errorInstance = new Error("timed out"), timeout, signal }) {
  return new Promise((resolve, reject) => {
    ;
    (async () => {
      let timeoutId;
      try {
        const controller = new AbortController();
        if (timeout > 0) {
          timeoutId = setTimeout(() => {
            if (signal) {
              controller.abort();
            } else {
              reject(errorInstance);
            }
          }, timeout);
        }
        resolve(await fn({ signal: controller?.signal || null }));
      } catch (err) {
        if (err?.name === "AbortError")
          reject(errorInstance);
        reject(err);
      } finally {
        clearTimeout(timeoutId);
      }
    })();
  });
}

// node_modules/viem/_esm/utils/rpc/id.js
function createIdStore() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
var idCache = createIdStore();

// node_modules/viem/_esm/utils/rpc/http.js
function getHttpRpcClient(url, options = {}) {
  return {
    async request(params) {
      const { body, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
      const fetchOptions = {
        ...options.fetchOptions ?? {},
        ...params.fetchOptions ?? {}
      };
      const { headers, method, signal: signal_ } = fetchOptions;
      try {
        const response = await withTimeout(async ({ signal }) => {
          const init = {
            ...fetchOptions,
            body: Array.isArray(body) ? stringify(body.map((body2) => ({
              jsonrpc: "2.0",
              id: body2.id ?? idCache.take(),
              ...body2
            }))) : stringify({
              jsonrpc: "2.0",
              id: body.id ?? idCache.take(),
              ...body
            }),
            headers: {
              "Content-Type": "application/json",
              ...headers
            },
            method: method || "POST",
            signal: signal_ || (timeout > 0 ? signal : null)
          };
          const request = new Request(url, init);
          const args = await onRequest?.(request, init) ?? { ...init, url };
          const response2 = await fetch(args.url ?? url, args);
          return response2;
        }, {
          errorInstance: new TimeoutError({ body, url }),
          timeout,
          signal: true
        });
        if (onResponse)
          await onResponse(response);
        let data;
        if (response.headers.get("Content-Type")?.startsWith("application/json"))
          data = await response.json();
        else {
          data = await response.text();
          try {
            data = JSON.parse(data || "{}");
          } catch (err) {
            if (response.ok)
              throw err;
            data = { error: data };
          }
        }
        if (!response.ok) {
          throw new HttpRequestError({
            body,
            details: stringify(data.error) || response.statusText,
            headers: response.headers,
            status: response.status,
            url
          });
        }
        return data;
      } catch (err) {
        if (err instanceof HttpRequestError)
          throw err;
        if (err instanceof TimeoutError)
          throw err;
        throw new HttpRequestError({
          body,
          cause: err,
          url
        });
      }
    }
  };
}

// node_modules/viem/_esm/utils/rpc/socket.js
var socketClientCache = /* @__PURE__ */ new Map();
async function getSocketRpcClient(parameters) {
  const { getSocket: getSocket2, keepAlive = true, key = "socket", reconnect: reconnect2 = true, url } = parameters;
  const { interval: keepAliveInterval = 3e4 } = typeof keepAlive === "object" ? keepAlive : {};
  const { attempts = 5, delay = 2e3 } = typeof reconnect2 === "object" ? reconnect2 : {};
  const id = JSON.stringify({ keepAlive, key, url, reconnect: reconnect2 });
  let socketClient = socketClientCache.get(id);
  if (socketClient)
    return socketClient;
  let reconnectCount = 0;
  const { schedule } = createBatchScheduler({
    id,
    fn: async () => {
      const requests = /* @__PURE__ */ new Map();
      const subscriptions = /* @__PURE__ */ new Map();
      let error;
      let socket;
      let keepAliveTimer;
      let reconnectInProgress = false;
      function attemptReconnect() {
        if (reconnect2 && reconnectCount < attempts) {
          if (reconnectInProgress)
            return;
          reconnectInProgress = true;
          reconnectCount++;
          socket?.close();
          setTimeout(async () => {
            await setup().catch(console.error);
            reconnectInProgress = false;
          }, delay);
        } else {
          requests.clear();
          subscriptions.clear();
        }
      }
      async function setup() {
        const result = await getSocket2({
          onClose() {
            for (const request of requests.values())
              request.onError?.(new SocketClosedError({ url }));
            for (const subscription of subscriptions.values())
              subscription.onError?.(new SocketClosedError({ url }));
            attemptReconnect();
          },
          onError(error_) {
            error = error_;
            for (const request of requests.values())
              request.onError?.(error);
            for (const subscription of subscriptions.values())
              subscription.onError?.(error);
            attemptReconnect();
          },
          onOpen() {
            error = void 0;
            reconnectCount = 0;
          },
          onResponse(data) {
            const isSubscription = data.method === "eth_subscription";
            const id2 = isSubscription ? data.params.subscription : data.id;
            const cache = isSubscription ? subscriptions : requests;
            const callback = cache.get(id2);
            if (callback)
              callback.onResponse(data);
            if (!isSubscription)
              cache.delete(id2);
          }
        });
        socket = result;
        if (keepAlive) {
          if (keepAliveTimer)
            clearInterval(keepAliveTimer);
          keepAliveTimer = setInterval(() => socket.ping?.(), keepAliveInterval);
        }
        if (reconnect2 && subscriptions.size > 0) {
          const subscriptionEntries = subscriptions.entries();
          for (const [key2, { onResponse, body, onError }] of subscriptionEntries) {
            if (!body)
              continue;
            subscriptions.delete(key2);
            socketClient?.request({ body, onResponse, onError });
          }
        }
        return result;
      }
      await setup();
      error = void 0;
      socketClient = {
        close() {
          keepAliveTimer && clearInterval(keepAliveTimer);
          socket.close();
          socketClientCache.delete(id);
        },
        get socket() {
          return socket;
        },
        request({ body, onError, onResponse }) {
          if (error && onError)
            onError(error);
          const id2 = body.id ?? idCache.take();
          const callback = (response) => {
            if (typeof response.id === "number" && id2 !== response.id)
              return;
            if (body.method === "eth_subscribe" && typeof response.result === "string")
              subscriptions.set(response.result, {
                onResponse: callback,
                onError,
                body
              });
            if (body.method === "eth_unsubscribe")
              subscriptions.delete(body.params?.[0]);
            onResponse(response);
          };
          requests.set(id2, { onResponse: callback, onError });
          try {
            socket.request({
              body: {
                jsonrpc: "2.0",
                id: id2,
                ...body
              }
            });
          } catch (error2) {
            onError?.(error2);
          }
        },
        requestAsync({ body, timeout = 1e4 }) {
          return withTimeout(() => new Promise((onResponse, onError) => this.request({
            body,
            onError,
            onResponse
          })), {
            errorInstance: new TimeoutError({ body, url }),
            timeout
          });
        },
        requests,
        subscriptions,
        url
      };
      socketClientCache.set(id, socketClient);
      return [socketClient];
    }
  });
  const [_, [socketClient_]] = await schedule();
  return socketClient_;
}

// node_modules/viem/_esm/utils/rpc/webSocket.js
async function getWebSocketRpcClient(url, options = {}) {
  const { keepAlive, reconnect: reconnect2 } = options;
  return getSocketRpcClient({
    async getSocket({ onClose, onError, onOpen, onResponse }) {
      const WebSocket = await import("./native-DZ5LO24Q.js").then((module) => module.WebSocket);
      const socket = new WebSocket(url);
      function onClose_() {
        socket.removeEventListener("close", onClose_);
        socket.removeEventListener("message", onMessage);
        socket.removeEventListener("error", onError);
        socket.removeEventListener("open", onOpen);
        onClose();
      }
      function onMessage({ data }) {
        try {
          const _data = JSON.parse(data);
          onResponse(_data);
        } catch (error) {
          onError(error);
        }
      }
      socket.addEventListener("close", onClose_);
      socket.addEventListener("message", onMessage);
      socket.addEventListener("error", onError);
      socket.addEventListener("open", onOpen);
      if (socket.readyState === WebSocket.CONNECTING) {
        await new Promise((resolve, reject) => {
          if (!socket)
            return;
          socket.onopen = resolve;
          socket.onerror = reject;
        });
      }
      const { close: close_ } = socket;
      return Object.assign(socket, {
        close() {
          close_.bind(socket)();
          onClose_();
        },
        ping() {
          try {
            if (socket.readyState === socket.CLOSED || socket.readyState === socket.CLOSING)
              throw new WebSocketRequestError({
                url: socket.url,
                cause: new SocketClosedError({ url: socket.url })
              });
            const body = {
              jsonrpc: "2.0",
              method: "net_version",
              params: []
            };
            socket.send(JSON.stringify(body));
          } catch (error) {
            onError(error);
          }
        },
        request({ body }) {
          if (socket.readyState === socket.CLOSED || socket.readyState === socket.CLOSING)
            throw new WebSocketRequestError({
              body,
              url: socket.url,
              cause: new SocketClosedError({ url: socket.url })
            });
          return socket.send(JSON.stringify(body));
        }
      });
    },
    keepAlive,
    reconnect: reconnect2,
    url
  });
}

// node_modules/viem/_esm/utils/rpc/compat.js
function webSocket(socketClient, { body, onError, onResponse }) {
  socketClient.request({
    body,
    onError,
    onResponse
  });
  return socketClient;
}
async function webSocketAsync(socketClient, { body, timeout = 1e4 }) {
  return socketClient.requestAsync({
    body,
    timeout
  });
}
async function getSocket(url) {
  const client = await getWebSocketRpcClient(url);
  return Object.assign(client.socket, {
    requests: client.requests,
    subscriptions: client.subscriptions
  });
}
var rpc = {
  /**
   * @deprecated use `getHttpRpcClient` instead.
   *
   * ```diff
   * -import { rpc } from 'viem/utils'
   * +import { getHttpRpcClient } from 'viem/utils'
   *
   * -rpc.http(url, params)
   * +const httpClient = getHttpRpcClient(url)
   * +httpClient.request(params)
   * ```
   */
  http(url, params) {
    return getHttpRpcClient(url).request(params);
  },
  /**
   * @deprecated use `getWebSocketRpcClient` instead.
   *
   * ```diff
   * -import { rpc } from 'viem/utils'
   * +import { getWebSocketRpcClient } from 'viem/utils'
   *
   * -rpc.webSocket(url, params)
   * +const webSocketClient = getWebSocketRpcClient(url)
   * +webSocketClient.request(params)
   * ```
   */
  webSocket,
  /**
   * @deprecated use `getWebSocketRpcClient` instead.
   *
   * ```diff
   * -import { rpc } from 'viem/utils'
   * +import { getWebSocketRpcClient } from 'viem/utils'
   *
   * -const response = await rpc.webSocketAsync(url, params)
   * +const webSocketClient = getWebSocketRpcClient(url)
   * +const response = await webSocketClient.requestAsync(params)
   * ```
   */
  webSocketAsync
};

// node_modules/viem/_esm/errors/typedData.js
var InvalidDomainError = class extends BaseError {
  constructor({ domain }) {
    super(`Invalid domain "${stringify(domain)}".`, {
      metaMessages: ["Must be a valid EIP-712 domain."]
    });
  }
};
var InvalidPrimaryTypeError = class extends BaseError {
  constructor({ primaryType, types }) {
    super(`Invalid primary type \`${primaryType}\` must be one of \`${JSON.stringify(Object.keys(types))}\`.`, {
      docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
      metaMessages: ["Check that the primary type is a key in `types`."]
    });
  }
};
var InvalidStructTypeError = class extends BaseError {
  constructor({ type }) {
    super(`Struct type "${type}" is invalid.`, {
      metaMessages: ["Struct type must not be a Solidity type."],
      name: "InvalidStructTypeError"
    });
  }
};

// node_modules/viem/_esm/utils/signature/hashTypedData.js
function hashTypedData(parameters) {
  const { domain = {}, message, primaryType } = parameters;
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...parameters.types
  };
  validateTypedData({
    domain,
    message,
    primaryType,
    types
  });
  const parts = ["0x1901"];
  if (domain)
    parts.push(hashDomain({
      domain,
      types
    }));
  if (primaryType !== "EIP712Domain")
    parts.push(hashStruct({
      data: message,
      primaryType,
      types
    }));
  return keccak256(concat(parts));
}
function hashDomain({ domain, types }) {
  return hashStruct({
    data: domain,
    primaryType: "EIP712Domain",
    types
  });
}
function hashStruct({ data, primaryType, types }) {
  const encoded = encodeData2({
    data,
    primaryType,
    types
  });
  return keccak256(encoded);
}
function encodeData2({ data, primaryType, types }) {
  const encodedTypes = [{ type: "bytes32" }];
  const encodedValues = [hashType({ primaryType, types })];
  for (const field of types[primaryType]) {
    const [type, value] = encodeField({
      types,
      name: field.name,
      type: field.type,
      value: data[field.name]
    });
    encodedTypes.push(type);
    encodedValues.push(value);
  }
  return encodeAbiParameters(encodedTypes, encodedValues);
}
function hashType({ primaryType, types }) {
  const encodedHashType = toHex(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
}
function encodeType({ primaryType, types }) {
  let result = "";
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);
  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
  }
  return result;
}
function findTypeDependencies({ primaryType: primaryType_, types }, results = /* @__PURE__ */ new Set()) {
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match?.[0];
  if (results.has(primaryType) || types[primaryType] === void 0) {
    return results;
  }
  results.add(primaryType);
  for (const field of types[primaryType]) {
    findTypeDependencies({ primaryType: field.type, types }, results);
  }
  return results;
}
function encodeField({ types, name, type, value }) {
  if (types[type] !== void 0) {
    return [
      { type: "bytes32" },
      keccak256(encodeData2({ data: value, primaryType: type, types }))
    ];
  }
  if (type === "bytes") {
    const prepend = value.length % 2 ? "0" : "";
    value = `0x${prepend + value.slice(2)}`;
    return [{ type: "bytes32" }, keccak256(value)];
  }
  if (type === "string")
    return [{ type: "bytes32" }, keccak256(toHex(value))];
  if (type.lastIndexOf("]") === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf("["));
    const typeValuePairs = value.map((item) => encodeField({
      name,
      type: parsedType,
      types,
      value: item
    }));
    return [
      { type: "bytes32" },
      keccak256(encodeAbiParameters(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))
    ];
  }
  return [{ type }, value];
}

// node_modules/viem/_esm/utils/typedData.js
function serializeTypedData(parameters) {
  const { domain: domain_, message: message_, primaryType, types } = parameters;
  const normalizeData = (struct, data_) => {
    const data = { ...data_ };
    for (const param of struct) {
      const { name, type } = param;
      if (type === "address")
        data[name] = data[name].toLowerCase();
    }
    return data;
  };
  const domain = (() => {
    if (!types.EIP712Domain)
      return {};
    if (!domain_)
      return {};
    return normalizeData(types.EIP712Domain, domain_);
  })();
  const message = (() => {
    if (primaryType === "EIP712Domain")
      return void 0;
    return normalizeData(types[primaryType], message_);
  })();
  return stringify({ domain, message, primaryType, types });
}
function validateTypedData(parameters) {
  const { domain, message, primaryType, types } = parameters;
  const validateData = (struct, data) => {
    for (const param of struct) {
      const { name, type } = param;
      const value = data[name];
      const integerMatch = type.match(integerRegex);
      if (integerMatch && (typeof value === "number" || typeof value === "bigint")) {
        const [_type, base, size_] = integerMatch;
        numberToHex(value, {
          signed: base === "int",
          size: Number.parseInt(size_) / 8
        });
      }
      if (type === "address" && typeof value === "string" && !isAddress(value))
        throw new InvalidAddressError({ address: value });
      const bytesMatch = type.match(bytesRegex);
      if (bytesMatch) {
        const [_type, size_] = bytesMatch;
        if (size_ && size(value) !== Number.parseInt(size_))
          throw new BytesSizeMismatchError({
            expectedSize: Number.parseInt(size_),
            givenSize: size(value)
          });
      }
      const struct2 = types[type];
      if (struct2) {
        validateReference(type);
        validateData(struct2, value);
      }
    }
  };
  if (types.EIP712Domain && domain) {
    if (typeof domain !== "object")
      throw new InvalidDomainError({ domain });
    validateData(types.EIP712Domain, domain);
  }
  if (primaryType !== "EIP712Domain") {
    if (types[primaryType])
      validateData(types[primaryType], message);
    else
      throw new InvalidPrimaryTypeError({ primaryType, types });
  }
}
function getTypesForEIP712Domain({ domain }) {
  return [
    typeof domain?.name === "string" && { name: "name", type: "string" },
    domain?.version && { name: "version", type: "string" },
    (typeof domain?.chainId === "number" || typeof domain?.chainId === "bigint") && {
      name: "chainId",
      type: "uint256"
    },
    domain?.verifyingContract && {
      name: "verifyingContract",
      type: "address"
    },
    domain?.salt && { name: "salt", type: "bytes32" }
  ].filter(Boolean);
}
function validateReference(type) {
  if (type === "address" || type === "bool" || type === "string" || type.startsWith("bytes") || type.startsWith("uint") || type.startsWith("int"))
    throw new InvalidStructTypeError({ type });
}

// node_modules/viem/node_modules/@noble/hashes/esm/legacy.js
var SHA1_IV2 = Uint32Array.from([
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
]);
var SHA1_W2 = new Uint32Array(80);
var SHA12 = class extends HashMD {
  constructor() {
    super(64, 20, 8, false);
    this.A = SHA1_IV2[0] | 0;
    this.B = SHA1_IV2[1] | 0;
    this.C = SHA1_IV2[2] | 0;
    this.D = SHA1_IV2[3] | 0;
    this.E = SHA1_IV2[4] | 0;
  }
  get() {
    const { A, B, C, D, E } = this;
    return [A, B, C, D, E];
  }
  set(A, B, C, D, E) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA1_W2[i] = view.getUint32(offset, false);
    for (let i = 16; i < 80; i++)
      SHA1_W2[i] = rotl(SHA1_W2[i - 3] ^ SHA1_W2[i - 8] ^ SHA1_W2[i - 14] ^ SHA1_W2[i - 16], 1);
    let { A, B, C, D, E } = this;
    for (let i = 0; i < 80; i++) {
      let F, K3;
      if (i < 20) {
        F = Chi(B, C, D);
        K3 = 1518500249;
      } else if (i < 40) {
        F = B ^ C ^ D;
        K3 = 1859775393;
      } else if (i < 60) {
        F = Maj(B, C, D);
        K3 = 2400959708;
      } else {
        F = B ^ C ^ D;
        K3 = 3395469782;
      }
      const T = rotl(A, 5) + F + E + K3 + SHA1_W2[i] | 0;
      E = D;
      D = C;
      C = rotl(B, 30);
      B = A;
      A = T;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    this.set(A, B, C, D, E);
  }
  roundClean() {
    clean(SHA1_W2);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var sha12 = createHasher(() => new SHA12());
var p322 = Math.pow(2, 32);
var K2 = Array.from({ length: 64 }, (_, i) => Math.floor(p322 * Math.abs(Math.sin(i + 1))));
var MD5_IV2 = SHA1_IV2.slice(0, 4);
var MD5_W2 = new Uint32Array(16);
var MD52 = class extends HashMD {
  constructor() {
    super(64, 16, 8, true);
    this.A = MD5_IV2[0] | 0;
    this.B = MD5_IV2[1] | 0;
    this.C = MD5_IV2[2] | 0;
    this.D = MD5_IV2[3] | 0;
  }
  get() {
    const { A, B, C, D } = this;
    return [A, B, C, D];
  }
  set(A, B, C, D) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      MD5_W2[i] = view.getUint32(offset, true);
    let { A, B, C, D } = this;
    for (let i = 0; i < 64; i++) {
      let F, g, s;
      if (i < 16) {
        F = Chi(B, C, D);
        g = i;
        s = [7, 12, 17, 22];
      } else if (i < 32) {
        F = Chi(D, B, C);
        g = (5 * i + 1) % 16;
        s = [5, 9, 14, 20];
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
        s = [4, 11, 16, 23];
      } else {
        F = C ^ (B | ~D);
        g = 7 * i % 16;
        s = [6, 10, 15, 21];
      }
      F = F + A + K2[i] + MD5_W2[g];
      A = D;
      D = C;
      C = B;
      B = B + rotl(F, s[i % 4]);
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    this.set(A, B, C, D);
  }
  roundClean() {
    clean(MD5_W2);
  }
  destroy() {
    this.set(0, 0, 0, 0);
    clean(this.buffer);
  }
};
var md52 = createHasher(() => new MD52());
var Rho1602 = Uint8Array.from([
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8
]);
var Id1602 = (() => Uint8Array.from(new Array(16).fill(0).map((_, i) => i)))();
var Pi1602 = (() => Id1602.map((i) => (9 * i + 5) % 16))();
var idxLR2 = (() => {
  const L = [Id1602];
  const R = [Pi1602];
  const res = [L, R];
  for (let i = 0; i < 4; i++)
    for (let j of res)
      j.push(j[i].map((k) => Rho1602[k]));
  return res;
})();
var idxL2 = (() => idxLR2[0])();
var idxR2 = (() => idxLR2[1])();
var shifts1602 = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i) => Uint8Array.from(i));
var shiftsL1602 = idxL2.map((idx, i) => idx.map((j) => shifts1602[i][j]));
var shiftsR1602 = idxR2.map((idx, i) => idx.map((j) => shifts1602[i][j]));
var Kl1602 = Uint32Array.from([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
var Kr1602 = Uint32Array.from([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function ripemd_f2(group, x, y, z) {
  if (group === 0)
    return x ^ y ^ z;
  if (group === 1)
    return x & y | ~x & z;
  if (group === 2)
    return (x | ~y) ^ z;
  if (group === 3)
    return x & z | y & ~z;
  return x ^ (y | ~z);
}
var BUF_1602 = new Uint32Array(16);
var RIPEMD1602 = class extends HashMD {
  constructor() {
    super(64, 20, 8, true);
    this.h0 = 1732584193 | 0;
    this.h1 = 4023233417 | 0;
    this.h2 = 2562383102 | 0;
    this.h3 = 271733878 | 0;
    this.h4 = 3285377520 | 0;
  }
  get() {
    const { h0, h1, h2, h3, h4 } = this;
    return [h0, h1, h2, h3, h4];
  }
  set(h0, h1, h2, h3, h4) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h2 | 0;
    this.h3 = h3 | 0;
    this.h4 = h4 | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      BUF_1602[i] = view.getUint32(offset, true);
    let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl1602[group], hbr = Kr1602[group];
      const rl = idxL2[group], rr = idxR2[group];
      const sl = shiftsL1602[group], sr = shiftsR1602[group];
      for (let i = 0; i < 16; i++) {
        const tl = rotl(al + ripemd_f2(group, bl, cl, dl) + BUF_1602[rl[i]] + hbl, sl[i]) + el | 0;
        al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
      }
      for (let i = 0; i < 16; i++) {
        const tr = rotl(ar + ripemd_f2(rGroup, br, cr, dr) + BUF_1602[rr[i]] + hbr, sr[i]) + er | 0;
        ar = er, er = dr, dr = rotl(cr, 10) | 0, cr = br, br = tr;
      }
    }
    this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
  }
  roundClean() {
    clean(BUF_1602);
  }
  destroy() {
    this.destroyed = true;
    clean(this.buffer);
    this.set(0, 0, 0, 0, 0);
  }
};
var ripemd1603 = createHasher(() => new RIPEMD1602());

// node_modules/viem/_esm/constants/strings.js
var presignMessagePrefix = "Ethereum Signed Message:\n";

// node_modules/viem/_esm/utils/signature/toPrefixedMessage.js
function toPrefixedMessage(message_) {
  const message = (() => {
    if (typeof message_ === "string")
      return stringToHex(message_);
    if (typeof message_.raw === "string")
      return message_.raw;
    return bytesToHex(message_.raw);
  })();
  const prefix = stringToHex(`${presignMessagePrefix}${size(message)}`);
  return concat([prefix, message]);
}

// node_modules/viem/_esm/utils/signature/hashMessage.js
function hashMessage(message, to_) {
  return keccak256(toPrefixedMessage(message), to_);
}

// node_modules/viem/_esm/constants/bytes.js
var erc6492MagicBytes = "0x6492649264926492649264926492649264926492649264926492649264926492";

// node_modules/viem/_esm/utils/signature/isErc6492Signature.js
function isErc6492Signature(signature) {
  return sliceHex(signature, -32) === erc6492MagicBytes;
}

// node_modules/viem/_esm/utils/signature/serializeErc6492Signature.js
function serializeErc6492Signature(parameters) {
  const { address, data, signature, to = "hex" } = parameters;
  const signature_ = concatHex([
    encodeAbiParameters([{ type: "address" }, { type: "bytes" }, { type: "bytes" }], [address, data, signature]),
    erc6492MagicBytes
  ]);
  if (to === "hex")
    return signature_;
  return hexToBytes(signature_);
}

// node_modules/viem/_esm/utils/nonceManager.js
function createNonceManager(parameters) {
  const { source } = parameters;
  const deltaMap = /* @__PURE__ */ new Map();
  const nonceMap = new LruMap(8192);
  const promiseMap = /* @__PURE__ */ new Map();
  const getKey = ({ address, chainId }) => `${address}.${chainId}`;
  return {
    async consume({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      const promise = this.get({ address, chainId, client });
      this.increment({ address, chainId });
      const nonce = await promise;
      await source.set({ address, chainId }, nonce);
      nonceMap.set(key, nonce);
      return nonce;
    },
    async increment({ address, chainId }) {
      const key = getKey({ address, chainId });
      const delta = deltaMap.get(key) ?? 0;
      deltaMap.set(key, delta + 1);
    },
    async get({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      let promise = promiseMap.get(key);
      if (!promise) {
        promise = (async () => {
          try {
            const nonce = await source.get({ address, chainId, client });
            const previousNonce = nonceMap.get(key) ?? 0;
            if (previousNonce > 0 && nonce <= previousNonce)
              return previousNonce + 1;
            nonceMap.delete(key);
            return nonce;
          } finally {
            this.reset({ address, chainId });
          }
        })();
        promiseMap.set(key, promise);
      }
      const delta = deltaMap.get(key) ?? 0;
      return delta + await promise;
    },
    reset({ address, chainId }) {
      const key = getKey({ address, chainId });
      deltaMap.delete(key);
      promiseMap.delete(key);
    }
  };
}
function jsonRpc() {
  return {
    async get(parameters) {
      const { address, client } = parameters;
      return getTransactionCount(client, {
        address,
        blockTag: "pending"
      });
    },
    set() {
    }
  };
}
var nonceManager = createNonceManager({
  source: jsonRpc()
});

// node_modules/viem/_esm/actions/public/simulateCalls.js
var getBalanceCode = "0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033";
async function simulateCalls(client, parameters) {
  const { blockNumber, blockTag, calls, stateOverrides, traceAssetChanges, traceTransfers, validation } = parameters;
  const account = parameters.account ? parseAccount(parameters.account) : void 0;
  if (traceAssetChanges && !account)
    throw new BaseError("`account` is required when `traceAssetChanges` is true");
  const getBalanceData = account ? encode3(from4("constructor(bytes, bytes)"), {
    bytecode: deploylessCallViaBytecodeBytecode,
    args: [
      getBalanceCode,
      encodeData(from5("function getBalance(address)"), [account.address])
    ]
  }) : void 0;
  const assetAddresses = traceAssetChanges ? await Promise.all(parameters.calls.map(async (call3) => {
    if (!call3.data && !call3.abi)
      return;
    const { accessList } = await createAccessList(client, {
      account: account.address,
      ...call3,
      data: call3.abi ? encodeFunctionData(call3) : call3.data
    });
    return accessList.map(({ address, storageKeys }) => storageKeys.length > 0 ? address : null);
  })).then((x) => x.flat().filter(Boolean)) : [];
  const blocks = await simulateBlocks(client, {
    blockNumber,
    blockTag,
    blocks: [
      ...traceAssetChanges ? [
        // ETH pre balances
        {
          calls: [{ data: getBalanceData }],
          stateOverrides
        },
        // Asset pre balances
        {
          calls: assetAddresses.map((address, i) => ({
            abi: [
              from5("function balanceOf(address) returns (uint256)")
            ],
            functionName: "balanceOf",
            args: [account.address],
            to: address,
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        }
      ] : [],
      {
        calls: [...calls, {}].map((call3) => ({
          ...call3,
          from: account?.address
        })),
        stateOverrides
      },
      ...traceAssetChanges ? [
        // ETH post balances
        {
          calls: [{ data: getBalanceData }]
        },
        // Asset post balances
        {
          calls: assetAddresses.map((address, i) => ({
            abi: [
              from5("function balanceOf(address) returns (uint256)")
            ],
            functionName: "balanceOf",
            args: [account.address],
            to: address,
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        },
        // Decimals
        {
          calls: assetAddresses.map((address, i) => ({
            to: address,
            abi: [
              from5("function decimals() returns (uint256)")
            ],
            functionName: "decimals",
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        },
        // Token URI
        {
          calls: assetAddresses.map((address, i) => ({
            to: address,
            abi: [
              from5("function tokenURI(uint256) returns (string)")
            ],
            functionName: "tokenURI",
            args: [0n],
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        },
        // Symbols
        {
          calls: assetAddresses.map((address, i) => ({
            to: address,
            abi: [from5("function symbol() returns (string)")],
            functionName: "symbol",
            from: zeroAddress,
            nonce: i
          })),
          stateOverrides: [
            {
              address: zeroAddress,
              nonce: 0
            }
          ]
        }
      ] : []
    ],
    traceTransfers,
    validation
  });
  const block_results = traceAssetChanges ? blocks[2] : blocks[0];
  const [block_ethPre, block_assetsPre, , block_ethPost, block_assetsPost, block_decimals, block_tokenURI, block_symbols] = traceAssetChanges ? blocks : [];
  const { calls: block_calls, ...block } = block_results;
  const results = block_calls.slice(0, -1) ?? [];
  const ethPre = block_ethPre?.calls ?? [];
  const assetsPre = block_assetsPre?.calls ?? [];
  const balancesPre = [...ethPre, ...assetsPre].map((call3) => call3.status === "success" ? hexToBigInt(call3.data) : null);
  const ethPost = block_ethPost?.calls ?? [];
  const assetsPost = block_assetsPost?.calls ?? [];
  const balancesPost = [...ethPost, ...assetsPost].map((call3) => call3.status === "success" ? hexToBigInt(call3.data) : null);
  const decimals = (block_decimals?.calls ?? []).map((x) => x.status === "success" ? x.result : null);
  const symbols = (block_symbols?.calls ?? []).map((x) => x.status === "success" ? x.result : null);
  const tokenURI = (block_tokenURI?.calls ?? []).map((x) => x.status === "success" ? x.result : null);
  const changes = [];
  for (const [i, balancePost] of balancesPost.entries()) {
    const balancePre = balancesPre[i];
    if (typeof balancePost !== "bigint")
      continue;
    if (typeof balancePre !== "bigint")
      continue;
    const decimals_ = decimals[i - 1];
    const symbol_ = symbols[i - 1];
    const tokenURI_ = tokenURI[i - 1];
    const token = (() => {
      if (i === 0)
        return {
          address: ethAddress,
          decimals: 18,
          symbol: "ETH"
        };
      return {
        address: assetAddresses[i - 1],
        decimals: tokenURI_ || decimals_ ? Number(decimals_ ?? 1) : void 0,
        symbol: symbol_ ?? void 0
      };
    })();
    if (changes.some((change) => change.token.address === token.address))
      continue;
    changes.push({
      token,
      value: {
        pre: balancePre,
        post: balancePost,
        diff: balancePost - balancePre
      }
    });
  }
  return {
    assetChanges: changes,
    block,
    results
  };
}

// node_modules/viem/_esm/utils/observe.js
var listenersCache = /* @__PURE__ */ new Map();
var cleanupCache = /* @__PURE__ */ new Map();
var callbackCount = 0;
function observe(observerId, callbacks, fn) {
  const callbackId = ++callbackCount;
  const getListeners = () => listenersCache.get(observerId) || [];
  const unsubscribe = () => {
    const listeners2 = getListeners();
    listenersCache.set(observerId, listeners2.filter((cb) => cb.id !== callbackId));
  };
  const unwatch = () => {
    const listeners2 = getListeners();
    if (!listeners2.some((cb) => cb.id === callbackId))
      return;
    const cleanup2 = cleanupCache.get(observerId);
    if (listeners2.length === 1 && cleanup2) {
      const p = cleanup2();
      if (p instanceof Promise)
        p.catch(() => {
        });
    }
    unsubscribe();
  };
  const listeners = getListeners();
  listenersCache.set(observerId, [
    ...listeners,
    { id: callbackId, fns: callbacks }
  ]);
  if (listeners && listeners.length > 0)
    return unwatch;
  const emit = {};
  for (const key in callbacks) {
    emit[key] = ((...args) => {
      const listeners2 = getListeners();
      if (listeners2.length === 0)
        return;
      for (const listener of listeners2)
        listener.fns[key]?.(...args);
    });
  }
  const cleanup = fn(emit);
  if (typeof cleanup === "function")
    cleanupCache.set(observerId, cleanup);
  return unwatch;
}

// node_modules/viem/_esm/utils/poll.js
function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
  let active = true;
  const unwatch = () => active = false;
  const watch = async () => {
    let data = void 0;
    if (emitOnBegin)
      data = await fn({ unpoll: unwatch });
    const initialWait = await initialWaitTime?.(data) ?? interval;
    await wait(initialWait);
    const poll2 = async () => {
      if (!active)
        return;
      await fn({ unpoll: unwatch });
      await wait(interval);
      poll2();
    };
    poll2();
  };
  watch();
  return unwatch;
}

// node_modules/viem/_esm/actions/public/watchBlocks.js
function watchBlocks(client, { blockTag = client.experimental_blockTag ?? "latest", emitMissed = false, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  const includeTransactions = includeTransactions_ ?? false;
  let prevBlock;
  const pollBlocks = () => {
    const observerId = stringify([
      "watchBlocks",
      client.uid,
      blockTag,
      emitMissed,
      emitOnBegin,
      includeTransactions,
      pollingInterval
    ]);
    return observe(observerId, { onBlock, onError }, (emit) => poll(async () => {
      try {
        const block = await getAction(client, getBlock, "getBlock")({
          blockTag,
          includeTransactions
        });
        if (block.number !== null && prevBlock?.number != null) {
          if (block.number === prevBlock.number)
            return;
          if (block.number - prevBlock.number > 1 && emitMissed) {
            for (let i = prevBlock?.number + 1n; i < block.number; i++) {
              const block2 = await getAction(client, getBlock, "getBlock")({
                blockNumber: i,
                includeTransactions
              });
              emit.onBlock(block2, prevBlock);
              prevBlock = block2;
            }
          }
        }
        if (
          // If no previous block exists, emit.
          prevBlock?.number == null || // If the block tag is "pending" with no block number, emit.
          blockTag === "pending" && block?.number == null || // If the next block number is greater than the previous block number, emit.
          // We don't want to emit blocks in the past.
          block.number !== null && block.number > prevBlock.number
        ) {
          emit.onBlock(block, prevBlock);
          prevBlock = block;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlocks = () => {
    let active = true;
    let emitFetched = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        if (emitOnBegin) {
          getAction(client, getBlock, "getBlock")({
            blockTag,
            includeTransactions
          }).then((block) => {
            if (!active)
              return;
            if (!emitFetched)
              return;
            onBlock(block, void 0);
            emitFetched = false;
          }).catch(onError);
        }
        const transport = (() => {
          if (client.transport.type === "fallback") {
            const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
            if (!transport2)
              return client.transport;
            return transport2.value;
          }
          return client.transport;
        })();
        const { unsubscribe: unsubscribe_ } = await transport.subscribe({
          params: ["newHeads"],
          async onData(data) {
            if (!active)
              return;
            const block = await getAction(client, getBlock, "getBlock")({
              blockNumber: data.result?.number,
              includeTransactions
            }).catch(() => {
            });
            if (!active)
              return;
            onBlock(block, prevBlock);
            emitFetched = false;
            prevBlock = block;
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollBlocks() : subscribeBlocks();
}

// node_modules/viem/_esm/actions/public/watchBlockNumber.js
function watchBlockNumber(client, { emitOnBegin = false, emitMissed = false, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  let prevBlockNumber;
  const pollBlockNumber = () => {
    const observerId = stringify([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed,
      pollingInterval
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => poll(async () => {
      try {
        const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
        if (prevBlockNumber) {
          if (blockNumber === prevBlockNumber)
            return;
          if (blockNumber - prevBlockNumber > 1 && emitMissed) {
            for (let i = prevBlockNumber + 1n; i < blockNumber; i++) {
              emit.onBlockNumber(i, prevBlockNumber);
              prevBlockNumber = i;
            }
          }
        }
        if (!prevBlockNumber || blockNumber > prevBlockNumber) {
          emit.onBlockNumber(blockNumber, prevBlockNumber);
          prevBlockNumber = blockNumber;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlockNumber = () => {
    const observerId = stringify([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => {
      let active = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["newHeads"],
            onData(data) {
              if (!active)
                return;
              const blockNumber = hexToBigInt(data.result?.number);
              emit.onBlockNumber(blockNumber, prevBlockNumber);
              prevBlockNumber = blockNumber;
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
}

// node_modules/viem/_esm/actions/public/uninstallFilter.js
async function uninstallFilter(_client, { filter }) {
  return filter.request({
    method: "eth_uninstallFilter",
    params: [filter.id]
  });
}

// node_modules/viem/_esm/actions/public/watchEvent.js
function watchEvent(client, { address, args, batch = true, event, events, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (typeof fromBlock === "bigint")
      return true;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  const strict = strict_ ?? false;
  const pollEvent = () => {
    const observerId = stringify([
      "watchEvent",
      address,
      args,
      batch,
      client.uid,
      event,
      pollingInterval,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== void 0)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createEventFilter, "createEventFilter")({
              address,
              args,
              event,
              events,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber !== blockNumber) {
              logs = await getAction(client, getLogs, "getLogs")({
                address,
                args,
                event,
                events,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log of logs)
              emit.onLogs([log]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeEvent = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const transport = (() => {
          if (client.transport.type === "fallback") {
            const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
            if (!transport2)
              return client.transport;
            return transport2.value;
          }
          return client.transport;
        })();
        const events_ = events ?? (event ? [event] : void 0);
        let topics = [];
        if (events_) {
          const encoded = events_.flatMap((event2) => encodeEventTopics({
            abi: [event2],
            eventName: event2.name,
            args
          }));
          topics = [encoded];
          if (event)
            topics = topics[0];
        }
        const { unsubscribe: unsubscribe_ } = await transport.subscribe({
          params: ["logs", { address, topics }],
          onData(data) {
            if (!active)
              return;
            const log = data.result;
            try {
              const { eventName, args: args2 } = decodeEventLog({
                abi: events_ ?? [],
                data: log.data,
                topics: log.topics,
                strict
              });
              const formatted = formatLog(log, { args: args2, eventName });
              onLogs([formatted]);
            } catch (err) {
              let eventName;
              let isUnnamed;
              if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                if (strict_)
                  return;
                eventName = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
              }
              const formatted = formatLog(log, {
                args: isUnnamed ? [] : {},
                eventName
              });
              onLogs([formatted]);
            }
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollEvent() : subscribeEvent();
}

// node_modules/viem/_esm/actions/public/watchPendingTransactions.js
function watchPendingTransactions(client, { batch = true, onError, onTransactions, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket" && client.transport.type !== "ipc";
  const pollPendingTransactions = () => {
    const observerId = stringify([
      "watchPendingTransactions",
      client.uid,
      batch,
      pollingInterval
    ]);
    return observe(observerId, { onTransactions, onError }, (emit) => {
      let filter;
      const unwatch = poll(async () => {
        try {
          if (!filter) {
            try {
              filter = await getAction(client, createPendingTransactionFilter, "createPendingTransactionFilter")({});
              return;
            } catch (err) {
              unwatch();
              throw err;
            }
          }
          const hashes = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          if (hashes.length === 0)
            return;
          if (batch)
            emit.onTransactions(hashes);
          else
            for (const hash of hashes)
              emit.onTransactions([hash]);
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribePendingTransactions = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["newPendingTransactions"],
          onData(data) {
            if (!active)
              return;
            const transaction = data.result;
            onTransactions([transaction]);
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollPendingTransactions() : subscribePendingTransactions();
}

// node_modules/viem/_esm/actions/wallet/getAddresses.js
async function getAddresses(client) {
  if (client.account?.type === "local")
    return [client.account.address];
  const addresses = await client.request({ method: "eth_accounts" }, { dedupe: true });
  return addresses.map((address) => checksumAddress(address));
}

// node_modules/viem/_esm/actions/wallet/getPermissions.js
async function getPermissions(client) {
  const permissions = await client.request({ method: "wallet_getPermissions" }, { dedupe: true });
  return permissions;
}

// node_modules/viem/_esm/actions/wallet/getCapabilities.js
async function getCapabilities(client, parameters = {}) {
  const { account = client.account, chainId } = parameters;
  const account_ = account ? parseAccount(account) : void 0;
  const params = chainId ? [account_?.address, [numberToHex(chainId)]] : [account_?.address];
  const capabilities_raw = await client.request({
    method: "wallet_getCapabilities",
    params
  });
  const capabilities = {};
  for (const [chainId2, capabilities_] of Object.entries(capabilities_raw)) {
    capabilities[Number(chainId2)] = {};
    for (let [key, value] of Object.entries(capabilities_)) {
      if (key === "addSubAccount")
        key = "unstable_addSubAccount";
      capabilities[Number(chainId2)][key] = value;
    }
  }
  return typeof chainId === "number" ? capabilities[chainId] : capabilities;
}

// node_modules/viem/_esm/actions/wallet/sendCalls.js
var fallbackMagicIdentifier = "0x5792579257925792579257925792579257925792579257925792579257925792";
var fallbackTransactionErrorMagicIdentifier = numberToHex(0, {
  size: 32
});
async function sendCalls(client, parameters) {
  const { account: account_ = client.account, capabilities, chain = client.chain, experimental_fallback, experimental_fallbackDelay = 32, forceAtomic = false, id, version: version3 = "2.0.0" } = parameters;
  const account = account_ ? parseAccount(account_) : null;
  const calls = parameters.calls.map((call_) => {
    const call3 = call_;
    const data = call3.abi ? encodeFunctionData({
      abi: call3.abi,
      functionName: call3.functionName,
      args: call3.args
    }) : call3.data;
    return {
      data: call3.dataSuffix && data ? concat([data, call3.dataSuffix]) : data,
      to: call3.to,
      value: call3.value ? numberToHex(call3.value) : void 0
    };
  });
  try {
    const response = await client.request({
      method: "wallet_sendCalls",
      params: [
        {
          atomicRequired: forceAtomic,
          calls,
          capabilities,
          chainId: numberToHex(chain.id),
          from: account?.address,
          id,
          version: version3
        }
      ]
    }, { retryCount: 0 });
    if (typeof response === "string")
      return { id: response };
    return response;
  } catch (err) {
    const error = err;
    if (experimental_fallback && (error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError" || error.name === "UnknownRpcError" || error.details.toLowerCase().includes("does not exist / is not available") || error.details.toLowerCase().includes("missing or invalid. request()") || error.details.toLowerCase().includes("did not match any variant of untagged enum") || error.details.toLowerCase().includes("account upgraded to unsupported contract") || error.details.toLowerCase().includes("eip-7702 not supported") || error.details.toLowerCase().includes("unsupported wc_ method"))) {
      if (capabilities) {
        const hasNonOptionalCapability = Object.values(capabilities).some((capability) => !capability.optional);
        if (hasNonOptionalCapability) {
          const message = "non-optional `capabilities` are not supported on fallback to `eth_sendTransaction`.";
          throw new UnsupportedNonOptionalCapabilityError(new BaseError(message, {
            details: message
          }));
        }
      }
      if (forceAtomic && calls.length > 1) {
        const message = "`forceAtomic` is not supported on fallback to `eth_sendTransaction`.";
        throw new AtomicityNotSupportedError(new BaseError(message, {
          details: message
        }));
      }
      const promises = [];
      for (const call3 of calls) {
        const promise = sendTransaction(client, {
          account,
          chain,
          data: call3.data,
          to: call3.to,
          value: call3.value ? hexToBigInt(call3.value) : void 0
        });
        promises.push(promise);
        if (experimental_fallbackDelay > 0)
          await new Promise((resolve) => setTimeout(resolve, experimental_fallbackDelay));
      }
      const results = await Promise.allSettled(promises);
      if (results.every((r) => r.status === "rejected"))
        throw results[0].reason;
      const hashes = results.map((result) => {
        if (result.status === "fulfilled")
          return result.value;
        return fallbackTransactionErrorMagicIdentifier;
      });
      return {
        id: concat([
          ...hashes,
          numberToHex(chain.id, { size: 32 }),
          fallbackMagicIdentifier
        ])
      };
    }
    throw getTransactionError(err, {
      ...parameters,
      account,
      chain: parameters.chain
    });
  }
}

// node_modules/viem/_esm/actions/wallet/getCallsStatus.js
async function getCallsStatus(client, parameters) {
  async function getStatus(id) {
    const isTransactions = id.endsWith(fallbackMagicIdentifier.slice(2));
    if (isTransactions) {
      const chainId2 = trim(sliceHex(id, -64, -32));
      const hashes = sliceHex(id, 0, -64).slice(2).match(/.{1,64}/g);
      const receipts2 = await Promise.all(hashes.map((hash) => fallbackTransactionErrorMagicIdentifier.slice(2) !== hash ? client.request({
        method: "eth_getTransactionReceipt",
        params: [`0x${hash}`]
      }, { dedupe: true }) : void 0));
      const status2 = (() => {
        if (receipts2.some((r) => r === null))
          return 100;
        if (receipts2.every((r) => r?.status === "0x1"))
          return 200;
        if (receipts2.every((r) => r?.status === "0x0"))
          return 500;
        return 600;
      })();
      return {
        atomic: false,
        chainId: hexToNumber(chainId2),
        receipts: receipts2.filter(Boolean),
        status: status2,
        version: "2.0.0"
      };
    }
    return client.request({
      method: "wallet_getCallsStatus",
      params: [id]
    });
  }
  const { atomic = false, chainId, receipts, version: version3 = "2.0.0", ...response } = await getStatus(parameters.id);
  const [status, statusCode] = (() => {
    const statusCode2 = response.status;
    if (statusCode2 >= 100 && statusCode2 < 200)
      return ["pending", statusCode2];
    if (statusCode2 >= 200 && statusCode2 < 300)
      return ["success", statusCode2];
    if (statusCode2 >= 300 && statusCode2 < 700)
      return ["failure", statusCode2];
    if (statusCode2 === "CONFIRMED")
      return ["success", 200];
    if (statusCode2 === "PENDING")
      return ["pending", 100];
    return [void 0, statusCode2];
  })();
  return {
    ...response,
    atomic,
    // @ts-expect-error: for backwards compatibility
    chainId: chainId ? hexToNumber(chainId) : void 0,
    receipts: receipts?.map((receipt) => ({
      ...receipt,
      blockNumber: hexToBigInt(receipt.blockNumber),
      gasUsed: hexToBigInt(receipt.gasUsed),
      status: receiptStatuses[receipt.status]
    })) ?? [],
    statusCode,
    status,
    version: version3
  };
}

// node_modules/viem/_esm/actions/wallet/showCallsStatus.js
async function showCallsStatus(client, parameters) {
  const { id } = parameters;
  await client.request({
    method: "wallet_showCallsStatus",
    params: [id]
  });
  return;
}

// node_modules/viem/_esm/errors/calls.js
var BundleFailedError = class extends BaseError {
  constructor(result) {
    super(`Call bundle failed with status: ${result.statusCode}`, {
      name: "BundleFailedError"
    });
    Object.defineProperty(this, "result", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.result = result;
  }
};

// node_modules/viem/_esm/actions/wallet/waitForCallsStatus.js
async function waitForCallsStatus(client, parameters) {
  const {
    id,
    pollingInterval = client.pollingInterval,
    status = ({ statusCode }) => statusCode === 200 || statusCode >= 300,
    retryCount = 4,
    retryDelay = ({ count }) => ~~(1 << count) * 200,
    // exponential backoff
    timeout = 6e4,
    throwOnFailure = false
  } = parameters;
  const observerId = stringify(["waitForCallsStatus", client.uid, id]);
  const { promise, resolve, reject } = withResolvers();
  let timer = void 0;
  const unobserve = observe(observerId, { resolve, reject }, (emit) => {
    const unpoll = poll(async () => {
      const done = (fn) => {
        clearTimeout(timer);
        unpoll();
        fn();
        unobserve();
      };
      try {
        const result = await withRetry(async () => {
          const result2 = await getCallsStatus(client, { id });
          if (throwOnFailure && result2.status === "failure")
            throw new BundleFailedError(result2);
          return result2;
        }, {
          retryCount,
          delay: retryDelay
        });
        if (!status(result))
          return;
        done(() => emit.resolve(result));
      } catch (error) {
        done(() => emit.reject(error));
      }
    }, {
      interval: pollingInterval,
      emitOnBegin: true
    });
    return unpoll;
  });
  timer = timeout ? setTimeout(() => {
    unobserve();
    clearTimeout(timer);
    reject(new WaitForCallsStatusTimeoutError({ id }));
  }, timeout) : void 0;
  return await promise;
}
var WaitForCallsStatusTimeoutError = class extends BaseError {
  constructor({ id }) {
    super(`Timed out while waiting for call bundle with id "${id}" to be confirmed.`, { name: "WaitForCallsStatusTimeoutError" });
  }
};

// node_modules/viem/_esm/utils/formatters/proof.js
function formatStorageProof(storageProof) {
  return storageProof.map((proof) => ({
    ...proof,
    value: BigInt(proof.value)
  }));
}
function formatProof(proof) {
  return {
    ...proof,
    balance: proof.balance ? BigInt(proof.balance) : void 0,
    nonce: proof.nonce ? hexToNumber(proof.nonce) : void 0,
    storageProof: proof.storageProof ? formatStorageProof(proof.storageProof) : void 0
  };
}

// node_modules/viem/_esm/actions/public/getProof.js
async function getProof(client, { address, blockNumber, blockTag: blockTag_, storageKeys }) {
  const blockTag = blockTag_ ?? "latest";
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const proof = await client.request({
    method: "eth_getProof",
    params: [address, storageKeys, blockNumberHex || blockTag]
  });
  return formatProof(proof);
}

// node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
async function waitForTransactionReceipt(client, parameters) {
  const {
    checkReplacement = true,
    confirmations = 1,
    hash,
    onReplaced,
    retryCount = 6,
    retryDelay = ({ count }) => ~~(1 << count) * 200,
    // exponential backoff
    timeout = 18e4
  } = parameters;
  const observerId = stringify(["waitForTransactionReceipt", client.uid, hash]);
  const pollingInterval = (() => {
    if (parameters.pollingInterval)
      return parameters.pollingInterval;
    if (client.chain?.experimental_preconfirmationTime)
      return client.chain.experimental_preconfirmationTime;
    return client.pollingInterval;
  })();
  let transaction;
  let replacedTransaction;
  let receipt;
  let retrying = false;
  let _unobserve;
  let _unwatch;
  const { promise, resolve, reject } = withResolvers();
  const timer = timeout ? setTimeout(() => {
    _unwatch();
    _unobserve();
    reject(new WaitForTransactionReceiptTimeoutError({ hash }));
  }, timeout) : void 0;
  _unobserve = observe(observerId, { onReplaced, resolve, reject }, async (emit) => {
    receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash }).catch(() => void 0);
    if (receipt && confirmations <= 1) {
      clearTimeout(timer);
      emit.resolve(receipt);
      _unobserve();
      return;
    }
    _unwatch = getAction(client, watchBlockNumber, "watchBlockNumber")({
      emitMissed: true,
      emitOnBegin: true,
      poll: true,
      pollingInterval,
      async onBlockNumber(blockNumber_) {
        const done = (fn) => {
          clearTimeout(timer);
          _unwatch();
          fn();
          _unobserve();
        };
        let blockNumber = blockNumber_;
        if (retrying)
          return;
        try {
          if (receipt) {
            if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
              return;
            done(() => emit.resolve(receipt));
            return;
          }
          if (checkReplacement && !transaction) {
            retrying = true;
            await withRetry(async () => {
              transaction = await getAction(client, getTransaction, "getTransaction")({ hash });
              if (transaction.blockNumber)
                blockNumber = transaction.blockNumber;
            }, {
              delay: retryDelay,
              retryCount
            });
            retrying = false;
          }
          receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash });
          if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
            return;
          done(() => emit.resolve(receipt));
        } catch (err) {
          if (err instanceof TransactionNotFoundError || err instanceof TransactionReceiptNotFoundError) {
            if (!transaction) {
              retrying = false;
              return;
            }
            try {
              replacedTransaction = transaction;
              retrying = true;
              const block = await withRetry(() => getAction(client, getBlock, "getBlock")({
                blockNumber,
                includeTransactions: true
              }), {
                delay: retryDelay,
                retryCount,
                shouldRetry: ({ error }) => error instanceof BlockNotFoundError
              });
              retrying = false;
              const replacementTransaction = block.transactions.find(({ from: from6, nonce }) => from6 === replacedTransaction.from && nonce === replacedTransaction.nonce);
              if (!replacementTransaction)
                return;
              receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({
                hash: replacementTransaction.hash
              });
              if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                return;
              let reason = "replaced";
              if (replacementTransaction.to === replacedTransaction.to && replacementTransaction.value === replacedTransaction.value && replacementTransaction.input === replacedTransaction.input) {
                reason = "repriced";
              } else if (replacementTransaction.from === replacementTransaction.to && replacementTransaction.value === 0n) {
                reason = "cancelled";
              }
              done(() => {
                emit.onReplaced?.({
                  reason,
                  replacedTransaction,
                  transaction: replacementTransaction,
                  transactionReceipt: receipt
                });
                emit.resolve(receipt);
              });
            } catch (err_) {
              done(() => emit.reject(err_));
            }
          } else {
            done(() => emit.reject(err));
          }
        }
      }
    });
  });
  return promise;
}

// node_modules/viem/_esm/actions/wallet/requestAddresses.js
async function requestAddresses(client) {
  const addresses = await client.request({ method: "eth_requestAccounts" }, { dedupe: true, retryCount: 0 });
  return addresses.map((address) => getAddress(address));
}

// node_modules/viem/_esm/actions/wallet/requestPermissions.js
async function requestPermissions(client, permissions) {
  return client.request({
    method: "wallet_requestPermissions",
    params: [permissions]
  }, { retryCount: 0 });
}

// node_modules/viem/_esm/actions/wallet/prepareAuthorization.js
async function prepareAuthorization(client, parameters) {
  const { account: account_ = client.account, chainId, nonce } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/eip7702/prepareAuthorization"
    });
  const account = parseAccount(account_);
  const executor = (() => {
    if (!parameters.executor)
      return void 0;
    if (parameters.executor === "self")
      return parameters.executor;
    return parseAccount(parameters.executor);
  })();
  const authorization = {
    address: parameters.contractAddress ?? parameters.address,
    chainId,
    nonce
  };
  if (typeof authorization.chainId === "undefined")
    authorization.chainId = client.chain?.id ?? await getAction(client, getChainId, "getChainId")({});
  if (typeof authorization.nonce === "undefined") {
    authorization.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
      address: account.address,
      blockTag: "pending"
    });
    if (executor === "self" || executor?.address && isAddressEqual(executor.address, account.address))
      authorization.nonce += 1;
  }
  return authorization;
}

// node_modules/viem/_esm/actions/wallet/signAuthorization.js
async function signAuthorization(client, parameters) {
  const { account: account_ = client.account } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/eip7702/signAuthorization"
    });
  const account = parseAccount(account_);
  if (!account.signAuthorization)
    throw new AccountTypeNotSupportedError({
      docsPath: "/docs/eip7702/signAuthorization",
      metaMessages: [
        "The `signAuthorization` Action does not support JSON-RPC Accounts."
      ],
      type: account.type
    });
  const authorization = await prepareAuthorization(client, parameters);
  return account.signAuthorization(authorization);
}

// node_modules/viem/_esm/actions/wallet/signTransaction.js
async function signTransaction(client, parameters) {
  const { account: account_ = client.account, chain = client.chain, ...transaction } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signTransaction"
    });
  const account = parseAccount(account_);
  assertRequest({
    account,
    ...parameters
  });
  const chainId = await getAction(client, getChainId, "getChainId")({});
  if (chain !== null)
    assertCurrentChain({
      currentChainId: chainId,
      chain
    });
  const formatters = chain?.formatters || client.chain?.formatters;
  const format = formatters?.transactionRequest?.format || formatTransactionRequest;
  if (account.signTransaction)
    return account.signTransaction({
      ...transaction,
      chainId
    }, { serializer: client.chain?.serializers?.transaction });
  return await client.request({
    method: "eth_signTransaction",
    params: [
      {
        ...format(transaction),
        chainId: numberToHex(chainId),
        from: account.address
      }
    ]
  }, { retryCount: 0 });
}

// node_modules/viem/_esm/actions/wallet/signMessage.js
async function signMessage(client, { account: account_ = client.account, message }) {
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  const account = parseAccount(account_);
  if (account.signMessage)
    return account.signMessage({ message });
  const message_ = (() => {
    if (typeof message === "string")
      return stringToHex(message);
    if (message.raw instanceof Uint8Array)
      return toHex(message.raw);
    return message.raw;
  })();
  return client.request({
    method: "personal_sign",
    params: [message_, account.address]
  }, { retryCount: 0 });
}

// node_modules/viem/_esm/actions/wallet/signTypedData.js
async function signTypedData(client, parameters) {
  const { account: account_ = client.account, domain, message, primaryType } = parameters;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signTypedData"
    });
  const account = parseAccount(account_);
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...parameters.types
  };
  validateTypedData({ domain, message, primaryType, types });
  if (account.signTypedData)
    return account.signTypedData({ domain, message, primaryType, types });
  const typedData = serializeTypedData({ domain, message, primaryType, types });
  return client.request({
    method: "eth_signTypedData_v4",
    params: [account.address, typedData]
  }, { retryCount: 0 });
}

// node_modules/viem/_esm/actions/public/simulateContract.js
async function simulateContract(client, parameters) {
  const { abi: abi2, address, args, dataSuffix, functionName, ...callRequest } = parameters;
  const account = callRequest.account ? parseAccount(callRequest.account) : client.account;
  const calldata = encodeFunctionData({ abi: abi2, args, functionName });
  try {
    const { data } = await getAction(client, call, "call")({
      batch: false,
      data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      ...callRequest,
      account
    });
    const result = decodeFunctionResult({
      abi: abi2,
      args,
      functionName,
      data: data || "0x"
    });
    const minimizedAbi = abi2.filter((abiItem) => "name" in abiItem && abiItem.name === parameters.functionName);
    return {
      result,
      request: {
        abi: minimizedAbi,
        address,
        args,
        dataSuffix,
        functionName,
        ...callRequest,
        account
      }
    };
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/simulateContract",
      functionName,
      sender: account?.address
    });
  }
}

// node_modules/viem/_esm/actions/wallet/switchChain.js
async function switchChain(client, { id }) {
  await client.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: numberToHex(id)
      }
    ]
  }, { retryCount: 0 });
}

// node_modules/viem/_esm/utils/signature/serializeSignature.js
function serializeSignature({ r, s, to = "hex", v, yParity }) {
  const yParity_ = (() => {
    if (yParity === 0 || yParity === 1)
      return yParity;
    if (v && (v === 27n || v === 28n || v >= 35n))
      return v % 2n === 0n ? 1 : 0;
    throw new Error("Invalid `v` or `yParity` value");
  })();
  const signature = `0x${new secp256k1.Signature(hexToBigInt(r), hexToBigInt(s)).toCompactHex()}${yParity_ === 0 ? "1b" : "1c"}`;
  if (to === "hex")
    return signature;
  return hexToBytes(signature);
}

// node_modules/viem/_esm/actions/public/verifyHash.js
async function verifyHash2(client, parameters) {
  const { address, factory, factoryData, hash, signature, universalSignatureVerifierAddress = client.chain?.contracts?.universalSignatureVerifier?.address, ...rest } = parameters;
  const signatureHex = (() => {
    if (isHex(signature))
      return signature;
    if (typeof signature === "object" && "r" in signature && "s" in signature)
      return serializeSignature(signature);
    return bytesToHex(signature);
  })();
  const wrappedSignature = await (async () => {
    if (!factory && !factoryData)
      return signatureHex;
    if (isErc6492Signature(signatureHex))
      return signatureHex;
    return serializeErc6492Signature({
      address: factory,
      data: factoryData,
      signature: signatureHex
    });
  })();
  try {
    const args = universalSignatureVerifierAddress ? {
      to: universalSignatureVerifierAddress,
      data: encodeFunctionData({
        abi: universalSignatureValidatorAbi,
        functionName: "isValidSig",
        args: [address, hash, wrappedSignature]
      }),
      ...rest
    } : {
      data: encodeDeployData({
        abi: universalSignatureValidatorAbi,
        args: [address, hash, wrappedSignature],
        bytecode: universalSignatureValidatorByteCode
      }),
      ...rest
    };
    const { data } = await getAction(client, call, "call")(args);
    return hexToBool(data ?? "0x0");
  } catch (error) {
    try {
      const verified = isAddressEqual(getAddress(address), await recoverAddress({ hash, signature }));
      if (verified)
        return true;
    } catch {
    }
    if (error instanceof CallExecutionError) {
      return false;
    }
    throw error;
  }
}

// node_modules/viem/_esm/actions/public/verifyMessage.js
async function verifyMessage2(client, { address, message, factory, factoryData, signature, ...callRequest }) {
  const hash = hashMessage(message);
  return verifyHash2(client, {
    address,
    factory,
    factoryData,
    hash,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/actions/public/verifyTypedData.js
async function verifyTypedData2(client, parameters) {
  const { address, factory, factoryData, signature, message, primaryType, types, domain, ...callRequest } = parameters;
  const hash = hashTypedData({ message, primaryType, types, domain });
  return verifyHash2(client, {
    address,
    factory,
    factoryData,
    hash,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/actions/wallet/watchAsset.js
async function watchAsset(client, params) {
  const added = await client.request({
    method: "wallet_watchAsset",
    params
  }, { retryCount: 0 });
  return added;
}

// node_modules/viem/_esm/actions/public/watchContractEvent.js
function watchContractEvent(client, parameters) {
  const { abi: abi2, address, args, batch = true, eventName, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ } = parameters;
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (typeof fromBlock === "bigint")
      return true;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  const pollContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify([
      "watchContractEvent",
      address,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== void 0)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createContractEventFilter, "createContractEventFilter")({
              abi: abi2,
              address,
              args,
              eventName,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber < blockNumber) {
              logs = await getAction(client, getContractEvents, "getContractEvents")({
                abi: abi2,
                address,
                args,
                eventName,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber,
                strict
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log of logs)
              emit.onLogs([log]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify([
      "watchContractEvent",
      address,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict
    ]);
    let active = true;
    let unsubscribe = () => active = false;
    return observe(observerId, { onLogs, onError }, (emit) => {
      ;
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const topics = eventName ? encodeEventTopics({
            abi: abi2,
            eventName,
            args
          }) : [];
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["logs", { address, topics }],
            onData(data) {
              if (!active)
                return;
              const log = data.result;
              try {
                const { eventName: eventName2, args: args2 } = decodeEventLog({
                  abi: abi2,
                  data: log.data,
                  topics: log.topics,
                  strict: strict_
                });
                const formatted = formatLog(log, {
                  args: args2,
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              } catch (err) {
                let eventName2;
                let isUnnamed;
                if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                  if (strict_)
                    return;
                  eventName2 = err.abiItem.name;
                  isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
                }
                const formatted = formatLog(log, {
                  args: isUnnamed ? [] : {},
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              }
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollContractEvent() : subscribeContractEvent();
}

// node_modules/viem/_esm/actions/wallet/writeContract.js
async function writeContract(client, parameters) {
  const { abi: abi2, account: account_ = client.account, address, args, dataSuffix, functionName, ...request } = parameters;
  if (typeof account_ === "undefined")
    throw new AccountNotFoundError({
      docsPath: "/docs/contract/writeContract"
    });
  const account = account_ ? parseAccount(account_) : null;
  const data = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    return await getAction(client, sendTransaction, "sendTransaction")({
      data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      account,
      ...request
    });
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/writeContract",
      functionName,
      sender: account?.address
    });
  }
}

// node_modules/@wagmi/core/dist/esm/utils/getAction.js
function getAction2(client, actionFn, name) {
  const action_implicit = client[actionFn.name];
  if (typeof action_implicit === "function")
    return action_implicit;
  const action_explicit = client[name];
  if (typeof action_explicit === "function")
    return action_explicit;
  return (params) => actionFn(client, params);
}

// node_modules/@wagmi/core/dist/esm/actions/call.js
async function call2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, call, "call");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/version.js
var version = "2.19.0";

// node_modules/@wagmi/core/dist/esm/utils/getVersion.js
var getVersion = () => `@wagmi/core@${version}`;

// node_modules/@wagmi/core/dist/esm/errors/base.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseError_instances;
var _BaseError_walk;
var BaseError3 = class _BaseError extends Error {
  get docsBaseUrl() {
    return "https://wagmi.sh/core";
  }
  get version() {
    return getVersion();
  }
  constructor(shortMessage, options = {}) {
    super();
    _BaseError_instances.add(this);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WagmiCoreError"
    });
    const details = options.cause instanceof _BaseError ? options.cause.details : options.cause?.message ? options.cause.message : options.details;
    const docsPath3 = options.cause instanceof _BaseError ? options.cause.docsPath || options.docsPath : options.docsPath;
    this.message = [
      shortMessage || "An error occurred.",
      "",
      ...options.metaMessages ? [...options.metaMessages, ""] : [],
      ...docsPath3 ? [
        `Docs: ${this.docsBaseUrl}${docsPath3}.html${options.docsSlug ? `#${options.docsSlug}` : ""}`
      ] : [],
      ...details ? [`Details: ${details}`] : [],
      `Version: ${this.version}`
    ].join("\n");
    if (options.cause)
      this.cause = options.cause;
    this.details = details;
    this.docsPath = docsPath3;
    this.metaMessages = options.metaMessages;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk).call(this, this, fn);
  }
};
_BaseError_instances = /* @__PURE__ */ new WeakSet(), _BaseError_walk = function _BaseError_walk2(err, fn) {
  if (fn?.(err))
    return err;
  if (err.cause)
    return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk2).call(this, err.cause, fn);
  return err;
};

// node_modules/@wagmi/core/dist/esm/errors/config.js
var ChainNotConfiguredError = class extends BaseError3 {
  constructor() {
    super("Chain not configured.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ChainNotConfiguredError"
    });
  }
};
var ConnectorAlreadyConnectedError = class extends BaseError3 {
  constructor() {
    super("Connector already connected.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorAlreadyConnectedError"
    });
  }
};
var ConnectorNotConnectedError = class extends BaseError3 {
  constructor() {
    super("Connector not connected.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorNotConnectedError"
    });
  }
};
var ConnectorNotFoundError = class extends BaseError3 {
  constructor() {
    super("Connector not found.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorNotFoundError"
    });
  }
};
var ConnectorAccountNotFoundError = class extends BaseError3 {
  constructor({ address, connector }) {
    super(`Account "${address}" not found for connector "${connector.name}".`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorAccountNotFoundError"
    });
  }
};
var ConnectorChainMismatchError = class extends BaseError3 {
  constructor({ connectionChainId, connectorChainId }) {
    super(`The current chain of the connector (id: ${connectorChainId}) does not match the connection's chain (id: ${connectionChainId}).`, {
      metaMessages: [
        `Current Chain ID:  ${connectorChainId}`,
        `Expected Chain ID: ${connectionChainId}`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorChainMismatchError"
    });
  }
};
var ConnectorUnavailableReconnectingError = class extends BaseError3 {
  constructor({ connector }) {
    super(`Connector "${connector.name}" unavailable while reconnecting.`, {
      details: [
        "During the reconnection step, the only connector methods guaranteed to be available are: `id`, `name`, `type`, `uid`.",
        "All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored.",
        "This error commonly occurs for connectors that asynchronously inject after reconnection has already started."
      ].join(" ")
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ConnectorUnavailableReconnectingError"
    });
  }
};

// node_modules/@wagmi/core/dist/esm/actions/connect.js
async function connect(config, parameters) {
  let connector;
  if (typeof parameters.connector === "function") {
    connector = config._internal.connectors.setup(parameters.connector);
  } else
    connector = parameters.connector;
  if (connector.uid === config.state.current)
    throw new ConnectorAlreadyConnectedError();
  try {
    config.setState((x) => ({ ...x, status: "connecting" }));
    connector.emitter.emit("message", { type: "connecting" });
    const { connector: _, ...rest } = parameters;
    const data = await connector.connect(rest);
    const accounts = data.accounts;
    connector.emitter.off("connect", config._internal.events.connect);
    connector.emitter.on("change", config._internal.events.change);
    connector.emitter.on("disconnect", config._internal.events.disconnect);
    await config.storage?.setItem("recentConnectorId", connector.id);
    config.setState((x) => ({
      ...x,
      connections: new Map(x.connections).set(connector.uid, {
        accounts,
        chainId: data.chainId,
        connector
      }),
      current: connector.uid,
      status: "connected"
    }));
    return { accounts, chainId: data.chainId };
  } catch (error) {
    config.setState((x) => ({
      ...x,
      // Keep existing connector connected in case of error
      status: x.current ? "connected" : "disconnected"
    }));
    throw error;
  }
}

// node_modules/viem/_esm/utils/uid.js
var size4 = 256;
var index = size4;
var buffer;
function uid(length = 11) {
  if (!buffer || index + length > size4 * 2) {
    buffer = "";
    index = 0;
    for (let i = 0; i < size4; i++) {
      buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
    }
  }
  return buffer.substring(index, index++ + length);
}

// node_modules/viem/_esm/clients/createClient.js
function createClient(parameters) {
  const { batch, chain, ccipRead, key = "base", name = "Base Client", type = "base" } = parameters;
  const experimental_blockTag = parameters.experimental_blockTag ?? (typeof chain?.experimental_preconfirmationTime === "number" ? "pending" : void 0);
  const blockTime = chain?.blockTime ?? 12e3;
  const defaultPollingInterval = Math.min(Math.max(Math.floor(blockTime / 2), 500), 4e3);
  const pollingInterval = parameters.pollingInterval ?? defaultPollingInterval;
  const cacheTime = parameters.cacheTime ?? pollingInterval;
  const account = parameters.account ? parseAccount(parameters.account) : void 0;
  const { config, request, value } = parameters.transport({
    chain,
    pollingInterval
  });
  const transport = { ...config, ...value };
  const client = {
    account,
    batch,
    cacheTime,
    ccipRead,
    chain,
    key,
    name,
    pollingInterval,
    request,
    transport,
    type,
    uid: uid(),
    ...experimental_blockTag ? { experimental_blockTag } : {}
  };
  function extend(base) {
    return (extendFn) => {
      const extended = extendFn(base);
      for (const key2 in client)
        delete extended[key2];
      const combined = { ...base, ...extended };
      return Object.assign(combined, { extend: extend(combined) });
    };
  }
  return Object.assign(client, { extend: extend(client) });
}

// node_modules/viem/_esm/clients/transports/createTransport.js
function createTransport({ key, methods, name, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
  const uid3 = uid();
  return {
    config: {
      key,
      methods,
      name,
      request,
      retryCount,
      retryDelay,
      timeout,
      type
    },
    request: buildRequest(request, { methods, retryCount, retryDelay, uid: uid3 }),
    value
  };
}

// node_modules/viem/_esm/clients/transports/custom.js
function custom(provider, config = {}) {
  const { key = "custom", methods, name = "Custom Provider", retryDelay } = config;
  return ({ retryCount: defaultRetryCount }) => createTransport({
    key,
    methods,
    name,
    request: provider.request.bind(provider),
    retryCount: config.retryCount ?? defaultRetryCount,
    retryDelay,
    type: "custom"
  });
}

// node_modules/viem/_esm/clients/transports/fallback.js
function fallback(transports_, config = {}) {
  const { key = "fallback", name = "Fallback", rank = false, shouldThrow: shouldThrow_ = shouldThrow, retryCount, retryDelay } = config;
  return (({ chain, pollingInterval = 4e3, timeout, ...rest }) => {
    let transports = transports_;
    let onResponse = () => {
    };
    const transport = createTransport({
      key,
      name,
      async request({ method, params }) {
        let includes;
        const fetch2 = async (i = 0) => {
          const transport2 = transports[i]({
            ...rest,
            chain,
            retryCount: 0,
            timeout
          });
          try {
            const response = await transport2.request({
              method,
              params
            });
            onResponse({
              method,
              params,
              response,
              transport: transport2,
              status: "success"
            });
            return response;
          } catch (err) {
            onResponse({
              error: err,
              method,
              params,
              transport: transport2,
              status: "error"
            });
            if (shouldThrow_(err))
              throw err;
            if (i === transports.length - 1)
              throw err;
            includes ??= transports.slice(i + 1).some((transport3) => {
              const { include, exclude } = transport3({ chain }).config.methods || {};
              if (include)
                return include.includes(method);
              if (exclude)
                return !exclude.includes(method);
              return true;
            });
            if (!includes)
              throw err;
            return fetch2(i + 1);
          }
        };
        return fetch2();
      },
      retryCount,
      retryDelay,
      type: "fallback"
    }, {
      onResponse: (fn) => onResponse = fn,
      transports: transports.map((fn) => fn({ chain, retryCount: 0 }))
    });
    if (rank) {
      const rankOptions = typeof rank === "object" ? rank : {};
      rankTransports({
        chain,
        interval: rankOptions.interval ?? pollingInterval,
        onTransports: (transports_2) => transports = transports_2,
        ping: rankOptions.ping,
        sampleCount: rankOptions.sampleCount,
        timeout: rankOptions.timeout,
        transports,
        weights: rankOptions.weights
      });
    }
    return transport;
  });
}
function shouldThrow(error) {
  if ("code" in error && typeof error.code === "number") {
    if (error.code === TransactionRejectedRpcError.code || error.code === UserRejectedRequestError.code || ExecutionRevertedError.nodeMessage.test(error.message) || error.code === 5e3)
      return true;
  }
  return false;
}
function rankTransports({ chain, interval = 4e3, onTransports, ping, sampleCount = 10, timeout = 1e3, transports, weights = {} }) {
  const { stability: stabilityWeight = 0.7, latency: latencyWeight = 0.3 } = weights;
  const samples = [];
  const rankTransports_ = async () => {
    const sample = await Promise.all(transports.map(async (transport) => {
      const transport_ = transport({ chain, retryCount: 0, timeout });
      const start = Date.now();
      let end;
      let success;
      try {
        await (ping ? ping({ transport: transport_ }) : transport_.request({ method: "net_listening" }));
        success = 1;
      } catch {
        success = 0;
      } finally {
        end = Date.now();
      }
      const latency = end - start;
      return { latency, success };
    }));
    samples.push(sample);
    if (samples.length > sampleCount)
      samples.shift();
    const maxLatency = Math.max(...samples.map((sample2) => Math.max(...sample2.map(({ latency }) => latency))));
    const scores = transports.map((_, i) => {
      const latencies = samples.map((sample2) => sample2[i].latency);
      const meanLatency = latencies.reduce((acc, latency) => acc + latency, 0) / latencies.length;
      const latencyScore = 1 - meanLatency / maxLatency;
      const successes = samples.map((sample2) => sample2[i].success);
      const stabilityScore = successes.reduce((acc, success) => acc + success, 0) / successes.length;
      if (stabilityScore === 0)
        return [0, i];
      return [
        latencyWeight * latencyScore + stabilityWeight * stabilityScore,
        i
      ];
    }).sort((a, b) => b[0] - a[0]);
    onTransports(scores.map(([, i]) => transports[i]));
    await wait(interval);
    rankTransports_();
  };
  rankTransports_();
}

// node_modules/viem/_esm/errors/transport.js
var UrlRequiredError = class extends BaseError {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro",
      name: "UrlRequiredError"
    });
  }
};

// node_modules/viem/_esm/clients/transports/http.js
function http(url, config = {}) {
  const { batch, fetchOptions, key = "http", methods, name = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay, raw } = config;
  return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
    const { batchSize = 1e3, wait: wait2 = 0 } = typeof batch === "object" ? batch : {};
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || chain?.rpcUrls.default.http[0];
    if (!url_)
      throw new UrlRequiredError();
    const rpcClient = getHttpRpcClient(url_, {
      fetchOptions,
      onRequest: onFetchRequest,
      onResponse: onFetchResponse,
      timeout
    });
    return createTransport({
      key,
      methods,
      name,
      async request({ method, params }) {
        const body = { method, params };
        const { schedule } = createBatchScheduler({
          id: url_,
          wait: wait2,
          shouldSplitBatch(requests) {
            return requests.length > batchSize;
          },
          fn: (body2) => rpcClient.request({
            body: body2
          }),
          sort: (a, b) => a.id - b.id
        });
        const fn = async (body2) => batch ? schedule(body2) : [
          await rpcClient.request({
            body: body2
          })
        ];
        const [{ error, result }] = await fn(body);
        if (raw)
          return { error, result };
        if (error)
          throw new RpcRequestError({
            body,
            error,
            url: url_
          });
        return result;
      },
      retryCount,
      retryDelay,
      timeout,
      type: "http"
    }, {
      fetchOptions,
      url: url_
    });
  };
}

// node_modules/viem/_esm/utils/siwe/parseSiweMessage.js
function parseSiweMessage(message) {
  const { scheme, statement, ...prefix } = message.match(prefixRegex)?.groups ?? {};
  const { chainId, expirationTime, issuedAt, notBefore, requestId, ...suffix } = message.match(suffixRegex)?.groups ?? {};
  const resources = message.split("Resources:")[1]?.split("\n- ").slice(1);
  return {
    ...prefix,
    ...suffix,
    ...chainId ? { chainId: Number(chainId) } : {},
    ...expirationTime ? { expirationTime: new Date(expirationTime) } : {},
    ...issuedAt ? { issuedAt: new Date(issuedAt) } : {},
    ...notBefore ? { notBefore: new Date(notBefore) } : {},
    ...requestId ? { requestId } : {},
    ...resources ? { resources } : {},
    ...scheme ? { scheme } : {},
    ...statement ? { statement } : {}
  };
}
var prefixRegex = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/;
var suffixRegex = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;

// node_modules/viem/_esm/utils/siwe/validateSiweMessage.js
function validateSiweMessage(parameters) {
  const { address, domain, message, nonce, scheme, time = /* @__PURE__ */ new Date() } = parameters;
  if (domain && message.domain !== domain)
    return false;
  if (nonce && message.nonce !== nonce)
    return false;
  if (scheme && message.scheme !== scheme)
    return false;
  if (message.expirationTime && time >= message.expirationTime)
    return false;
  if (message.notBefore && time < message.notBefore)
    return false;
  try {
    if (!message.address)
      return false;
    if (!isAddress(message.address, { strict: false }))
      return false;
    if (address && !isAddressEqual(message.address, address))
      return false;
  } catch {
    return false;
  }
  return true;
}

// node_modules/viem/_esm/actions/siwe/verifySiweMessage.js
async function verifySiweMessage(client, parameters) {
  const { address, domain, message, nonce, scheme, signature, time = /* @__PURE__ */ new Date(), ...callRequest } = parameters;
  const parsed = parseSiweMessage(message);
  if (!parsed.address)
    return false;
  const isValid = validateSiweMessage({
    address,
    domain,
    message: parsed,
    nonce,
    scheme,
    time
  });
  if (!isValid)
    return false;
  const hash = hashMessage(message);
  return verifyHash2(client, {
    address: parsed.address,
    hash,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/clients/decorators/public.js
function publicActions(client) {
  return {
    call: (args) => call(client, args),
    createAccessList: (args) => createAccessList(client, args),
    createBlockFilter: () => createBlockFilter(client),
    createContractEventFilter: (args) => createContractEventFilter(client, args),
    createEventFilter: (args) => createEventFilter(client, args),
    createPendingTransactionFilter: () => createPendingTransactionFilter(client),
    estimateContractGas: (args) => estimateContractGas(client, args),
    estimateGas: (args) => estimateGas(client, args),
    getBalance: (args) => getBalance(client, args),
    getBlobBaseFee: () => getBlobBaseFee(client),
    getBlock: (args) => getBlock(client, args),
    getBlockNumber: (args) => getBlockNumber(client, args),
    getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
    getBytecode: (args) => getCode(client, args),
    getChainId: () => getChainId(client),
    getCode: (args) => getCode(client, args),
    getContractEvents: (args) => getContractEvents(client, args),
    getEip712Domain: (args) => getEip712Domain(client, args),
    getEnsAddress: (args) => getEnsAddress(client, args),
    getEnsAvatar: (args) => getEnsAvatar(client, args),
    getEnsName: (args) => getEnsName(client, args),
    getEnsResolver: (args) => getEnsResolver(client, args),
    getEnsText: (args) => getEnsText(client, args),
    getFeeHistory: (args) => getFeeHistory(client, args),
    estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
    getFilterChanges: (args) => getFilterChanges(client, args),
    getFilterLogs: (args) => getFilterLogs(client, args),
    getGasPrice: () => getGasPrice(client),
    getLogs: (args) => getLogs(client, args),
    getProof: (args) => getProof(client, args),
    estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
    getStorageAt: (args) => getStorageAt(client, args),
    getTransaction: (args) => getTransaction(client, args),
    getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
    getTransactionCount: (args) => getTransactionCount(client, args),
    getTransactionReceipt: (args) => getTransactionReceipt(client, args),
    multicall: (args) => multicall(client, args),
    prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
    readContract: (args) => readContract(client, args),
    sendRawTransaction: (args) => sendRawTransaction(client, args),
    simulate: (args) => simulateBlocks(client, args),
    simulateBlocks: (args) => simulateBlocks(client, args),
    simulateCalls: (args) => simulateCalls(client, args),
    simulateContract: (args) => simulateContract(client, args),
    verifyMessage: (args) => verifyMessage2(client, args),
    verifySiweMessage: (args) => verifySiweMessage(client, args),
    verifyTypedData: (args) => verifyTypedData2(client, args),
    uninstallFilter: (args) => uninstallFilter(client, args),
    waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
    watchBlocks: (args) => watchBlocks(client, args),
    watchBlockNumber: (args) => watchBlockNumber(client, args),
    watchContractEvent: (args) => watchContractEvent(client, args),
    watchEvent: (args) => watchEvent(client, args),
    watchPendingTransactions: (args) => watchPendingTransactions(client, args)
  };
}

// node_modules/viem/_esm/clients/decorators/wallet.js
function walletActions(client) {
  return {
    addChain: (args) => addChain(client, args),
    deployContract: (args) => deployContract(client, args),
    getAddresses: () => getAddresses(client),
    getCallsStatus: (args) => getCallsStatus(client, args),
    getCapabilities: (args) => getCapabilities(client, args),
    getChainId: () => getChainId(client),
    getPermissions: () => getPermissions(client),
    prepareAuthorization: (args) => prepareAuthorization(client, args),
    prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
    requestAddresses: () => requestAddresses(client),
    requestPermissions: (args) => requestPermissions(client, args),
    sendCalls: (args) => sendCalls(client, args),
    sendRawTransaction: (args) => sendRawTransaction(client, args),
    sendTransaction: (args) => sendTransaction(client, args),
    showCallsStatus: (args) => showCallsStatus(client, args),
    signAuthorization: (args) => signAuthorization(client, args),
    signMessage: (args) => signMessage(client, args),
    signTransaction: (args) => signTransaction(client, args),
    signTypedData: (args) => signTypedData(client, args),
    switchChain: (args) => switchChain(client, args),
    waitForCallsStatus: (args) => waitForCallsStatus(client, args),
    watchAsset: (args) => watchAsset(client, args),
    writeContract: (args) => writeContract(client, args)
  };
}

// node_modules/viem/_esm/clients/transports/webSocket.js
function webSocket2(url, config = {}) {
  const { keepAlive, key = "webSocket", methods, name = "WebSocket JSON-RPC", reconnect: reconnect2, retryDelay } = config;
  return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || chain?.rpcUrls.default.webSocket?.[0];
    const wsRpcClientOpts = { keepAlive, reconnect: reconnect2 };
    if (!url_)
      throw new UrlRequiredError();
    return createTransport({
      key,
      methods,
      name,
      async request({ method, params }) {
        const body = { method, params };
        const rpcClient = await getWebSocketRpcClient(url_, wsRpcClientOpts);
        const { error, result } = await rpcClient.requestAsync({
          body,
          timeout
        });
        if (error)
          throw new RpcRequestError({
            body,
            error,
            url: url_
          });
        return result;
      },
      retryCount,
      retryDelay,
      timeout,
      type: "webSocket"
    }, {
      getSocket() {
        return getSocket(url_);
      },
      getRpcClient() {
        return getWebSocketRpcClient(url_, wsRpcClientOpts);
      },
      async subscribe({ params, onData, onError }) {
        const rpcClient = await getWebSocketRpcClient(url_, wsRpcClientOpts);
        const { result: subscriptionId } = await new Promise((resolve, reject) => rpcClient.request({
          body: {
            method: "eth_subscribe",
            params
          },
          onError(error) {
            reject(error);
            onError?.(error);
            return;
          },
          onResponse(response) {
            if (response.error) {
              reject(response.error);
              onError?.(response.error);
              return;
            }
            if (typeof response.id === "number") {
              resolve(response);
              return;
            }
            if (response.method !== "eth_subscription")
              return;
            onData(response.params);
          }
        }));
        return {
          subscriptionId,
          async unsubscribe() {
            return new Promise((resolve) => rpcClient.request({
              body: {
                method: "eth_unsubscribe",
                params: [subscriptionId]
              },
              onResponse: resolve
            }));
          }
        };
      }
    });
  };
}

// node_modules/@wagmi/core/dist/esm/actions/getConnectorClient.js
async function getConnectorClient(config, parameters = {}) {
  let connection;
  if (parameters.connector) {
    const { connector: connector2 } = parameters;
    if (config.state.status === "reconnecting" && !connector2.getAccounts && !connector2.getChainId)
      throw new ConnectorUnavailableReconnectingError({ connector: connector2 });
    const [accounts, chainId2] = await Promise.all([
      connector2.getAccounts().catch((e) => {
        if (parameters.account === null)
          return [];
        throw e;
      }),
      connector2.getChainId()
    ]);
    connection = {
      accounts,
      chainId: chainId2,
      connector: connector2
    };
  } else
    connection = config.state.connections.get(config.state.current);
  if (!connection)
    throw new ConnectorNotConnectedError();
  const chainId = parameters.chainId ?? connection.chainId;
  const connectorChainId = await connection.connector.getChainId();
  if (connectorChainId !== connection.chainId)
    throw new ConnectorChainMismatchError({
      connectionChainId: connection.chainId,
      connectorChainId
    });
  const connector = connection.connector;
  if (connector.getClient)
    return connector.getClient({ chainId });
  const account = parseAccount(parameters.account ?? connection.accounts[0]);
  if (account)
    account.address = getAddress(account.address);
  if (parameters.account && !connection.accounts.some((x) => x.toLowerCase() === account.address.toLowerCase()))
    throw new ConnectorAccountNotFoundError({
      address: account.address,
      connector
    });
  const chain = config.chains.find((chain2) => chain2.id === chainId);
  const provider = await connection.connector.getProvider({ chainId });
  return createClient({
    account,
    chain,
    name: "Connector Client",
    transport: (opts) => custom(provider)({ ...opts, retryCount: 0 })
  });
}

// node_modules/@wagmi/core/dist/esm/actions/deployContract.js
async function deployContract2(config, parameters) {
  const { account, chainId, connector, ...rest } = parameters;
  let client;
  if (typeof account === "object" && account?.type === "local")
    client = config.getClient({ chainId });
  else
    client = await getConnectorClient(config, {
      account: account ?? void 0,
      chainId,
      connector
    });
  const action = getAction2(client, deployContract, "deployContract");
  const hash = await action({
    ...rest,
    ...account ? { account } : {},
    chain: chainId ? { id: chainId } : null
  });
  return hash;
}

// node_modules/@wagmi/core/dist/esm/actions/disconnect.js
async function disconnect(config, parameters = {}) {
  let connector;
  if (parameters.connector)
    connector = parameters.connector;
  else {
    const { connections: connections2, current } = config.state;
    const connection = connections2.get(current);
    connector = connection?.connector;
  }
  const connections = config.state.connections;
  if (connector) {
    await connector.disconnect();
    connector.emitter.off("change", config._internal.events.change);
    connector.emitter.off("disconnect", config._internal.events.disconnect);
    connector.emitter.on("connect", config._internal.events.connect);
    connections.delete(connector.uid);
  }
  config.setState((x) => {
    if (connections.size === 0)
      return {
        ...x,
        connections: /* @__PURE__ */ new Map(),
        current: null,
        status: "disconnected"
      };
    const nextConnection = connections.values().next().value;
    return {
      ...x,
      connections: new Map(connections),
      current: nextConnection.connector.uid
    };
  });
  {
    const current = config.state.current;
    if (!current)
      return;
    const connector2 = config.state.connections.get(current)?.connector;
    if (!connector2)
      return;
    await config.storage?.setItem("recentConnectorId", connector2.id);
  }
}

// node_modules/@wagmi/core/dist/esm/utils/getUnit.js
function getUnit(unit) {
  if (typeof unit === "number")
    return unit;
  if (unit === "wei")
    return 0;
  return Math.abs(weiUnits[unit]);
}

// node_modules/@wagmi/core/dist/esm/actions/estimateFeesPerGas.js
async function estimateFeesPerGas2(config, parameters = {}) {
  const { chainId, formatUnits: units = "gwei", ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, estimateFeesPerGas, "estimateFeesPerGas");
  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await action({
    ...rest,
    chain: client.chain
  });
  const unit = getUnit(units);
  const formatted = {
    gasPrice: gasPrice ? formatUnits(gasPrice, unit) : void 0,
    maxFeePerGas: maxFeePerGas ? formatUnits(maxFeePerGas, unit) : void 0,
    maxPriorityFeePerGas: maxPriorityFeePerGas ? formatUnits(maxPriorityFeePerGas, unit) : void 0
  };
  return {
    formatted,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas
  };
}

// node_modules/@wagmi/core/dist/esm/actions/estimateGas.js
async function estimateGas2(config, parameters) {
  const { chainId, connector, ...rest } = parameters;
  let account;
  if (parameters.account)
    account = parameters.account;
  else {
    const connectorClient = await getConnectorClient(config, {
      account: parameters.account,
      chainId,
      connector
    });
    account = connectorClient.account;
  }
  const client = config.getClient({ chainId });
  const action = getAction2(client, estimateGas, "estimateGas");
  return action({ ...rest, account });
}

// node_modules/@wagmi/core/dist/esm/actions/estimateMaxPriorityFeePerGas.js
async function estimateMaxPriorityFeePerGas2(config, parameters = {}) {
  const { chainId } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, estimateMaxPriorityFeePerGas, "estimateMaxPriorityFeePerGas");
  return action({ chain: client.chain });
}

// node_modules/@wagmi/core/dist/esm/actions/getAccount.js
function getAccount(config) {
  const uid3 = config.state.current;
  const connection = config.state.connections.get(uid3);
  const addresses = connection?.accounts;
  const address = addresses?.[0];
  const chain = config.chains.find((chain2) => chain2.id === connection?.chainId);
  const status = config.state.status;
  switch (status) {
    case "connected":
      return {
        address,
        addresses,
        chain,
        chainId: connection?.chainId,
        connector: connection?.connector,
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: false,
        status
      };
    case "reconnecting":
      return {
        address,
        addresses,
        chain,
        chainId: connection?.chainId,
        connector: connection?.connector,
        isConnected: !!address,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: true,
        status
      };
    case "connecting":
      return {
        address,
        addresses,
        chain,
        chainId: connection?.chainId,
        connector: connection?.connector,
        isConnected: false,
        isConnecting: true,
        isDisconnected: false,
        isReconnecting: false,
        status
      };
    case "disconnected":
      return {
        address: void 0,
        addresses: void 0,
        chain: void 0,
        chainId: void 0,
        connector: void 0,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
        status
      };
  }
}

// node_modules/@wagmi/core/dist/esm/actions/multicall.js
async function multicall2(config, parameters) {
  const { allowFailure = true, chainId, contracts, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, multicall, "multicall");
  return action({
    allowFailure,
    contracts,
    ...rest
  });
}

// node_modules/@wagmi/core/dist/esm/actions/readContract.js
function readContract2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, readContract, "readContract");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/readContracts.js
async function readContracts(config, parameters) {
  const { allowFailure = true, blockNumber, blockTag, ...rest } = parameters;
  const contracts = parameters.contracts;
  try {
    const contractsByChainId = {};
    for (const [index3, contract] of contracts.entries()) {
      const chainId = contract.chainId ?? config.state.chainId;
      if (!contractsByChainId[chainId])
        contractsByChainId[chainId] = [];
      contractsByChainId[chainId]?.push({ contract, index: index3 });
    }
    const promises = () => Object.entries(contractsByChainId).map(([chainId, contracts2]) => multicall2(config, {
      ...rest,
      allowFailure,
      blockNumber,
      blockTag,
      chainId: Number.parseInt(chainId),
      contracts: contracts2.map(({ contract }) => contract)
    }));
    const multicallResults = (await Promise.all(promises())).flat();
    const resultIndexes = Object.values(contractsByChainId).flatMap((contracts2) => contracts2.map(({ index: index3 }) => index3));
    return multicallResults.reduce((results, result, index3) => {
      if (results)
        results[resultIndexes[index3]] = result;
      return results;
    }, []);
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError)
      throw error;
    const promises = () => contracts.map((contract) => readContract2(config, { ...contract, blockNumber, blockTag }));
    if (allowFailure)
      return (await Promise.allSettled(promises())).map((result) => {
        if (result.status === "fulfilled")
          return { result: result.value, status: "success" };
        return { error: result.reason, result: void 0, status: "failure" };
      });
    return await Promise.all(promises());
  }
}

// node_modules/@wagmi/core/dist/esm/actions/getBalance.js
async function getBalance2(config, parameters) {
  const { address, blockNumber, blockTag, chainId, token: tokenAddress, unit = "ether" } = parameters;
  if (tokenAddress) {
    try {
      return await getTokenBalance(config, {
        balanceAddress: address,
        chainId,
        symbolType: "string",
        tokenAddress
      });
    } catch (error) {
      if (error.name === "ContractFunctionExecutionError") {
        const balance = await getTokenBalance(config, {
          balanceAddress: address,
          chainId,
          symbolType: "bytes32",
          tokenAddress
        });
        const symbol = hexToString(trim(balance.symbol, { dir: "right" }));
        return { ...balance, symbol };
      }
      throw error;
    }
  }
  const client = config.getClient({ chainId });
  const action = getAction2(client, getBalance, "getBalance");
  const value = await action(blockNumber ? { address, blockNumber } : { address, blockTag });
  const chain = config.chains.find((x) => x.id === chainId) ?? client.chain;
  return {
    decimals: chain.nativeCurrency.decimals,
    formatted: formatUnits(value, getUnit(unit)),
    symbol: chain.nativeCurrency.symbol,
    value
  };
}
async function getTokenBalance(config, parameters) {
  const { balanceAddress, chainId, symbolType, tokenAddress, unit } = parameters;
  const contract = {
    abi: [
      {
        type: "function",
        name: "balanceOf",
        stateMutability: "view",
        inputs: [{ type: "address" }],
        outputs: [{ type: "uint256" }]
      },
      {
        type: "function",
        name: "decimals",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }]
      },
      {
        type: "function",
        name: "symbol",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: symbolType }]
      }
    ],
    address: tokenAddress
  };
  const [value, decimals, symbol] = await readContracts(config, {
    allowFailure: false,
    contracts: [
      {
        ...contract,
        functionName: "balanceOf",
        args: [balanceAddress],
        chainId
      },
      { ...contract, functionName: "decimals", chainId },
      { ...contract, functionName: "symbol", chainId }
    ]
  });
  const formatted = formatUnits(value ?? "0", getUnit(unit ?? decimals));
  return { decimals, formatted, symbol, value };
}

// node_modules/@wagmi/core/dist/esm/actions/getBlock.js
async function getBlock2(config, parameters = {}) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getBlock, "getBlock");
  const block = await action(rest);
  return {
    ...block,
    chainId: client.chain.id
  };
}

// node_modules/@wagmi/core/dist/esm/actions/getBlockNumber.js
function getBlockNumber2(config, parameters = {}) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getBlockNumber, "getBlockNumber");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getBlockTransactionCount.js
function getBlockTransactionCount2(config, parameters = {}) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getBlockTransactionCount, "getBlockTransactionCount");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getBytecode.js
async function getBytecode(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getCode, "getBytecode");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getCallsStatus.js
async function getCallsStatus2(config, parameters) {
  const { connector, id } = parameters;
  const client = await getConnectorClient(config, { connector });
  const action = getAction2(client, getCallsStatus, "getCallsStatus");
  return action({ id });
}

// node_modules/@wagmi/core/dist/esm/actions/getCapabilities.js
async function getCapabilities2(config, parameters = {}) {
  const { account, chainId, connector } = parameters;
  const client = await getConnectorClient(config, { account, connector });
  return getCapabilities(client, {
    account,
    chainId
  });
}

// node_modules/@wagmi/core/dist/esm/actions/getChainId.js
function getChainId2(config) {
  return config.state.chainId;
}

// node_modules/@wagmi/core/dist/esm/utils/deepEqual.js
function deepEqual(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor)
      return false;
    let length;
    let i;
    if (Array.isArray(a) && Array.isArray(b)) {
      length = a.length;
      if (length !== b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!deepEqual(a[i], b[i]))
          return false;
      return true;
    }
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.hasOwn(b, keys[i]))
        return false;
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key && !deepEqual(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}

// node_modules/@wagmi/core/dist/esm/actions/getChains.js
var previousChains = [];
function getChains(config) {
  const chains = config.chains;
  if (deepEqual(previousChains, chains))
    return previousChains;
  previousChains = chains;
  return chains;
}

// node_modules/@wagmi/core/dist/esm/actions/getClient.js
function getClient(config, parameters = {}) {
  try {
    return config.getClient(parameters);
  } catch {
    return void 0;
  }
}

// node_modules/@wagmi/core/dist/esm/actions/getConnections.js
var previousConnections = [];
function getConnections(config) {
  const connections = [...config.state.connections.values()];
  if (config.state.status === "reconnecting")
    return previousConnections;
  if (deepEqual(previousConnections, connections))
    return previousConnections;
  previousConnections = connections;
  return connections;
}

// node_modules/@wagmi/core/dist/esm/actions/getConnectors.js
var previousConnectors = [];
function getConnectors(config) {
  const connectors = config.connectors;
  if (deepEqual(previousConnectors, connectors))
    return previousConnectors;
  previousConnectors = connectors;
  return connectors;
}

// node_modules/@wagmi/core/dist/esm/actions/getEnsAddress.js
function getEnsAddress2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getEnsAddress, "getEnsAddress");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getEnsAvatar.js
function getEnsAvatar2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getEnsAvatar, "getEnsAvatar");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getEnsName.js
function getEnsName2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getEnsName, "getEnsName");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getEnsResolver.js
function getEnsResolver2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getEnsResolver, "getEnsResolver");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getEnsText.js
function getEnsText2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getEnsText, "getEnsText");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getFeeHistory.js
function getFeeHistory2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getFeeHistory, "getFeeHistory");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getGasPrice.js
function getGasPrice2(config, parameters = {}) {
  const { chainId } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getGasPrice, "getGasPrice");
  return action({});
}

// node_modules/@wagmi/core/dist/esm/actions/getProof.js
async function getProof2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getProof, "getProof");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getPublicClient.js
function getPublicClient(config, parameters = {}) {
  const client = getClient(config, parameters);
  return client?.extend(publicActions);
}

// node_modules/@wagmi/core/dist/esm/actions/getStorageAt.js
async function getStorageAt2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getStorageAt, "getStorageAt");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getToken.js
async function getToken(config, parameters) {
  const { address, chainId, formatUnits: unit = 18 } = parameters;
  function getAbi(type) {
    return [
      {
        type: "function",
        name: "decimals",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }]
      },
      {
        type: "function",
        name: "name",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type }]
      },
      {
        type: "function",
        name: "symbol",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type }]
      },
      {
        type: "function",
        name: "totalSupply",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint256" }]
      }
    ];
  }
  try {
    const abi2 = getAbi("string");
    const contractConfig = { address, abi: abi2, chainId };
    const [decimals, name, symbol, totalSupply] = await readContracts(config, {
      allowFailure: true,
      contracts: [
        { ...contractConfig, functionName: "decimals" },
        { ...contractConfig, functionName: "name" },
        { ...contractConfig, functionName: "symbol" },
        { ...contractConfig, functionName: "totalSupply" }
      ]
    });
    if (name.error instanceof ContractFunctionExecutionError)
      throw name.error;
    if (symbol.error instanceof ContractFunctionExecutionError)
      throw symbol.error;
    if (decimals.error)
      throw decimals.error;
    if (totalSupply.error)
      throw totalSupply.error;
    return {
      address,
      decimals: decimals.result,
      name: name.result,
      symbol: symbol.result,
      totalSupply: {
        formatted: formatUnits(totalSupply.result, getUnit(unit)),
        value: totalSupply.result
      }
    };
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      const abi2 = getAbi("bytes32");
      const contractConfig = { address, abi: abi2, chainId };
      const [decimals, name, symbol, totalSupply] = await readContracts(config, {
        allowFailure: false,
        contracts: [
          { ...contractConfig, functionName: "decimals" },
          { ...contractConfig, functionName: "name" },
          { ...contractConfig, functionName: "symbol" },
          { ...contractConfig, functionName: "totalSupply" }
        ]
      });
      return {
        address,
        decimals,
        name: hexToString(trim(name, { dir: "right" })),
        symbol: hexToString(trim(symbol, { dir: "right" })),
        totalSupply: {
          formatted: formatUnits(totalSupply, getUnit(unit)),
          value: totalSupply
        }
      };
    }
    throw error;
  }
}

// node_modules/@wagmi/core/dist/esm/actions/getTransaction.js
function getTransaction2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getTransaction, "getTransaction");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getTransactionConfirmations.js
function getTransactionConfirmations2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getTransactionConfirmations, "getTransactionConfirmations");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getTransactionCount.js
async function getTransactionCount2(config, parameters) {
  const { address, blockNumber, blockTag, chainId } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getTransactionCount, "getTransactionCount");
  return action(blockNumber ? { address, blockNumber } : { address, blockTag });
}

// node_modules/@wagmi/core/dist/esm/actions/getTransactionReceipt.js
async function getTransactionReceipt2(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, getTransactionReceipt, "getTransactionReceipt");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/getWalletClient.js
async function getWalletClient(config, parameters = {}) {
  const client = await getConnectorClient(config, parameters);
  return client.extend(walletActions);
}

// node_modules/@wagmi/core/dist/esm/actions/prepareTransactionRequest.js
async function prepareTransactionRequest2(config, parameters) {
  const { account: account_, chainId, ...rest } = parameters;
  const account = account_ ?? getAccount(config).address;
  const client = config.getClient({ chainId });
  const action = getAction2(client, prepareTransactionRequest, "prepareTransactionRequest");
  return action({
    ...rest,
    ...account ? { account } : {}
  });
}

// node_modules/@wagmi/core/dist/esm/actions/reconnect.js
var isReconnecting = false;
async function reconnect(config, parameters = {}) {
  if (isReconnecting)
    return [];
  isReconnecting = true;
  config.setState((x) => ({
    ...x,
    status: x.current ? "reconnecting" : "connecting"
  }));
  const connectors = [];
  if (parameters.connectors?.length) {
    for (const connector_ of parameters.connectors) {
      let connector;
      if (typeof connector_ === "function")
        connector = config._internal.connectors.setup(connector_);
      else
        connector = connector_;
      connectors.push(connector);
    }
  } else
    connectors.push(...config.connectors);
  let recentConnectorId;
  try {
    recentConnectorId = await config.storage?.getItem("recentConnectorId");
  } catch {
  }
  const scores = {};
  for (const [, connection] of config.state.connections) {
    scores[connection.connector.id] = 1;
  }
  if (recentConnectorId)
    scores[recentConnectorId] = 0;
  const sorted = Object.keys(scores).length > 0 ? (
    // .toSorted()
    [...connectors].sort((a, b) => (scores[a.id] ?? 10) - (scores[b.id] ?? 10))
  ) : connectors;
  let connected = false;
  const connections = [];
  const providers = [];
  for (const connector of sorted) {
    const provider = await connector.getProvider().catch(() => void 0);
    if (!provider)
      continue;
    if (providers.some((x) => x === provider))
      continue;
    const isAuthorized = await connector.isAuthorized();
    if (!isAuthorized)
      continue;
    const data = await connector.connect({ isReconnecting: true }).catch(() => null);
    if (!data)
      continue;
    connector.emitter.off("connect", config._internal.events.connect);
    connector.emitter.on("change", config._internal.events.change);
    connector.emitter.on("disconnect", config._internal.events.disconnect);
    config.setState((x) => {
      const connections2 = new Map(connected ? x.connections : /* @__PURE__ */ new Map()).set(connector.uid, { accounts: data.accounts, chainId: data.chainId, connector });
      return {
        ...x,
        current: connected ? x.current : connector.uid,
        connections: connections2
      };
    });
    connections.push({
      accounts: data.accounts,
      chainId: data.chainId,
      connector
    });
    providers.push(provider);
    connected = true;
  }
  if (config.state.status === "reconnecting" || config.state.status === "connecting") {
    if (!connected)
      config.setState((x) => ({
        ...x,
        connections: /* @__PURE__ */ new Map(),
        current: null,
        status: "disconnected"
      }));
    else
      config.setState((x) => ({ ...x, status: "connected" }));
  }
  isReconnecting = false;
  return connections;
}

// node_modules/@wagmi/core/dist/esm/actions/sendCalls.js
async function sendCalls2(config, parameters) {
  const { account, chainId, connector, calls, ...rest } = parameters;
  const client = await getConnectorClient(config, {
    account,
    chainId,
    connector
  });
  const action = getAction2(client, sendCalls, "sendCalls");
  return action({
    ...rest,
    ...typeof account !== "undefined" ? { account } : {},
    calls,
    chain: chainId ? { id: chainId } : void 0
  });
}

// node_modules/@wagmi/core/dist/esm/actions/sendTransaction.js
async function sendTransaction2(config, parameters) {
  const { account, chainId, connector, ...rest } = parameters;
  let client;
  if (typeof account === "object" && account?.type === "local")
    client = config.getClient({ chainId });
  else
    client = await getConnectorClient(config, {
      account: account ?? void 0,
      chainId,
      connector
    });
  const action = getAction2(client, sendTransaction, "sendTransaction");
  const hash = await action({
    ...rest,
    ...account ? { account } : {},
    chain: chainId ? { id: chainId } : null,
    gas: rest.gas ?? void 0
  });
  return hash;
}

// node_modules/@wagmi/core/dist/esm/actions/showCallsStatus.js
async function showCallsStatus2(config, parameters) {
  const { connector, id } = parameters;
  const client = await getConnectorClient(config, { connector });
  return showCallsStatus(client, { id });
}

// node_modules/@wagmi/core/dist/esm/actions/signMessage.js
async function signMessage2(config, parameters) {
  const { account, connector, ...rest } = parameters;
  let client;
  if (typeof account === "object" && account.type === "local")
    client = config.getClient();
  else
    client = await getConnectorClient(config, { account, connector });
  const action = getAction2(client, signMessage, "signMessage");
  return action({
    ...rest,
    ...account ? { account } : {}
  });
}

// node_modules/@wagmi/core/dist/esm/actions/signTypedData.js
async function signTypedData2(config, parameters) {
  const { account, connector, ...rest } = parameters;
  let client;
  if (typeof account === "object" && account.type === "local")
    client = config.getClient();
  else
    client = await getConnectorClient(config, { account, connector });
  const action = getAction2(client, signTypedData, "signTypedData");
  return action({
    ...rest,
    ...account ? { account } : {}
  });
}

// node_modules/@wagmi/core/dist/esm/actions/simulateContract.js
async function simulateContract2(config, parameters) {
  const { abi: abi2, chainId, connector, ...rest } = parameters;
  let account;
  if (parameters.account)
    account = parameters.account;
  else {
    const connectorClient = await getConnectorClient(config, {
      chainId,
      connector
    });
    account = connectorClient.account;
  }
  const client = config.getClient({ chainId });
  const action = getAction2(client, simulateContract, "simulateContract");
  const { result, request } = await action({ ...rest, abi: abi2, account });
  return {
    chainId: client.chain.id,
    result,
    request: { ...request, chainId }
  };
}

// node_modules/@wagmi/core/dist/esm/actions/switchAccount.js
async function switchAccount(config, parameters) {
  const { connector } = parameters;
  const connection = config.state.connections.get(connector.uid);
  if (!connection)
    throw new ConnectorNotConnectedError();
  await config.storage?.setItem("recentConnectorId", connector.id);
  config.setState((x) => ({
    ...x,
    current: connector.uid
  }));
  return {
    accounts: connection.accounts,
    chainId: connection.chainId
  };
}

// node_modules/@wagmi/core/dist/esm/errors/connector.js
var ProviderNotFoundError = class extends BaseError3 {
  constructor() {
    super("Provider not found.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ProviderNotFoundError"
    });
  }
};
var SwitchChainNotSupportedError = class extends BaseError3 {
  constructor({ connector }) {
    super(`"${connector.name}" does not support programmatic chain switching.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SwitchChainNotSupportedError"
    });
  }
};

// node_modules/@wagmi/core/dist/esm/actions/switchChain.js
async function switchChain2(config, parameters) {
  const { addEthereumChainParameter, chainId } = parameters;
  const connection = config.state.connections.get(parameters.connector?.uid ?? config.state.current);
  if (connection) {
    const connector = connection.connector;
    if (!connector.switchChain)
      throw new SwitchChainNotSupportedError({ connector });
    const chain2 = await connector.switchChain({
      addEthereumChainParameter,
      chainId
    });
    return chain2;
  }
  const chain = config.chains.find((x) => x.id === chainId);
  if (!chain)
    throw new ChainNotConfiguredError();
  config.setState((x) => ({ ...x, chainId }));
  return chain;
}

// node_modules/@wagmi/core/dist/esm/actions/verifyMessage.js
async function verifyMessage3(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, verifyMessage2, "verifyMessage");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/verifyTypedData.js
async function verifyTypedData3(config, parameters) {
  const { chainId, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, verifyTypedData2, "verifyTypedData");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/waitForCallsStatus.js
async function waitForCallsStatus2(config, parameters) {
  const { connector } = parameters;
  const client = await getConnectorClient(config, { connector });
  return waitForCallsStatus(client, parameters);
}

// node_modules/@wagmi/core/dist/esm/actions/waitForTransactionReceipt.js
async function waitForTransactionReceipt2(config, parameters) {
  const { chainId, timeout = 0, ...rest } = parameters;
  const client = config.getClient({ chainId });
  const action = getAction2(client, waitForTransactionReceipt, "waitForTransactionReceipt");
  const receipt = await action({ ...rest, timeout });
  if (receipt.status === "reverted") {
    const action_getTransaction = getAction2(client, getTransaction, "getTransaction");
    const txn = await action_getTransaction({ hash: receipt.transactionHash });
    const action_call = getAction2(client, call, "call");
    const code = await action_call({
      ...txn,
      data: txn.input,
      gasPrice: txn.type !== "eip1559" ? txn.gasPrice : void 0,
      maxFeePerGas: txn.type === "eip1559" ? txn.maxFeePerGas : void 0,
      maxPriorityFeePerGas: txn.type === "eip1559" ? txn.maxPriorityFeePerGas : void 0
    });
    const reason = code?.data ? hexToString(`0x${code.data.substring(138)}`) : "unknown reason";
    throw new Error(reason);
  }
  return {
    ...receipt,
    chainId: client.chain.id
  };
}

// node_modules/@wagmi/core/dist/esm/actions/watchAccount.js
function watchAccount(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe(() => getAccount(config), onChange, {
    equalityFn(a, b) {
      const { connector: aConnector, ...aRest } = a;
      const { connector: bConnector, ...bRest } = b;
      return deepEqual(aRest, bRest) && // check connector separately
      aConnector?.id === bConnector?.id && aConnector?.uid === bConnector?.uid;
    }
  });
}

// node_modules/@wagmi/core/dist/esm/actions/watchAsset.js
async function watchAsset2(config, parameters) {
  const { connector, ...rest } = parameters;
  const client = await getConnectorClient(config, { connector });
  const action = getAction2(client, watchAsset, "watchAsset");
  return action(rest);
}

// node_modules/@wagmi/core/dist/esm/actions/watchBlockNumber.js
function watchBlockNumber2(config, parameters) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } = parameters;
  let unwatch;
  const listener = (chainId) => {
    if (unwatch)
      unwatch();
    const client = config.getClient({ chainId });
    const action = getAction2(client, watchBlockNumber, "watchBlockNumber");
    unwatch = action(rest);
    return unwatch;
  };
  const unlisten = listener(parameters.chainId);
  let unsubscribe;
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(({ chainId }) => chainId, async (chainId) => listener(chainId));
  return () => {
    unlisten?.();
    unsubscribe?.();
  };
}

// node_modules/@wagmi/core/dist/esm/actions/watchBlocks.js
function watchBlocks2(config, parameters) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } = parameters;
  let unwatch;
  const listener = (chainId) => {
    if (unwatch)
      unwatch();
    const client = config.getClient({ chainId });
    const action = getAction2(client, watchBlocks, "watchBlocks");
    unwatch = action(rest);
    return unwatch;
  };
  const unlisten = listener(parameters.chainId);
  let unsubscribe;
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(({ chainId }) => chainId, async (chainId) => listener(chainId));
  return () => {
    unlisten?.();
    unsubscribe?.();
  };
}

// node_modules/@wagmi/core/dist/esm/actions/watchChainId.js
function watchChainId(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe((state) => state.chainId, onChange);
}

// node_modules/@wagmi/core/dist/esm/actions/watchClient.js
function watchClient(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe(() => getClient(config), onChange, {
    equalityFn(a, b) {
      return a?.uid === b?.uid;
    }
  });
}

// node_modules/@wagmi/core/dist/esm/actions/watchConnections.js
function watchConnections(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe(() => getConnections(config), onChange, {
    equalityFn: deepEqual
  });
}

// node_modules/@wagmi/core/dist/esm/actions/watchConnectors.js
function watchConnectors(config, parameters) {
  const { onChange } = parameters;
  return config._internal.connectors.subscribe((connectors, prevConnectors) => {
    onChange(Object.values(connectors), prevConnectors);
  });
}

// node_modules/@wagmi/core/dist/esm/actions/watchContractEvent.js
function watchContractEvent2(config, parameters) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } = parameters;
  let unwatch;
  const listener = (chainId) => {
    if (unwatch)
      unwatch();
    const client = config.getClient({ chainId });
    const action = getAction2(client, watchContractEvent, "watchContractEvent");
    unwatch = action(rest);
    return unwatch;
  };
  const unlisten = listener(parameters.chainId);
  let unsubscribe;
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(({ chainId }) => chainId, async (chainId) => listener(chainId));
  return () => {
    unlisten?.();
    unsubscribe?.();
  };
}

// node_modules/@wagmi/core/dist/esm/actions/watchPendingTransactions.js
function watchPendingTransactions2(config, parameters) {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } = parameters;
  let unwatch;
  const listener = (chainId) => {
    if (unwatch)
      unwatch();
    const client = config.getClient({ chainId });
    const action = getAction2(client, watchPendingTransactions, "watchPendingTransactions");
    unwatch = action(rest);
    return unwatch;
  };
  const unlisten = listener(parameters.chainId);
  let unsubscribe;
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(({ chainId }) => chainId, async (chainId) => listener(chainId));
  return () => {
    unlisten?.();
    unsubscribe?.();
  };
}

// node_modules/@wagmi/core/dist/esm/actions/watchPublicClient.js
function watchPublicClient(config, parameters) {
  const { onChange } = parameters;
  return config.subscribe(() => getPublicClient(config), onChange, {
    equalityFn(a, b) {
      return a?.uid === b?.uid;
    }
  });
}

// node_modules/@wagmi/core/dist/esm/actions/writeContract.js
async function writeContract2(config, parameters) {
  const { account, chainId, connector, ...request } = parameters;
  let client;
  if (typeof account === "object" && account?.type === "local")
    client = config.getClient({ chainId });
  else
    client = await getConnectorClient(config, {
      account: account ?? void 0,
      chainId,
      connector
    });
  const action = getAction2(client, writeContract, "writeContract");
  const hash = await action({
    ...request,
    ...account ? { account } : {},
    chain: chainId ? { id: chainId } : null
  });
  return hash;
}

// node_modules/@wagmi/core/dist/esm/connectors/createConnector.js
function createConnector(createConnectorFn) {
  return createConnectorFn;
}

// node_modules/@wagmi/core/dist/esm/connectors/injected.js
injected.type = "injected";
function injected(parameters = {}) {
  const { shimDisconnect = true, unstable_shimAsyncInject } = parameters;
  function getTarget() {
    const target = parameters.target;
    if (typeof target === "function") {
      const result = target();
      if (result)
        return result;
    }
    if (typeof target === "object")
      return target;
    if (typeof target === "string")
      return {
        ...targetMap[target] ?? {
          id: target,
          name: `${target[0].toUpperCase()}${target.slice(1)}`,
          provider: `is${target[0].toUpperCase()}${target.slice(1)}`
        }
      };
    return {
      id: "injected",
      name: "Injected",
      provider(window2) {
        return window2?.ethereum;
      }
    };
  }
  let accountsChanged;
  let chainChanged;
  let connect2;
  let disconnect2;
  return createConnector((config) => ({
    get icon() {
      return getTarget().icon;
    },
    get id() {
      return getTarget().id;
    },
    get name() {
      return getTarget().name;
    },
    /** @deprecated */
    get supportsSimulation() {
      return true;
    },
    type: injected.type,
    async setup() {
      const provider = await this.getProvider();
      if (provider?.on && parameters.target) {
        if (!connect2) {
          connect2 = this.onConnect.bind(this);
          provider.on("connect", connect2);
        }
        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this);
          provider.on("accountsChanged", accountsChanged);
        }
      }
    },
    async connect({ chainId, isReconnecting: isReconnecting2 } = {}) {
      const provider = await this.getProvider();
      if (!provider)
        throw new ProviderNotFoundError();
      let accounts = [];
      if (isReconnecting2)
        accounts = await this.getAccounts().catch(() => []);
      else if (shimDisconnect) {
        try {
          const permissions = await provider.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }]
          });
          accounts = permissions[0]?.caveats?.[0]?.value?.map((x) => getAddress(x));
          if (accounts.length > 0) {
            const sortedAccounts = await this.getAccounts();
            accounts = sortedAccounts;
          }
        } catch (err) {
          const error = err;
          if (error.code === UserRejectedRequestError.code)
            throw new UserRejectedRequestError(error);
          if (error.code === ResourceUnavailableRpcError.code)
            throw error;
        }
      }
      try {
        if (!accounts?.length && !isReconnecting2) {
          const requestedAccounts = await provider.request({
            method: "eth_requestAccounts"
          });
          accounts = requestedAccounts.map((x) => getAddress(x));
        }
        if (connect2) {
          provider.removeListener("connect", connect2);
          connect2 = void 0;
        }
        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this);
          provider.on("accountsChanged", accountsChanged);
        }
        if (!chainChanged) {
          chainChanged = this.onChainChanged.bind(this);
          provider.on("chainChanged", chainChanged);
        }
        if (!disconnect2) {
          disconnect2 = this.onDisconnect.bind(this);
          provider.on("disconnect", disconnect2);
        }
        let currentChainId = await this.getChainId();
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code)
              throw error;
            return { id: currentChainId };
          });
          currentChainId = chain?.id ?? currentChainId;
        }
        if (shimDisconnect)
          await config.storage?.removeItem(`${this.id}.disconnected`);
        if (!parameters.target)
          await config.storage?.setItem("injected.connected", true);
        return { accounts, chainId: currentChainId };
      } catch (err) {
        const error = err;
        if (error.code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error);
        if (error.code === ResourceUnavailableRpcError.code)
          throw new ResourceUnavailableRpcError(error);
        throw error;
      }
    },
    async disconnect() {
      const provider = await this.getProvider();
      if (!provider)
        throw new ProviderNotFoundError();
      if (chainChanged) {
        provider.removeListener("chainChanged", chainChanged);
        chainChanged = void 0;
      }
      if (disconnect2) {
        provider.removeListener("disconnect", disconnect2);
        disconnect2 = void 0;
      }
      if (!connect2) {
        connect2 = this.onConnect.bind(this);
        provider.on("connect", connect2);
      }
      try {
        await withTimeout(() => (
          // TODO: Remove explicit type for viem@3
          provider.request({
            // `'wallet_revokePermissions'` added in `viem@2.10.3`
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }]
          })
        ), { timeout: 100 });
      } catch {
      }
      if (shimDisconnect) {
        await config.storage?.setItem(`${this.id}.disconnected`, true);
      }
      if (!parameters.target)
        await config.storage?.removeItem("injected.connected");
    },
    async getAccounts() {
      const provider = await this.getProvider();
      if (!provider)
        throw new ProviderNotFoundError();
      const accounts = await provider.request({ method: "eth_accounts" });
      return accounts.map((x) => getAddress(x));
    },
    async getChainId() {
      const provider = await this.getProvider();
      if (!provider)
        throw new ProviderNotFoundError();
      const hexChainId = await provider.request({ method: "eth_chainId" });
      return Number(hexChainId);
    },
    async getProvider() {
      if (typeof window === "undefined")
        return void 0;
      let provider;
      const target = getTarget();
      if (typeof target.provider === "function")
        provider = target.provider(window);
      else if (typeof target.provider === "string")
        provider = findProvider(window, target.provider);
      else
        provider = target.provider;
      if (provider && !provider.removeListener) {
        if ("off" in provider && typeof provider.off === "function")
          provider.removeListener = provider.off;
        else
          provider.removeListener = () => {
          };
      }
      return provider;
    },
    async isAuthorized() {
      try {
        const isDisconnected = shimDisconnect && // If shim exists in storage, connector is disconnected
        await config.storage?.getItem(`${this.id}.disconnected`);
        if (isDisconnected)
          return false;
        if (!parameters.target) {
          const connected = await config.storage?.getItem("injected.connected");
          if (!connected)
            return false;
        }
        const provider = await this.getProvider();
        if (!provider) {
          if (unstable_shimAsyncInject !== void 0 && unstable_shimAsyncInject !== false) {
            const handleEthereum = async () => {
              if (typeof window !== "undefined")
                window.removeEventListener("ethereum#initialized", handleEthereum);
              const provider2 = await this.getProvider();
              return !!provider2;
            };
            const timeout = typeof unstable_shimAsyncInject === "number" ? unstable_shimAsyncInject : 1e3;
            const res = await Promise.race([
              ...typeof window !== "undefined" ? [
                new Promise((resolve) => window.addEventListener("ethereum#initialized", () => resolve(handleEthereum()), { once: true }))
              ] : [],
              new Promise((resolve) => setTimeout(() => resolve(handleEthereum()), timeout))
            ]);
            if (res)
              return true;
          }
          throw new ProviderNotFoundError();
        }
        const accounts = await withRetry(() => this.getAccounts());
        return !!accounts.length;
      } catch {
        return false;
      }
    },
    async switchChain({ addEthereumChainParameter, chainId }) {
      const provider = await this.getProvider();
      if (!provider)
        throw new ProviderNotFoundError();
      const chain = config.chains.find((x) => x.id === chainId);
      if (!chain)
        throw new SwitchChainError(new ChainNotConfiguredError());
      const promise = new Promise((resolve) => {
        const listener = ((data) => {
          if ("chainId" in data && data.chainId === chainId) {
            config.emitter.off("change", listener);
            resolve();
          }
        });
        config.emitter.on("change", listener);
      });
      try {
        await Promise.all([
          provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: numberToHex(chainId) }]
          }).then(async () => {
            const currentChainId = await this.getChainId();
            if (currentChainId === chainId)
              config.emitter.emit("change", { chainId });
          }),
          promise
        ]);
        return chain;
      } catch (err) {
        const error = err;
        if (error.code === 4902 || // Unwrapping for MetaMask Mobile
        // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
        error?.data?.originalError?.code === 4902) {
          try {
            const { default: blockExplorer, ...blockExplorers } = chain.blockExplorers ?? {};
            let blockExplorerUrls;
            if (addEthereumChainParameter?.blockExplorerUrls)
              blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
            else if (blockExplorer)
              blockExplorerUrls = [
                blockExplorer.url,
                ...Object.values(blockExplorers).map((x) => x.url)
              ];
            let rpcUrls;
            if (addEthereumChainParameter?.rpcUrls?.length)
              rpcUrls = addEthereumChainParameter.rpcUrls;
            else
              rpcUrls = [chain.rpcUrls.default?.http[0] ?? ""];
            const addEthereumChain = {
              blockExplorerUrls,
              chainId: numberToHex(chainId),
              chainName: addEthereumChainParameter?.chainName ?? chain.name,
              iconUrls: addEthereumChainParameter?.iconUrls,
              nativeCurrency: addEthereumChainParameter?.nativeCurrency ?? chain.nativeCurrency,
              rpcUrls
            };
            await Promise.all([
              provider.request({
                method: "wallet_addEthereumChain",
                params: [addEthereumChain]
              }).then(async () => {
                const currentChainId = await this.getChainId();
                if (currentChainId === chainId)
                  config.emitter.emit("change", { chainId });
                else
                  throw new UserRejectedRequestError(new Error("User rejected switch after adding network."));
              }),
              promise
            ]);
            return chain;
          } catch (error2) {
            throw new UserRejectedRequestError(error2);
          }
        }
        if (error.code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error);
        throw new SwitchChainError(error);
      }
    },
    async onAccountsChanged(accounts) {
      if (accounts.length === 0)
        this.onDisconnect();
      else if (config.emitter.listenerCount("connect")) {
        const chainId = (await this.getChainId()).toString();
        this.onConnect({ chainId });
        if (shimDisconnect)
          await config.storage?.removeItem(`${this.id}.disconnected`);
      } else
        config.emitter.emit("change", {
          accounts: accounts.map((x) => getAddress(x))
        });
    },
    onChainChanged(chain) {
      const chainId = Number(chain);
      config.emitter.emit("change", { chainId });
    },
    async onConnect(connectInfo) {
      const accounts = await this.getAccounts();
      if (accounts.length === 0)
        return;
      const chainId = Number(connectInfo.chainId);
      config.emitter.emit("connect", { accounts, chainId });
      const provider = await this.getProvider();
      if (provider) {
        if (connect2) {
          provider.removeListener("connect", connect2);
          connect2 = void 0;
        }
        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this);
          provider.on("accountsChanged", accountsChanged);
        }
        if (!chainChanged) {
          chainChanged = this.onChainChanged.bind(this);
          provider.on("chainChanged", chainChanged);
        }
        if (!disconnect2) {
          disconnect2 = this.onDisconnect.bind(this);
          provider.on("disconnect", disconnect2);
        }
      }
    },
    async onDisconnect(error) {
      const provider = await this.getProvider();
      if (error && error.code === 1013) {
        if (provider && !!(await this.getAccounts()).length)
          return;
      }
      config.emitter.emit("disconnect");
      if (provider) {
        if (chainChanged) {
          provider.removeListener("chainChanged", chainChanged);
          chainChanged = void 0;
        }
        if (disconnect2) {
          provider.removeListener("disconnect", disconnect2);
          disconnect2 = void 0;
        }
        if (!connect2) {
          connect2 = this.onConnect.bind(this);
          provider.on("connect", connect2);
        }
      }
    }
  }));
}
var targetMap = {
  coinbaseWallet: {
    id: "coinbaseWallet",
    name: "Coinbase Wallet",
    provider(window2) {
      if (window2?.coinbaseWalletExtension)
        return window2.coinbaseWalletExtension;
      return findProvider(window2, "isCoinbaseWallet");
    }
  },
  metaMask: {
    id: "metaMask",
    name: "MetaMask",
    provider(window2) {
      return findProvider(window2, (provider) => {
        if (!provider.isMetaMask)
          return false;
        if (provider.isBraveWallet && !provider._events && !provider._state)
          return false;
        const flags = [
          "isApexWallet",
          "isAvalanche",
          "isBitKeep",
          "isBlockWallet",
          "isKuCoinWallet",
          "isMathWallet",
          "isOkxWallet",
          "isOKExWallet",
          "isOneInchIOSWallet",
          "isOneInchAndroidWallet",
          "isOpera",
          "isPhantom",
          "isPortal",
          "isRabby",
          "isTokenPocket",
          "isTokenary",
          "isUniswapWallet",
          "isZerion"
        ];
        for (const flag of flags)
          if (provider[flag])
            return false;
        return true;
      });
    }
  },
  phantom: {
    id: "phantom",
    name: "Phantom",
    provider(window2) {
      if (window2?.phantom?.ethereum)
        return window2.phantom?.ethereum;
      return findProvider(window2, "isPhantom");
    }
  }
};
function findProvider(window2, select) {
  function isProvider(provider) {
    if (typeof select === "function")
      return select(provider);
    if (typeof select === "string")
      return provider[select];
    return true;
  }
  const ethereum = window2.ethereum;
  if (ethereum?.providers)
    return ethereum.providers.find((provider) => isProvider(provider));
  if (ethereum && isProvider(ethereum))
    return ethereum;
  return void 0;
}

// node_modules/@wagmi/core/dist/esm/connectors/mock.js
mock.type = "mock";
function mock(parameters) {
  const transactionCache = /* @__PURE__ */ new Map();
  const features = parameters.features ?? { defaultConnected: false };
  let connected = features.defaultConnected;
  let connectedChainId;
  return createConnector((config) => ({
    id: "mock",
    name: "Mock Connector",
    type: mock.type,
    async setup() {
      connectedChainId = config.chains[0].id;
    },
    async connect({ chainId } = {}) {
      if (features.connectError) {
        if (typeof features.connectError === "boolean")
          throw new UserRejectedRequestError(new Error("Failed to connect."));
        throw features.connectError;
      }
      const provider = await this.getProvider();
      const accounts = await provider.request({
        method: "eth_requestAccounts"
      });
      let currentChainId = await this.getChainId();
      if (chainId && currentChainId !== chainId) {
        const chain = await this.switchChain({ chainId });
        currentChainId = chain.id;
      }
      connected = true;
      return {
        accounts: accounts.map((x) => getAddress(x)),
        chainId: currentChainId
      };
    },
    async disconnect() {
      connected = false;
    },
    async getAccounts() {
      if (!connected)
        throw new ConnectorNotConnectedError();
      const provider = await this.getProvider();
      const accounts = await provider.request({ method: "eth_accounts" });
      return accounts.map((x) => getAddress(x));
    },
    async getChainId() {
      const provider = await this.getProvider();
      const hexChainId = await provider.request({ method: "eth_chainId" });
      return fromHex(hexChainId, "number");
    },
    async isAuthorized() {
      if (!features.reconnect)
        return false;
      if (!connected)
        return false;
      const accounts = await this.getAccounts();
      return !!accounts.length;
    },
    async switchChain({ chainId }) {
      const provider = await this.getProvider();
      const chain = config.chains.find((x) => x.id === chainId);
      if (!chain)
        throw new SwitchChainError(new ChainNotConfiguredError());
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: numberToHex(chainId) }]
      });
      return chain;
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0)
        this.onDisconnect();
      else
        config.emitter.emit("change", {
          accounts: accounts.map((x) => getAddress(x))
        });
    },
    onChainChanged(chain) {
      const chainId = Number(chain);
      config.emitter.emit("change", { chainId });
    },
    async onDisconnect(_error) {
      config.emitter.emit("disconnect");
      connected = false;
    },
    async getProvider({ chainId } = {}) {
      const chain = config.chains.find((x) => x.id === chainId) ?? config.chains[0];
      const url = chain.rpcUrls.default.http[0];
      const request = async ({ method, params }) => {
        if (method === "eth_chainId")
          return numberToHex(connectedChainId);
        if (method === "eth_requestAccounts")
          return parameters.accounts;
        if (method === "eth_signTypedData_v4") {
          if (features.signTypedDataError) {
            if (typeof features.signTypedDataError === "boolean")
              throw new UserRejectedRequestError(new Error("Failed to sign typed data."));
            throw features.signTypedDataError;
          }
        }
        if (method === "wallet_switchEthereumChain") {
          if (features.switchChainError) {
            if (typeof features.switchChainError === "boolean")
              throw new UserRejectedRequestError(new Error("Failed to switch chain."));
            throw features.switchChainError;
          }
          connectedChainId = fromHex(params[0].chainId, "number");
          this.onChainChanged(connectedChainId.toString());
          return;
        }
        if (method === "wallet_watchAsset") {
          if (features.watchAssetError) {
            if (typeof features.watchAssetError === "boolean")
              throw new UserRejectedRequestError(new Error("Failed to switch chain."));
            throw features.watchAssetError;
          }
          return connected;
        }
        if (method === "wallet_getCapabilities")
          return {
            "0x2105": {
              paymasterService: {
                supported: params[0] === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
              },
              sessionKeys: {
                supported: true
              }
            },
            "0x14A34": {
              paymasterService: {
                supported: params[0] === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
              }
            }
          };
        if (method === "wallet_sendCalls") {
          const hashes = [];
          const calls = params[0].calls;
          const from6 = params[0].from;
          for (const call3 of calls) {
            const { result: result2, error: error2 } = await rpc.http(url, {
              body: {
                method: "eth_sendTransaction",
                params: [
                  {
                    ...call3,
                    ...typeof from6 !== "undefined" ? { from: from6 } : {}
                  }
                ]
              }
            });
            if (error2)
              throw new RpcRequestError({
                body: { method, params },
                error: error2,
                url
              });
            hashes.push(result2);
          }
          const id = keccak256(stringToHex(JSON.stringify(calls)));
          transactionCache.set(id, hashes);
          return { id };
        }
        if (method === "wallet_getCallsStatus") {
          const hashes = transactionCache.get(params[0]);
          if (!hashes)
            return {
              atomic: false,
              chainId: "0x1",
              id: params[0],
              status: 100,
              receipts: [],
              version: "2.0.0"
            };
          const receipts = await Promise.all(hashes.map(async (hash) => {
            const { result: result2, error: error2 } = await rpc.http(url, {
              body: {
                method: "eth_getTransactionReceipt",
                params: [hash],
                id: 0
              }
            });
            if (error2)
              throw new RpcRequestError({
                body: { method, params },
                error: error2,
                url
              });
            if (!result2)
              return null;
            return {
              blockHash: result2.blockHash,
              blockNumber: result2.blockNumber,
              gasUsed: result2.gasUsed,
              logs: result2.logs,
              status: result2.status,
              transactionHash: result2.transactionHash
            };
          }));
          const receipts_ = receipts.filter((x) => x !== null);
          if (receipts_.length === 0)
            return {
              atomic: false,
              chainId: "0x1",
              id: params[0],
              status: 100,
              receipts: [],
              version: "2.0.0"
            };
          return {
            atomic: false,
            chainId: "0x1",
            id: params[0],
            status: 200,
            receipts: receipts_,
            version: "2.0.0"
          };
        }
        if (method === "wallet_showCallsStatus")
          return;
        if (method === "personal_sign") {
          if (features.signMessageError) {
            if (typeof features.signMessageError === "boolean")
              throw new UserRejectedRequestError(new Error("Failed to sign message."));
            throw features.signMessageError;
          }
          method = "eth_sign";
          params = [params[1], params[0]];
        }
        const body = { method, params };
        const { error, result } = await rpc.http(url, { body });
        if (error)
          throw new RpcRequestError({ body, error, url });
        return result;
      };
      return custom({ request })({ retryCount: 0 });
    }
  }));
}

// node_modules/mipd/dist/esm/utils.js
function requestProviders(listener) {
  if (typeof window === "undefined")
    return;
  const handler = (event) => listener(event.detail);
  window.addEventListener("eip6963:announceProvider", handler);
  window.dispatchEvent(new CustomEvent("eip6963:requestProvider"));
  return () => window.removeEventListener("eip6963:announceProvider", handler);
}

// node_modules/mipd/dist/esm/store.js
function createStore() {
  const listeners = /* @__PURE__ */ new Set();
  let providerDetails = [];
  const request = () => requestProviders((providerDetail) => {
    if (providerDetails.some(({ info }) => info.uuid === providerDetail.info.uuid))
      return;
    providerDetails = [...providerDetails, providerDetail];
    listeners.forEach((listener) => listener(providerDetails, { added: [providerDetail] }));
  });
  let unwatch = request();
  return {
    _listeners() {
      return listeners;
    },
    clear() {
      listeners.forEach((listener) => listener([], { removed: [...providerDetails] }));
      providerDetails = [];
    },
    destroy() {
      this.clear();
      listeners.clear();
      unwatch?.();
    },
    findProvider({ rdns }) {
      return providerDetails.find((providerDetail) => providerDetail.info.rdns === rdns);
    },
    getProviders() {
      return providerDetails;
    },
    reset() {
      this.clear();
      unwatch?.();
      unwatch = request();
    },
    subscribe(listener, { emitImmediately } = {}) {
      listeners.add(listener);
      if (emitImmediately)
        listener(providerDetails, { added: providerDetails });
      return () => listeners.delete(listener);
    }
  };
}

// node_modules/@wagmi/core/node_modules/zustand/esm/middleware.mjs
var subscribeWithSelectorImpl = (fn) => (set, get, api) => {
  const origSubscribe = api.subscribe;
  api.subscribe = (selector, optListener, options) => {
    let listener = selector;
    if (optListener) {
      const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
      let currentSlice = selector(api.getState());
      listener = (state) => {
        const nextSlice = selector(state);
        if (!equalityFn(currentSlice, nextSlice)) {
          const previousSlice = currentSlice;
          optListener(currentSlice = nextSlice, previousSlice);
        }
      };
      if (options == null ? void 0 : options.fireImmediately) {
        optListener(currentSlice, currentSlice);
      }
    }
    return origSubscribe(listener);
  };
  const initialState = fn(set, get, api);
  return initialState;
};
var subscribeWithSelector = subscribeWithSelectorImpl;
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, options == null ? void 0 : options.reviver);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(
      name,
      JSON.stringify(newValue, options == null ? void 0 : options.replacer)
    ),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
var toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
var persistImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      void setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate2 = () => {
    var _a, _b;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            return [
              true,
              options.migrate(
                deserializedStorageValue.state,
                deserializedStorageValue.version
              )
            ];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate2(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate2();
  }
  return stateFromStorage || configResult;
};
var persist = persistImpl;

// node_modules/@wagmi/core/node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore2 = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

// node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);

// node_modules/@wagmi/core/dist/esm/createEmitter.js
var Emitter = class {
  constructor(uid3) {
    Object.defineProperty(this, "uid", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: uid3
    });
    Object.defineProperty(this, "_emitter", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new import_index.default()
    });
  }
  on(eventName, fn) {
    this._emitter.on(eventName, fn);
  }
  once(eventName, fn) {
    this._emitter.once(eventName, fn);
  }
  off(eventName, fn) {
    this._emitter.off(eventName, fn);
  }
  emit(eventName, ...params) {
    const data = params[0];
    this._emitter.emit(eventName, { uid: this.uid, ...data });
  }
  listenerCount(eventName) {
    return this._emitter.listenerCount(eventName);
  }
};
function createEmitter(uid3) {
  return new Emitter(uid3);
}

// node_modules/@wagmi/core/dist/esm/utils/deserialize.js
function deserialize(value, reviver) {
  return JSON.parse(value, (key, value_) => {
    let value2 = value_;
    if (value2?.__type === "bigint")
      value2 = BigInt(value2.value);
    if (value2?.__type === "Map")
      value2 = new Map(value2.value);
    return reviver?.(key, value2) ?? value2;
  });
}

// node_modules/@wagmi/core/dist/esm/utils/serialize.js
function getReferenceKey(keys, cutoff) {
  return keys.slice(0, cutoff).join(".") || ".";
}
function getCutoff(array, value) {
  const { length } = array;
  for (let index3 = 0; index3 < length; ++index3) {
    if (array[index3] === value) {
      return index3 + 1;
    }
  }
  return 0;
}
function createReplacer(replacer, circularReplacer) {
  const hasReplacer = typeof replacer === "function";
  const hasCircularReplacer = typeof circularReplacer === "function";
  const cache = [];
  const keys = [];
  return function replace(key, value) {
    if (typeof value === "object") {
      if (cache.length) {
        const thisCutoff = getCutoff(cache, this);
        if (thisCutoff === 0) {
          cache[cache.length] = this;
        } else {
          cache.splice(thisCutoff);
          keys.splice(thisCutoff);
        }
        keys[keys.length] = key;
        const valueCutoff = getCutoff(cache, value);
        if (valueCutoff !== 0) {
          return hasCircularReplacer ? circularReplacer.call(this, key, value, getReferenceKey(keys, valueCutoff)) : `[ref=${getReferenceKey(keys, valueCutoff)}]`;
        }
      } else {
        cache[0] = value;
        keys[0] = key;
      }
    }
    return hasReplacer ? replacer.call(this, key, value) : value;
  };
}
function serialize(value, replacer, indent, circularReplacer) {
  return JSON.stringify(value, createReplacer((key, value_) => {
    let value2 = value_;
    if (typeof value2 === "bigint")
      value2 = { __type: "bigint", value: value_.toString() };
    if (value2 instanceof Map)
      value2 = { __type: "Map", value: Array.from(value_.entries()) };
    return replacer?.(key, value2) ?? value2;
  }, circularReplacer), indent ?? void 0);
}

// node_modules/@wagmi/core/dist/esm/createStorage.js
function createStorage(parameters) {
  const { deserialize: deserialize2 = deserialize, key: prefix = "wagmi", serialize: serialize2 = serialize, storage = noopStorage } = parameters;
  function unwrap(value) {
    if (value instanceof Promise)
      return value.then((x) => x).catch(() => null);
    return value;
  }
  return {
    ...storage,
    key: prefix,
    async getItem(key, defaultValue) {
      const value = storage.getItem(`${prefix}.${key}`);
      const unwrapped = await unwrap(value);
      if (unwrapped)
        return deserialize2(unwrapped) ?? null;
      return defaultValue ?? null;
    },
    async setItem(key, value) {
      const storageKey = `${prefix}.${key}`;
      if (value === null)
        await unwrap(storage.removeItem(storageKey));
      else
        await unwrap(storage.setItem(storageKey, serialize2(value)));
    },
    async removeItem(key) {
      await unwrap(storage.removeItem(`${prefix}.${key}`));
    }
  };
}
var noopStorage = {
  getItem: () => null,
  setItem: () => {
  },
  removeItem: () => {
  }
};
function getDefaultStorage() {
  const storage = (() => {
    if (typeof window !== "undefined" && window.localStorage)
      return window.localStorage;
    return noopStorage;
  })();
  return {
    getItem(key) {
      return storage.getItem(key);
    },
    removeItem(key) {
      storage.removeItem(key);
    },
    setItem(key, value) {
      try {
        storage.setItem(key, value);
      } catch {
      }
    }
  };
}

// node_modules/@wagmi/core/dist/esm/utils/uid.js
var size5 = 256;
var index2 = size5;
var buffer2;
function uid2(length = 11) {
  if (!buffer2 || index2 + length > size5 * 2) {
    buffer2 = "";
    index2 = 0;
    for (let i = 0; i < size5; i++) {
      buffer2 += (256 + Math.random() * 256 | 0).toString(16).substring(1);
    }
  }
  return buffer2.substring(index2, index2++ + length);
}

// node_modules/@wagmi/core/dist/esm/createConfig.js
function createConfig(parameters) {
  const { multiInjectedProviderDiscovery = true, storage = createStorage({
    storage: getDefaultStorage()
  }), syncConnectedChain = true, ssr = false, ...rest } = parameters;
  const mipd = typeof window !== "undefined" && multiInjectedProviderDiscovery ? createStore() : void 0;
  const chains = createStore2(() => rest.chains);
  const connectors = createStore2(() => {
    const collection = [];
    const rdnsSet = /* @__PURE__ */ new Set();
    for (const connectorFns of rest.connectors ?? []) {
      const connector = setup(connectorFns);
      collection.push(connector);
      if (!ssr && connector.rdns) {
        const rdnsValues = typeof connector.rdns === "string" ? [connector.rdns] : connector.rdns;
        for (const rdns of rdnsValues) {
          rdnsSet.add(rdns);
        }
      }
    }
    if (!ssr && mipd) {
      const providers = mipd.getProviders();
      for (const provider of providers) {
        if (rdnsSet.has(provider.info.rdns))
          continue;
        collection.push(setup(providerDetailToConnector(provider)));
      }
    }
    return collection;
  });
  function setup(connectorFn) {
    const emitter = createEmitter(uid2());
    const connector = {
      ...connectorFn({
        emitter,
        chains: chains.getState(),
        storage,
        transports: rest.transports
      }),
      emitter,
      uid: emitter.uid
    };
    emitter.on("connect", connect2);
    connector.setup?.();
    return connector;
  }
  function providerDetailToConnector(providerDetail) {
    const { info } = providerDetail;
    const provider = providerDetail.provider;
    return injected({ target: { ...info, id: info.rdns, provider } });
  }
  const clients = /* @__PURE__ */ new Map();
  function getClient2(config = {}) {
    const chainId = config.chainId ?? store.getState().chainId;
    const chain = chains.getState().find((x) => x.id === chainId);
    if (config.chainId && !chain)
      throw new ChainNotConfiguredError();
    {
      const client2 = clients.get(store.getState().chainId);
      if (client2 && !chain)
        return client2;
      if (!chain)
        throw new ChainNotConfiguredError();
    }
    {
      const client2 = clients.get(chainId);
      if (client2)
        return client2;
    }
    let client;
    if (rest.client)
      client = rest.client({ chain });
    else {
      const chainId2 = chain.id;
      const chainIds = chains.getState().map((x) => x.id);
      const properties = {};
      const entries = Object.entries(rest);
      for (const [key, value] of entries) {
        if (key === "chains" || key === "client" || key === "connectors" || key === "transports")
          continue;
        if (typeof value === "object") {
          if (chainId2 in value)
            properties[key] = value[chainId2];
          else {
            const hasChainSpecificValue = chainIds.some((x) => x in value);
            if (hasChainSpecificValue)
              continue;
            properties[key] = value;
          }
        } else
          properties[key] = value;
      }
      client = createClient({
        ...properties,
        chain,
        batch: properties.batch ?? { multicall: true },
        transport: (parameters2) => rest.transports[chainId2]({ ...parameters2, connectors })
      });
    }
    clients.set(chainId, client);
    return client;
  }
  function getInitialState() {
    return {
      chainId: chains.getState()[0].id,
      connections: /* @__PURE__ */ new Map(),
      current: null,
      status: "disconnected"
    };
  }
  let currentVersion;
  const prefix = "0.0.0-canary-";
  if (version.startsWith(prefix))
    currentVersion = Number.parseInt(version.replace(prefix, ""));
  else
    currentVersion = Number.parseInt(version.split(".")[0] ?? "0");
  const store = createStore2(subscribeWithSelector(
    // only use persist middleware if storage exists
    storage ? persist(getInitialState, {
      migrate(persistedState, version3) {
        if (version3 === currentVersion)
          return persistedState;
        const initialState = getInitialState();
        const chainId = validatePersistedChainId(persistedState, initialState.chainId);
        return { ...initialState, chainId };
      },
      name: "store",
      partialize(state) {
        return {
          connections: {
            __type: "Map",
            value: Array.from(state.connections.entries()).map(([key, connection]) => {
              const { id, name, type, uid: uid3 } = connection.connector;
              const connector = { id, name, type, uid: uid3 };
              return [key, { ...connection, connector }];
            })
          },
          chainId: state.chainId,
          current: state.current
        };
      },
      merge(persistedState, currentState) {
        if (typeof persistedState === "object" && persistedState && "status" in persistedState)
          delete persistedState.status;
        const chainId = validatePersistedChainId(persistedState, currentState.chainId);
        return {
          ...currentState,
          ...persistedState,
          chainId
        };
      },
      skipHydration: ssr,
      storage,
      version: currentVersion
    }) : getInitialState
  ));
  store.setState(getInitialState());
  function validatePersistedChainId(persistedState, defaultChainId) {
    return persistedState && typeof persistedState === "object" && "chainId" in persistedState && typeof persistedState.chainId === "number" && chains.getState().some((x) => x.id === persistedState.chainId) ? persistedState.chainId : defaultChainId;
  }
  if (syncConnectedChain)
    store.subscribe(({ connections, current }) => current ? connections.get(current)?.chainId : void 0, (chainId) => {
      const isChainConfigured = chains.getState().some((x) => x.id === chainId);
      if (!isChainConfigured)
        return;
      return store.setState((x) => ({
        ...x,
        chainId: chainId ?? x.chainId
      }));
    });
  mipd?.subscribe((providerDetails) => {
    const connectorIdSet = /* @__PURE__ */ new Set();
    const connectorRdnsSet = /* @__PURE__ */ new Set();
    for (const connector of connectors.getState()) {
      connectorIdSet.add(connector.id);
      if (connector.rdns) {
        const rdnsValues = typeof connector.rdns === "string" ? [connector.rdns] : connector.rdns;
        for (const rdns of rdnsValues) {
          connectorRdnsSet.add(rdns);
        }
      }
    }
    const newConnectors = [];
    for (const providerDetail of providerDetails) {
      if (connectorRdnsSet.has(providerDetail.info.rdns))
        continue;
      const connector = setup(providerDetailToConnector(providerDetail));
      if (connectorIdSet.has(connector.id))
        continue;
      newConnectors.push(connector);
    }
    if (storage && !store.persist.hasHydrated())
      return;
    connectors.setState((x) => [...x, ...newConnectors], true);
  });
  function change(data) {
    store.setState((x) => {
      const connection = x.connections.get(data.uid);
      if (!connection)
        return x;
      return {
        ...x,
        connections: new Map(x.connections).set(data.uid, {
          accounts: data.accounts ?? connection.accounts,
          chainId: data.chainId ?? connection.chainId,
          connector: connection.connector
        })
      };
    });
  }
  function connect2(data) {
    if (store.getState().status === "connecting" || store.getState().status === "reconnecting")
      return;
    store.setState((x) => {
      const connector = connectors.getState().find((x2) => x2.uid === data.uid);
      if (!connector)
        return x;
      if (connector.emitter.listenerCount("connect"))
        connector.emitter.off("connect", change);
      if (!connector.emitter.listenerCount("change"))
        connector.emitter.on("change", change);
      if (!connector.emitter.listenerCount("disconnect"))
        connector.emitter.on("disconnect", disconnect2);
      return {
        ...x,
        connections: new Map(x.connections).set(data.uid, {
          accounts: data.accounts,
          chainId: data.chainId,
          connector
        }),
        current: data.uid,
        status: "connected"
      };
    });
  }
  function disconnect2(data) {
    store.setState((x) => {
      const connection = x.connections.get(data.uid);
      if (connection) {
        const connector = connection.connector;
        if (connector.emitter.listenerCount("change"))
          connection.connector.emitter.off("change", change);
        if (connector.emitter.listenerCount("disconnect"))
          connection.connector.emitter.off("disconnect", disconnect2);
        if (!connector.emitter.listenerCount("connect"))
          connection.connector.emitter.on("connect", connect2);
      }
      x.connections.delete(data.uid);
      if (x.connections.size === 0)
        return {
          ...x,
          connections: /* @__PURE__ */ new Map(),
          current: null,
          status: "disconnected"
        };
      const nextConnection = x.connections.values().next().value;
      return {
        ...x,
        connections: new Map(x.connections),
        current: nextConnection.connector.uid
      };
    });
  }
  return {
    get chains() {
      return chains.getState();
    },
    get connectors() {
      return connectors.getState();
    },
    storage,
    getClient: getClient2,
    get state() {
      return store.getState();
    },
    setState(value) {
      let newState;
      if (typeof value === "function")
        newState = value(store.getState());
      else
        newState = value;
      const initialState = getInitialState();
      if (typeof newState !== "object")
        newState = initialState;
      const isCorrupt = Object.keys(initialState).some((x) => !(x in newState));
      if (isCorrupt)
        newState = initialState;
      store.setState(newState, true);
    },
    subscribe(selector, listener, options) {
      return store.subscribe(selector, listener, options ? {
        ...options,
        fireImmediately: options.emitImmediately
        // Workaround cast since Zustand does not support `'exactOptionalPropertyTypes'`
      } : void 0);
    },
    _internal: {
      mipd,
      store,
      ssr: Boolean(ssr),
      syncConnectedChain,
      transports: rest.transports,
      chains: {
        setState(value) {
          const nextChains = typeof value === "function" ? value(chains.getState()) : value;
          if (nextChains.length === 0)
            return;
          return chains.setState(nextChains, true);
        },
        subscribe(listener) {
          return chains.subscribe(listener);
        }
      },
      connectors: {
        providerDetailToConnector,
        setup,
        setState(value) {
          return connectors.setState(typeof value === "function" ? value(connectors.getState()) : value, true);
        },
        subscribe(listener) {
          return connectors.subscribe(listener);
        }
      },
      events: { change, connect: connect2, disconnect: disconnect2 }
    }
  };
}

// node_modules/@wagmi/core/dist/esm/hydrate.js
function hydrate(config, parameters) {
  const { initialState, reconnectOnMount } = parameters;
  if (initialState && !config._internal.store.persist.hasHydrated())
    config.setState({
      ...initialState,
      chainId: config.chains.some((x) => x.id === initialState.chainId) ? initialState.chainId : config.chains[0].id,
      connections: reconnectOnMount ? initialState.connections : /* @__PURE__ */ new Map(),
      status: reconnectOnMount ? "reconnecting" : "disconnected"
    });
  return {
    async onMount() {
      if (config._internal.ssr) {
        await config._internal.store.persist.rehydrate();
        if (config._internal.mipd) {
          config._internal.connectors.setState((connectors) => {
            const rdnsSet = /* @__PURE__ */ new Set();
            for (const connector of connectors ?? []) {
              if (connector.rdns) {
                const rdnsValues = Array.isArray(connector.rdns) ? connector.rdns : [connector.rdns];
                for (const rdns of rdnsValues) {
                  rdnsSet.add(rdns);
                }
              }
            }
            const mipdConnectors = [];
            const providers = config._internal.mipd?.getProviders() ?? [];
            for (const provider of providers) {
              if (rdnsSet.has(provider.info.rdns))
                continue;
              const connectorFn = config._internal.connectors.providerDetailToConnector(provider);
              const connector = config._internal.connectors.setup(connectorFn);
              mipdConnectors.push(connector);
            }
            return [...connectors, ...mipdConnectors];
          });
        }
      }
      if (reconnectOnMount)
        reconnect(config);
      else if (config.storage)
        config.setState((x) => ({
          ...x,
          connections: /* @__PURE__ */ new Map()
        }));
    }
  };
}

// node_modules/@wagmi/core/dist/esm/transports/connector.js
function unstable_connector(connector, config = {}) {
  const { type } = connector;
  const { key = "connector", name = "Connector", retryDelay } = config;
  return (parameters) => {
    const { chain, connectors } = parameters;
    const retryCount = config.retryCount ?? parameters.retryCount;
    const request = async ({ method, params }) => {
      const connector2 = connectors?.getState().find((c) => c.type === type);
      if (!connector2)
        throw new ProviderDisconnectedError(new Error(`Could not find connector of type "${type}" in \`connectors\` passed to \`createConfig\`.`));
      const provider = await connector2.getProvider({
        chainId: chain?.id
      });
      if (!provider)
        throw new ProviderDisconnectedError(new Error("Provider is disconnected."));
      const chainId = hexToNumber(await withRetry(() => withTimeout(() => provider.request({ method: "eth_chainId" }), {
        timeout: 100
      })));
      if (chain && chainId !== chain.id)
        throw new ChainDisconnectedError(new Error(`The current chain of the connector (id: ${chainId}) does not match the target chain for the request (id: ${chain.id} – ${chain.name}).`));
      const body = { method, params };
      return provider.request(body);
    };
    return createTransport({
      key,
      name,
      request,
      retryCount,
      retryDelay,
      type: "connector"
    });
  };
}

// node_modules/@wagmi/core/dist/esm/transports/fallback.js
function fallback2(transports, config) {
  return fallback(transports, config);
}

// node_modules/@wagmi/core/dist/esm/utils/cookie.js
var cookieStorage = {
  getItem(key) {
    if (typeof window === "undefined")
      return null;
    const value = parseCookie(document.cookie, key);
    return value ?? null;
  },
  setItem(key, value) {
    if (typeof window === "undefined")
      return;
    document.cookie = `${key}=${value};path=/;samesite=Lax`;
  },
  removeItem(key) {
    if (typeof window === "undefined")
      return;
    document.cookie = `${key}=;max-age=-1;path=/`;
  }
};
function cookieToInitialState(config, cookie) {
  if (!cookie)
    return void 0;
  const key = `${config.storage?.key}.store`;
  const parsed = parseCookie(cookie, key);
  if (!parsed)
    return void 0;
  return deserialize(parsed).state;
}
function parseCookie(cookie, key) {
  const keyValue = cookie.split("; ").find((x) => x.startsWith(`${key}=`));
  if (!keyValue)
    return void 0;
  return keyValue.substring(key.length + 1);
}

// node_modules/@wagmi/core/dist/esm/utils/normalizeChainId.js
function normalizeChainId(chainId) {
  if (typeof chainId === "string")
    return Number.parseInt(chainId, chainId.trim().substring(0, 2) === "0x" ? 16 : 10);
  if (typeof chainId === "bigint")
    return Number(chainId);
  if (typeof chainId === "number")
    return chainId;
  throw new Error(`Cannot normalize chainId "${chainId}" of type "${typeof chainId}"`);
}

// node_modules/wagmi/dist/esm/hydrate.js
var import_react = __toESM(require_react(), 1);
function Hydrate(parameters) {
  const { children, config, initialState, reconnectOnMount = true } = parameters;
  const { onMount } = hydrate(config, {
    initialState,
    reconnectOnMount
  });
  if (!config._internal.ssr)
    onMount();
  const active = (0, import_react.useRef)(true);
  (0, import_react.useEffect)(() => {
    if (!active.current)
      return;
    if (!config._internal.ssr)
      return;
    onMount();
    return () => {
      active.current = false;
    };
  }, []);
  return children;
}

// node_modules/wagmi/dist/esm/context.js
var WagmiContext = (0, import_react2.createContext)(void 0);
function WagmiProvider(parameters) {
  const { children, config } = parameters;
  const props = { value: config };
  return (0, import_react2.createElement)(Hydrate, parameters, (0, import_react2.createElement)(WagmiContext.Provider, props, children));
}

// node_modules/wagmi/dist/esm/version.js
var version2 = "2.16.3";

// node_modules/wagmi/dist/esm/utils/getVersion.js
var getVersion2 = () => `wagmi@${version2}`;

// node_modules/wagmi/dist/esm/errors/base.js
var BaseError4 = class extends BaseError3 {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WagmiError"
    });
  }
  get docsBaseUrl() {
    return "https://wagmi.sh/react";
  }
  get version() {
    return getVersion2();
  }
};

// node_modules/wagmi/dist/esm/errors/context.js
var WagmiProviderNotFoundError = class extends BaseError4 {
  constructor() {
    super("`useConfig` must be used within `WagmiProvider`.", {
      docsPath: "/api/WagmiProvider"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WagmiProviderNotFoundError"
    });
  }
};

// node_modules/wagmi/dist/esm/hooks/useConfig.js
var import_react3 = __toESM(require_react(), 1);
function useConfig(parameters = {}) {
  const config = parameters.config ?? (0, import_react3.useContext)(WagmiContext);
  if (!config)
    throw new WagmiProviderNotFoundError();
  return config;
}

// node_modules/@wagmi/core/dist/esm/actions/watchChains.js
function watchChains(config, parameters) {
  const { onChange } = parameters;
  return config._internal.chains.subscribe((chains, prevChains) => {
    onChange(chains, prevChains);
  });
}

// node_modules/wagmi/dist/esm/hooks/useSyncExternalStoreWithTracked.js
var import_react4 = __toESM(require_react(), 1);
var import_with_selector = __toESM(require_with_selector(), 1);
var isPlainObject = (obj) => typeof obj === "object" && !Array.isArray(obj);
function useSyncExternalStoreWithTracked(subscribe, getSnapshot, getServerSnapshot = getSnapshot, isEqual = deepEqual) {
  const trackedKeys = (0, import_react4.useRef)([]);
  const result = (0, import_with_selector.useSyncExternalStoreWithSelector)(subscribe, getSnapshot, getServerSnapshot, (x) => x, (a, b) => {
    if (isPlainObject(a) && isPlainObject(b) && trackedKeys.current.length) {
      for (const key of trackedKeys.current) {
        const equal = isEqual(a[key], b[key]);
        if (!equal)
          return false;
      }
      return true;
    }
    return isEqual(a, b);
  });
  return (0, import_react4.useMemo)(() => {
    if (isPlainObject(result)) {
      const trackedResult = { ...result };
      let properties = {};
      for (const [key, value] of Object.entries(trackedResult)) {
        properties = {
          ...properties,
          [key]: {
            configurable: false,
            enumerable: true,
            get: () => {
              if (!trackedKeys.current.includes(key)) {
                trackedKeys.current.push(key);
              }
              return value;
            }
          }
        };
      }
      Object.defineProperties(trackedResult, properties);
      return trackedResult;
    }
    return result;
  }, [result]);
}

// node_modules/wagmi/dist/esm/hooks/useAccount.js
function useAccount(parameters = {}) {
  const config = useConfig(parameters);
  return useSyncExternalStoreWithTracked((onChange) => watchAccount(config, { onChange }), () => getAccount(config));
}

// node_modules/wagmi/dist/esm/hooks/useAccountEffect.js
var import_react5 = __toESM(require_react(), 1);
function useAccountEffect(parameters = {}) {
  const { onConnect, onDisconnect } = parameters;
  const config = useConfig(parameters);
  (0, import_react5.useEffect)(() => {
    return watchAccount(config, {
      onChange(data, prevData) {
        if ((prevData.status === "reconnecting" || prevData.status === "connecting" && prevData.address === void 0) && data.status === "connected") {
          const { address, addresses, chain, chainId, connector } = data;
          const isReconnected = prevData.status === "reconnecting" || // if `previousAccount.status` is `undefined`, the connector connected immediately.
          prevData.status === void 0;
          onConnect?.({
            address,
            addresses,
            chain,
            chainId,
            connector,
            isReconnected
          });
        } else if (prevData.status === "connected" && data.status === "disconnected")
          onDisconnect?.();
      }
    });
  }, [config, onConnect, onDisconnect]);
}

// node_modules/@wagmi/core/dist/esm/query/utils.js
function structuralSharing(oldData, newData) {
  return replaceEqualDeep(oldData, newData);
}
function hashFn(queryKey) {
  return JSON.stringify(queryKey, (_, value) => {
    if (isPlainObject2(value))
      return Object.keys(value).sort().reduce((result, key) => {
        result[key] = value[key];
        return result;
      }, {});
    if (typeof value === "bigint")
      return value.toString();
    return value;
  });
}
function isPlainObject2(value) {
  if (!hasObjectPrototype(value)) {
    return false;
  }
  const ctor = value.constructor;
  if (typeof ctor === "undefined")
    return true;
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot))
    return false;
  if (!prot.hasOwnProperty("isPrototypeOf"))
    return false;
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function filterQueryOptions(options) {
  const {
    // import('@tanstack/query-core').QueryOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    _defaulted,
    behavior,
    gcTime,
    initialData,
    initialDataUpdatedAt,
    maxPages,
    meta,
    networkMode,
    queryFn,
    queryHash,
    queryKey,
    queryKeyHashFn,
    retry,
    retryDelay,
    structuralSharing: structuralSharing2,
    // import('@tanstack/query-core').InfiniteQueryObserverOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    getPreviousPageParam,
    getNextPageParam,
    initialPageParam,
    // import('@tanstack/react-query').UseQueryOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    _optimisticResults,
    enabled,
    notifyOnChangeProps,
    placeholderData,
    refetchInterval,
    refetchIntervalInBackground,
    refetchOnMount,
    refetchOnReconnect,
    refetchOnWindowFocus,
    retryOnMount,
    select,
    staleTime,
    suspense,
    throwOnError,
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // wagmi
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    config,
    connector,
    query,
    ...rest
  } = options;
  return rest;
}

// node_modules/@wagmi/core/dist/esm/query/call.js
function callQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const data = await call2(config, {
        ...parameters
      });
      return data ?? null;
    },
    queryKey: callQueryKey(options)
  };
}
function callQueryKey(options) {
  return ["call", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/connect.js
function connectMutationOptions(config) {
  return {
    mutationFn(variables) {
      return connect(config, variables);
    },
    mutationKey: ["connect"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/deployContract.js
function deployContractMutationOptions(config) {
  return {
    mutationFn(variables) {
      return deployContract2(config, variables);
    },
    mutationKey: ["deployContract"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/disconnect.js
function disconnectMutationOptions(config) {
  return {
    mutationFn(variables) {
      return disconnect(config, variables);
    },
    mutationKey: ["disconnect"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/estimateFeesPerGas.js
function estimateFeesPerGasQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      return estimateFeesPerGas2(config, parameters);
    },
    queryKey: estimateFeesPerGasQueryKey(options)
  };
}
function estimateFeesPerGasQueryKey(options = {}) {
  return ["estimateFeesPerGas", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/estimateGas.js
function estimateGasQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { connector } = options;
      const { account, scopeKey: _, ...parameters } = queryKey[1];
      if (!account && !connector)
        throw new Error("account or connector is required");
      return estimateGas2(config, { account, connector, ...parameters });
    },
    queryKey: estimateGasQueryKey(options)
  };
}
function estimateGasQueryKey(options = {}) {
  const { connector: _, ...rest } = options;
  return ["estimateGas", filterQueryOptions(rest)];
}

// node_modules/@wagmi/core/dist/esm/query/estimateMaxPriorityFeePerGas.js
function estimateMaxPriorityFeePerGasQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      return estimateMaxPriorityFeePerGas2(config, parameters);
    },
    queryKey: estimateMaxPriorityFeePerGasQueryKey(options)
  };
}
function estimateMaxPriorityFeePerGasQueryKey(options = {}) {
  return ["estimateMaxPriorityFeePerGas", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getBalance.js
function getBalanceQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      const balance = await getBalance2(config, {
        ...parameters,
        address
      });
      return balance ?? null;
    },
    queryKey: getBalanceQueryKey(options)
  };
}
function getBalanceQueryKey(options = {}) {
  return ["balance", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getBlock.js
function getBlockQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const block = await getBlock2(config, parameters);
      return block ?? null;
    },
    queryKey: getBlockQueryKey(options)
  };
}
function getBlockQueryKey(options = {}) {
  return ["block", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getBlockNumber.js
function getBlockNumberQueryOptions(config, options = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const blockNumber = await getBlockNumber2(config, parameters);
      return blockNumber ?? null;
    },
    queryKey: getBlockNumberQueryKey(options)
  };
}
function getBlockNumberQueryKey(options = {}) {
  return ["blockNumber", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getBlockTransactionCount.js
function getBlockTransactionCountQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const blockTransactionCount = await getBlockTransactionCount2(config, parameters);
      return blockTransactionCount ?? null;
    },
    queryKey: getBlockTransactionCountQueryKey(options)
  };
}
function getBlockTransactionCountQueryKey(options = {}) {
  return ["blockTransactionCount", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getBytecode.js
function getBytecodeQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      const bytecode = await getBytecode(config, { ...parameters, address });
      return bytecode ?? null;
    },
    queryKey: getBytecodeQueryKey(options)
  };
}
function getBytecodeQueryKey(options) {
  return ["getBytecode", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getCallsStatus.js
function getCallsStatusQueryOptions(config, options) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const status = await getCallsStatus2(config, parameters);
      return status;
    },
    queryKey: getCallsStatusQueryKey(options),
    retry(failureCount, error) {
      if (error instanceof ConnectorNotConnectedError)
        return false;
      return failureCount < 3;
    }
  };
}
function getCallsStatusQueryKey(options) {
  return ["callsStatus", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getCapabilities.js
function getCapabilitiesQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const capabilities = await getCapabilities2(config, parameters);
      return capabilities;
    },
    queryKey: getCapabilitiesQueryKey(options),
    retry(failureCount, error) {
      if (error instanceof ConnectorNotConnectedError)
        return false;
      return failureCount < 3;
    }
  };
}
function getCapabilitiesQueryKey(options = {}) {
  return ["capabilities", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getConnectorClient.js
function getConnectorClientQueryOptions(config, options = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { connector } = options;
      const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1];
      return getConnectorClient(config, {
        ...parameters,
        connector
      });
    },
    queryKey: getConnectorClientQueryKey(options)
  };
}
function getConnectorClientQueryKey(options = {}) {
  const { connector, ...parameters } = options;
  return [
    "connectorClient",
    { ...filterQueryOptions(parameters), connectorUid: connector?.uid }
  ];
}

// node_modules/@wagmi/core/dist/esm/query/getEnsAddress.js
function getEnsAddressQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { name, scopeKey: _, ...parameters } = queryKey[1];
      if (!name)
        throw new Error("name is required");
      return getEnsAddress2(config, { ...parameters, name });
    },
    queryKey: getEnsAddressQueryKey(options)
  };
}
function getEnsAddressQueryKey(options = {}) {
  return ["ensAddress", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getEnsAvatar.js
function getEnsAvatarQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { name, scopeKey: _, ...parameters } = queryKey[1];
      if (!name)
        throw new Error("name is required");
      return getEnsAvatar2(config, { ...parameters, name });
    },
    queryKey: getEnsAvatarQueryKey(options)
  };
}
function getEnsAvatarQueryKey(options = {}) {
  return ["ensAvatar", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getEnsName.js
function getEnsNameQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      return getEnsName2(config, { ...parameters, address });
    },
    queryKey: getEnsNameQueryKey(options)
  };
}
function getEnsNameQueryKey(options = {}) {
  return ["ensName", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getEnsResolver.js
function getEnsResolverQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { name, scopeKey: _, ...parameters } = queryKey[1];
      if (!name)
        throw new Error("name is required");
      return getEnsResolver2(config, { ...parameters, name });
    },
    queryKey: getEnsResolverQueryKey(options)
  };
}
function getEnsResolverQueryKey(options = {}) {
  return ["ensResolver", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getEnsText.js
function getEnsTextQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { key, name, scopeKey: _, ...parameters } = queryKey[1];
      if (!key || !name)
        throw new Error("key and name are required");
      return getEnsText2(config, { ...parameters, key, name });
    },
    queryKey: getEnsTextQueryKey(options)
  };
}
function getEnsTextQueryKey(options = {}) {
  return ["ensText", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getFeeHistory.js
function getFeeHistoryQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { blockCount, rewardPercentiles, scopeKey: _, ...parameters } = queryKey[1];
      if (!blockCount)
        throw new Error("blockCount is required");
      if (!rewardPercentiles)
        throw new Error("rewardPercentiles is required");
      const feeHistory = await getFeeHistory2(config, {
        ...parameters,
        blockCount,
        rewardPercentiles
      });
      return feeHistory ?? null;
    },
    queryKey: getFeeHistoryQueryKey(options)
  };
}
function getFeeHistoryQueryKey(options = {}) {
  return ["feeHistory", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getGasPrice.js
function getGasPriceQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      const gasPrice = await getGasPrice2(config, parameters);
      return gasPrice ?? null;
    },
    queryKey: getGasPriceQueryKey(options)
  };
}
function getGasPriceQueryKey(options = {}) {
  return ["gasPrice", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getProof.js
function getProofQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, storageKeys, ...parameters } = queryKey[1];
      if (!address || !storageKeys)
        throw new Error("address and storageKeys are required");
      return getProof2(config, { ...parameters, address, storageKeys });
    },
    queryKey: getProofQueryKey(options)
  };
}
function getProofQueryKey(options) {
  return ["getProof", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getStorageAt.js
function getStorageAtQueryOptions(config, options = {}) {
  return {
    queryFn({ queryKey }) {
      const { address, slot, scopeKey: _, ...parameters } = queryKey[1];
      if (!address || !slot)
        throw new Error("address and slot are required");
      return getStorageAt2(config, { ...parameters, address, slot });
    },
    queryKey: getStorageAtQueryKey(options)
  };
}
function getStorageAtQueryKey(options) {
  return ["getStorageAt", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getToken.js
function getTokenQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      return getToken(config, { ...parameters, address });
    },
    queryKey: getTokenQueryKey(options)
  };
}
function getTokenQueryKey(options = {}) {
  return ["token", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getTransaction.js
function getTransactionQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { blockHash, blockNumber, blockTag, hash, index: index3 } = queryKey[1];
      if (!blockHash && !blockNumber && !blockTag && !hash)
        throw new Error("blockHash, blockNumber, blockTag, or hash is required");
      if (!hash && !index3)
        throw new Error("index is required for blockHash, blockNumber, or blockTag");
      const { scopeKey: _, ...rest } = queryKey[1];
      return getTransaction2(config, rest);
    },
    queryKey: getTransactionQueryKey(options)
  };
}
function getTransactionQueryKey(options = {}) {
  return ["transaction", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getTransactionConfirmations.js
function getTransactionConfirmationsQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { hash, transactionReceipt, scopeKey: _, ...parameters } = queryKey[1];
      if (!hash && !transactionReceipt)
        throw new Error("hash or transactionReceipt is required");
      const confirmations = await getTransactionConfirmations2(config, {
        hash,
        transactionReceipt,
        ...parameters
      });
      return confirmations ?? null;
    },
    queryKey: getTransactionConfirmationsQueryKey(options)
  };
}
function getTransactionConfirmationsQueryKey(options = {}) {
  return ["transactionConfirmations", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getTransactionCount.js
function getTransactionCountQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      const transactionCount = await getTransactionCount2(config, {
        ...parameters,
        address
      });
      return transactionCount ?? null;
    },
    queryKey: getTransactionCountQueryKey(options)
  };
}
function getTransactionCountQueryKey(options = {}) {
  return ["transactionCount", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getTransactionReceipt.js
function getTransactionReceiptQueryOptions(config, options = {}) {
  return {
    queryFn({ queryKey }) {
      const { hash, scopeKey: _, ...parameters } = queryKey[1];
      if (!hash)
        throw new Error("hash is required");
      return getTransactionReceipt2(config, { ...parameters, hash });
    },
    queryKey: getTransactionReceiptQueryKey(options)
  };
}
function getTransactionReceiptQueryKey(options) {
  return ["getTransactionReceipt", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/getWalletClient.js
function getWalletClientQueryOptions(config, options = {}) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { connector } = options;
      const { connectorUid: _, scopeKey: _s, ...parameters } = queryKey[1];
      return getWalletClient(config, { ...parameters, connector });
    },
    queryKey: getWalletClientQueryKey(options)
  };
}
function getWalletClientQueryKey(options = {}) {
  const { connector, ...parameters } = options;
  return [
    "walletClient",
    { ...filterQueryOptions(parameters), connectorUid: connector?.uid }
  ];
}

// node_modules/@wagmi/core/dist/esm/query/infiniteReadContracts.js
function infiniteReadContractsQueryOptions(config, options) {
  return {
    ...options.query,
    async queryFn({ pageParam, queryKey }) {
      const { contracts } = options;
      const { cacheKey: _, scopeKey: _s, ...parameters } = queryKey[1];
      return await readContracts(config, {
        ...parameters,
        contracts: contracts(pageParam)
      });
    },
    queryKey: infiniteReadContractsQueryKey(options)
  };
}
function infiniteReadContractsQueryKey(options) {
  const { contracts: _, query: _q, ...parameters } = options;
  return ["infiniteReadContracts", filterQueryOptions(parameters)];
}

// node_modules/@wagmi/core/dist/esm/query/prepareTransactionRequest.js
function prepareTransactionRequestQueryOptions(config, options = {}) {
  return {
    queryFn({ queryKey }) {
      const { scopeKey: _, to, ...parameters } = queryKey[1];
      if (!to)
        throw new Error("to is required");
      return prepareTransactionRequest2(config, {
        to,
        ...parameters
      });
    },
    queryKey: prepareTransactionRequestQueryKey(options)
  };
}
function prepareTransactionRequestQueryKey(options) {
  return ["prepareTransactionRequest", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/readContract.js
function readContractQueryOptions(config, options = {}) {
  return {
    // TODO: Support `signal` once Viem actions allow passthrough
    // https://tkdodo.eu/blog/why-you-want-react-query#bonus-cancellation
    async queryFn({ queryKey }) {
      const abi2 = options.abi;
      if (!abi2)
        throw new Error("abi is required");
      const { functionName, scopeKey: _, ...parameters } = queryKey[1];
      const addressOrCodeParams = (() => {
        const params = queryKey[1];
        if (params.address)
          return { address: params.address };
        if (params.code)
          return { code: params.code };
        throw new Error("address or code is required");
      })();
      if (!functionName)
        throw new Error("functionName is required");
      return readContract2(config, {
        abi: abi2,
        functionName,
        args: parameters.args,
        ...addressOrCodeParams,
        ...parameters
      });
    },
    queryKey: readContractQueryKey(options)
  };
}
function readContractQueryKey(options = {}) {
  const { abi: _, ...rest } = options;
  return ["readContract", filterQueryOptions(rest)];
}

// node_modules/@wagmi/core/dist/esm/query/readContracts.js
function readContractsQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const contracts = [];
      const length = queryKey[1].contracts.length;
      for (let i = 0; i < length; i++) {
        const contract = queryKey[1].contracts[i];
        const abi2 = (options.contracts?.[i]).abi;
        contracts.push({ ...contract, abi: abi2 });
      }
      const { scopeKey: _, ...parameters } = queryKey[1];
      return readContracts(config, {
        ...parameters,
        contracts
      });
    },
    queryKey: readContractsQueryKey(options)
  };
}
function readContractsQueryKey(options = {}) {
  const contracts = [];
  for (const contract of options.contracts ?? []) {
    const { abi: _, ...rest } = contract;
    contracts.push({ ...rest, chainId: rest.chainId ?? options.chainId });
  }
  return [
    "readContracts",
    filterQueryOptions({ ...options, contracts })
  ];
}

// node_modules/@wagmi/core/dist/esm/query/reconnect.js
function reconnectMutationOptions(config) {
  return {
    mutationFn(variables) {
      return reconnect(config, variables);
    },
    mutationKey: ["reconnect"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/sendCalls.js
function sendCallsMutationOptions(config) {
  return {
    mutationFn(variables) {
      return sendCalls2(config, variables);
    },
    mutationKey: ["sendCalls"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/sendTransaction.js
function sendTransactionMutationOptions(config) {
  return {
    mutationFn(variables) {
      return sendTransaction2(config, variables);
    },
    mutationKey: ["sendTransaction"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/showCallsStatus.js
function showCallsStatusMutationOptions(config) {
  return {
    mutationFn(variables) {
      return showCallsStatus2(config, variables);
    },
    mutationKey: ["showCallsStatus"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/signMessage.js
function signMessageMutationOptions(config) {
  return {
    mutationFn(variables) {
      return signMessage2(config, variables);
    },
    mutationKey: ["signMessage"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/signTypedData.js
function signTypedDataMutationOptions(config) {
  return {
    mutationFn(variables) {
      return signTypedData2(config, variables);
    },
    mutationKey: ["signTypedData"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/simulateContract.js
function simulateContractQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { abi: abi2, connector } = options;
      if (!abi2)
        throw new Error("abi is required");
      const { scopeKey: _, ...parameters } = queryKey[1];
      const { address, functionName } = parameters;
      if (!address)
        throw new Error("address is required");
      if (!functionName)
        throw new Error("functionName is required");
      return simulateContract2(config, {
        abi: abi2,
        connector,
        ...parameters
      });
    },
    queryKey: simulateContractQueryKey(options)
  };
}
function simulateContractQueryKey(options = {}) {
  const { abi: _, connector: _c, ...rest } = options;
  return ["simulateContract", filterQueryOptions(rest)];
}

// node_modules/@wagmi/core/dist/esm/query/switchAccount.js
function switchAccountMutationOptions(config) {
  return {
    mutationFn(variables) {
      return switchAccount(config, variables);
    },
    mutationKey: ["switchAccount"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/switchChain.js
function switchChainMutationOptions(config) {
  return {
    mutationFn(variables) {
      return switchChain2(config, variables);
    },
    mutationKey: ["switchChain"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/verifyMessage.js
function verifyMessageQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, message, signature } = queryKey[1];
      if (!address || !message || !signature)
        throw new Error("address, message, and signature are required");
      const { scopeKey: _, ...parameters } = queryKey[1];
      const verified = await verifyMessage3(config, parameters);
      return verified ?? null;
    },
    queryKey: verifyMessageQueryKey(options)
  };
}
function verifyMessageQueryKey(options) {
  return ["verifyMessage", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/verifyTypedData.js
function verifyTypedDataQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { address, message, primaryType, signature, types, scopeKey: _, ...parameters } = queryKey[1];
      if (!address)
        throw new Error("address is required");
      if (!message)
        throw new Error("message is required");
      if (!primaryType)
        throw new Error("primaryType is required");
      if (!signature)
        throw new Error("signature is required");
      if (!types)
        throw new Error("types is required");
      const verified = await verifyTypedData3(config, {
        ...parameters,
        address,
        message,
        primaryType,
        signature,
        types
      });
      return verified ?? null;
    },
    queryKey: verifyTypedDataQueryKey(options)
  };
}
function verifyTypedDataQueryKey(options) {
  return ["verifyTypedData", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/waitForCallsStatus.js
function waitForCallsStatusQueryOptions(config, options) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, id, ...parameters } = queryKey[1];
      if (!id)
        throw new Error("id is required");
      const status = await waitForCallsStatus2(config, { ...parameters, id });
      return status;
    },
    queryKey: waitForCallsStatusQueryKey(options),
    retry(failureCount, error) {
      if (error instanceof ConnectorNotConnectedError)
        return false;
      return failureCount < 3;
    }
  };
}
function waitForCallsStatusQueryKey(options) {
  return ["callsStatus", filterQueryOptions(options)];
}

// node_modules/@wagmi/core/dist/esm/query/waitForTransactionReceipt.js
function waitForTransactionReceiptQueryOptions(config, options = {}) {
  return {
    async queryFn({ queryKey }) {
      const { hash, ...parameters } = queryKey[1];
      if (!hash)
        throw new Error("hash is required");
      return waitForTransactionReceipt2(config, {
        ...parameters,
        onReplaced: options.onReplaced,
        hash
      });
    },
    queryKey: waitForTransactionReceiptQueryKey(options)
  };
}
function waitForTransactionReceiptQueryKey(options = {}) {
  const { onReplaced: _, ...rest } = options;
  return ["waitForTransactionReceipt", filterQueryOptions(rest)];
}

// node_modules/@wagmi/core/dist/esm/query/watchAsset.js
function watchAssetMutationOptions(config) {
  return {
    mutationFn(variables) {
      return watchAsset2(config, variables);
    },
    mutationKey: ["watchAsset"]
  };
}

// node_modules/@wagmi/core/dist/esm/query/writeContract.js
function writeContractMutationOptions(config) {
  return {
    mutationFn(variables) {
      return writeContract2(config, variables);
    },
    mutationKey: ["writeContract"]
  };
}

// node_modules/wagmi/dist/esm/utils/query.js
function useQuery2(parameters) {
  const result = useQuery({
    ...parameters,
    queryKeyHashFn: hashFn
    // for bigint support
  });
  result.queryKey = parameters.queryKey;
  return result;
}
function useInfiniteQuery2(parameters) {
  const result = useInfiniteQuery({
    ...parameters,
    queryKeyHashFn: hashFn
    // for bigint support
  });
  result.queryKey = parameters.queryKey;
  return result;
}

// node_modules/wagmi/dist/esm/hooks/useChainId.js
var import_react6 = __toESM(require_react(), 1);
function useChainId(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_react6.useSyncExternalStore)((onChange) => watchChainId(config, { onChange }), () => getChainId2(config), () => getChainId2(config));
}

// node_modules/wagmi/dist/esm/hooks/useBalance.js
function useBalance(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getBalanceQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useWatchBlocks.js
var import_react7 = __toESM(require_react(), 1);
function useWatchBlocks(parameters = {}) {
  const { enabled = true, onBlock, config: _, ...rest } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  (0, import_react7.useEffect)(() => {
    if (!enabled)
      return;
    if (!onBlock)
      return;
    return watchBlocks2(config, {
      ...rest,
      chainId,
      onBlock
    });
  }, [
    chainId,
    config,
    enabled,
    onBlock,
    ///
    rest.blockTag,
    rest.emitMissed,
    rest.emitOnBegin,
    rest.includeTransactions,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.syncConnectedChain
  ]);
}

// node_modules/wagmi/dist/esm/hooks/useBlock.js
function useBlock(parameters = {}) {
  const { query = {}, watch } = parameters;
  const config = useConfig(parameters);
  const queryClient = useQueryClient();
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  const options = getBlockQueryOptions(config, {
    ...parameters,
    chainId
  });
  const enabled = Boolean(query.enabled ?? true);
  useWatchBlocks({
    ...{
      config: parameters.config,
      chainId: parameters.chainId,
      ...typeof watch === "object" ? watch : {}
    },
    enabled: Boolean(enabled && (typeof watch === "object" ? watch.enabled : watch)),
    onBlock(block) {
      queryClient.setQueryData(options.queryKey, block);
    }
  });
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/wagmi/dist/esm/hooks/useWatchBlockNumber.js
var import_react8 = __toESM(require_react(), 1);
function useWatchBlockNumber(parameters = {}) {
  const { enabled = true, onBlockNumber, config: _, ...rest } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  (0, import_react8.useEffect)(() => {
    if (!enabled)
      return;
    if (!onBlockNumber)
      return;
    return watchBlockNumber2(config, {
      ...rest,
      chainId,
      onBlockNumber
    });
  }, [
    chainId,
    config,
    enabled,
    onBlockNumber,
    ///
    rest.onError,
    rest.emitMissed,
    rest.emitOnBegin,
    rest.poll,
    rest.pollingInterval,
    rest.syncConnectedChain
  ]);
}

// node_modules/wagmi/dist/esm/hooks/useBlockNumber.js
function useBlockNumber(parameters = {}) {
  const { query = {}, watch } = parameters;
  const config = useConfig(parameters);
  const queryClient = useQueryClient();
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  const options = getBlockNumberQueryOptions(config, {
    ...parameters,
    chainId
  });
  useWatchBlockNumber({
    ...{
      config: parameters.config,
      chainId: parameters.chainId,
      ...typeof watch === "object" ? watch : {}
    },
    enabled: Boolean((query.enabled ?? true) && (typeof watch === "object" ? watch.enabled : watch)),
    onBlockNumber(blockNumber) {
      queryClient.setQueryData(options.queryKey, blockNumber);
    }
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/wagmi/dist/esm/hooks/useBlockTransactionCount.js
function useBlockTransactionCount(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  const options = getBlockTransactionCountQueryOptions(config, {
    ...parameters,
    chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/wagmi/dist/esm/hooks/useBytecode.js
function useBytecode(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getBytecodeQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useCall.js
function useCall(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = callQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/wagmi/dist/esm/hooks/useCallsStatus.js
function useCallsStatus(parameters) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const options = getCallsStatusQueryOptions(config, parameters);
  return useQuery2({ ...query, ...options });
}

// node_modules/wagmi/dist/esm/hooks/useCapabilities.js
function useCapabilities(parameters = {}) {
  const { account, query = {} } = parameters;
  const { address } = useAccount();
  const config = useConfig(parameters);
  const options = getCapabilitiesQueryOptions(config, {
    ...parameters,
    account: account ?? address
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/wagmi/dist/esm/hooks/useChains.js
var import_react9 = __toESM(require_react(), 1);
function useChains(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_react9.useSyncExternalStore)((onChange) => watchChains(config, { onChange }), () => getChains(config), () => getChains(config));
}

// node_modules/wagmi/dist/esm/hooks/useClient.js
var import_with_selector2 = __toESM(require_with_selector(), 1);
function useClient(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_with_selector2.useSyncExternalStoreWithSelector)((onChange) => watchClient(config, { onChange }), () => getClient(config, parameters), () => getClient(config, parameters), (x) => x, (a, b) => a?.uid === b?.uid);
}

// node_modules/wagmi/dist/esm/hooks/useConnect.js
var import_react11 = __toESM(require_react(), 1);

// node_modules/wagmi/dist/esm/hooks/useConnectors.js
var import_react10 = __toESM(require_react(), 1);
function useConnectors(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_react10.useSyncExternalStore)((onChange) => watchConnectors(config, { onChange }), () => getConnectors(config), () => getConnectors(config));
}

// node_modules/wagmi/dist/esm/hooks/useConnect.js
function useConnect(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = connectMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  (0, import_react11.useEffect)(() => {
    return config.subscribe(({ status }) => status, (status, previousStatus) => {
      if (previousStatus === "connected" && status === "disconnected")
        result.reset();
    });
  }, [config, result.reset]);
  return {
    ...result,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: useConnectors({ config })
  };
}

// node_modules/wagmi/dist/esm/hooks/useConnections.js
var import_react12 = __toESM(require_react(), 1);
function useConnections(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_react12.useSyncExternalStore)((onChange) => watchConnections(config, { onChange }), () => getConnections(config), () => getConnections(config));
}

// node_modules/wagmi/dist/esm/hooks/useConnectorClient.js
var import_react13 = __toESM(require_react(), 1);
function useConnectorClient(parameters = {}) {
  const { query = {}, ...rest } = parameters;
  const config = useConfig(rest);
  const queryClient = useQueryClient();
  const { address, connector, status } = useAccount({ config });
  const chainId = useChainId({ config });
  const activeConnector = parameters.connector ?? connector;
  const { queryKey, ...options } = getConnectorClientQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: activeConnector
  });
  const enabled = Boolean((status === "connected" || status === "reconnecting" && activeConnector?.getProvider) && (query.enabled ?? true));
  const addressRef = (0, import_react13.useRef)(address);
  (0, import_react13.useEffect)(() => {
    const previousAddress = addressRef.current;
    if (!address && previousAddress) {
      queryClient.removeQueries({ queryKey });
      addressRef.current = void 0;
    } else if (address !== previousAddress) {
      queryClient.invalidateQueries({ queryKey });
      addressRef.current = address;
    }
  }, [address, queryClient]);
  return useQuery2({
    ...query,
    ...options,
    queryKey,
    enabled,
    staleTime: Number.POSITIVE_INFINITY
  });
}

// node_modules/wagmi/dist/esm/hooks/useDeployContract.js
function useDeployContract(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = deployContractMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    deployContract: mutate,
    deployContractAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useDisconnect.js
function useDisconnect(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = disconnectMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    connectors: useConnections({ config }).map((connection) => connection.connector),
    disconnect: mutate,
    disconnectAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useEnsAddress.js
function useEnsAddress(parameters = {}) {
  const { name, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsAddressQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(name && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useEnsAvatar.js
function useEnsAvatar(parameters = {}) {
  const { name, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsAvatarQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(name && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useEnsName.js
function useEnsName(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsNameQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useEnsResolver.js
function useEnsResolver(parameters = {}) {
  const { name, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsResolverQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(name && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useEnsText.js
function useEnsText(parameters = {}) {
  const { key, name, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getEnsTextQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(key && name && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useEstimateFeesPerGas.js
function useEstimateFeesPerGas(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = estimateFeesPerGasQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/wagmi/dist/esm/hooks/useEstimateGas.js
function useEstimateGas(parameters = {}) {
  const { connector, query = {} } = parameters;
  const config = useConfig(parameters);
  const { data: connectorClient } = useConnectorClient({
    config,
    connector,
    query: { enabled: parameters.account === void 0 }
  });
  const account = parameters.account ?? connectorClient?.account;
  const chainId = useChainId({ config });
  const options = estimateGasQueryOptions(config, {
    ...parameters,
    account,
    chainId: parameters.chainId ?? chainId,
    connector
  });
  const enabled = Boolean((account || connector) && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useEstimateMaxPriorityFeePerGas.js
function useEstimateMaxPriorityFeePerGas(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = estimateMaxPriorityFeePerGasQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/wagmi/dist/esm/hooks/useFeeHistory.js
function useFeeHistory(parameters = {}) {
  const { blockCount, rewardPercentiles, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getFeeHistoryQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(blockCount && rewardPercentiles && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useGasPrice.js
function useGasPrice(parameters = {}) {
  const { query = {} } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  const options = getGasPriceQueryOptions(config, {
    ...parameters,
    chainId
  });
  return useQuery2({ ...query, ...options });
}

// node_modules/wagmi/dist/esm/hooks/useInfiniteReadContracts.js
function useInfiniteReadContracts(parameters) {
  const { contracts = [], query } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = infiniteReadContractsQueryOptions(config, {
    ...parameters,
    chainId,
    contracts,
    query
  });
  return useInfiniteQuery2({
    ...query,
    ...options,
    initialPageParam: options.initialPageParam,
    structuralSharing: query.structuralSharing ?? structuralSharing
  });
}

// node_modules/wagmi/dist/esm/hooks/usePrepareTransactionRequest.js
function usePrepareTransactionRequest(parameters = {}) {
  const { to, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = prepareTransactionRequestQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(to && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/wagmi/dist/esm/hooks/useProof.js
function useProof(parameters = {}) {
  const { address, storageKeys, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getProofQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && storageKeys && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/usePublicClient.js
var import_with_selector3 = __toESM(require_with_selector(), 1);
function usePublicClient(parameters = {}) {
  const config = useConfig(parameters);
  return (0, import_with_selector3.useSyncExternalStoreWithSelector)((onChange) => watchPublicClient(config, { onChange }), () => getPublicClient(config, parameters), () => getPublicClient(config, parameters), (x) => x, (a, b) => a?.uid === b?.uid);
}

// node_modules/wagmi/dist/esm/hooks/useReadContract.js
function useReadContract(parameters = {}) {
  const { abi: abi2, address, functionName, query = {} } = parameters;
  const code = parameters.code;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = readContractQueryOptions(config, { ...parameters, chainId: parameters.chainId ?? chainId });
  const enabled = Boolean((address || code) && abi2 && functionName && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing
  });
}

// node_modules/wagmi/dist/esm/hooks/useReadContracts.js
var import_react14 = __toESM(require_react(), 1);
function useReadContracts(parameters = {}) {
  const { contracts = [], query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = readContractsQueryOptions(config, { ...parameters, chainId });
  const enabled = (0, import_react14.useMemo)(() => {
    let isContractsValid = false;
    for (const contract of contracts) {
      const { abi: abi2, address, functionName } = contract;
      if (!abi2 || !address || !functionName) {
        isContractsValid = false;
        break;
      }
      isContractsValid = true;
    }
    return Boolean(isContractsValid && (query.enabled ?? true));
  }, [contracts, query.enabled]);
  return useQuery2({
    ...options,
    ...query,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing
  });
}

// node_modules/wagmi/dist/esm/hooks/useReconnect.js
function useReconnect(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = reconnectMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    connectors: config.connectors,
    reconnect: mutate,
    reconnectAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useSendCalls.js
function useSendCalls(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = sendCallsMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    sendCalls: mutate,
    sendCallsAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useSendTransaction.js
function useSendTransaction(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = sendTransactionMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    sendTransaction: mutate,
    sendTransactionAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useShowCallsStatus.js
function useShowCallsStatus(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = showCallsStatusMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    showCallsStatus: mutate,
    showCallsStatusAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useSignMessage.js
function useSignMessage(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = signMessageMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    signMessage: mutate,
    signMessageAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useSignTypedData.js
function useSignTypedData(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = signTypedDataMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    signTypedData: mutate,
    signTypedDataAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useSimulateContract.js
function useSimulateContract(parameters = {}) {
  const { abi: abi2, address, connector, functionName, query = {} } = parameters;
  const config = useConfig(parameters);
  const { data: connectorClient } = useConnectorClient({
    config,
    connector,
    query: { enabled: parameters.account === void 0 }
  });
  const chainId = useChainId({ config });
  const options = simulateContractQueryOptions(config, {
    ...parameters,
    account: parameters.account ?? connectorClient?.account,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(abi2 && address && functionName && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useStorageAt.js
function useStorageAt(parameters = {}) {
  const { address, slot, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getStorageAtQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && slot && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useSwitchAccount.js
function useSwitchAccount(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = switchAccountMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    connectors: useConnections({ config }).map((connection) => connection.connector),
    switchAccount: mutate,
    switchAccountAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useSwitchChain.js
function useSwitchChain(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = switchChainMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    chains: useChains({ config }),
    switchChain: mutate,
    switchChainAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useToken.js
function useToken(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTokenQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useTransaction.js
function useTransaction(parameters = {}) {
  const { blockHash, blockNumber, blockTag, hash, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTransactionQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(!(blockHash && blockNumber && blockTag && hash) && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/wagmi/dist/esm/hooks/useTransactionConfirmations.js
function useTransactionConfirmations(parameters = {}) {
  const { hash, transactionReceipt, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTransactionConfirmationsQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(!(hash && transactionReceipt) && (hash || transactionReceipt) && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useTransactionCount.js
function useTransactionCount(parameters = {}) {
  const { address, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTransactionCountQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useTransactionReceipt.js
function useTransactionReceipt(parameters = {}) {
  const { hash, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = getTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(hash && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/wagmi/dist/esm/hooks/useVerifyMessage.js
function useVerifyMessage(parameters = {}) {
  const { address, message, signature, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = verifyMessageQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && message && signature && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useVerifyTypedData.js
function useVerifyTypedData(parameters = {}) {
  const { address, message, primaryType, signature, types, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = verifyTypedDataQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(address && message && primaryType && signature && types && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useWaitForCallsStatus.js
function useWaitForCallsStatus(parameters) {
  const { id, query = {} } = parameters;
  const config = useConfig(parameters);
  const options = waitForCallsStatusQueryOptions(config, parameters);
  const enabled = Boolean(id && (query.enabled ?? true));
  return useQuery2({ ...query, ...options, enabled });
}

// node_modules/wagmi/dist/esm/hooks/useWaitForTransactionReceipt.js
function useWaitForTransactionReceipt(parameters = {}) {
  const { hash, query = {} } = parameters;
  const config = useConfig(parameters);
  const chainId = useChainId({ config });
  const options = waitForTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId
  });
  const enabled = Boolean(hash && (query.enabled ?? true));
  return useQuery2({
    ...query,
    ...options,
    enabled
  });
}

// node_modules/wagmi/dist/esm/hooks/useWalletClient.js
var import_react15 = __toESM(require_react(), 1);
function useWalletClient(parameters = {}) {
  const { query = {}, ...rest } = parameters;
  const config = useConfig(rest);
  const queryClient = useQueryClient();
  const { address, connector, status } = useAccount({ config });
  const chainId = useChainId({ config });
  const activeConnector = parameters.connector ?? connector;
  const { queryKey, ...options } = getWalletClientQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: parameters.connector ?? connector
  });
  const enabled = Boolean((status === "connected" || status === "reconnecting" && activeConnector?.getProvider) && (query.enabled ?? true));
  const addressRef = (0, import_react15.useRef)(address);
  (0, import_react15.useEffect)(() => {
    const previousAddress = addressRef.current;
    if (!address && previousAddress) {
      queryClient.removeQueries({ queryKey });
      addressRef.current = void 0;
    } else if (address !== previousAddress) {
      queryClient.invalidateQueries({ queryKey });
      addressRef.current = address;
    }
  }, [address, queryClient]);
  return useQuery2({
    ...query,
    ...options,
    queryKey,
    enabled,
    staleTime: Number.POSITIVE_INFINITY
  });
}

// node_modules/wagmi/dist/esm/hooks/useWatchAsset.js
function useWatchAsset(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = watchAssetMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    watchAsset: mutate,
    watchAssetAsync: mutateAsync
  };
}

// node_modules/wagmi/dist/esm/hooks/useWatchContractEvent.js
var import_react16 = __toESM(require_react(), 1);
function useWatchContractEvent(parameters = {}) {
  const { enabled = true, onLogs, config: _, ...rest } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  (0, import_react16.useEffect)(() => {
    if (!enabled)
      return;
    if (!onLogs)
      return;
    return watchContractEvent2(config, {
      ...rest,
      chainId,
      onLogs
    });
  }, [
    chainId,
    config,
    enabled,
    onLogs,
    ///
    rest.abi,
    rest.address,
    rest.args,
    rest.batch,
    rest.eventName,
    rest.fromBlock,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.strict,
    rest.syncConnectedChain
  ]);
}

// node_modules/wagmi/dist/esm/hooks/useWatchPendingTransactions.js
var import_react17 = __toESM(require_react(), 1);
function useWatchPendingTransactions(parameters = {}) {
  const { enabled = true, onTransactions, config: _, ...rest } = parameters;
  const config = useConfig(parameters);
  const configChainId = useChainId({ config });
  const chainId = parameters.chainId ?? configChainId;
  (0, import_react17.useEffect)(() => {
    if (!enabled)
      return;
    if (!onTransactions)
      return;
    return watchPendingTransactions2(config, {
      ...rest,
      chainId,
      onTransactions
    });
  }, [
    chainId,
    config,
    enabled,
    onTransactions,
    ///
    rest.batch,
    rest.onError,
    rest.poll,
    rest.pollingInterval,
    rest.syncConnectedChain
  ]);
}

// node_modules/wagmi/dist/esm/hooks/useWriteContract.js
function useWriteContract(parameters = {}) {
  const { mutation } = parameters;
  const config = useConfig(parameters);
  const mutationOptions = writeContractMutationOptions(config);
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions
  });
  return {
    ...result,
    writeContract: mutate,
    writeContractAsync: mutateAsync
  };
}
export {
  BaseError4 as BaseError,
  ChainNotConfiguredError,
  ConnectorAccountNotFoundError,
  ConnectorAlreadyConnectedError,
  ConnectorChainMismatchError,
  ConnectorNotFoundError,
  ConnectorUnavailableReconnectingError,
  WagmiContext as Context,
  Hydrate,
  ProviderNotFoundError,
  SwitchChainNotSupportedError,
  WagmiProvider as WagmiConfig,
  WagmiContext,
  WagmiProvider,
  WagmiProviderNotFoundError,
  cookieStorage,
  cookieToInitialState,
  createConfig,
  createConnector,
  createStorage,
  custom,
  deepEqual,
  deserialize,
  fallback2 as fallback,
  http,
  injected,
  mock,
  noopStorage,
  normalizeChainId,
  parseCookie,
  serialize,
  unstable_connector,
  useAccount,
  useAccountEffect,
  useBalance,
  useBlock,
  useBlockNumber,
  useBlockTransactionCount,
  useBytecode,
  useCall,
  useCallsStatus,
  useCapabilities,
  useChainId,
  useChains,
  useClient,
  useConfig,
  useConnect,
  useConnections,
  useConnectorClient,
  useConnectors,
  useInfiniteReadContracts as useContractInfiniteReads,
  useReadContract as useContractRead,
  useReadContracts as useContractReads,
  useWriteContract as useContractWrite,
  useDeployContract,
  useDisconnect,
  useEnsAddress,
  useEnsAvatar,
  useEnsName,
  useEnsResolver,
  useEnsText,
  useEstimateFeesPerGas,
  useEstimateGas,
  useEstimateMaxPriorityFeePerGas,
  useEstimateFeesPerGas as useFeeData,
  useFeeHistory,
  useGasPrice,
  useInfiniteReadContracts,
  usePrepareTransactionRequest,
  useProof,
  usePublicClient,
  useReadContract,
  useReadContracts,
  useReconnect,
  useSendCalls,
  useSendTransaction,
  useShowCallsStatus,
  useSignMessage,
  useSignTypedData,
  useSimulateContract,
  useStorageAt,
  useSwitchAccount,
  useSwitchChain,
  useToken,
  useTransaction,
  useTransactionConfirmations,
  useTransactionCount,
  useTransactionReceipt,
  useVerifyMessage,
  useVerifyTypedData,
  useWaitForCallsStatus,
  useWaitForTransactionReceipt,
  useWalletClient,
  useWatchAsset,
  useWatchBlockNumber,
  useWatchBlocks,
  useWatchContractEvent,
  useWatchPendingTransactions,
  useWriteContract,
  version2 as version,
  webSocket2 as webSocket
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=wagmi.js.map
